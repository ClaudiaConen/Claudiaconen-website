import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface UpdateFlashcardRequest {
  studentId: string;
  flashcardId: string;
  masteryLevel: number;
  nextReviewAt?: string;
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

    const { studentId, flashcardId, masteryLevel, nextReviewAt }: UpdateFlashcardRequest = await req.json();

    if (!studentId || !flashcardId || masteryLevel === undefined) {
      return new Response(
        JSON.stringify({ error: 'Student-ID, Flashcard-ID und Mastery-Level sind erforderlich' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (masteryLevel < 0 || masteryLevel > 3) {
      return new Response(
        JSON.stringify({ error: 'Mastery-Level muss zwischen 0 und 3 liegen' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: existingProgress } = await supabase
      .from('member_student_flashcard_progress')
      .select('*')
      .eq('student_id', studentId)
      .eq('flashcard_id', flashcardId)
      .maybeSingle();

    const reviewCount = existingProgress ? existingProgress.review_count + 1 : 1;

    const updateData: any = {
      student_id: studentId,
      flashcard_id: flashcardId,
      mastery_level: masteryLevel,
      review_count: reviewCount,
      last_reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (nextReviewAt) {
      updateData.next_review_at = nextReviewAt;
    }

    const { data: progress, error: progressError } = await supabase
      .from('member_student_flashcard_progress')
      .upsert(updateData, {
        onConflict: 'student_id,flashcard_id',
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

    let xpEarned = 0;
    if (masteryLevel === 3 && (!existingProgress || existingProgress.mastery_level < 3)) {
      const { data: deckData } = await supabase
        .from('member_flashcard_decks')
        .select('xp_reward')
        .eq('id', (
          await supabase
            .from('member_flashcards')
            .select('deck_id')
            .eq('id', flashcardId)
            .single()
        ).data?.deck_id)
        .single();

      if (deckData) {
        const xpPerCard = Math.max(1, Math.floor(deckData.xp_reward / 10));
        xpEarned = xpPerCard;

        const { data: student } = await supabase
          .from('member_students')
          .select('total_xp')
          .eq('id', studentId)
          .single();

        if (student) {
          const newTotalXp = student.total_xp + xpEarned;
          const newLevel = Math.min(100, 1 + Math.floor(newTotalXp / 1000));

          await supabase
            .from('member_students')
            .update({
              total_xp: newTotalXp,
              level: newLevel,
              updated_at: new Date().toISOString(),
            })
            .eq('id', studentId);
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        xpEarned,
        progress: {
          id: progress.id,
          masteryLevel: progress.mastery_level,
          reviewCount: progress.review_count,
          lastReviewedAt: progress.last_reviewed_at,
          nextReviewAt: progress.next_review_at,
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
