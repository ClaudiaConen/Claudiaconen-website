import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as jose from "npm:jose@5";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const JWT_SECRET = Deno.env.get("JWT_SECRET") || "your-secret-key-change-in-production";

async function verifyAdmin(req: Request, supabase: any) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Missing or invalid authorization header", status: 401 };
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);

    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("is_active")
      .eq("email", payload.email as string)
      .maybeSingle();

    if (!adminUser || !adminUser.is_active) {
      return { error: "Admin not active or not found", status: 403 };
    }

    return { payload, adminUser };
  } catch {
    return { error: "Invalid or expired token", status: 401 };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const authResult = await verifyAdmin(req, supabase);
    if (authResult.error) {
      return new Response(
        JSON.stringify({ error: authResult.error }),
        { status: authResult.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const url = new URL(req.url);
    const action = url.searchParams.get("action");
    const body = req.method !== "GET" ? await req.json() : null;

    if (action === "list-modules") {
      const { data: modules, error: modulesError } = await supabase
        .from("member_course_modules")
        .select("*")
        .order('order_index', { ascending: true });

      if (modulesError) {
        console.error("List modules error:", modulesError);
        return new Response(
          JSON.stringify({ error: modulesError.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const formatted = await Promise.all((modules || []).map(async (course: any) => {
        const { count } = await supabase
          .from("member_course_lessons")
          .select("*", { count: "exact", head: true })
          .eq("module_id", course.id);

        return {
          ...course,
          lesson_count: count || 0,
        };
      }));

      return new Response(
        JSON.stringify({ data: formatted }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "create-module") {
      const moduleData = {
        module_number: body.module_number,
        title: body.title,
        description: body.description,
        difficulty: body.difficulty || 'Einsteiger',
        estimated_duration_minutes: body.estimated_duration_minutes || 60,
        xp_reward: body.xp_reward || 500,
        is_locked: body.is_locked || false,
        order_index: body.order_index || body.module_number || 0,
        is_published: body.is_published || false,
        thumbnail_url: body.thumbnail_url || null,
        audio_url: body.audio_url || null,
        module_quiz_id: body.module_quiz_id || null,
        bonus_page_enabled: body.bonus_page_enabled || false,
        qr_code_data: body.qr_code_data || null,
        course_id: body.course_id || null,
      };

      const { data, error } = await supabase
        .from("member_course_modules")
        .insert([moduleData])
        .select()
        .single();

      if (error) {
        console.error("Insert error:", error);
        return new Response(
          JSON.stringify({ error: error.message, details: error.details, hint: error.hint }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "update-module") {
      const { id, ...updateData } = body;
      const { data, error } = await supabase
        .from("member_course_modules")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "delete-module") {
      const { id } = body;
      const { error } = await supabase
        .from("member_course_modules")
        .delete()
        .eq("id", id);

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get-modules") {
      const { data, error } = await supabase
        .from("member_course_modules")
        .select("*")
        .order("module_number", { ascending: true });

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get-module") {
      const moduleId = url.searchParams.get("id");
      const { data, error } = await supabase
        .from("member_course_modules")
        .select("*")
        .eq("id", moduleId)
        .single();

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ module: data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get-lessons") {
      const moduleId = url.searchParams.get("moduleId");
      const { data, error } = await supabase
        .from("member_course_lessons")
        .select("id, lesson_number, title, order_index, is_published")
        .eq("module_id", moduleId)
        .order("order_index", { ascending: true });

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get-lesson") {
      const lessonId = url.searchParams.get("id");
      const { data: lesson, error: lessonError } = await supabase
        .from("member_course_lessons")
        .select("*")
        .eq("id", lessonId)
        .single();

      if (lessonError) {
        return new Response(
          JSON.stringify({ error: lessonError.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data: downloads } = await supabase
        .from("member_lesson_downloads")
        .select("*")
        .eq("lesson_id", lessonId)
        .order("order_index", { ascending: true });

      const { data: recommendations } = await supabase
        .from("lesson_recommendations")
        .select("recommendation_id")
        .eq("lesson_id", lessonId);

      const { data: quizData } = await supabase
        .from("member_quizzes")
        .select("id")
        .eq("lesson_id", lessonId)
        .maybeSingle();
      const quizId = quizData?.id || null;

      const { data: deckData } = await supabase
        .from("member_flashcard_decks")
        .select("id")
        .eq("lesson_id", lessonId)
        .maybeSingle();
      const flashcardDeckId = deckData?.id || null;

      return new Response(
        JSON.stringify({
          data: {
            lesson,
            downloads: downloads || [],
            recommendations: recommendations?.map((r: any) => r.recommendation_id) || [],
            quizId,
            flashcardDeckId,
          },
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "create-lesson") {
      const lessonData = {
        module_id: body.module_id,
        lesson_number: body.lesson_number,
        title: body.title,
        description: body.description,
        content: body.content || "",
        video_url: body.video_url || null,
        video_duration_seconds: body.video_duration_seconds || null,
        video_platform: body.video_platform || "youtube",
        audio_url: body.audio_url || null,
        audio_duration_seconds: body.audio_duration_seconds || null,
        xp_reward: body.xp_reward || 100,
        order_index: body.order_index || 0,
        is_published: body.is_published || false,
        has_quiz: body.has_quiz || false,
        has_flashcards: body.has_flashcards || false,
      };

      const { data, error } = await supabase
        .from("member_course_lessons")
        .insert([lessonData])
        .select()
        .single();

      if (error) {
        console.error("Create lesson error:", error);
        return new Response(
          JSON.stringify({ error: error.message, details: error.details, hint: error.hint }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "update-lesson") {
      const { id, ...updateData } = body;
      const { data, error } = await supabase
        .from("member_course_lessons")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Update lesson error:", error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "delete-lesson") {
      const { id } = body;

      await supabase.from("member_lesson_downloads").delete().eq("lesson_id", id);
      await supabase.from("lesson_recommendations").delete().eq("lesson_id", id);
      await supabase.from("member_quizzes").update({ lesson_id: null }).eq("lesson_id", id);
      await supabase.from("member_flashcard_decks").update({ lesson_id: null }).eq("lesson_id", id);

      const { error } = await supabase
        .from("member_course_lessons")
        .delete()
        .eq("id", id);

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "save-lesson-extras") {
      const { lessonId, downloads, recommendations, quizId, flashcardDeckId, hasQuiz, hasFlashcards } = body;

      await supabase.from("member_lesson_downloads").delete().eq("lesson_id", lessonId);
      if (downloads && downloads.length > 0) {
        const downloadsToInsert = downloads.map((d: any, index: number) => ({
          lesson_id: lessonId,
          title: d.title,
          file_url: d.file_url,
          file_type: d.file_type,
          order_index: index,
        }));
        const { error: downloadError } = await supabase
          .from("member_lesson_downloads")
          .insert(downloadsToInsert);
        if (downloadError) {
          console.error("Download insert error:", downloadError);
        }
      }

      await supabase.from("lesson_recommendations").delete().eq("lesson_id", lessonId);
      if (recommendations && recommendations.length > 0) {
        const recsToInsert = recommendations.map((recId: string, index: number) => ({
          lesson_id: lessonId,
          recommendation_id: recId,
          order_index: index,
        }));
        const { error: recError } = await supabase
          .from("lesson_recommendations")
          .insert(recsToInsert);
        if (recError) {
          console.error("Recommendation insert error:", recError);
        }
      }

      if (quizId) {
        await supabase.from("member_quizzes").update({ lesson_id: null }).neq("id", quizId).eq("lesson_id", lessonId);
        await supabase.from("member_quizzes").update({ lesson_id: lessonId }).eq("id", quizId);
        if (!hasQuiz) {
          await supabase.from("member_course_lessons").update({ has_quiz: true }).eq("id", lessonId);
        }
      } else if (!hasQuiz) {
        await supabase.from("member_quizzes").update({ lesson_id: null }).eq("lesson_id", lessonId);
      }

      if (flashcardDeckId) {
        await supabase.from("member_flashcard_decks").update({ lesson_id: null }).neq("id", flashcardDeckId).eq("lesson_id", lessonId);
        await supabase.from("member_flashcard_decks").update({ lesson_id: lessonId }).eq("id", flashcardDeckId);
        if (!hasFlashcards) {
          await supabase.from("member_course_lessons").update({ has_flashcards: true }).eq("id", lessonId);
        }
      } else if (!hasFlashcards) {
        await supabase.from("member_flashcard_decks").update({ lesson_id: null }).eq("lesson_id", lessonId);
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get-quizzes") {
      const { data, error } = await supabase
        .from("member_quizzes")
        .select("id, title, lesson_id")
        .order("title", { ascending: true });

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get-flashcard-decks") {
      const { data, error } = await supabase
        .from("member_flashcard_decks")
        .select("id, title, lesson_id")
        .order("title", { ascending: true });

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get-recommendations") {
      const { data, error } = await supabase
        .from("course_recommendations")
        .select("id, name, category, is_active")
        .eq("is_active", true)
        .order("name", { ascending: true });

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get-quiz") {
      const quizIdParam = url.searchParams.get("id");
      const { data: quizData, error: quizError } = await supabase
        .from("member_quizzes")
        .select("*")
        .eq("id", quizIdParam)
        .single();

      if (quizError) {
        return new Response(
          JSON.stringify({ error: quizError.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data: questionsData } = await supabase
        .from("member_quiz_questions")
        .select(`*, member_quiz_answers (*)`)
        .eq("quiz_id", quizIdParam)
        .order("order_index", { ascending: true });

      const formattedQuestions = (questionsData || []).map((q: any) => ({
        id: q.id,
        question_text: q.question_text,
        question_type: q.question_type,
        explanation: q.explanation,
        order_index: q.order_index,
        answers: (q.member_quiz_answers || [])
          .sort((a: any, b: any) => a.order_index - b.order_index)
          .map((a: any) => ({
            id: a.id,
            answer_text: a.answer_text,
            is_correct: a.is_correct,
            order_index: a.order_index,
          })),
      }));

      return new Response(
        JSON.stringify({ data: { quiz: quizData, questions: formattedQuestions } }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "create-quiz") {
      const { data, error } = await supabase
        .from("member_quizzes")
        .insert([body])
        .select()
        .single();

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "update-quiz") {
      const { id, ...updateData } = body;
      const { data, error } = await supabase
        .from("member_quizzes")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "delete-quiz") {
      const { id } = body;
      const { error } = await supabase.from("member_quizzes").delete().eq("id", id);

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "save-quiz-questions") {
      const { quizId, questions } = body;

      await supabase.from("member_quiz_questions").delete().eq("quiz_id", quizId);

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const { data: savedQuestion, error: questionError } = await supabase
          .from("member_quiz_questions")
          .insert([{
            quiz_id: quizId,
            question_text: question.question_text,
            question_type: question.question_type,
            explanation: question.explanation,
            order_index: i,
          }])
          .select()
          .single();

        if (questionError) {
          return new Response(
            JSON.stringify({ error: `Fehler bei Frage ${i + 1}: ${questionError.message}` }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        for (let j = 0; j < question.answers.length; j++) {
          const answer = question.answers[j];
          const { error: answerError } = await supabase
            .from("member_quiz_answers")
            .insert([{
              question_id: savedQuestion.id,
              answer_text: answer.answer_text,
              is_correct: answer.is_correct,
              order_index: j,
            }]);

          if (answerError) {
            return new Response(
              JSON.stringify({ error: `Fehler bei Antwort ${j + 1} in Frage ${i + 1}: ${answerError.message}` }),
              { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
        }
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get-flashcard-deck") {
      const deckIdParam = url.searchParams.get("id");
      const { data: deckData, error: deckError } = await supabase
        .from("member_flashcard_decks")
        .select("*")
        .eq("id", deckIdParam)
        .single();

      if (deckError) {
        return new Response(
          JSON.stringify({ error: deckError.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data: cardsData } = await supabase
        .from("member_flashcards")
        .select("*")
        .eq("deck_id", deckIdParam)
        .order("order_index", { ascending: true });

      return new Response(
        JSON.stringify({ data: { deck: deckData, cards: cardsData || [] } }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "create-flashcard-deck") {
      const { data, error } = await supabase
        .from("member_flashcard_decks")
        .insert([body])
        .select()
        .single();

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "update-flashcard-deck") {
      const { id, ...updateData } = body;
      const { data, error } = await supabase
        .from("member_flashcard_decks")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "delete-flashcard-deck") {
      const { id } = body;
      const { error } = await supabase.from("member_flashcard_decks").delete().eq("id", id);

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "save-flashcards") {
      const { deckId, cards } = body;

      await supabase.from("member_flashcards").delete().eq("deck_id", deckId);

      if (cards && cards.length > 0) {
        const cardsToInsert = cards.map((card: any, index: number) => ({
          deck_id: deckId,
          front_text: card.front_text,
          back_text: card.back_text,
          order_index: index,
        }));

        const { error } = await supabase.from("member_flashcards").insert(cardsToInsert);
        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get-bonus-content") {
      const moduleId = url.searchParams.get("moduleId");
      const { data, error } = await supabase
        .from("module_bonus_content")
        .select("*")
        .eq("module_id", moduleId)
        .order("order_index", { ascending: true });

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ bonusContents: data || [] }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "create-bonus-content") {
      const bonusData = {
        module_id: body.moduleId,
        title: body.title,
        content_type: body.content_type,
        content_url: body.content_url || null,
        content_text: body.content_text || null,
        description: body.description || null,
        order_index: body.order_index || 0,
        is_published: body.is_published !== undefined ? body.is_published : true,
      };

      const { data, error } = await supabase
        .from("module_bonus_content")
        .insert([bonusData])
        .select()
        .single();

      if (error) {
        console.error("Create bonus content error:", error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "update-bonus-content") {
      const { id, moduleId, ...updateData } = body;
      const { data, error } = await supabase
        .from("module_bonus_content")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Update bonus content error:", error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "delete-bonus-content") {
      const { id } = body;
      const { error } = await supabase
        .from("module_bonus_content")
        .delete()
        .eq("id", id);

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "update-qr-code-data") {
      const { moduleId, qrCodeData } = body;
      const { data, error } = await supabase
        .from("member_course_modules")
        .update({ qr_code_data: qrCodeData })
        .eq("id", moduleId)
        .select()
        .single();

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get-quizzes-detailed") {
      const { data: quizzes, error: quizzesError } = await supabase
        .from("member_quizzes")
        .select("id, title, description, lesson_id, passing_score, xp_reward, created_at")
        .order("created_at", { ascending: false });

      if (quizzesError) {
        return new Response(
          JSON.stringify({ error: quizzesError.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const detailed = await Promise.all((quizzes || []).map(async (q: any) => {
        const { count: questionCount } = await supabase
          .from("member_quiz_questions")
          .select("*", { count: "exact", head: true })
          .eq("quiz_id", q.id);

        let lessonTitle = null;
        let moduleName = null;
        let moduleId = null;
        if (q.lesson_id) {
          const { data: lessonData } = await supabase
            .from("member_course_lessons")
            .select("title, module_id")
            .eq("id", q.lesson_id)
            .maybeSingle();
          if (lessonData) {
            lessonTitle = lessonData.title;
            moduleId = lessonData.module_id;
            const { data: moduleData } = await supabase
              .from("member_course_modules")
              .select("title")
              .eq("id", lessonData.module_id)
              .maybeSingle();
            if (moduleData) moduleName = moduleData.title;
          }
        }

        return { ...q, question_count: questionCount || 0, lesson_title: lessonTitle, module_name: moduleName, module_id: moduleId };
      }));

      return new Response(
        JSON.stringify({ data: detailed }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get-flashcard-decks-detailed") {
      const { data: decks, error: decksError } = await supabase
        .from("member_flashcard_decks")
        .select("id, title, description, lesson_id, xp_reward, created_at")
        .order("created_at", { ascending: false });

      if (decksError) {
        return new Response(
          JSON.stringify({ error: decksError.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const detailed = await Promise.all((decks || []).map(async (d: any) => {
        const { count: cardCount } = await supabase
          .from("member_flashcards")
          .select("*", { count: "exact", head: true })
          .eq("deck_id", d.id);

        let lessonTitle = null;
        let moduleName = null;
        let moduleId = null;
        if (d.lesson_id) {
          const { data: lessonData } = await supabase
            .from("member_course_lessons")
            .select("title, module_id")
            .eq("id", d.lesson_id)
            .maybeSingle();
          if (lessonData) {
            lessonTitle = lessonData.title;
            moduleId = lessonData.module_id;
            const { data: moduleData } = await supabase
              .from("member_course_modules")
              .select("title")
              .eq("id", lessonData.module_id)
              .maybeSingle();
            if (moduleData) moduleName = moduleData.title;
          }
        }

        return { ...d, card_count: cardCount || 0, lesson_title: lessonTitle, module_name: moduleName, module_id: moduleId };
      }));

      return new Response(
        JSON.stringify({ data: detailed }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get-takeaways") {
      const { data, error: err } = await supabase
        .from("member_takeaways")
        .select("id, title, lesson_id")
        .order("title", { ascending: true });

      if (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      return new Response(JSON.stringify({ data }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "get-takeaways-detailed") {
      const { data: takeaways, error: tErr } = await supabase
        .from("member_takeaways")
        .select("id, title, description, lesson_id, xp_reward, created_at")
        .order("created_at", { ascending: false });

      if (tErr) {
        return new Response(JSON.stringify({ error: tErr.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const detailed = await Promise.all((takeaways || []).map(async (t: any) => {
        const { count: itemCount } = await supabase
          .from("member_takeaway_items")
          .select("*", { count: "exact", head: true })
          .eq("takeaway_id", t.id);

        let lessonTitle = null;
        let moduleName = null;
        let moduleId = null;
        if (t.lesson_id) {
          const { data: lessonData } = await supabase
            .from("member_course_lessons")
            .select("title, module_id")
            .eq("id", t.lesson_id)
            .maybeSingle();
          if (lessonData) {
            lessonTitle = lessonData.title;
            moduleId = lessonData.module_id;
            const { data: moduleData } = await supabase
              .from("member_course_modules")
              .select("title")
              .eq("id", lessonData.module_id)
              .maybeSingle();
            if (moduleData) moduleName = moduleData.title;
          }
        }

        return { ...t, item_count: itemCount || 0, lesson_title: lessonTitle, module_name: moduleName, module_id: moduleId };
      }));

      return new Response(JSON.stringify({ data: detailed }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "get-takeaway") {
      const takeawayId = url.searchParams.get("id");
      const { data: takeawayData, error: tErr } = await supabase
        .from("member_takeaways")
        .select("*")
        .eq("id", takeawayId)
        .single();

      if (tErr) {
        return new Response(JSON.stringify({ error: tErr.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const { data: itemsData } = await supabase
        .from("member_takeaway_items")
        .select("*")
        .eq("takeaway_id", takeawayId)
        .order("order_index", { ascending: true });

      return new Response(
        JSON.stringify({ data: { takeaway: takeawayData, items: itemsData || [] } }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "create-takeaway") {
      const { data, error: err } = await supabase
        .from("member_takeaways")
        .insert([{ lesson_id: body.lesson_id, title: body.title, description: body.description, xp_reward: body.xp_reward }])
        .select()
        .single();

      if (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (body.lesson_id) {
        await supabase.from("member_course_lessons").update({ has_takeaways: true }).eq("id", body.lesson_id);
      }

      return new Response(JSON.stringify({ data }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "update-takeaway") {
      const { id, ...updateData } = body;

      const { data: oldTakeaway } = await supabase.from("member_takeaways").select("lesson_id").eq("id", id).maybeSingle();

      const { data, error: err } = await supabase
        .from("member_takeaways")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (updateData.lesson_id) {
        await supabase.from("member_course_lessons").update({ has_takeaways: true }).eq("id", updateData.lesson_id);
      }
      if (oldTakeaway?.lesson_id && oldTakeaway.lesson_id !== updateData.lesson_id) {
        const { count } = await supabase.from("member_takeaways").select("*", { count: "exact", head: true }).eq("lesson_id", oldTakeaway.lesson_id);
        if (!count) {
          await supabase.from("member_course_lessons").update({ has_takeaways: false }).eq("id", oldTakeaway.lesson_id);
        }
      }

      return new Response(JSON.stringify({ data }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "delete-takeaway") {
      const { id } = body;

      const { data: takeawayToDelete } = await supabase.from("member_takeaways").select("lesson_id").eq("id", id).maybeSingle();

      const { error: err } = await supabase.from("member_takeaways").delete().eq("id", id);
      if (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (takeawayToDelete?.lesson_id) {
        const { count } = await supabase.from("member_takeaways").select("*", { count: "exact", head: true }).eq("lesson_id", takeawayToDelete.lesson_id);
        if (!count) {
          await supabase.from("member_course_lessons").update({ has_takeaways: false }).eq("id", takeawayToDelete.lesson_id);
        }
      }

      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "save-takeaway-items") {
      const { takeawayId, items } = body;
      await supabase.from("member_takeaway_items").delete().eq("takeaway_id", takeawayId);

      if (items && items.length > 0) {
        const itemsToInsert = items.map((item: any, index: number) => ({
          takeaway_id: takeawayId,
          content: item.content,
          icon: item.icon || '',
          order_index: index,
        }));
        const { error: err } = await supabase.from("member_takeaway_items").insert(itemsToInsert);
        if (err) {
          return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
      }
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "get-mini-tasks") {
      const { data, error: err } = await supabase
        .from("member_mini_tasks")
        .select("id, title, lesson_id")
        .order("title", { ascending: true });

      if (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      return new Response(JSON.stringify({ data }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "get-mini-tasks-detailed") {
      const { data: tasks, error: tErr } = await supabase
        .from("member_mini_tasks")
        .select("id, title, description, lesson_id, task_type, xp_reward, created_at")
        .order("created_at", { ascending: false });

      if (tErr) {
        return new Response(JSON.stringify({ error: tErr.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const detailed = await Promise.all((tasks || []).map(async (t: any) => {
        const { count: stepCount } = await supabase
          .from("member_mini_task_steps")
          .select("*", { count: "exact", head: true })
          .eq("mini_task_id", t.id);

        let lessonTitle = null;
        let moduleName = null;
        let moduleId = null;
        if (t.lesson_id) {
          const { data: lessonData } = await supabase
            .from("member_course_lessons")
            .select("title, module_id")
            .eq("id", t.lesson_id)
            .maybeSingle();
          if (lessonData) {
            lessonTitle = lessonData.title;
            moduleId = lessonData.module_id;
            const { data: moduleData } = await supabase
              .from("member_course_modules")
              .select("title")
              .eq("id", lessonData.module_id)
              .maybeSingle();
            if (moduleData) moduleName = moduleData.title;
          }
        }

        return { ...t, step_count: stepCount || 0, lesson_title: lessonTitle, module_name: moduleName, module_id: moduleId };
      }));

      return new Response(JSON.stringify({ data: detailed }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "get-mini-task") {
      const taskId = url.searchParams.get("id");
      const { data: taskData, error: tErr } = await supabase
        .from("member_mini_tasks")
        .select("*")
        .eq("id", taskId)
        .single();

      if (tErr) {
        return new Response(JSON.stringify({ error: tErr.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const { data: stepsData } = await supabase
        .from("member_mini_task_steps")
        .select("*")
        .eq("mini_task_id", taskId)
        .order("order_index", { ascending: true });

      return new Response(
        JSON.stringify({ data: { task: taskData, steps: stepsData || [] } }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "create-mini-task") {
      const { data, error: err } = await supabase
        .from("member_mini_tasks")
        .insert([{ lesson_id: body.lesson_id, title: body.title, description: body.description, task_type: body.task_type, xp_reward: body.xp_reward }])
        .select()
        .single();

      if (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (body.lesson_id) {
        await supabase.from("member_course_lessons").update({ has_mini_tasks: true }).eq("id", body.lesson_id);
      }

      return new Response(JSON.stringify({ data }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "update-mini-task") {
      const { id, ...updateData } = body;

      const { data: oldTask } = await supabase.from("member_mini_tasks").select("lesson_id").eq("id", id).maybeSingle();

      const { data, error: err } = await supabase
        .from("member_mini_tasks")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (updateData.lesson_id) {
        await supabase.from("member_course_lessons").update({ has_mini_tasks: true }).eq("id", updateData.lesson_id);
      }
      if (oldTask?.lesson_id && oldTask.lesson_id !== updateData.lesson_id) {
        const { count } = await supabase.from("member_mini_tasks").select("*", { count: "exact", head: true }).eq("lesson_id", oldTask.lesson_id);
        if (!count) {
          await supabase.from("member_course_lessons").update({ has_mini_tasks: false }).eq("id", oldTask.lesson_id);
        }
      }

      return new Response(JSON.stringify({ data }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "delete-mini-task") {
      const { id } = body;

      const { data: taskToDelete } = await supabase.from("member_mini_tasks").select("lesson_id").eq("id", id).maybeSingle();

      const { error: err } = await supabase.from("member_mini_tasks").delete().eq("id", id);
      if (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (taskToDelete?.lesson_id) {
        const { count } = await supabase.from("member_mini_tasks").select("*", { count: "exact", head: true }).eq("lesson_id", taskToDelete.lesson_id);
        if (!count) {
          await supabase.from("member_course_lessons").update({ has_mini_tasks: false }).eq("id", taskToDelete.lesson_id);
        }
      }

      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "save-mini-task-steps") {
      const { miniTaskId, steps } = body;
      await supabase.from("member_mini_task_steps").delete().eq("mini_task_id", miniTaskId);

      if (steps && steps.length > 0) {
        const stepsToInsert = steps.map((step: any, index: number) => ({
          mini_task_id: miniTaskId,
          instruction: step.instruction,
          hint: step.hint || '',
          order_index: index,
        }));
        const { error: err } = await supabase.from("member_mini_task_steps").insert(stepsToInsert);
        if (err) {
          return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
      }
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "update-lesson-assignment") {
      const { resourceType, resourceId, lessonId: assignLessonId } = body;
      const tableMap: Record<string, string> = {
        quiz: "member_quizzes",
        flashcard: "member_flashcard_decks",
        takeaway: "member_takeaways",
        minitask: "member_mini_tasks",
      };
      const table = tableMap[resourceType];
      if (!table) {
        return new Response(JSON.stringify({ error: "Invalid resource type" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const { error: err } = await supabase
        .from(table)
        .update({ lesson_id: assignLessonId || null })
        .eq("id", resourceId);

      if (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "get-gap-text") {
      const lessonId = url.searchParams.get("lessonId");
      const { data, error: err } = await supabase
        .from("member_lesson_gap_texts")
        .select("*")
        .eq("lesson_id", lessonId)
        .maybeSingle();

      if (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      return new Response(JSON.stringify({ data }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "save-gap-text") {
      const { lessonId, template, correct_answers, word_bank } = body;

      const { data: existing } = await supabase
        .from("member_lesson_gap_texts")
        .select("id")
        .eq("lesson_id", lessonId)
        .maybeSingle();

      if (existing) {
        const { error: err } = await supabase
          .from("member_lesson_gap_texts")
          .update({ template, correct_answers, word_bank, updated_at: new Date().toISOString() })
          .eq("lesson_id", lessonId);
        if (err) {
          return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
      } else {
        const { error: err } = await supabase
          .from("member_lesson_gap_texts")
          .insert({ lesson_id: lessonId, template, correct_answers, word_bank });
        if (err) {
          return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
      }
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "delete-gap-text") {
      const { lessonId } = body;
      const { error: err } = await supabase
        .from("member_lesson_gap_texts")
        .delete()
        .eq("lesson_id", lessonId);
      if (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "get-all-lessons") {
      const { data, error: err } = await supabase
        .from("member_course_lessons")
        .select("id, title, module_id, lesson_number")
        .order("lesson_number", { ascending: true });

      if (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const lessonsWithModule = await Promise.all((data || []).map(async (l: any) => {
        const { data: moduleData } = await supabase
          .from("member_course_modules")
          .select("title")
          .eq("id", l.module_id)
          .maybeSingle();
        return { ...l, module_title: moduleData?.title || '' };
      }));

      return new Response(JSON.stringify({ data: lessonsWithModule }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "get-all-gap-texts") {
      const { data, error: err } = await supabase
        .from("member_lesson_gap_texts")
        .select("id, lesson_id, template, correct_answers, word_bank, created_at, updated_at")
        .order("created_at", { ascending: false });

      if (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const gapTextsWithLesson = await Promise.all((data || []).map(async (gt: any) => {
        const { data: lessonData } = await supabase
          .from("member_course_lessons")
          .select("title, lesson_number, module_id")
          .eq("id", gt.lesson_id)
          .maybeSingle();

        let moduleTitle = '';
        let moduleId = '';
        if (lessonData?.module_id) {
          const { data: moduleData } = await supabase
            .from("member_course_modules")
            .select("title, id")
            .eq("id", lessonData.module_id)
            .maybeSingle();
          moduleTitle = moduleData?.title || '';
          moduleId = moduleData?.id || '';
        }

        return {
          ...gt,
          lesson_title: lessonData?.title || null,
          lesson_number: lessonData?.lesson_number || null,
          module_title: moduleTitle,
          module_id: moduleId,
        };
      }));

      return new Response(JSON.stringify({ data: gapTextsWithLesson }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
