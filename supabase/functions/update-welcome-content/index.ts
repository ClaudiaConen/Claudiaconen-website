import { createClient } from 'npm:@supabase/supabase-js@2.57.4';
import * as jose from 'npm:jose@5';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const JWT_SECRET = Deno.env.get('JWT_SECRET') || 'your-secret-key-change-in-production';

interface UpdateRequest {
  welcomeContent: {
    id: string;
    welcome_title: string;
    welcome_message: string | null;
    video_url: string | null;
    video_platform: string;
  };
  guideCards: Array<{
    icon: string;
    title: string;
    description: string;
    link_url: string;
    order_index: number;
  }>;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const secret = new TextEncoder().encode(JWT_SECRET);

    let adminEmail: string;
    try {
      const { payload } = await jose.jwtVerify(token, secret);
      adminEmail = payload.email as string;
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: admin, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', adminEmail)
      .eq('is_active', true)
      .maybeSingle();

    if (adminError || !admin) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { welcomeContent, guideCards } = await req.json() as UpdateRequest;

    const { error: contentError } = await supabase
      .from('member_welcome_content')
      .update({
        welcome_title: welcomeContent.welcome_title,
        welcome_message: welcomeContent.welcome_message,
        video_url: welcomeContent.video_url,
        video_platform: welcomeContent.video_platform,
      })
      .eq('id', welcomeContent.id);

    if (contentError) {
      return new Response(
        JSON.stringify({ error: contentError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    await supabase
      .from('welcome_guide_cards')
      .delete()
      .eq('welcome_id', welcomeContent.id);

    if (guideCards.length > 0) {
      const cardsToInsert = guideCards.map(card => ({
        welcome_id: welcomeContent.id,
        icon: card.icon,
        title: card.title,
        description: card.description,
        link_url: card.link_url,
        order_index: card.order_index,
      }));

      const { error: cardsError } = await supabase
        .from('welcome_guide_cards')
        .insert(cardsToInsert);

      if (cardsError) {
        return new Response(
          JSON.stringify({ error: cardsError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error updating welcome content:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
