import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface UpdateStreakRequest {
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

    const { studentId }: UpdateStreakRequest = await req.json();

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

    const today = new Date().toISOString().split('T')[0];
    const lastActivityDate = student.last_activity_date;

    if (lastActivityDate === today) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Streak bereits heute aktualisiert',
          currentStreak: student.current_streak,
          longestStreak: student.longest_streak,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    let newStreak = 1;
    let newLongestStreak = student.longest_streak;

    if (lastActivityDate) {
      const lastDate = new Date(lastActivityDate);
      const todayDate = new Date(today);
      const daysDiff = Math.floor(
        (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === 1) {
        newStreak = student.current_streak + 1;
      } else if (daysDiff > 1) {
        newStreak = 1;
      } else {
        newStreak = student.current_streak;
      }
    }

    if (newStreak > student.longest_streak) {
      newLongestStreak = newStreak;
    }

    const { error: updateError } = await supabase
      .from('member_students')
      .update({
        current_streak: newStreak,
        longest_streak: newLongestStreak,
        last_activity_date: today,
        updated_at: new Date().toISOString(),
      })
      .eq('id', studentId);

    if (updateError) {
      console.error('Streak update error:', updateError);
      return new Response(
        JSON.stringify({ error: 'Streak konnte nicht aktualisiert werden' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        streakIncreased: newStreak > student.current_streak,
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
