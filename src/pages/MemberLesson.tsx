import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { supabase } from '../lib/supabase';
import { getEmbedUrl } from '../lib/videoUtils';
import MemberNavigation from '../components/MemberNavigation';
import LessonTakeaway from '../components/lesson/LessonTakeaway';
import LessonMiniTask from '../components/lesson/LessonMiniTask';
import GapTextExercise, { GapTextData } from '../components/GapTextExercise';
import {
  Play,
  Pause,
  CheckCircle2,
  Download,
  FileText,
  FileSpreadsheet,
  Archive,
  Headphones,
  Award,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Volume2,
  VolumeX,
  Maximize,
  Brain,
  CreditCard,
  File,
  Lock,
  Unlock,
} from 'lucide-react';

function getDirectDownloadUrl(url: string): string {
  const gdriveParts = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (gdriveParts) {
    return `https://drive.google.com/uc?export=download&id=${gdriveParts[1]}`;
  }
  return url;
}

function getFileIcon(fileType: string) {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return <FileText className="w-5 h-5" />;
    case 'xlsx':
    case 'xls':
    case 'csv':
      return <FileSpreadsheet className="w-5 h-5" />;
    case 'zip':
    case 'rar':
      return <Archive className="w-5 h-5" />;
    case 'mp3':
    case 'wav':
    case 'audio':
      return <Headphones className="w-5 h-5" />;
    case 'docx':
    case 'doc':
      return <FileText className="w-5 h-5" />;
    default:
      return <File className="w-5 h-5" />;
  }
}

function getFileTypeColor(fileType: string) {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return { bg: 'bg-red-100', text: 'text-red-600', badge: 'bg-red-50 text-red-700 border-red-200' };
    case 'docx':
    case 'doc':
      return { bg: 'bg-blue-100', text: 'text-blue-600', badge: 'bg-blue-50 text-blue-700 border-blue-200' };
    case 'xlsx':
    case 'xls':
    case 'csv':
      return { bg: 'bg-green-100', text: 'text-green-600', badge: 'bg-green-50 text-green-700 border-green-200' };
    case 'zip':
    case 'rar':
      return { bg: 'bg-amber-100', text: 'text-amber-600', badge: 'bg-amber-50 text-amber-700 border-amber-200' };
    case 'mp3':
    case 'wav':
    case 'audio':
      return { bg: 'bg-teal-100', text: 'text-teal-600', badge: 'bg-teal-50 text-teal-700 border-teal-200' };
    default:
      return { bg: 'bg-slate-100', text: 'text-slate-600', badge: 'bg-slate-50 text-slate-700 border-slate-200' };
  }
}

function formatAudioDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

interface Lesson {
  id: string;
  module_id: string;
  title: string;
  description: string;
  content: string;
  video_url: string | null;
  video_platform: string | null;
  video_duration_seconds: number | null;
  order_index: number;
  xp_reward: number;
  has_quiz: boolean;
  has_flashcards: boolean;
  has_takeaways: boolean;
  has_mini_tasks: boolean;
  audio_url: string | null;
  audio_duration_seconds: number | null;
}

interface LessonProgress {
  is_completed: boolean;
  completion_percentage: number;
  video_progress_seconds: number;
  notes: string;
}

interface TakeawayItem {
  id: string;
  content: string;
  icon: string | null;
  order_index: number;
}

interface Takeaway {
  id: string;
  title: string;
  description: string | null;
  xp_reward: number | null;
  items: TakeawayItem[];
}

interface MiniTaskStep {
  id: string;
  instruction: string;
  hint: string | null;
  order_index: number;
}

interface MiniTask {
  id: string;
  title: string;
  description: string | null;
  task_type: string;
  xp_reward: number | null;
  steps: MiniTaskStep[];
}

interface MiniTaskSubmission {
  response_text: string;
  xp_earned: number | null;
  submitted_at: string;
}

