import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface SessionRegistrationRequest {
  action: 'register' | 'unregister';
  studentId: string;
  sessionId: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== 'POST' && req.method !== 'DELETE') {
      throw new Error('Method not allowed');
    }

    const { action, studentId, sessionId }: SessionRegistrationRequest = await req.json();

    if (!studentId || !sessionId || !action) {
      return new Response(
        JSON.stringify({ error: 'Student-ID, Session-ID und Action sind erforderlich' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: session, error: sessionError } = await supabase
      .from('member_live_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return new Response(
        JSON.stringify({ error: 'Session nicht gefunden' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (action === 'register') {
      if (session.max_participants) {
        const { data: existingRegistrations } = await supabase
          .from('member_student_session_registrations')
          .select('id')
          .eq('session_id', sessionId);

        if ((existingRegistrations?.length || 0) >= session.max_participants) {
          return new Response(
            JSON.stringify({ error: 'Diese Session ist bereits ausgebucht' }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
      }

      const { data: registration, error: registrationError } = await supabase
        .from('member_student_session_registrations')
        .insert({
          student_id: studentId,
          session_id: sessionId,
        })
        .select()
        .single();

      if (registrationError) {
        if (registrationError.code === '23505') {
          return new Response(
            JSON.stringify({ error: 'Du bist bereits für diese Session angemeldet' }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        console.error('Registration error:', registrationError);
        return new Response(
          JSON.stringify({ error: 'Anmeldung fehlgeschlagen' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Erfolgreich für Session angemeldet',
          registration,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (action === 'unregister') {
      const sessionDate = new Date(session.session_date);
      const today = new Date();

      if (sessionDate < today) {
        return new Response(
          JSON.stringify({ error: 'Abmeldung für vergangene Sessions nicht möglich' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const { error: deleteError } = await supabase
        .from('member_student_session_registrations')
        .delete()
        .eq('student_id', studentId)
        .eq('session_id', sessionId);

      if (deleteError) {
        console.error('Unregistration error:', deleteError);
        return new Response(
          JSON.stringify({ error: 'Abmeldung fehlgeschlagen' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Erfolgreich von Session abgemeldet',
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Ungültige Action' }),
      {
        status: 400,
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
