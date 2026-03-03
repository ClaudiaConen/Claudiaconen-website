import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface MarkAnnouncementReadRequest {
  studentId: string;
  announcementId: string;
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

    const { studentId, announcementId }: MarkAnnouncementReadRequest = await req.json();

    if (!studentId || !announcementId) {
      return new Response(
        JSON.stringify({ error: 'Student-ID und Announcement-ID sind erforderlich' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: announcement, error: announcementError } = await supabase
      .from('member_announcements')
      .select('id')
      .eq('id', announcementId)
      .single();

    if (announcementError || !announcement) {
      return new Response(
        JSON.stringify({ error: 'Ankündigung nicht gefunden' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { data: readStatus, error: readError } = await supabase
      .from('member_student_announcement_reads')
      .insert({
        student_id: studentId,
        announcement_id: announcementId,
        read_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (readError) {
      if (readError.code === '23505') {
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Ankündigung bereits als gelesen markiert',
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      console.error('Read status error:', readError);
      return new Response(
        JSON.stringify({ error: 'Status konnte nicht gespeichert werden' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Ankündigung als gelesen markiert',
        readStatus,
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