export default function MemberLesson() {
  const { lessonId } = useParams();
  const { student } = useStudentAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<LessonProgress>({
    is_completed: false,
    completion_percentage: 0,
    video_progress_seconds: 0,
    notes: '',
  });
  const [downloads, setDownloads] = useState<any[]>([]);
  const [nextLesson, setNextLesson] = useState<string | null>(null);
  const [quizId, setQuizId] = useState<string | null>(null);
  const [flashcardDeckId, setFlashcardDeckId] = useState<string | null>(null);
  const [takeaway, setTakeaway] = useState<Takeaway | null>(null);
  const [takeawayCompleted, setTakeawayCompleted] = useState(false);
  const [miniTask, setMiniTask] = useState<MiniTask | null>(null);
  const [miniTaskSubmission, setMiniTaskSubmission] = useState<MiniTaskSubmission | null>(null);
  const [gapText, setGapText] = useState<GapTextData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProgress, setIsSavingProgress] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [quizJustUnlocked, setQuizJustUnlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (lessonId) {
      loadLesson();
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [lessonId]);

  useEffect(() => {
    if (videoPlaying) {
      progressIntervalRef.current = window.setInterval(() => {
        saveVideoProgress();
      }, 10000);
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [videoPlaying]);

  const loadLesson = async () => {
    try {
      const { data: lessonData, error: lessonError } = await supabase
        .from('member_course_lessons')
        .select('*')
        .eq('id', lessonId)
        .single();

      if (lessonError) throw lessonError;

      setLesson(lessonData);

      const { data: progressData } = await supabase
        .from('member_student_lesson_progress')
        .select('*')
        .eq('student_id', student?.id)
        .eq('lesson_id', lessonId)
        .maybeSingle();

      if (progressData) {
        setProgress({
          is_completed: progressData.is_completed,
          completion_percentage: progressData.completion_percentage,
          video_progress_seconds: progressData.video_progress_seconds || 0,
          notes: progressData.notes || '',
        });

        if (videoRef.current && progressData.video_progress_seconds) {
          videoRef.current.currentTime = progressData.video_progress_seconds;
        }
      }

      const { data: downloadsData } = await supabase
        .from('member_lesson_downloads')
        .select('*')
        .eq('lesson_id', lessonId)
        .order('order_index', { ascending: true });

      if (downloadsData) {
        setDownloads(downloadsData);
      }

      if (lessonData.has_quiz) {
        const { data: quizData } = await supabase
          .from('member_quizzes')
          .select('id')
          .eq('lesson_id', lessonId)
          .maybeSingle();

        if (quizData) {
          setQuizId(quizData.id);
        }
      }

      if (lessonData.has_flashcards) {
        const { data: flashcardData } = await supabase
          .from('member_flashcard_decks')
          .select('id')
          .eq('lesson_id', lessonId)
          .maybeSingle();

        if (flashcardData) {
          setFlashcardDeckId(flashcardData.id);
        }
      }

      if (lessonData.has_takeaways) {
        const { data: takeawayData } = await supabase
          .from('member_takeaways')
          .select('id, title, description, xp_reward')
          .eq('lesson_id', lessonId)
          .maybeSingle();

        if (takeawayData) {
          const { data: itemsData } = await supabase
            .from('member_takeaway_items')
            .select('id, content, icon, order_index')
            .eq('takeaway_id', takeawayData.id)
            .order('order_index', { ascending: true });

          setTakeaway({ ...takeawayData, items: itemsData ?? [] });

          const { data: completionData } = await supabase
            .from('member_student_takeaway_completions')
            .select('id')
            .eq('student_id', student?.id)
            .eq('takeaway_id', takeawayData.id)
            .maybeSingle();

          setTakeawayCompleted(!!completionData);
        }
      }

      {
        const { data: miniTaskData } = await supabase
          .from('member_mini_tasks')
          .select('id, title, description, task_type, xp_reward')
          .eq('lesson_id', lessonId)
          .maybeSingle();

        if (miniTaskData) {
          const { data: stepsData } = await supabase
            .from('member_mini_task_steps')
            .select('id, instruction, hint, order_index')
            .eq('mini_task_id', miniTaskData.id)
            .order('order_index', { ascending: true });

          setMiniTask({ ...miniTaskData, steps: stepsData ?? [] });

          const { data: submissionData } = await supabase
            .from('member_student_mini_task_submissions')
            .select('response_text, xp_earned, submitted_at')
            .eq('student_id', student?.id)
            .eq('mini_task_id', miniTaskData.id)
            .maybeSingle();

          if (submissionData) {
            setMiniTaskSubmission(submissionData);
          }
        }
      }

      const { data: allLessons } = await supabase
        .from('member_course_lessons')
        .select('id, order_index')
        .eq('module_id', lessonData.module_id)
        .order('order_index', { ascending: true });

      if (allLessons) {
        const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
        if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
          setNextLesson(allLessons[currentIndex + 1].id);
        }
      }

      const { data: gapTextRow } = await supabase
        .from('member_lesson_gap_texts')
        .select('*')
        .eq('lesson_id', lessonId)
        .maybeSingle();

      if (gapTextRow) {
        setGapText(gapTextRow);
      }
    } catch (error) {
      console.error('Error loading lesson:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveVideoProgress = async () => {
    if (!videoRef.current || !lesson) return;

    const currentTime = Math.floor(videoRef.current.currentTime);
    const duration = videoRef.current.duration;
    const completionPercentage = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

    try {
      await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-lesson-progress`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            studentId: student?.id,
            lessonId: lesson.id,
            videoProgressSeconds: currentTime,
            completionPercentage: Math.round(completionPercentage),
          }),
        }
      );
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const markAsComplete = async () => {
    if (!lesson || progress.is_completed) return;

    setIsSavingProgress(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-lesson-progress`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            studentId: student?.id,
            lessonId: lesson.id,
            isCompleted: true,
            completionPercentage: 100,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setProgress({ ...progress, is_completed: true, completion_percentage: 100 });
        setShowCompletionModal(true);

        if (quizId) {
          setQuizJustUnlocked(true);
          setTimeout(() => setQuizJustUnlocked(false), 2000);
        }

        setTimeout(() => {
          setShowCompletionModal(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error marking as complete:', error);
    } finally {
      setIsSavingProgress(false);
    }
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoPlaying(!videoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoMuted;
      setVideoMuted(!videoMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <MemberNavigation />
        <div className="max-w-6xl mx-auto px-4 py-8 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <MemberNavigation />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Lektion nicht gefunden</h2>
            <Link
              to="/member/courses"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Zurück zu den Kursen
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <MemberNavigation />

      {showCompletionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Glückwunsch!</h3>
            <p className="text-slate-600 mb-4">
              Du hast diese Lektion erfolgreich abgeschlossen und {lesson.xp_reward} XP erhalten!
            </p>
            <div className="flex items-center justify-center space-x-2 text-amber-600">
              <Award className="w-5 h-5" />
              <span className="font-bold text-lg">+{lesson.xp_reward} XP</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/member/courses"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zu den Kursen</span>
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{lesson.title}</h1>
              <p className="text-slate-600">{lesson.description}</p>
            </div>

            {progress.is_completed && (
              <div className="flex items-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-lg">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Abgeschlossen</span>
              </div>
            )}
          </div>
        </div>

        {lesson.video_url && (
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl mb-6 relative group">
            {lesson.video_platform === 'vimeo' || lesson.video_platform === 'youtube' ? (
              <div className="aspect-video">
                <iframe
                  src={getEmbedUrl(lesson.video_url, lesson.video_platform) ?? undefined}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={lesson.title}
                />
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={lesson.video_url}
                  className="w-full aspect-video"
                  onPlay={() => setVideoPlaying(true)}
                  onPause={() => setVideoPlaying(false)}
                  onEnded={() => {
                    setVideoPlaying(false);
                    if (!progress.is_completed) {
                      markAsComplete();
                    }
                  }}
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={toggleVideo}
                      className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition"
                    >
                      {videoPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white" />
                      )}
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleMute}
                        className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
                      >
                        {videoMuted ? (
                          <VolumeX className="w-5 h-5 text-white" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-white" />
                        )}
                      </button>

                      <button
                        onClick={toggleFullscreen}
                        className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
                      >
                        <Maximize className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {(lesson.audio_url || downloads.length > 0) && (
          <div className="mb-6 bg-white rounded-2xl shadow-lg overflow-hidden">
            {lesson.audio_url && (
              <div className="p-6 border-b border-slate-100 last:border-b-0">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-teal-100 rounded-xl p-2.5">
                    <Headphones className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Audio</h3>
                    {lesson.audio_duration_seconds && (
                      <p className="text-sm text-slate-500">
                        Dauer: {formatAudioDuration(lesson.audio_duration_seconds)}
                      </p>
                    )}
                  </div>
                </div>
                <audio
                  controls
                  className="w-full rounded-lg"
                  preload="metadata"
                >
                  <source src={lesson.audio_url} />
                </audio>
              </div>
            )}

            {downloads.length > 0 && (
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-100 rounded-xl p-2.5">
                    <Download className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Materialien & Downloads</h3>
                    <p className="text-sm text-slate-500">
                      {downloads.length} {downloads.length === 1 ? 'Datei' : 'Dateien'} verfügbar
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {downloads.map((download) => {
                    const colors = getFileTypeColor(download.file_type);
                    return (
                      <a
                        key={download.id}
                        href={getDirectDownloadUrl(download.file_url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 bg-white"
                      >
                        <div className={`${colors.bg} rounded-xl p-3 flex-shrink-0 transition-transform group-hover:scale-105`}>
                          <span className={colors.text}>{getFileIcon(download.file_type)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 text-sm truncate group-hover:text-blue-700 transition-colors">
                            {download.title}
                          </p>
                          <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full border ${colors.badge}`}>
                            {download.file_type.toUpperCase()}
                          </span>
                        </div>
                        <Download className="w-5 h-5 text-slate-300 group-hover:text-blue-600 flex-shrink-0 transition-colors" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {gapText && (
          <div className="mt-6">
            <GapTextExercise gapText={gapText} nextLesson={nextLesson} />
          </div>
        )}

        {(takeaway || miniTask) && (
          <div className="mb-8">
            {takeaway && student && (
              <LessonTakeaway
                takeaway={takeaway}
                studentId={student.id}
                alreadyCompleted={takeawayCompleted}
                onCompleted={() => setTakeawayCompleted(true)}
              />
            )}
            {miniTask && student && (
              <LessonMiniTask
                miniTask={miniTask}
                studentId={student.id}
                existingSubmission={miniTaskSubmission}
                onSubmitted={() => {}}
              />
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Lektionsinhalt</h2>

            <div
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />

            {!progress.is_completed && (
              <div className="mt-8 pt-8 border-t border-slate-200">
                <button
                  onClick={markAsComplete}
                  disabled={isSavingProgress}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSavingProgress ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Speichere...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Als abgeschlossen markieren</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {progress.is_completed && nextLesson && (
              <div className="mt-8 pt-8 border-t border-slate-200">
                <Link
                  to={`/member/lesson/${nextLesson}`}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-xl transition flex items-center justify-center space-x-2 group"
                >
                  <span>Nächste Lektion</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-600" />
                <span>Belohnungen</span>
              </h3>

              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <p className="text-sm text-slate-600 mb-2">XP für diese Lektion</p>
                <p className="text-3xl font-bold text-amber-600">+{lesson.xp_reward} XP</p>
              </div>
            </div>

            {quizId && (
              <div
                className={`rounded-2xl shadow-lg p-6 relative overflow-hidden transition-all duration-700 ${
                  progress.is_completed
                    ? quizJustUnlocked
                      ? 'bg-white ring-2 ring-emerald-400 ring-offset-2'
                      : 'bg-white'
                    : 'bg-slate-50 border border-slate-200'
                }`}
              >
                {!progress.is_completed && (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-100/80 to-slate-200/60 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center p-6">
                    <div className="bg-slate-200 rounded-full p-4 mb-3 shadow-inner">
                      <Lock className="w-7 h-7 text-slate-400" />
                    </div>
                    <p className="text-sm font-semibold text-slate-500 text-center leading-snug">
                      Schliesse die Lektion ab,<br />um das Quiz freizuschalten
                    </p>
                  </div>
                )}

                {quizJustUnlocked && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="animate-ping absolute bg-emerald-400/20 rounded-full w-32 h-32" />
                    <div className="bg-emerald-100 rounded-full p-4 shadow-lg animate-bounce">
                      <Unlock className="w-8 h-8 text-emerald-600" />
                    </div>
                  </div>
                )}

                <h3 className={`font-bold mb-4 flex items-center space-x-2 transition-colors duration-500 ${
                  progress.is_completed ? 'text-slate-900' : 'text-slate-400'
                }`}>
                  <Brain className={`w-5 h-5 transition-colors duration-500 ${
                    progress.is_completed ? 'text-blue-600' : 'text-slate-300'
                  }`} />
                  <span>Quiz</span>
                </h3>

                <p className={`text-sm mb-4 transition-colors duration-500 ${
                  progress.is_completed ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  Teste dein Wissen zu dieser Lektion und verdiene zusätzliche XP!
                </p>

                {progress.is_completed ? (
                  <Link
                    to={`/member/quiz/${quizId}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Brain className="w-5 h-5" />
                    <span>Quiz starten</span>
                  </Link>
                ) : (
                  <div className="w-full bg-slate-200 text-slate-400 font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 cursor-not-allowed">
                    <Lock className="w-4 h-4" />
                    <span>Zuerst Lektion abschliessen</span>
                  </div>
                )}
              </div>
            )}

            {flashcardDeckId && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span>Flashcards</span>
                </h3>

                <p className="text-sm text-slate-600 mb-4">
                  Lerne mit Karteikarten und verbessere dein Langzeitgedächtnis!
                </p>

                <Link
                  to={`/member/flashcards/${flashcardDeckId}`}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Flashcards üben</span>
                </Link>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
