import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface ForumOperationRequest {
  action: 'create_thread' | 'create_post' | 'update_post' | 'delete_post' | 'add_reaction' | 'remove_reaction';
  studentId: string;
  categoryId?: string;
  threadId?: string;
  postId?: string;
  title?: string;
  content?: string;
  reactionType?: 'like' | 'helpful' | 'insightful';
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

    const {
      action,
      studentId,
      categoryId,
      threadId,
      postId,
      title,
      content,
      reactionType,
    }: ForumOperationRequest = await req.json();

    if (!studentId || !action) {
      return new Response(
        JSON.stringify({ error: 'Student-ID und Action sind erforderlich' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (action === 'create_thread') {
      if (!categoryId || !title) {
        return new Response(
          JSON.stringify({ error: 'Kategorie-ID und Titel sind erforderlich' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const { data: thread, error: threadError } = await supabase
        .from('member_forum_threads')
        .insert({
          category_id: categoryId,
          student_id: studentId,
          title,
        })
        .select()
        .single();

      if (threadError) {
        console.error('Thread creation error:', threadError);
        return new Response(
          JSON.stringify({ error: 'Thread konnte nicht erstellt werden' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ success: true, thread }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (action === 'create_post') {
      if (!threadId || !content) {
        return new Response(
          JSON.stringify({ error: 'Thread-ID und Content sind erforderlich' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const { data: thread } = await supabase
        .from('member_forum_threads')
        .select('is_locked')
        .eq('id', threadId)
        .single();

      if (thread?.is_locked) {
        return new Response(
          JSON.stringify({ error: 'Dieser Thread ist gesperrt' }),
          {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const { data: post, error: postError } = await supabase
        .from('member_forum_posts')
        .insert({
          thread_id: threadId,
          student_id: studentId,
          content,
        })
        .select()
        .single();

      if (postError) {
        console.error('Post creation error:', postError);
        return new Response(
          JSON.stringify({ error: 'Post konnte nicht erstellt werden' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ success: true, post }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (action === 'update_post') {
      if (!postId || !content) {
        return new Response(
          JSON.stringify({ error: 'Post-ID und Content sind erforderlich' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const { data: post, error: postError } = await supabase
        .from('member_forum_posts')
        .update({
          content,
          is_edited: true,
          edited_at: new Date().toISOString(),
        })
        .eq('id', postId)
        .eq('student_id', studentId)
        .select()
        .single();

      if (postError) {
        console.error('Post update error:', postError);
        return new Response(
          JSON.stringify({ error: 'Post konnte nicht aktualisiert werden' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ success: true, post }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (action === 'delete_post') {
      if (!postId) {
        return new Response(
          JSON.stringify({ error: 'Post-ID ist erforderlich' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const { error: deleteError } = await supabase
        .from('member_forum_posts')
        .delete()
        .eq('id', postId)
        .eq('student_id', studentId);

      if (deleteError) {
        console.error('Post deletion error:', deleteError);
        return new Response(
          JSON.stringify({ error: 'Post konnte nicht gelöscht werden' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (action === 'add_reaction') {
      if (!postId || !reactionType) {
        return new Response(
          JSON.stringify({ error: 'Post-ID und Reaktionstyp sind erforderlich' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const { data: reaction, error: reactionError } = await supabase
        .from('member_forum_reactions')
        .insert({
          post_id: postId,
          student_id: studentId,
          reaction_type: reactionType,
        })
        .select()
        .single();

      if (reactionError) {
        console.error('Reaction creation error:', reactionError);
        return new Response(
          JSON.stringify({ error: 'Reaktion konnte nicht hinzugefügt werden' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ success: true, reaction }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (action === 'remove_reaction') {
      if (!postId || !reactionType) {
        return new Response(
          JSON.stringify({ error: 'Post-ID und Reaktionstyp sind erforderlich' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const { error: deleteError } = await supabase
        .from('member_forum_reactions')
        .delete()
        .eq('post_id', postId)
        .eq('student_id', studentId)
        .eq('reaction_type', reactionType);

      if (deleteError) {
        console.error('Reaction deletion error:', deleteError);
        return new Response(
          JSON.stringify({ error: 'Reaktion konnte nicht entfernt werden' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
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
