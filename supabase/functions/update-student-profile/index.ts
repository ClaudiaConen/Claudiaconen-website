import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface UpdateProfileRequest {
  studentId: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
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

    const { studentId, firstName, lastName, avatarUrl }: UpdateProfileRequest = await req.json();

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

    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (firstName !== undefined) updateData.first_name = firstName;
    if (lastName !== undefined) updateData.last_name = lastName;
    if (avatarUrl !== undefined) updateData.avatar_url = avatarUrl;

    const { data: updatedStudent, error: updateError } = await supabase
      .from('member_students')
      .update(updateData)
      .eq('id', studentId)
      .eq('is_active', true)
      .select()
      .single();

    if (updateError) {
      console.error('Update error:', updateError);
      return new Response(
        JSON.stringify({ error: 'Profil konnte nicht aktualisiert werden' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        student: {
          id: updatedStudent.id,
          email: updatedStudent.email,
          firstName: updatedStudent.first_name,
          lastName: updatedStudent.last_name,
          avatarUrl: updatedStudent.avatar_url,
          level: updatedStudent.level,
          totalXp: updatedStudent.total_xp,
          currentStreak: updatedStudent.current_streak,
          longestStreak: updatedStudent.longest_streak,
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
