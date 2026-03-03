import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface SubmitQuizRequest {
  studentId: string;
  quizId: string;
  answers: { [questionId: string]: string[] };
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

    const { studentId, quizId, answers }: SubmitQuizRequest = await req.json();

    if (!studentId || !quizId || !answers) {
      return new Response(
        JSON.stringify({ error: 'Student-ID, Quiz-ID und Antworten sind erforderlich' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: quiz, error: quizError } = await supabase
      .from('member_quizzes')
      .select('passing_score, xp_reward')
      .eq('id', quizId)
      .single();

    if (quizError || !quiz) {
      return new Response(
        JSON.stringify({ error: 'Quiz nicht gefunden' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { data: questions, error: questionsError } = await supabase
      .from('member_quiz_questions')
      .select(`
        id,
        question_type,
        member_quiz_answers (
          id,
          is_correct
        )
      `)
      .eq('quiz_id', quizId);

    if (questionsError || !questions) {
      return new Response(
        JSON.stringify({ error: 'Fragen konnten nicht geladen werden' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    let correctCount = 0;
    const totalQuestions = questions.length;

    for (const question of questions) {
      const selectedIds = answers[question.id] || [];

      const correctAnswerIds = question.member_quiz_answers
        .filter((a: any) => a.is_correct)
        .map((a: any) => a.id);

      if (question.question_type === 'single_choice') {
        if (selectedIds.length === 1 && correctAnswerIds.includes(selectedIds[0])) {
          correctCount++;
        }
      } else if (question.question_type === 'multiple_choice') {
        const sortedSelected = [...selectedIds].sort();
        const sortedCorrect = [...correctAnswerIds].sort();

        if (
          sortedSelected.length === sortedCorrect.length &&
          sortedSelected.every((id, index) => id === sortedCorrect[index])
        ) {
          correctCount++;
        }
      }
    }

    const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const passed = score >= quiz.passing_score;
    const xpEarned = passed ? quiz.xp_reward : 0;

    const { data: attempt, error: attemptError } = await supabase
      .from('member_student_quiz_attempts')
      .insert({
        student_id: studentId,
        quiz_id: quizId,
        score,
        passed,
        answers_json: answers,
        xp_earned: xpEarned,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (attemptError) {
      console.error('Attempt insert error:', attemptError);
      return new Response(
        JSON.stringify({ error: 'Quiz-Versuch konnte nicht gespeichert werden' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (passed && xpEarned > 0) {
      const { error: xpError } = await supabase.rpc('increment', {
        row_id: studentId,
        x: xpEarned,
      });

      if (xpError) {
        console.error('XP update error:', xpError);
      }

      const { data: student } = await supabase
        .from('member_students')
        .select('total_xp')
        .eq('id', studentId)
        .single();

      if (student) {
        const newLevel = Math.min(100, 1 + Math.floor(student.total_xp / 1000));

        await supabase
          .from('member_students')
          .update({
            total_xp: student.total_xp + xpEarned,
            level: newLevel,
            updated_at: new Date().toISOString(),
          })
          .eq('id', studentId);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        result: {
          attemptId: attempt.id,
          score,
          passed,
          xpEarned,
          correctCount,
          totalQuestions,
          passingScore: quiz.passing_score,
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
