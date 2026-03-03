import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { adminApiCall } from '../lib/adminApi';
import AdminNavigation from '../components/AdminNavigation';
import {
  Save,
  ArrowLeft,
  Loader2,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  ClipboardList,
} from 'lucide-react';

interface MiniTask {
  id: string;
  lesson_id: string | null;
  title: string;
  description: string;
  task_type: string;
  xp_reward: number;
}

interface TaskStep {
  id?: string;
  instruction: string;
  hint: string;
  order_index: number;
}

export default function AdminMiniTaskEdit() {
  const { taskId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isNew = taskId === 'new';
  const lessonIdFromParam = searchParams.get('lessonId');

  const [task, setTask] = useState<MiniTask>({
    id: '',
    lesson_id: lessonIdFromParam !== 'new' ? lessonIdFromParam : null,
    title: '',
    description: '',
    task_type: 'reflection',
    xp_reward: 75,
  });

  const [steps, setSteps] = useState<TaskStep[]>([]);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isNew && taskId) {
      loadTask();
    }
  }, [taskId]);

  const loadTask = async () => {
    try {
      const result = await adminApiCall(`get-mini-task&id=${taskId}`, 'GET');
      const { task: data, steps: stepsData } = result.data;
      setTask(data);
      setSteps(stepsData || []);
      setExpandedSteps((stepsData || []).map((_: any, i: number) => i));
    } catch (error: any) {
      console.error('Error loading mini-task:', error);
      alert(`Fehler beim Laden: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!task.title) {
      alert('Bitte gib einen Titel ein');
      return;
    }
    if (steps.length === 0) {
      alert('Bitte fuge mindestens einen Schritt hinzu');
      return;
    }
    for (let i = 0; i < steps.length; i++) {
      if (!steps[i].instruction.trim()) {
        alert(`Schritt ${i + 1}: Anweisung darf nicht leer sein`);
        return;
      }
    }

    setIsSaving(true);
    try {
      let savedId = taskId;
      const payload = {
        lesson_id: task.lesson_id,
        title: task.title,
        description: task.description,
        task_type: task.task_type,
        xp_reward: task.xp_reward,
      };

      if (isNew) {
        const result = await adminApiCall('create-mini-task', 'POST', payload);
        savedId = result.data.id;
      } else {
        await adminApiCall('update-mini-task', 'POST', { id: taskId, ...payload });
      }

      await adminApiCall('save-mini-task-steps', 'POST', { miniTaskId: savedId, steps });

      if (isNew) {
        navigate(`/admin/member-kurse/miniaufgabe/${savedId}`);
      } else {
        alert('Miniaufgabe erfolgreich gespeichert');
        loadTask();
      }
    } catch (error: any) {
      alert(`Fehler beim Speichern: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Diese Miniaufgabe wirklich loschen?')) return;
    try {
      await adminApiCall('delete-mini-task', 'POST', { id: taskId });
      navigate('/admin/member-miniaufgaben');
    } catch (error: any) {
      alert(`Fehler beim Loschen: ${error.message}`);
    }
  };

  const addStep = () => {
    setSteps([...steps, { instruction: '', hint: '', order_index: steps.length }]);
    setExpandedSteps([...expandedSteps, steps.length]);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
    setExpandedSteps(expandedSteps.filter(i => i !== index));
  };

  const updateStep = (index: number, field: string, value: string) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
  };

  const toggleStep = (index: number) => {
    if (expandedSteps.includes(index)) {
      setExpandedSteps(expandedSteps.filter(i => i !== index));
    } else {
      setExpandedSteps([...expandedSteps, index]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation />
        <div className="lg:pl-72 pt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Link
              to="/admin/member-miniaufgaben"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zuruck zur Miniaufgaben-Ubersicht</span>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <ClipboardList className="w-8 h-8 text-rose-500" />
                {isNew ? 'Neue Miniaufgabe erstellen' : 'Miniaufgabe bearbeiten'}
              </h1>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition disabled:opacity-50"
                >
                  {isSaving ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /><span>Speichern...</span></>
                  ) : (
                    <><Save className="w-5 h-5" /><span>Speichern</span></>
                  )}
                </button>
                {!isNew && (
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition"
                  >
                    <Trash2 className="w-5 h-5" /><span>Loschen</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Titel *</label>
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="z.B. Erstelle deinen ersten KI-Prompt"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Beschreibung</label>
                <textarea
                  value={task.description}
                  onChange={(e) => setTask({ ...task, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Was sollen die Teilnehmer tun?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aufgabentyp</label>
                <select
                  value={task.task_type}
                  onChange={(e) => setTask({ ...task, task_type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="reflection">Reflexion</option>
                  <option value="action">Aktion</option>
                  <option value="creative">Kreativ</option>
                  <option value="research">Recherche</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">XP Belohnung</label>
                <input
                  type="number"
                  value={task.xp_reward}
                  onChange={(e) => setTask({ ...task, xp_reward: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Schritte</h2>
              <button
                onClick={addStep}
                className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition"
              >
                <Plus className="w-5 h-5" /><span>Schritt hinzufugen</span>
              </button>
            </div>

            {steps.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Noch keine Schritte vorhanden</p>
            ) : (
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <div
                      className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
                      onClick={() => toggleStep(index)}
                    >
                      <h3 className="font-medium text-gray-900">
                        Schritt {index + 1}
                        {step.instruction && `: ${step.instruction.substring(0, 60)}...`}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); removeStep(index); }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        {expandedSteps.includes(index) ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                    </div>

                    {expandedSteps.includes(index) && (
                      <div className="p-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Anweisung *</label>
                          <textarea
                            value={step.instruction}
                            onChange={(e) => updateStep(index, 'instruction', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            placeholder="Was soll der Teilnehmer in diesem Schritt tun?"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Hinweis (optional)</label>
                          <textarea
                            value={step.hint}
                            onChange={(e) => updateStep(index, 'hint', e.target.value)}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            placeholder="Optionaler Tipp oder Hinweis..."
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
