import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface LoginRequest {
  email: string;
  accessCode: string;
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

    const { email, accessCode }: LoginRequest = await req.json();

    if (!email || !accessCode) {
      return new Response(
        JSON.stringify({ error: 'Email und Access-Code sind erforderlich' }),
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
      .eq('email', email.toLowerCase().trim())
      .eq('access_code', accessCode.trim())
      .eq('is_active', true)
      .maybeSingle();

    if (studentError) {
      console.error('Database error:', studentError);
      return new Response(
        JSON.stringify({ error: 'Datenbankfehler' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (!student) {
      return new Response(
        JSON.stringify({ error: 'Ungültige Email oder Access-Code' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { error: updateError } = await supabase
      .from('member_students')
      .update({
        last_login_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', student.id);

    if (updateError) {
      console.error('Update error:', updateError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        student: {
          id: student.id,
          email: student.email,
          firstName: student.first_name,
          lastName: student.last_name,
          avatarUrl: student.avatar_url,
          level: student.level,
          totalXp: student.total_xp,
          currentStreak: student.current_streak,
          longestStreak: student.longest_streak,
          lastActivityDate: student.last_activity_date,
          createdAt: student.created_at,
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
