import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface CheckAchievementsRequest {
  studentId: string;
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

    const { studentId }: CheckAchievementsRequest = await req.json();

    if (!studentId) {
      return new Response(
        JSON.stringify({ error: 'Student-ID ist erforderlich' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: student, error: studentError } = await supabase
      .from('member_students')
      .select('*')
      .eq('id', studentId)
      .single();

    if (studentError || !student) {
      return new Response(
        JSON.stringify({ error: 'Student nicht gefunden' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { data: existingAchievements } = await supabase
      .from('member_student_achievements')
      .select('achievement_id')
      .eq('student_id', studentId);

    const unlockedAchievementIds = new Set(
      existingAchievements?.map((a) => a.achievement_id) || []
    );

    const { data: allAchievements } = await supabase
      .from('member_achievements')
      .select('*')
      .eq('is_active', true);

    const newlyUnlocked = [];

    for (const achievement of allAchievements || []) {
      if (unlockedAchievementIds.has(achievement.id)) {
        continue;
      }

      const criteria = achievement.criteria_json;
      let shouldUnlock = false;

      if (criteria.type === 'early_registration') {
        const daysSinceCreation = Math.floor(
          (Date.now() - new Date(student.created_at).getTime()) / (1000 * 60 * 60 * 24)
        );
        shouldUnlock = daysSinceCreation <= criteria.days;
      } else if (criteria.type === 'lessons_per_day') {
        const { data: todayLessons } = await supabase
          .from('member_student_lesson_progress')
          .select('id')
          .eq('student_id', studentId)
          .eq('is_completed', true)
          .gte('completed_at', new Date().toISOString().split('T')[0]);

        shouldUnlock = (todayLessons?.length || 0) >= criteria.count;
      } else if (criteria.type === 'perfect_quizzes') {
        const { data: perfectQuizzes } = await supabase
          .from('member_student_quiz_attempts')
          .select('id')
          .eq('student_id', studentId)
          .eq('score', 100);

        shouldUnlock = (perfectQuizzes?.length || 0) >= criteria.count;
      } else if (criteria.type === 'streak_days') {
        shouldUnlock = student.current_streak >= criteria.days;
      } else if (criteria.type === 'all_pdfs_downloaded') {
        const { data: totalPdfs } = await supabase
          .from('member_lesson_downloads')
          .select('id');

        shouldUnlock = (totalPdfs?.length || 0) > 0;
      } else if (criteria.type === 'all_modules_completed') {
        const { data: moduleProgress } = await supabase
          .from('member_student_module_progress')
          .select('*')
          .eq('student_id', studentId)
          .eq('completion_percentage', 100);

        const { data: totalModules } = await supabase
          .from('member_course_modules')
          .select('id')
          .eq('is_published', true);

        shouldUnlock =
          (moduleProgress?.length || 0) >= (totalModules?.length || 0) &&
          (totalModules?.length || 0) > 0;
      }

      if (shouldUnlock) {
        const { error: unlockError } = await supabase
          .from('member_student_achievements')
          .insert({
            student_id: studentId,
            achievement_id: achievement.id,
            unlocked_at: new Date().toISOString(),
          });

        if (!unlockError) {
          newlyUnlocked.push({
            id: achievement.id,
            key: achievement.achievement_key,
            title: achievement.title,
            description: achievement.description,
            iconEmoji: achievement.icon_emoji,
            xpReward: achievement.xp_reward,
          });
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        newlyUnlocked,
        count: newlyUnlocked.length,
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
