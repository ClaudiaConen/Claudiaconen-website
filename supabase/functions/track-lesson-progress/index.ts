import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface TrackProgressRequest {
  studentId: string;
  lessonId: string;
  videoProgressSeconds?: number;
  completionPercentage?: number;
  isCompleted?: boolean;
  notes?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    const {
      studentId,
      lessonId,
      videoProgressSeconds,
      completionPercentage,
      isCompleted,
      notes
    }: TrackProgressRequest = await req.json();

    if (!studentId || !lessonId) {
      return new Response(
        JSON.stringify({ error: 'Student-ID und Lesson-ID sind erforderlich' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: lesson, error: lessonError } = await supabase
      .from('member_course_lessons')
      .select('xp_reward')
      .eq('id', lessonId)
      .single();

    if (lessonError || !lesson) {
      return new Response(
        JSON.stringify({ error: 'Lektion nicht gefunden' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { data: existingProgress } = await supabase
      .from('member_student_lesson_progress')
      .select('*')
      .eq('student_id', studentId)
      .eq('lesson_id', lessonId)
      .maybeSingle();

    const wasCompleted = existingProgress?.is_completed || false;
    const nowCompleted = isCompleted ?? false;
    const justCompleted = !wasCompleted && nowCompleted;

    const updateData: any = {
      student_id: studentId,
      lesson_id: lessonId,
      last_watched_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (videoProgressSeconds !== undefined) {
      updateData.video_progress_seconds = videoProgressSeconds;
    }
    if (completionPercentage !== undefined) {
      updateData.completion_percentage = completionPercentage;
    }
    if (isCompleted !== undefined) {
      updateData.is_completed = isCompleted;
      if (isCompleted) {
        updateData.completed_at = new Date().toISOString();
      }
    }
    if (notes !== undefined) {
      updateData.notes = notes;
    }

    const { data: progress, error: progressError } = await supabase
      .from('member_student_lesson_progress')
      .upsert(updateData, {
        onConflict: 'student_id,lesson_id',
      })
      .select()
      .single();

    if (progressError) {
      console.error('Progress update error:', progressError);
      return new Response(
        JSON.stringify({ error: 'Fortschritt konnte nicht gespeichert werden' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (justCompleted) {
      const { error: xpError } = await supabase
        .from('member_students')
        .update({
          total_xp: supabase.rpc('increment_xp', {
            student_id: studentId,
            xp_amount: lesson.xp_reward
          }),
          updated_at: new Date().toISOString(),
        })
        .eq('id', studentId);

      if (xpError) {
        console.error('XP update error:', xpError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        progress: {
          id: progress.id,
          isCompleted: progress.is_completed,
          completionPercentage: progress.completion_percentage,
          videoProgressSeconds: progress.video_progress_seconds,
          justCompleted,
          xpEarned: justCompleted ? lesson.xp_reward : 0,
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Interner Serverfehler' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
