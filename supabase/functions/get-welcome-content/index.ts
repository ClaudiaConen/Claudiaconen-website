import { createClient } from 'npm:@supabase/supabase-js@2.57.4';
import * as jose from 'npm:jose@5';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const JWT_SECRET = Deno.env.get('JWT_SECRET') || 'your-secret-key-change-in-production';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    console.log('GET /get-welcome-content - Request received');

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('Missing authorization header');
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Token received, length:', token.length);

    const secret = new TextEncoder().encode(JWT_SECRET);

    let adminEmail: string;
    try {
      const { payload } = await jose.jwtVerify(token, secret);
      adminEmail = payload.email as string;
      console.log('Token verified for admin:', adminEmail);
    } catch (error) {
      console.error('Token verification failed:', error);
      return new Response(
        JSON.stringify({ error: 'Invalid token', details: error.message }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Checking admin user in database');
    const { data: admin, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', adminEmail)
      .eq('is_active', true)
      .maybeSingle();

    if (adminError) {
      console.error('Admin lookup error:', adminError);
      return new Response(
        JSON.stringify({ error: 'Database error checking admin', details: adminError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!admin) {
      console.error('Admin not found or inactive:', adminEmail);
      return new Response(
        JSON.stringify({ error: 'Unauthorized - admin not found or inactive' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Admin verified, fetching welcome content');
    const { data: contentData, error: contentError } = await supabase
      .from('member_welcome_content')
      .select('*')
      .eq('is_active', true)
      .maybeSingle();

    if (contentError) {
      console.error('Content fetch error:', contentError);
      return new Response(
        JSON.stringify({ error: contentError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!contentData) {
      console.error('No welcome content found');
      return new Response(
        JSON.stringify({ error: 'No welcome content found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Welcome content found, fetching guide cards');
    const { data: cardsData, error: cardsError } = await supabase
      .from('welcome_guide_cards')
      .select('*')
      .eq('welcome_id', contentData.id)
      .order('order_index', { ascending: true });

    if (cardsError) {
      console.error('Cards fetch error:', cardsError);
      return new Response(
        JSON.stringify({ error: cardsError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Success - returning data');
    return new Response(
      JSON.stringify({
        welcomeContent: contentData,
        guideCards: cardsData || [],
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
