import { useEffect, useState } from 'react';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { supabase } from '../lib/supabase';
import MemberNavigation from '../components/MemberNavigation';
import { Video, Calendar, Clock, Users, CheckCircle2, Loader2 } from 'lucide-react';

interface LiveSession {
  id: string;
  title: string;
  description: string;
  session_date: string;
  duration_minutes: number;
  meeting_url: string | null;
  max_participants: number | null;
  registration_count: number;
  is_registered: boolean;
}

export default function MemberSessions() {
  const { student } = useStudentAuth();
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [registeringId, setRegisteringId] = useState<string | null>(null);

  useEffect(() => {
    loadSessions();
  }, [student]);

  const loadSessions = async () => {
    try {
      const { data: sessionsData } = await supabase
        .from('member_live_sessions')
        .select('*')
        .gte('session_date', new Date().toISOString())
        .order('session_date', { ascending: true });

      const { data: registrations } = await supabase
        .from('member_student_session_registrations')
        .select('session_id')
        .eq('student_id', student?.id);

      const registeredIds = new Set(registrations?.map((r) => r.session_id) || []);

      const formatted: LiveSession[] = (sessionsData || []).map((s) => ({
        ...s,
        registration_count: 0,
        is_registered: registeredIds.has(s.id),
      }));

      setSessions(formatted);
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (sessionId: string) => {
    setRegisteringId(sessionId);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/session-registration`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            action: 'register',
            studentId: student?.id,
            sessionId,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        await loadSessions();
      } else {
        alert(data.error || 'Anmeldung fehlgeschlagen');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Anmeldung fehlgeschlagen');
    } finally {
      setRegisteringId(null);
    }
  };

  const handleUnregister = async (sessionId: string) => {
    if (!confirm('Möchtest du dich wirklich abmelden?')) return;

    setRegisteringId(sessionId);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/session-registration`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            action: 'unregister',
            studentId: student?.id,
            sessionId,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        await loadSessions();
      } else {
        alert(data.error || 'Abmeldung fehlgeschlagen');
      }
    } catch (error) {
      console.error('Error unregistering:', error);
      alert('Abmeldung fehlgeschlagen');
    } finally {
      setRegisteringId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <MemberNavigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Live Sessions</h1>
          <p className="text-slate-600">
            Nimm an Live-Sessions teil und lerne direkt von Experten
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Video className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Keine anstehenden Sessions
            </h3>
            <p className="text-slate-600">
              Neue Live-Sessions werden in Kürze angekündigt.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {sessions.map((session) => {
              const sessionDate = new Date(session.session_date);
              const isFull = !!(session.max_participants && session.registration_count >= session.max_participants);

              return (
                <div
                  key={session.id}
                  className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition ${
                    session.is_registered ? 'border-2 border-green-200' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-purple-100 rounded-lg p-3">
                          <Video className="w-6 h-6 text-purple-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">{session.title}</h2>
                      </div>

                      <p className="text-slate-600 mb-4">{session.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {sessionDate.toLocaleDateString('de-DE', {
                              weekday: 'long',
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>
                            {sessionDate.toLocaleTimeString('de-DE', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}{' '}
                            Uhr ({session.duration_minutes} Min.)
                          </span>
                        </div>

                        {session.max_participants && (
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>
                              {session.registration_count} / {session.max_participants} Plätze
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="ml-4">
                      {session.is_registered ? (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-lg font-medium">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Angemeldet</span>
                          </div>

                          {session.meeting_url && (
                            <a
                              href={session.meeting_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center transition"
                            >
                              Zum Meeting
                            </a>
                          )}

                          <button
                            onClick={() => handleUnregister(session.id)}
                            disabled={registeringId === session.id}
                            className="w-full text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition text-sm disabled:opacity-50"
                          >
                            {registeringId === session.id ? (
                              <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                            ) : (
                              'Abmelden'
                            )}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRegister(session.id)}
                          disabled={registeringId === session.id || isFull}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {registeringId === session.id ? (
                            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                          ) : isFull ? (
                            'Ausgebucht'
                          ) : (
                            'Anmelden'
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
