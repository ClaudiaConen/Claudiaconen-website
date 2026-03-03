import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import ContentUploadModal from '../components/ContentUploadModal';
import { SavePlanModal } from '../components/SavePlanModal';
import { ProgressBar } from '../components/ProgressBar';
import { SuccessStats } from '../components/SuccessStats';
import { PersonalizedSummary } from '../components/PersonalizedSummary';
import PremiumUnlockModal from '../components/PremiumUnlockModal';
import { Calendar, Download, Sparkles, ChevronDown, ChevronUp, Upload, CheckCircle, Clock, Lightbulb, Rocket, ArrowRight, ArrowLeft, Check, FileText, Image, Video, Plus, Eye, Search, HelpCircle, Star, Crown, Copy, Save, Palette, FileDown, CalendarPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { copyToClipboard, openInCanva, downloadPDF, generateGoogleCalendarURL, downloadICS } from '../utils/contentExport';
import { checkPremiumStatus } from '../utils/premiumCheck';

interface FormData {
  userName: string;
  companyName: string;
  industry: string;
  targetAudience: string;
  goals: string;
  contentTypes: string[];
  channels: string[];
  email: string;
  roleType: string;
  selectedPlatforms: string[];
  businessType: string;
  businessDescription: string;
  mainGoal: string;
  postingFrequency: string;
  audienceState: string;
  contentGoal: string;
  coreHelp: string;
  beliefShift: string;
  uniqueApproach: string;
}

interface ContentPlanItem {
  id?: string;
  month: string;
  title: string;
  description: string;
  contentType: string;
  channel: string;
  targetAudience: string;
  status: string;
  priority: string;
  scheduledDate: string;
  actualStatus?: 'idea' | 'in_progress' | 'completed' | 'published';
  uploadCount?: number;
}

const CONTENT_TYPES = [
  'Blogartikel',
  'Social Media Post',
  'Video',
  'Podcast',
  'Newsletter',
  'Webinar',
  'E-Book',
  'Infografik',
  'Case Study'
];

const CHANNELS = [
  'LinkedIn',
  'Instagram',
  'Facebook',
  'YouTube',
  'Website',
  'E-Mail',
  'TikTok',
  'Twitter/X'
];

const MONTHS = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

export default function JahresContentplan() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    companyName: '',
    industry: '',
    targetAudience: '',
    goals: '',
    contentTypes: [],
    channels: [],
    email: '',
    roleType: '',
    selectedPlatforms: [],
    businessType: '',
    businessDescription: '',
    mainGoal: '',
    postingFrequency: '',
    audienceState: '',
    contentGoal: '',
    coreHelp: '',
    beliefShift: '',
    uniqueApproach: ''
  });

  const [generatedPlan, setGeneratedPlan] = useState<ContentPlanItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentPlanItem | null>(null);
  const [savedPlanIds] = useState<string[]>([]);
  const [savePlanModalOpen, setSavePlanModalOpen] = useState(false);

  const [selectedFormat, setSelectedFormat] = useState<'text' | 'karussell' | 'reel'>('text');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'twoWeeks' | 'month'>('week');
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [showProgressSuccess, setShowProgressSuccess] = useState(false);
  const [statsData, setStatsData] = useState({ postsCreated: 0, timesSaved: 0, points: 50 });

  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<{[key: string]: boolean}>({});
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [premiumFeatureName, setPremiumFeatureName] = useState<string>('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const loaded = urlParams.get('loaded');

    if (loaded === 'true') {
      const savedPlanData = localStorage.getItem('loadedPlan');
      if (savedPlanData) {
        const plan = JSON.parse(savedPlanData);
        setFormData({
          userName: plan.user_name || '',
          companyName: plan.business_type || '',
          industry: plan.business_type || '',
          targetAudience: '',
          goals: plan.main_goal || '',
          contentTypes: [],
          channels: plan.platforms || [],
          email: '',
          roleType: '',
          selectedPlatforms: plan.platforms || [],
          businessType: plan.business_type || '',
          businessDescription: '',
          mainGoal: plan.main_goal || '',
          postingFrequency: '',
          audienceState: '',
          contentGoal: plan.main_goal || '',
          coreHelp: '',
          beliefShift: '',
          uniqueApproach: ''
        });
        setGeneratedPlan(plan.content_posts || []);
        setStatsData({
          postsCreated: plan.total_posts || 0,
          timesSaved: Math.floor((plan.total_posts || 0) * 2),
          points: 50
        });
        setCurrentScreen(12);
        localStorage.removeItem('loadedPlan');
      }
    }
  }, []);

  useEffect(() => {
    const loadPremiumStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const isPremium = await checkPremiumStatus(user.id);
        setIsPremiumUser(isPremium);
      }
    };

    loadPremiumStatus();
  }, []);

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleContentType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(type)
        ? prev.contentTypes.filter(t => t !== type)
        : [...prev.contentTypes, type]
    }));
  };

  const toggleChannel = (channel: string) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }));
  };

  const togglePlatform = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      selectedPlatforms: prev.selectedPlatforms.includes(platform)
        ? prev.selectedPlatforms.filter(p => p !== platform)
        : [...prev.selectedPlatforms, platform]
    }));
  };

  const toggleMonth = (month: string) => {
    setExpandedMonths(prev => {
      const newSet = new Set(prev);
      if (newSet.has(month)) {
        newSet.delete(month);
      } else {
        newSet.add(month);
      }
      return newSet;
    });
  };

  const generateContentPlan = async () => {
    if (!formData.companyName || !formData.industry || !formData.targetAudience || !formData.goals) {
      alert('Bitte fülle alle Pflichtfelder aus.');
      return;
    }

    if (formData.contentTypes.length === 0 || formData.channels.length === 0) {
      alert('Bitte wähle mindestens einen Content-Typ und einen Kanal aus.');
      return;
    }

    setIsGenerating(true);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-content-plan`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          industry: formData.industry,
          targetAudience: formData.targetAudience,
          goals: formData.goals,
          contentTypes: formData.contentTypes,
          channels: formData.channels,
          roleType: formData.roleType,
          audienceState: formData.audienceState,
          contentGoal: formData.contentGoal,
          coreHelp: formData.coreHelp,
          beliefShift: formData.beliefShift,
          uniqueApproach: formData.uniqueApproach
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API-Anfrage fehlgeschlagen');
      }

      const result = await response.json();
      const parsedContent = result.data;

      const contentPlan: ContentPlanItem[] = parsedContent.map((item: any, index: number) => {
        const monthIndex = MONTHS.indexOf(item.month);
        const dayOfMonth = 1 + (index % 28);
        const year = new Date().getFullYear();

        return {
          month: item.month,
          title: item.title,
          description: item.description,
          contentType: item.contentType,
          channel: item.channel,
          targetAudience: formData.targetAudience,
          status: 'Idee',
          priority: item.priority || 'Mittel',
          scheduledDate: `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(dayOfMonth).padStart(2, '0')}`
        };
      });

      setGeneratedPlan(contentPlan);
      setCurrentScreen(12);

      const postsCount = contentPlan.length;
      const estimatedTime = Math.ceil(postsCount * 0.5);
      setStatsData({
        postsCreated: postsCount,
        timesSaved: estimatedTime,
        points: 50
      });

      if (formData.email) {
        await saveGamificationStats(formData.email, postsCount, estimatedTime);
      }
    } catch (error) {
      console.error('Error generating content plan:', error);
      alert('Fehler beim Generieren des Content Plans. Bitte versuche es erneut.');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveGamificationStats = async (email: string, postsCreated: number, timeSaved: number) => {
    try {
      const { error: statsError } = await supabase
        .from('content_plan_stats')
        .insert({
          email,
          posts_created: postsCreated,
          time_saved_hours: timeSaved,
          points_earned: 50
        });

      if (statsError) throw statsError;

      const { data: existingPoints } = await supabase
        .from('user_points')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (existingPoints) {
        await supabase
          .from('user_points')
          .update({
            total_points: existingPoints.total_points + 50,
            updated_at: new Date().toISOString()
          })
          .eq('email', email);
      } else {
        await supabase
          .from('user_points')
          .insert({
            email,
            total_points: 50
          });
      }

      const { data: existingAchievement } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('email', email)
        .eq('achievement_type', 'first_plan')
        .maybeSingle();

      if (!existingAchievement) {
        await supabase
          .from('user_achievements')
          .insert({
            email,
            achievement_type: 'first_plan'
          });
      }
    } catch (error) {
      console.error('Error saving gamification stats:', error);
    }
  };

  const groupByMonth = () => {
    const grouped: { [key: string]: ContentPlanItem[] } = {};
    generatedPlan.forEach(item => {
      if (!grouped[item.month]) {
        grouped[item.month] = [];
      }
      grouped[item.month].push(item);
    });
    return grouped;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Hoch':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Mittel':
        return 'bg-[#B8860B]/10 text-[#B8860B] border-[#B8860B]/20';
      case 'Niedrig':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'idea':
        return <Lightbulb className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'published':
        return <Rocket className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'idea':
        return 'Idee';
      case 'in_progress':
        return 'In Arbeit';
      case 'completed':
        return 'Fertig';
      case 'published':
        return 'Veröffentlicht';
      default:
        return 'Idee';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'idea':
        return 'bg-slate-50 text-slate-700 border-slate-200';
      case 'in_progress':
        return 'bg-[#B8860B]/10 text-[#B8860B] border-[#B8860B]/20';
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'published':
        return 'bg-[#1a2a4a]/10 text-[#1a2a4a] border-[#1a2a4a]/20';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const updateItemStatus = async (itemId: string, newStatus: 'idea' | 'in_progress' | 'completed' | 'published') => {
    try {
      const updateData: any = { actual_status: newStatus };

      if (newStatus === 'completed') {
        updateData.completed_at = new Date().toISOString();
      } else if (newStatus === 'published') {
        updateData.published_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('content_plans')
        .update(updateData)
        .eq('id', itemId);

      if (error) throw error;

      setGeneratedPlan(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, actualStatus: newStatus } : item
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Fehler beim Aktualisieren des Status.');
    }
  };

  const loadUploadCounts = async () => {
    if (savedPlanIds.length === 0) return;

    try {
      const { data, error } = await supabase
        .from('content_uploads')
        .select('content_plan_id')
        .in('content_plan_id', savedPlanIds);

      if (error) throw error;

      const counts: { [key: string]: number } = {};
      data?.forEach(item => {
        counts[item.content_plan_id] = (counts[item.content_plan_id] || 0) + 1;
      });

      setGeneratedPlan(prev =>
        prev.map(item => ({
          ...item,
          uploadCount: item.id ? counts[item.id] || 0 : 0
        }))
      );
    } catch (error) {
      console.error('Error loading upload counts:', error);
    }
  };

  const openUploadModal = (item: ContentPlanItem) => {
    if (!item.id) {
      alert('Bitte speichere den Plan zuerst in der Datenbank.');
      return;
    }
    setSelectedItem(item);
    setUploadModalOpen(true);
  };

  const handleUploadSuccess = () => {
    loadUploadCounts();
  };

  const handleCopyPost = async (post: ContentPlanItem) => {
    const text = `${post.title}\n\n${post.description}`;
    const success = await copyToClipboard(text);

    if (success && post.id) {
      setCopiedPostId(post.id);
      setTimeout(() => {
        setCopiedPostId(null);
      }, 2000);
    }
  };

  const handleCanvaOpen = (post: ContentPlanItem) => {
    if (!isPremiumUser) {
      setPremiumFeatureName('Canva-Integration');
      setPremiumModalOpen(true);
      return;
    }
    openInCanva(post);
  };

  const handlePDFDownload = async (post: ContentPlanItem) => {
    if (!isPremiumUser) {
      setPremiumFeatureName('PDF-Export');
      setPremiumModalOpen(true);
      return;
    }

    if (!post.id) return;

    setIsGeneratingPDF(prev => ({ ...prev, [post.id!]: true }));

    try {
      await downloadPDF(post);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('PDF konnte nicht erstellt werden. Bitte versuche es erneut.');
    } finally {
      setIsGeneratingPDF(prev => ({ ...prev, [post.id!]: false }));
    }
  };

  const handleGoogleCalendar = (post: ContentPlanItem) => {
    if (!isPremiumUser) {
      setPremiumFeatureName('Kalender-Export');
      setPremiumModalOpen(true);
      return;
    }
    const url = generateGoogleCalendarURL(post);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleICSDownload = (post: ContentPlanItem) => {
    if (!isPremiumUser) {
      setPremiumFeatureName('Kalender-Export');
      setPremiumModalOpen(true);
      return;
    }
    downloadICS(post);
  };

  const toggleModule = (module: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(module)) {
        newSet.delete(module);
      } else {
        newSet.add(module);
      }
      return newSet;
    });
  };

  const generateContentForPost = () => {
    const sampleContent = `🌟 ${formData.companyName} – Deine Wirkung beginnt hier

${formData.goals}

Für ${formData.targetAudience} entwickeln wir Strategien, die wirklich bewegen.

Was ist dein nächster Schritt zu mehr Wirkung?

#${formData.industry.replace(/\s+/g, '')} #Wirkung #ContentStrategy`;

    setGeneratedContent(sampleContent);
  };

  useEffect(() => {
    if (savedPlanIds.length > 0) {
      loadUploadCounts();
    }
  }, [savedPlanIds]);

  const goToScreen = (screen: number) => {
    if (screen >= 0 && screen <= 16) {
      setCurrentScreen(screen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextScreen = () => {
    if (currentScreen < 16) {
      setShowProgressSuccess(true);
      setTimeout(() => setShowProgressSuccess(false), 800);
      goToScreen(currentScreen + 1);
    }
  };

  const prevScreen = () => {
    if (currentScreen > 0) {
      goToScreen(currentScreen - 1);
    }
  };

  const canProceedFromScreen = (screen: number): boolean => {
    switch (screen) {
      case 0:
        return true;
      case 1:
        return true;
      case 2:
        return formData.roleType.length > 0;
      case 3:
        return formData.selectedPlatforms.length > 0 && formData.businessType.length > 0 && formData.mainGoal.length > 0 && formData.postingFrequency.length > 0;
      case 4:
        return formData.audienceState.length > 0;
      case 5:
        return formData.contentGoal.length > 0;
      case 6:
        return true;
      case 7:
        return formData.coreHelp.length > 0 && formData.beliefShift.length > 0 && formData.uniqueApproach.length > 0;
      case 8:
        return formData.targetAudience.length > 0 && formData.goals.length > 0;
      case 9:
        return formData.contentTypes.length > 0;
      case 10:
        return formData.channels.length > 0;
      case 11:
        return true;
      default:
        return true;
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return renderScreen0();
      case 1:
        return renderScreen1();
      case 2:
        return renderScreen2();
      case 3:
        return renderScreen3();
      case 4:
        return renderScreen4();
      case 5:
        return renderScreen5();
      case 6:
        return renderScreen6();
      case 7:
        return renderScreen7();
      case 8:
        return renderScreen8();
      case 9:
        return renderScreen9();
      case 10:
        return renderScreen10();
      case 11:
        return renderScreen11();
      case 12:
        return renderScreen12();
      case 13:
        return renderScreen13();
      case 14:
        return renderScreen14();
      case 15:
        return renderScreen15();
      case 16:
        return renderScreen16();
      default:
        return renderScreen0();
    }
  };

  const renderScreen0 = () => (
    <div className="relative min-h-[80vh] flex items-center justify-center py-20 px-4">
      {/* Hintergrund-Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#B8860B]/20 rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text-Seite */}
          <div className="text-center md:text-left space-y-6 px-12">
            {/* Goldene Linie oben */}
            <div className="flex justify-center md:justify-start mb-6">
              <div className="relative h-0.5 w-20 bg-[#B8860B]">
                <div className="absolute inset-0 bg-[#B8860B] blur-md"></div>
              </div>
            </div>

            {/* Titel */}
            <div className="mb-6">
              <h1 className="text-4xl font-semibold text-[#1a2744] mb-6">
                CONTENT PLAN GENERATOR
              </h1>
            </div>

            {/* Claim */}
            <p className="text-lg font-light text-[#1e3a5f] leading-relaxed mb-6">
              Klar denken. Menschlich wirken.
            </p>

            {/* Text */}
            <div className="space-y-6 max-w-xl mb-6">
              <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">
                Ein paar Fragen. Wie in einem guten Interview. Damit aus Inhalt Wirkung wird und aus Sichtbarkeit Vertrauen.
              </p>
            </div>

            {/* Button mit zusätzlichem Text */}
            <div className="pt-6 space-y-4">
              <motion.button
                onClick={nextScreen}
                className="relative overflow-hidden bg-[#1a2744] hover:bg-[#e8b84a] text-white font-semibold text-base py-3.5 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Content Plan erstellen</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </motion.button>

              <a
                href="/meine-plaene"
                className="block text-center md:text-left"
              >
                <motion.button
                  className="relative overflow-hidden bg-gradient-to-r from-[#e8b84a] to-[#d4a840] hover:from-[#d4a840] hover:to-[#B8860B] text-white font-semibold text-base py-3.5 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Anmeldung Memberbereich</span>
                </motion.button>
              </a>

              <p className="text-sm font-light text-slate-500 text-center md:text-left">
                12 Monate. Fertige Inhalte. Für dein Thema.
              </p>
            </div>
          </div>

          {/* Bild-Seite mit Vorschau-Box */}
          <motion.div
            className="relative space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Bild */}
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/mensch&ki.jpg"
                alt="Mensch und KI arbeiten zusammen"
                className="w-full h-auto object-cover"
              />
              {/* Subtiler Overlay für bessere Integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none"></div>
            </motion.div>

            {/* Vorschau-Teaser direkt unter dem Bild */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6">
                  Das erwartet dich
                </h2>
                <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">
                  Ein vollständiger Jahresplan – auf dich abgestimmt
                </p>
              </div>

              <motion.div
                className="bg-white rounded-2xl p-6 md:p-8 border-t-4 border-t-[#B8860B] shadow-xl relative overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 25px 50px -12px rgba(184, 134, 11, 0.25)" }}
                transition={{ duration: 0.3 }}
              >
                {/* Subtiler Gradient-Glow */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#B8860B]/5 to-transparent pointer-events-none"></div>

                {/* Header */}
                <div className="relative flex items-center justify-center gap-2 mb-6">
                  <Calendar className="w-6 h-6 text-[#B8860B]" />
                  <h4 className="text-lg font-semibold text-[#1a2744] tracking-wide">DEIN CONTENT PLAN</h4>
                </div>

                {/* Wochen-Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[1, 2, 3, 4].map((week) => (
                    <motion.div
                      key={week}
                      className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl p-4 border border-slate-200 text-center hover:border-[#B8860B]/30 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <p className="text-base font-semibold text-[#1a2744] mb-1">Woche {week}</p>
                      <p className="text-sm font-light text-[#1e3a5f]">3 Posts</p>
                    </motion.div>
                  ))}
                </div>

                {/* Feature-Liste */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#B8860B]/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#B8860B]" />
                    </div>
                    <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">Fertige Texte zum Kopieren</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#B8860B]/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#B8860B]" />
                    </div>
                    <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">Passend zu DEINEM Thema</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#B8860B]/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#B8860B]" />
                    </div>
                    <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">Board + Kalender Ansicht</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  const renderScreen1 = () => (
    <>
      <ProgressBar currentStep={1} showSuccess={showProgressSuccess} />
      <div className="relative min-h-[80vh] flex items-center justify-center mt-16">
        <div className="relative text-center space-y-6 py-20 px-12">
        {/* Goldene Linie oben (w-28) */}
        <div className="flex justify-center mb-6">
          <div className="relative h-0.5 w-28 bg-[#B8860B]">
            <div className="absolute inset-0 bg-[#B8860B] blur-md"></div>
          </div>
        </div>

        {/* Haupttext */}
        <div className="mb-6">
          <h1 className="text-4xl font-semibold text-[#1a2744] mb-6 max-w-xl mx-auto">
            Wer nicht wahrgenommen wird, kann keine Beziehung aufbauen.
          </h1>
        </div>

        {/* Kleine Trennlinie (w-12) */}
        <div className="flex justify-center py-6">
          <div className="h-px w-12 bg-slate-300"></div>
        </div>

        {/* Untertext (heller) */}
        <div className="max-w-xl mx-auto mb-6">
          <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">
            Sichtbarkeit ist kein Selbstzweck. Sie ist die Voraussetzung für Vertrauen.
          </p>
        </div>

        {/* Weiter-Button */}
        <div className="pt-6">
          <button
            onClick={nextScreen}
            className="bg-[#1a2744] hover:bg-[#e8b84a] text-white font-semibold text-base py-3.5 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Weiter
          </button>
        </div>
      </div>
    </div>
    </>
  );

  const renderScreen2 = () => {
    const roles = [
      {
        id: 'experte',
        title: 'Klarer Experte',
        description: 'Wissen teilen, Orientierung geben'
      },
      {
        id: 'vertrauensperson',
        title: 'Vertrauensperson',
        description: 'Nähe aufbauen, Sicherheit vermitteln'
      },
      {
        id: 'impulsgeber',
        title: 'Impulsgeber',
        description: 'Denkanstöße liefern, inspirieren'
      },
      {
        id: 'entscheidungsbegleiter',
        title: 'Entscheidungsbegleiter',
        description: 'Prozesse unterstützen, Klarheit schaffen'
      }
    ];

    return (
      <>
        <ProgressBar currentStep={2} showSuccess={showProgressSuccess} />
        <div className="max-w-7xl mx-auto py-8 px-12 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Seite */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg mb-6">
              <label className="block font-semibold text-[#1a2744] mb-3 text-lg">
                Wie dürfen wir dich nennen? <span className="font-light text-slate-500 text-base">(optional)</span>
              </label>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) => handleInputChange('userName', e.target.value)}
                placeholder="Dein Vorname"
                className="w-full bg-white border-2 border-[#e0e0e0] rounded-lg px-4 py-3.5 text-[#1e3a5f] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#e8b84a] transition-all duration-300"
                style={{ padding: '14px 16px' }}
              />
            </div>

            <div className="text-center lg:text-left mb-6">
              <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6">
                In welcher Rolle möchtest du mit deinem Content wirken?
              </h2>
            </div>

            <div className="space-y-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleInputChange('roleType', role.id)}
                  className={`w-full bg-white rounded-2xl p-6 border-2 transition-all duration-300 text-left relative group ${
                    formData.roleType === role.id
                      ? 'border-[#B8860B] shadow-xl shadow-amber-100/30'
                      : 'border-slate-200 hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Radio Button */}
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 mt-1 ${
                      formData.roleType === role.id
                        ? 'border-[#B8860B] bg-[#B8860B]'
                        : 'border-slate-300 group-hover:border-[#B8860B]/50'
                    }`}>
                      {formData.roleType === role.id && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#1a2744] mb-1">
                        {role.title}
                      </h3>
                      <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">
                        {role.description}
                      </p>
                    </div>

                    {/* Gold Balken rechts (nur wenn aktiv) */}
                    {formData.roleType === role.id && (
                      <div className="absolute top-0 right-0 w-1 h-full bg-[#B8860B] rounded-r-xl"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Hinweis unten */}
            <div className="text-center lg:text-left pt-6">
              <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">
                Das beeinflusst Tonalität und Wirkung.
              </p>
            </div>

            {/* Weiter-Button */}
            {formData.roleType && (
              <div className="flex justify-center lg:justify-start pt-6">
                <button
                  onClick={nextScreen}
                  className="bg-[#1a2744] hover:bg-[#e8b84a] text-white font-semibold text-base py-3.5 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 group"
                >
                  Weiter
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Bild-Seite */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/frau&ki.jpeg"
                alt="Frau und KI"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      </>
    );
  };

  const renderScreen3 = () => {
    const platforms = ['Instagram', 'LinkedIn', 'Facebook', 'TikTok', 'Pinterest', 'Newsletter'];
    const businessTypes = [
      'Coaching / Beratung',
      'Training / Workshops',
      'Gesundheit / Fitness',
      'Handwerk / Dienstleistung',
      'Kunst / Kreativ',
      'Tech / Digital',
      'Persönlicher Account',
      'Sonstiges'
    ];
    const goals = [
      'Mehr Reichweite & Sichtbarkeit',
      'Kunden gewinnen',
      'Expertenstatus aufbauen',
      'Community aufbauen',
      'Mitarbeiter / Bewerber finden'
    ];
    const frequencies = [
      { id: 'daily', label: 'Täglich (7x pro Woche)' },
      { id: 'regular', label: 'Regelmäßig (3-4x pro Woche)' },
      { id: 'weekly', label: 'Wöchentlich (1-2x pro Woche)' },
      { id: 'occasional', label: 'Gelegentlich (2-3x pro Monat)' }
    ];

    const canProceed = formData.selectedPlatforms.length > 0 && formData.businessType && formData.mainGoal && formData.postingFrequency;

    return (
      <>
        <ProgressBar currentStep={3} showSuccess={showProgressSuccess} />
        <div className="max-w-5xl mx-auto space-y-8 py-8 px-12 mt-16">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-[#1a2744] mb-4">
              Erzähl mir kurz von deinem Business
            </h1>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg space-y-8">

            <div>
              <h2 className="text-xl font-semibold text-[#1e3a5f] mb-4">
                Für welche Plattformen erstellst du Content?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => togglePlatform(platform)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      formData.selectedPlatforms.includes(platform)
                        ? 'border-[#B8860B] bg-[#B8860B]/5 shadow-md'
                        : 'border-slate-200 hover:border-[#B8860B]/30 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        formData.selectedPlatforms.includes(platform)
                          ? 'border-[#B8860B] bg-[#B8860B]'
                          : 'border-slate-300'
                      }`}>
                        {formData.selectedPlatforms.includes(platform) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="font-medium text-[#1a2744]">{platform}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#1e3a5f] mb-4">
                Was ist dein Thema oder Business?
              </h2>
              <select
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="w-full bg-white border-2 border-[#e0e0e0] rounded-lg px-4 py-3.5 text-[#1e3a5f] focus:outline-none focus:border-[#e8b84a] transition-all duration-300 mb-3"
              >
                <option value="">Bitte wählen</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <input
                type="text"
                value={formData.businessDescription}
                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                placeholder="Beschreibe es genauer (optional)"
                className="w-full bg-white border-2 border-[#e0e0e0] rounded-lg px-4 py-3.5 text-[#1e3a5f] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#e8b84a] transition-all duration-300"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#1e3a5f] mb-4">
                Was ist dein wichtigstes Ziel?
              </h2>
              <div className="space-y-3">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => handleInputChange('mainGoal', goal)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      formData.mainGoal === goal
                        ? 'border-[#B8860B] bg-[#B8860B]/5 shadow-md'
                        : 'border-slate-200 hover:border-[#B8860B]/30 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        formData.mainGoal === goal
                          ? 'border-[#B8860B] bg-[#B8860B]'
                          : 'border-slate-300'
                      }`}>
                        {formData.mainGoal === goal && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium text-[#1a2744]">{goal}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#1e3a5f] mb-4">
                Wie oft möchtest du posten?
              </h2>
              <div className="space-y-3">
                {frequencies.map((freq) => (
                  <button
                    key={freq.id}
                    onClick={() => handleInputChange('postingFrequency', freq.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      formData.postingFrequency === freq.id
                        ? 'border-[#B8860B] bg-[#B8860B]/5 shadow-md'
                        : 'border-slate-200 hover:border-[#B8860B]/30 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        formData.postingFrequency === freq.id
                          ? 'border-[#B8860B] bg-[#B8860B]'
                          : 'border-slate-300'
                      }`}>
                        {formData.postingFrequency === freq.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium text-[#1a2744]">{freq.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {canProceed && (
            <div className="flex justify-center gap-4 pt-6">
              <button
                onClick={prevScreen}
                className="bg-white border-2 border-slate-300 hover:border-[#B8860B] text-[#1a2744] font-semibold text-base py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Zurück
              </button>
              <button
                onClick={nextScreen}
                className="bg-[#1a2744] hover:bg-[#e8b84a] text-white font-semibold text-base py-3.5 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 group"
              >
                Weiter
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </>
    );
  };

  const renderScreen4 = () => {
    const states = [
      {
        id: 'orientierung',
        icon: '🧭',
        title: 'Orientierung',
        description: 'Sie suchen noch'
      },
      {
        id: 'vergleich',
        icon: '⚖️',
        title: 'Vergleich',
        description: 'Sie wägen ab'
      },
      {
        id: 'entscheidung',
        icon: '✅',
        title: 'Entscheidung',
        description: 'Sie sind bereit'
      }
    ];

    return (
      <>
        <ProgressBar currentStep={4} showSuccess={showProgressSuccess} />
        <div className="max-w-5xl mx-auto space-y-6 py-8 px-12 mt-16">
          <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6">
            In welchem Zustand sind die Menschen, die du erreichen willst?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {states.map((state) => (
            <button
              key={state.id}
              onClick={() => handleInputChange('audienceState', state.id)}
              className={`bg-white rounded-2xl p-8 border-2 transition-all duration-300 text-center relative group ${
                formData.audienceState === state.id
                  ? 'border-[#B8860B] shadow-xl shadow-amber-100/30'
                  : 'border-slate-200 hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {/* Icon groß */}
              <div className="text-5xl mb-4">
                {state.icon}
              </div>

              {/* Titel */}
              <h3 className="text-lg font-semibold text-[#1a2744] mb-2">
                {state.title}
              </h3>

              {/* Beschreibung */}
              <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">
                {state.description}
              </p>

              {/* Gold-Balken UNTEN (nur wenn aktiv) */}
              {formData.audienceState === state.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#B8860B] rounded-b-xl"></div>
              )}
            </button>
          ))}
        </div>

        {/* Weiter-Button */}
        {formData.audienceState && (
          <div className="flex justify-center pt-6">
            <button
              onClick={nextScreen}
              className="bg-[#1a2744] hover:bg-[#e8b84a] text-white font-semibold text-base py-3.5 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 group"
            >
              Weiter
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
      </>
    );
  };

  const renderScreen5 = () => {
    const goals = [
      { id: 'vertrauen', title: 'Vertrauen aufbauen' },
      { id: 'positionieren', title: 'Klar positionieren' },
      { id: 'kunden', title: 'Kunden gewinnen' }
    ];

    return (
      <>
        <ProgressBar currentStep={5} showSuccess={showProgressSuccess} />
        <div className="max-w-4xl mx-auto space-y-6 py-8 px-12 mt-16">
          <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6">
            Was ist dir mit deinem Content wichtiger?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => handleInputChange('contentGoal', goal.id)}
              className={`bg-white rounded-2xl p-8 border-2 transition-all duration-300 text-center relative group ${
                formData.contentGoal === goal.id
                  ? 'border-[#B8860B] shadow-xl shadow-amber-100/30'
                  : 'border-slate-200 hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              <h3 className="text-lg font-semibold text-[#1a2744]">
                {goal.title}
              </h3>

              {/* Progress-Bar unten (nur wenn aktiv) */}
              {formData.contentGoal === goal.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent rounded-b-xl"></div>
              )}
            </button>
          ))}
        </div>

        {/* Hinweis-Box */}
        <div className="text-center pt-6">
          <p className="text-lg italic font-light text-[#1e3a5f] leading-relaxed">
            Reichweite entsteht hier als Folge – nicht als Ziel.
          </p>
        </div>

        {/* Weiter-Button */}
        {formData.contentGoal && (
          <div className="flex justify-center pt-6">
            <button
              onClick={nextScreen}
              className="bg-[#1a2744] hover:bg-[#e8b84a] text-white font-semibold text-base py-3.5 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 group"
            >
              Weiter
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
      </>
    );
  };

  const renderScreen6 = () => (
    <>
      <ProgressBar currentStep={6} showSuccess={showProgressSuccess} />
      <div className="relative min-h-[80vh] flex items-center justify-center mt-16">
        {/* Hintergrund-Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 bg-[#B8860B]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-6 max-w-2xl mx-auto px-12">
        {/* Goldene Linie */}
        <div className="flex justify-center mb-6">
          <div className="w-64 h-1 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent rounded-full"></div>
        </div>

        {/* Text groß */}
        <h1 className="text-4xl font-semibold text-[#1a2744] mb-6">
          Gut.
        </h1>

        {/* Text normal */}
        <p className="text-lg font-light text-[#1e3a5f] leading-relaxed max-w-xl mx-auto mb-6">
          Wir haben genug, um zu starten.
        </p>

        {/* Großer Button */}
        <button
          onClick={() => goToScreen(6)}
          className="mt-6 relative overflow-hidden bg-[#1a2744] hover:bg-[#e8b84a] text-white font-semibold text-base py-3.5 px-10 rounded-xl transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
          <span className="relative z-10">Los geht's</span>
        </button>
      </div>
    </div>
    </>
  );

  const renderScreen7 = () => (
    <>
      <ProgressBar currentStep={7} showSuccess={showProgressSuccess} />
      <div className="max-w-4xl mx-auto space-y-6 px-12 mt-16">
        <div className="mb-8">
          <button
            onClick={prevScreen}
            className="flex items-center gap-2 text-slate-600 hover:text-[#B8860B] transition-colors font-light"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück
          </button>
        </div>
        <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6">
          Deine <span className="font-semibold text-[#B8860B]">Einzigartigkeit</span>
        </h2>
        <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">
          3 Fragen, die deinen Content unverwechselbar machen
        </p>
      </div>

      <div className="space-y-8">
        {/* FRAGE 1 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#B8860B]/10 flex items-center justify-center">
              <span className="text-[#B8860B] font-semibold text-lg">1</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#1a2744] mb-2">
                Wobei hilfst du Menschen – auch wenn sie es selbst noch nicht so benennen würden?
              </h3>
              <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">
                Denk an das echte Problem dahinter, nicht nur das offensichtliche
              </p>
            </div>
          </div>
          <textarea
            value={formData.coreHelp}
            onChange={(e) => handleInputChange('coreHelp', e.target.value)}
            placeholder="Stichpunkte oder Fließtext – beides ist gut."
            rows={5}
            className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 text-[#1e3a5f] text-lg placeholder:text-slate-300 focus:outline-none focus:border-[#B8860B] focus:shadow-xl focus:shadow-amber-100/30 transition-all duration-300 font-light resize-none leading-relaxed"
          />
          <p className="text-xs text-slate-400 mt-2 font-light">Kein Limit</p>
        </div>

        {/* FRAGE 2 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#B8860B]/10 flex items-center justify-center">
              <span className="text-[#B8860B] font-semibold text-lg">2</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#1a2744] mb-2">
                Was glauben die meisten Menschen in deinem Bereich – was du anders siehst?
              </h3>
              <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">
                Deine Gegenmeinung, deine überraschende Perspektive
              </p>
            </div>
          </div>
          <textarea
            value={formData.beliefShift}
            onChange={(e) => handleInputChange('beliefShift', e.target.value)}
            placeholder="Stichpunkte oder Fließtext – beides ist gut."
            rows={5}
            className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 text-[#1e3a5f] text-lg placeholder:text-slate-300 focus:outline-none focus:border-[#B8860B] focus:shadow-xl focus:shadow-amber-100/30 transition-all duration-300 font-light resize-none leading-relaxed"
          />
          <p className="text-xs text-slate-400 mt-2 font-light">Kein Limit</p>
        </div>

        {/* FRAGE 3 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#B8860B]/10 flex items-center justify-center">
              <span className="text-[#B8860B] font-semibold text-lg">3</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#1a2744] mb-2">
                Was machst du anders als andere in deinem Feld?
              </h3>
              <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">
                Dein Ansatz, deine Methode, dein besonderer Weg
              </p>
            </div>
          </div>
          <textarea
            value={formData.uniqueApproach}
            onChange={(e) => handleInputChange('uniqueApproach', e.target.value)}
            placeholder="Stichpunkte oder Fließtext – beides ist gut."
            rows={5}
            className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 text-[#1e3a5f] text-lg placeholder:text-slate-300 focus:outline-none focus:border-[#B8860B] focus:shadow-xl focus:shadow-amber-100/30 transition-all duration-300 font-light resize-none leading-relaxed"
          />
          <p className="text-xs text-slate-400 mt-2 font-light">Kein Limit</p>
        </div>
      </div>

      {/* Weiter-Button */}
      {formData.coreHelp && formData.beliefShift && formData.uniqueApproach && (
        <div className="flex justify-center pt-6">
          <button
            onClick={nextScreen}
            className="bg-[#1a2744] hover:bg-[#e8b84a] text-white font-semibold text-base py-3.5 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 group"
          >
            Weiter
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
    </>
  );

  const renderScreen8 = () => (
    <>
      <ProgressBar currentStep={8} showSuccess={showProgressSuccess} />
      <div className="max-w-3xl mx-auto space-y-6 px-12 mt-16">
        <div className="mb-8">
          <button
            onClick={prevScreen}
            className="flex items-center gap-2 text-slate-600 hover:text-[#B8860B] transition-colors font-light"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück
          </button>
        </div>
        <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6">
          Deine <span className="font-semibold text-[#B8860B]">Zielgruppe</span>
        </h2>
        <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">
          Für wen erstellst du Content?
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg">
        <div className="space-y-6">
          <div>
            <label className="block font-semibold text-[#1a2744] mb-3 text-lg">
              Zielgruppe
            </label>
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              placeholder="z.B. Führungskräfte, Unternehmer, Speaker, Coaches"
              className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 text-[#1e3a5f] text-lg placeholder:text-slate-300 focus:outline-none focus:border-[#B8860B] focus:shadow-xl focus:shadow-amber-100/30 transition-all duration-300 font-light leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#1a2744] mb-3 text-lg">
              Deine Ziele
            </label>
            <textarea
              value={formData.goals}
              onChange={(e) => handleInputChange('goals', e.target.value)}
              placeholder="z.B. Sichtbarkeit erhöhen, Community aufbauen, Vertrauen schaffen"
              rows={4}
              className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 text-[#1e3a5f] text-lg placeholder:text-slate-300 focus:outline-none focus:border-[#B8860B] focus:shadow-xl focus:shadow-amber-100/30 transition-all duration-300 font-light resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Weiter-Button */}
      {formData.targetAudience && formData.goals && (
        <div className="flex justify-center pt-6">
          <button
            onClick={nextScreen}
            className="bg-[#1a2744] hover:bg-[#e8b84a] text-white font-semibold text-base py-3.5 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 group"
          >
            Weiter
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
    </>
  );

  const renderScreen9 = () => (
    <div className="max-w-4xl mx-auto space-y-6 px-12">
      <div className="mb-8">
        <button
          onClick={prevScreen}
          className="flex items-center gap-2 text-slate-600 hover:text-[#B8860B] transition-colors font-light"
        >
          <ArrowLeft className="w-5 h-5" />
          Zurück
        </button>
      </div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6">
          Content-<span className="font-semibold text-[#B8860B]">Formate</span>
        </h2>
        <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">
          Welche Formate möchtest du nutzen?
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CONTENT_TYPES.map(type => (
            <button
              key={type}
              onClick={() => toggleContentType(type)}
              className={`px-6 py-5 rounded-2xl font-semibold text-base transition-all duration-300 relative ${
                formData.contentTypes.includes(type)
                  ? 'bg-[#1a2744] text-white border-2 border-[#1a2744] shadow-lg hover:shadow-xl scale-105'
                  : 'bg-white text-[#1a2744] border-2 border-slate-200 hover:border-[#B8860B]/40 hover:shadow-lg'
              }`}
            >
              {formData.contentTypes.includes(type) && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-[#B8860B] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              {type}
            </button>
          ))}
        </div>

        {formData.contentTypes.length > 0 && (
          <div className="mt-6 text-center text-lg font-light text-[#1e3a5f] leading-relaxed">
            {formData.contentTypes.length} Format{formData.contentTypes.length > 1 ? 'e' : ''} ausgewählt
          </div>
        )}
      </div>

      {/* Weiter-Button */}
      {formData.contentTypes.length > 0 && (
        <div className="flex justify-center pt-6">
          <button
            onClick={nextScreen}
            className="bg-[#1a2744] hover:bg-[#e8b84a] text-white font-semibold text-base py-3.5 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 group"
          >
            Weiter
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );

  const renderScreen10 = () => (
    <div className="max-w-4xl mx-auto space-y-6 px-12">
      <div className="mb-8">
        <button
          onClick={prevScreen}
          className="flex items-center gap-2 text-slate-600 hover:text-[#B8860B] transition-colors font-light"
        >
          <ArrowLeft className="w-5 h-5" />
          Zurück
        </button>
      </div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6">
          Deine <span className="font-semibold text-[#B8860B]">Kanäle</span>
        </h2>
        <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">
          Wo veröffentlichst du deinen Content?
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CHANNELS.map(channel => (
            <button
              key={channel}
              onClick={() => toggleChannel(channel)}
              className={`px-6 py-5 rounded-2xl font-semibold text-base transition-all duration-300 relative ${
                formData.channels.includes(channel)
                  ? 'bg-[#1a2744] text-white border-2 border-[#1a2744] shadow-lg hover:shadow-xl scale-105'
                  : 'bg-white text-[#1a2744] border-2 border-slate-200 hover:border-[#B8860B]/40 hover:shadow-lg'
              }`}
            >
              {formData.channels.includes(channel) && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-[#B8860B] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              {channel}
            </button>
          ))}
        </div>

        {formData.channels.length > 0 && (
          <div className="mt-6 text-center text-lg font-light text-[#1e3a5f] leading-relaxed">
            {formData.channels.length} Kanal{formData.channels.length > 1 ? 'äle' : ''} ausgewählt
          </div>
        )}
      </div>

      {/* Weiter-Button */}
      {formData.channels.length > 0 && (
        <div className="flex justify-center pt-6">
          <button
            onClick={nextScreen}
            className="bg-[#1a2744] hover:bg-[#e8b84a] text-white font-semibold text-base py-3.5 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 group"
          >
            Weiter
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );

  const renderScreen11 = () => (
    <div className="max-w-3xl mx-auto space-y-6 px-12">
      <div className="mb-8">
        <button
          onClick={prevScreen}
          className="flex items-center gap-2 text-slate-600 hover:text-[#B8860B] transition-colors font-light"
        >
          <ArrowLeft className="w-5 h-5" />
          Zurück
        </button>
      </div>
      <div className="text-center mb-6">
        <div className="inline-block px-5 py-2 bg-[#B8860B]/10 text-[#B8860B] rounded-full text-base font-semibold mb-6">
          Schritt 5 von 5
        </div>
        <h1 className="text-4xl font-semibold text-[#1a2744] mb-6">
          Fast <span className="font-semibold text-[#B8860B]">fertig</span>
        </h1>
        <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">
          Optional: Speichere deinen Plan für später
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg">
        <div className="space-y-6">
          <div>
            <label className="block font-semibold text-[#1a2744] mb-3 text-lg">
              E-Mail-Adresse <span className="font-light text-slate-500 text-base">(optional)</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="deine@email.de"
              className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 text-[#1e3a5f] text-lg placeholder:text-slate-300 focus:outline-none focus:border-[#B8860B] focus:shadow-xl focus:shadow-amber-100/30 transition-all duration-300 font-light leading-relaxed"
            />
            <p className="mt-2 text-lg font-light text-[#1e3a5f] leading-relaxed">
              Mit deiner E-Mail kannst du deinen Plan speichern und später weiterbearbeiten
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-lg font-semibold text-[#1a2744] mb-6">Deine Angaben:</h3>
            <div className="space-y-3 text-[#1e3a5f] font-light">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#B8860B]" />
                <span className="text-lg leading-relaxed"><span className="font-semibold">Unternehmen:</span> {formData.companyName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#B8860B]" />
                <span className="text-lg leading-relaxed"><span className="font-semibold">Branche:</span> {formData.industry}</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#B8860B]" />
                <span className="text-lg leading-relaxed"><span className="font-semibold">Zielgruppe:</span> {formData.targetAudience}</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#B8860B]" />
                <span className="text-lg leading-relaxed"><span className="font-semibold">Formate:</span> {formData.contentTypes.length}</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#B8860B]" />
                <span className="text-lg leading-relaxed"><span className="font-semibold">Kanäle:</span> {formData.channels.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={async () => {
          await generateContentPlan();
          goToScreen(11);
        }}
        className="w-full relative overflow-hidden bg-[#1a2744] hover:bg-[#e8b84a] text-white font-semibold text-base py-3.5 px-10 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
        <Sparkles className="w-6 h-6 relative z-10" />
        <span className="relative z-10">Content Plan generieren</span>
      </button>
    </div>
  );

  const renderScreen12 = () => (
    <div className="max-w-5xl mx-auto py-20 px-12">
      {isGenerating ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg text-center">
          <div className="inline-block p-8 bg-[#B8860B]/10 rounded-full mb-6">
            <div className="animate-spin w-16 h-16 border-4 border-[#B8860B] border-t-transparent rounded-full"></div>
          </div>

          <h1 className="text-4xl font-semibold text-[#1a2744] mb-6">
            Dein Plan wird <span className="font-semibold text-[#B8860B]">erstellt</span>
          </h1>

          <p className="text-lg font-light text-[#1e3a5f] leading-relaxed mb-6">
            Einen Moment Geduld, während wir deinen individuellen Jahres-Content Plan zusammenstellen...
          </p>
        </div>
      ) : (
        <>
          <SuccessStats
            postsCreated={statsData.postsCreated}
            timesSaved={statsData.timesSaved}
            points={statsData.points}
          />

          <PersonalizedSummary
            userName={formData.userName}
            industry={formData.industry}
            goal={formData.contentGoal || formData.goals}
            channels={formData.channels}
            frequency={`${statsData.postsCreated} Posts erstellt`}
          />

          <div className="mt-12 text-center">
            <button
              onClick={() => goToScreen(12)}
              className="relative overflow-hidden bg-[#1a2744] hover:bg-[#e8b84a] text-white font-semibold text-base py-3.5 px-10 rounded-xl transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              <span className="relative z-10">Plan ansehen</span>
              <ArrowRight className="w-6 h-6 relative z-10" />
            </button>
          </div>
        </>
      )}
    </div>
  );

  const renderScreen13 = () => {
    const topQuestions = [
      "Wie erstelle ich einen Jahres-Content Plan?",
      "Welche Content-Formate funktionieren am besten?",
      "Wie oft sollte ich Content posten?",
      "Was macht guten Social Media Content aus?"
    ];

    const storyTypes = [
      { id: 'hero', name: 'Hero Story', desc: 'Die Heldenreise deiner Marke' },
      { id: 'challenge', name: 'Challenge', desc: 'Herausforderung und Lösung' },
      { id: 'transformation', name: 'Transformation', desc: 'Vorher/Nachher Geschichte' },
      { id: 'lesson', name: 'Lektion', desc: 'Was ich gelernt habe' },
      { id: 'behind', name: 'Behind the Scenes', desc: 'Blick hinter die Kulissen' }
    ];

    const greeting = formData.userName
      ? `Hey ${formData.userName}, hier ist dein Content:`
      : 'Deine Content-Ideen zum Leben erwecken';

    return (
      <div className="max-w-7xl mx-auto px-12">
        <div className="text-center mb-6">
          <h1 className="text-[32px] font-semibold text-[#1a2744] mb-6">
            {formData.userName ? (
              <>
                <span className="text-[#e8b84a]">{formData.userName}</span>s Contentplan
              </>
            ) : (
              'Dein Contentplan'
            )}
          </h1>
          <p className="text-lg font-light text-[#1e3a5f] leading-relaxed">
            {greeting}
          </p>
          {formData.industry && (
            <p className="text-base text-[#e8b84a] font-medium mt-2">
              für {formData.industry}
            </p>
          )}
        </div>

        <div className="flex gap-6 items-start">
          {/* LINKE SPALTE */}
          <div className="flex-1 space-y-6">
            {/* Format-Auswahl */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50">
              <h3 className="text-lg font-normal text-slate-800 mb-4">Format wählen</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedFormat('text')}
                  className={`flex-1 py-3 px-4 rounded-xl font-light transition-all duration-300 flex items-center justify-center gap-2 ${
                    selectedFormat === 'text'
                      ? 'bg-[#1a2a4a] text-white border-2 border-[#1a2a4a] shadow-lg'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#B8860B]/40'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  Text-Post
                </button>
                <button
                  onClick={() => setSelectedFormat('karussell')}
                  className={`flex-1 py-3 px-4 rounded-xl font-light transition-all duration-300 flex items-center justify-center gap-2 ${
                    selectedFormat === 'karussell'
                      ? 'bg-[#1a2a4a] text-white border-2 border-[#1a2a4a] shadow-lg'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#B8860B]/40'
                  }`}
                >
                  <Image className="w-5 h-5" />
                  Karussell
                </button>
                <button
                  onClick={() => setSelectedFormat('reel')}
                  className={`flex-1 py-3 px-4 rounded-xl font-light transition-all duration-300 flex items-center justify-center gap-2 ${
                    selectedFormat === 'reel'
                      ? 'bg-[#1a2a4a] text-white border-2 border-[#1a2a4a] shadow-lg'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#B8860B]/40'
                  }`}
                >
                  <Video className="w-5 h-5" />
                  Reel
                </button>
              </div>
            </div>

            {/* Zeitraum-Auswahl */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50">
              <h3 className="text-lg font-normal text-slate-800 mb-4">Zeitraum</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedTimeframe('week')}
                  className={`flex-1 py-3 px-4 rounded-xl font-light transition-all duration-300 ${
                    selectedTimeframe === 'week'
                      ? 'bg-[#1a2a4a] text-white border-2 border-[#1a2a4a] shadow-lg'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#B8860B]/40'
                  }`}
                >
                  Diese Woche
                </button>
                <button
                  onClick={() => setSelectedTimeframe('twoWeeks')}
                  className={`flex-1 py-3 px-4 rounded-xl font-light transition-all duration-300 ${
                    selectedTimeframe === 'twoWeeks'
                      ? 'bg-[#1a2a4a] text-white border-2 border-[#1a2a4a] shadow-lg'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#B8860B]/40'
                  }`}
                >
                  2 Wochen
                </button>
                <button
                  onClick={() => setSelectedTimeframe('month')}
                  className={`flex-1 py-3 px-4 rounded-xl font-light transition-all duration-300 ${
                    selectedTimeframe === 'month'
                      ? 'bg-[#1a2a4a] text-white border-2 border-[#1a2a4a] shadow-lg'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#B8860B]/40'
                  }`}
                >
                  1 Monat
                </button>
              </div>
            </div>

            {/* Content generieren */}
            <div className="bg-gradient-to-br from-[#B8860B]/5 to-[#B8860B]/10 rounded-2xl p-6 border border-[#B8860B]/20">
              <h3 className="text-lg font-normal text-slate-800 mb-2">
                Soll ich den Content für dich erstellen?
              </h3>
              <p className="text-sm font-light text-slate-600 mb-4">
                Basierend auf deinen Angaben generiere ich einen fertigen Post
              </p>
              <button
                onClick={generateContentForPost}
                className="w-full relative overflow-hidden bg-[#1a2a4a] hover:bg-[#1a2a4a]/90 text-white font-light py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-slate-300/30 hover:shadow-xl hover:shadow-slate-300/40 hover:-translate-y-0.5 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B8860B]/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                <Sparkles className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Ja, Content generieren</span>
              </button>
            </div>

            {/* Content-Karte */}
            {generatedContent && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden">
                <div className="flex">
                  <div className="w-1.5 bg-gradient-to-b from-[#B8860B] to-[#B8860B]/60"></div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-xl font-normal text-slate-800">Dein generierter Post</h4>
                      <button
                        onClick={() => navigator.clipboard.writeText(generatedContent)}
                        className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
                        title="Kopieren"
                      >
                        <Copy className="w-5 h-5 text-slate-600" />
                      </button>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 font-light text-slate-700 whitespace-pre-wrap">
                      {generatedContent}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mini-Story ergänzen */}
            {generatedContent && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50">
                <button
                  onClick={() => toggleModule('story')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-all duration-200 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <Plus className="w-5 h-5 text-[#B8860B]" />
                    <span className="font-normal text-slate-800">Mini-Story ergänzen</span>
                  </div>
                  {expandedModules.has('story') ? (
                    <ChevronUp className="w-5 h-5 text-slate-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600" />
                  )}
                </button>

                {expandedModules.has('story') && (
                  <div className="px-6 pb-6 space-y-3">
                    {storyTypes.map(story => (
                      <button
                        key={story.id}
                        className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all duration-200 border border-slate-100"
                      >
                        <div className="font-normal text-slate-800 mb-1">{story.name}</div>
                        <div className="text-sm font-light text-slate-600">{story.desc}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Wirkung ansehen */}
            {generatedContent && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50">
                <button
                  onClick={() => toggleModule('wirkung')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-all duration-200 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-[#B8860B]" />
                    <span className="font-normal text-slate-800">Wirkung ansehen</span>
                  </div>
                  {expandedModules.has('wirkung') ? (
                    <ChevronUp className="w-5 h-5 text-slate-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600" />
                  )}
                </button>

                {expandedModules.has('wirkung') && (
                  <div className="px-6 pb-6">
                    <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="font-light text-slate-700">Authentisch und persönlich</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="font-light text-slate-700">Klare Handlungsaufforderung</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="font-light text-slate-700">Könnte emotionaler sein</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SEO */}
            {generatedContent && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50">
                <button
                  onClick={() => toggleModule('seo')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-all duration-200 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-[#B8860B]" />
                    <span className="font-normal text-slate-800">SEO</span>
                    <div className="px-2 py-0.5 bg-gradient-to-r from-[#B8860B] to-amber-600 text-white text-xs font-normal rounded-full flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Premium
                    </div>
                  </div>
                  {expandedModules.has('seo') ? (
                    <ChevronUp className="w-5 h-5 text-slate-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600" />
                  )}
                </button>

                {expandedModules.has('seo') && (
                  <div className="px-6 pb-6">
                    <div className="bg-gradient-to-br from-[#B8860B]/5 to-amber-100/20 rounded-xl p-4 border border-[#B8860B]/20">
                      <p className="text-sm font-light text-slate-700 mb-3">
                        Upgrade auf Premium für:
                      </p>
                      <ul className="space-y-2 text-sm font-light text-slate-600">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#B8860B]" />
                          Keyword-Optimierung
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#B8860B]" />
                          Meta-Beschreibungen
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#B8860B]" />
                          Hashtag-Vorschläge
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Entscheidungshilfe */}
            {generatedContent && (
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-start gap-3 mb-3">
                  <Lightbulb className="w-5 h-5 text-[#B8860B] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-normal text-slate-800 mb-2">Entscheidungshilfe</h4>
                    <p className="text-sm font-light text-slate-600 mb-3">
                      Dieser Post eignet sich besonders für:
                    </p>
                    <ul className="space-y-2 text-sm font-light text-slate-600">
                      <li className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#B8860B]" />
                        LinkedIn & Instagram
                      </li>
                      <li className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#B8860B]" />
                        Beste Posting-Zeit: 10-11 Uhr
                      </li>
                      <li className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#B8860B]" />
                        Engagement-Potenzial: Hoch
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => setSavePlanModalOpen(true)}
                className="bg-[#e8b84a] hover:bg-[#d4a840] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Save className="w-5 h-5" />
                Plan speichern
              </button>
              <button
                onClick={() => goToScreen(13)}
                className="bg-[#1a2a4a] hover:bg-[#1a2a4a]/90 text-white font-light py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-slate-300/30 hover:shadow-xl hover:shadow-slate-300/40 hover:-translate-y-0.5"
              >
                Alle Details
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* RECHTE SPALTE */}
          <div className="w-72 space-y-6 flex-shrink-0">
            {/* Meistgesuchte Fragen */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-[#B8860B]" />
                <h4 className="font-normal text-slate-800">Meistgesuchte Fragen</h4>
              </div>
              <div className="space-y-3">
                {topQuestions.map((question, index) => (
                  <div
                    key={index}
                    className="text-sm font-light text-slate-600 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    {question}
                  </div>
                ))}
              </div>
              {generatedContent && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="font-light text-emerald-700">
                      Beantwortet Frage 1 und 2
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* So wirkt dieser Beitrag */}
            {generatedContent && (
              <div className="bg-gradient-to-br from-[#B8860B]/5 to-amber-100/20 rounded-2xl p-6 border border-[#B8860B]/20">
                <h4 className="font-normal text-slate-800 mb-3">So wirkt dieser Beitrag</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-light text-slate-700">Authentizität</span>
                      <span className="text-sm font-normal text-[#B8860B]">85%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#B8860B] rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-light text-slate-700">Engagement</span>
                      <span className="text-sm font-normal text-[#B8860B]">72%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#B8860B] rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-light text-slate-700">Klarheit</span>
                      <span className="text-sm font-normal text-[#B8860B]">90%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#B8860B] rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Upload-Bereich */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-normal text-slate-800">Medien hochladen</h4>
                <div className="px-2 py-0.5 bg-gradient-to-r from-[#B8860B] to-amber-600 text-white text-xs font-normal rounded-full flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Premium
                </div>
              </div>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-[#B8860B]/40 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-light text-slate-600 mb-1">
                  Bilder oder Videos hochladen
                </p>
                <p className="text-xs font-light text-slate-400">
                  Max. 10 MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderScreen14 = () => (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-[32px] font-semibold text-[#1a2744] mb-4">
          {formData.userName ? (
            <>
              <span className="text-[#e8b84a]">{formData.userName}</span>s Contentplan
            </>
          ) : (
            'Dein Contentplan'
          )}
        </h2>
        <p className="text-xl font-light text-slate-600">
          {formData.userName
            ? `Alle Ideen für ${formData.industry || 'dein Business'}`
            : 'Alle Ideen im Detail'}
        </p>
      </div>

      <div className="space-y-5">
        {MONTHS.map(month => {
          const monthItems = groupByMonth()[month] || [];
          if (monthItems.length === 0) return null;

          const isExpanded = expandedMonths.has(month);

          return (
            <div key={month} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300">
              <button
                onClick={() => toggleMonth(month)}
                className="w-full px-8 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-[#B8860B]" />
                  <h3 className="text-2xl font-light text-slate-800">{month}</h3>
                  <span className="text-sm font-normal text-[#B8860B] bg-[#B8860B]/10 px-4 py-1.5 rounded-full">
                    {monthItems.length} Ideen
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-6 h-6 text-slate-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-slate-600" />
                )}
              </button>

              {isExpanded && (
                <div className="px-8 pb-6 space-y-4 bg-gradient-to-b from-white to-slate-50/30">
                  {monthItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 hover:border-[#B8860B]/20 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h4 className="text-xl font-normal text-slate-800 flex-1">
                          {item.title}
                        </h4>
                        <div className="flex gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-normal border ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                          {item.id && (
                            <span className={`px-3 py-1 rounded-full text-xs font-normal border flex items-center gap-1 ${getStatusColor(item.actualStatus)}`}>
                              {getStatusIcon(item.actualStatus)}
                              {getStatusLabel(item.actualStatus)}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-slate-600 font-light mb-3 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="bg-[#e8b84a]/5 border border-[#e8b84a]/20 rounded-lg px-4 py-2 mb-4">
                        <p className="text-sm text-[#1e3a5f] font-light">
                          <span className="font-semibold">Dieser Post passt zu deinem Ziel:</span> {formData.contentGoal || formData.goals}
                          {' • '}
                          <span className="font-semibold">Optimiert für:</span> {item.channel}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1.5 bg-[#1a2a4a]/5 text-[#1a2a4a] rounded-lg text-sm font-normal border border-[#1a2a4a]/10">
                          {item.contentType}
                        </span>
                        <span className="px-3 py-1.5 bg-[#B8860B]/10 text-[#B8860B] rounded-lg text-sm font-normal border border-[#B8860B]/20">
                          {item.channel}
                        </span>
                        <span className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-sm font-light border border-slate-200">
                          {item.scheduledDate}
                        </span>
                      </div>
                      {item.id && (
                        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                          <div className="flex-1">
                            <select
                              value={item.actualStatus || 'idea'}
                              onChange={(e) => updateItemStatus(item.id!, e.target.value as any)}
                              className="bg-white text-slate-700 font-light text-sm px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#B8860B] focus:shadow-lg focus:shadow-amber-100/30 transition-all duration-300"
                            >
                              <option value="idea">Idee</option>
                              <option value="in_progress">In Arbeit</option>
                              <option value="completed">Fertig</option>
                              <option value="published">Veröffentlicht</option>
                            </select>
                          </div>
                          <button
                            onClick={() => openUploadModal(item)}
                            className="relative overflow-hidden bg-[#1a2a4a] hover:bg-[#1a2a4a]/90 text-white font-light text-sm px-5 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-slate-300/30 hover:shadow-xl hover:shadow-slate-300/40 hover:-translate-y-0.5 group"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B8860B]/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                            <Upload className="w-4 h-4 relative z-10" />
                            <span className="relative z-10">Upload</span>
                            {item.uploadCount !== undefined && item.uploadCount > 0 && (
                              <span className="relative z-10 bg-[#B8860B] text-white px-2 py-0.5 rounded-full text-xs font-normal">
                                {item.uploadCount}
                              </span>
                            )}
                          </button>
                        </div>
                      )}

                      {item.id && (
                        <>
                          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
                            <button
                              onClick={() => handleCopyPost(item)}
                              className={`h-12 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                                copiedPostId === item.id
                                  ? 'bg-[#16a34a] text-white'
                                  : 'bg-[#1a2744] text-white hover:bg-[#e8b84a]'
                              }`}
                            >
                              {copiedPostId === item.id ? (
                                <>
                                  <Check className="w-4 h-4" />
                                  <span>Kopiert!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4" />
                                  <span>Kopieren</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => handleCanvaOpen(item)}
                              disabled={!isPremiumUser}
                              className={`h-12 px-6 py-3 rounded-lg font-medium text-sm border-2 transition-all duration-300 flex items-center gap-2 ${
                                !isPremiumUser
                                  ? 'bg-[#94a3b8] border-[#94a3b8] text-white opacity-50 cursor-not-allowed'
                                  : 'bg-white border-[#1a2744] text-[#1a2744] hover:bg-[#f5f5f5]'
                              }`}
                            >
                              {!isPremiumUser ? (
                                <>
                                  <Crown className="w-4 h-4" />
                                  <span>Premium</span>
                                </>
                              ) : (
                                <>
                                  <Palette className="w-4 h-4" />
                                  <span>In Canva öffnen</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => handlePDFDownload(item)}
                              disabled={!isPremiumUser || isGeneratingPDF[item.id]}
                              className={`h-12 px-6 py-3 rounded-lg font-medium text-sm border-2 transition-all duration-300 flex items-center gap-2 ${
                                !isPremiumUser
                                  ? 'bg-[#94a3b8] border-[#94a3b8] text-white opacity-50 cursor-not-allowed'
                                  : isGeneratingPDF[item.id]
                                  ? 'bg-white border-[#1a2744] text-[#1a2744] opacity-70 cursor-wait'
                                  : 'bg-white border-[#1a2744] text-[#1a2744] hover:bg-[#f5f5f5]'
                              }`}
                            >
                              {!isPremiumUser ? (
                                <>
                                  <Crown className="w-4 h-4" />
                                  <span>Premium</span>
                                </>
                              ) : isGeneratingPDF[item.id] ? (
                                <>
                                  <FileDown className="w-4 h-4 animate-pulse" />
                                  <span>Wird erstellt...</span>
                                </>
                              ) : (
                                <>
                                  <FileDown className="w-4 h-4" />
                                  <span>Als PDF</span>
                                </>
                              )}
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
                            <button
                              onClick={() => handleGoogleCalendar(item)}
                              disabled={!isPremiumUser}
                              className={`h-12 px-6 py-3 rounded-lg font-medium text-sm border-2 transition-all duration-300 flex items-center gap-2 ${
                                !isPremiumUser
                                  ? 'bg-[#94a3b8] border-[#94a3b8] text-white opacity-50 cursor-not-allowed'
                                  : 'bg-white border-[#1a2744] text-[#1a2744] hover:bg-[#f5f5f5]'
                              }`}
                            >
                              {!isPremiumUser ? (
                                <>
                                  <Crown className="w-4 h-4" />
                                  <span>Premium</span>
                                </>
                              ) : (
                                <>
                                  <CalendarPlus className="w-4 h-4" />
                                  <span>Google Kalender</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => handleICSDownload(item)}
                              disabled={!isPremiumUser}
                              className={`h-12 px-6 py-3 rounded-lg font-medium text-sm border-2 transition-all duration-300 flex items-center gap-2 ${
                                !isPremiumUser
                                  ? 'bg-[#94a3b8] border-[#94a3b8] text-white opacity-50 cursor-not-allowed'
                                  : 'bg-white border-[#1a2744] text-[#1a2744] hover:bg-[#f5f5f5]'
                              }`}
                            >
                              {!isPremiumUser ? (
                                <>
                                  <Crown className="w-4 h-4" />
                                  <span>Premium</span>
                                </>
                              ) : (
                                <>
                                  <Download className="w-4 h-4" />
                                  <span>.ics Download</span>
                                </>
                              )}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-4 pt-8">
        <button
          onClick={() => goToScreen(12)}
          className="bg-white border border-slate-200 text-slate-700 font-light py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 hover:border-[#B8860B]/40 hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-5 h-5" />
          Zurück zur Übersicht
        </button>
        <button
          onClick={() => goToScreen(14)}
          className="bg-[#1a2a4a] hover:bg-[#1a2a4a]/90 text-white font-light py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-slate-300/30 hover:shadow-xl hover:shadow-slate-300/40 hover:-translate-y-0.5"
        >
          Speichern & Download
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderScreen15 = () => (
    <div className="max-w-2xl mx-auto space-y-10">
      <div className="text-center mb-12">
        <div className="w-80 h-1 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto mb-8"></div>
        <h2 className="text-3xl font-light text-slate-800 mb-3">
          Möchtest du das speichern und weiter verfeinern?
        </h2>
        <p className="text-lg font-light text-slate-600">
          Dein Content. Deine Erkenntnisse. Dein Raum.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-2xl shadow-slate-200/50">
        <div className="space-y-5">
          <button
            onClick={() => goToScreen(16)}
            className="w-full relative overflow-hidden bg-[#1a2a4a] hover:bg-[#1a2a4a]/90 text-white font-light text-lg py-5 px-8 rounded-2xl transition-all duration-300 shadow-2xl shadow-slate-300/40 hover:shadow-3xl hover:shadow-slate-300/50 hover:-translate-y-1 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B8860B]/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            <span className="relative z-10">Speichern & weiterarbeiten</span>
          </button>

          <div className="flex gap-4">
            <button
              onClick={() => {
                alert('E-Mail Anmeldung kommt bald');
              }}
              className="flex-1 bg-white border-2 border-slate-200 hover:border-[#B8860B]/40 text-slate-700 font-light py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-0.5"
            >
              <span className="text-lg">✉️</span>
              Mit E-Mail
            </button>
            <button
              onClick={() => {
                alert('Google Anmeldung kommt bald');
              }}
              className="flex-1 bg-white border-2 border-slate-200 hover:border-[#B8860B]/40 text-slate-700 font-light py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-0.5"
            >
              <span className="font-bold text-lg">G</span>
              Mit Google
            </button>
          </div>

          <p className="text-center text-sm font-light text-slate-500 pt-3">
            Kein Zwang. Kein Newsletter. Nur dein Raum.
          </p>
        </div>
      </div>
    </div>
  );

  const renderScreen16 = () => (
    <div className="relative min-h-[80vh] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/5 via-transparent to-[#B8860B]/10 animate-pulse" style={{ animationDuration: '4s' }}></div>

      <div className="relative max-w-2xl mx-auto text-center space-y-8 px-6">
        <div className="w-full h-1 bg-gradient-to-r from-[#B8860B] via-[#B8860B] to-[#B8860B] mb-12"></div>

        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 leading-relaxed">
            Deine größte Stärke in diesem Content
          </h2>
          <h2 className="text-4xl md:text-5xl font-normal text-[#B8860B] leading-relaxed">
            ist KLARHEIT.
          </h2>

          <div className="w-32 h-px bg-[#B8860B]/30 mx-auto my-8"></div>

          <p className="text-2xl font-light text-slate-600">
            Genau dort entsteht Vertrauen.
          </p>
        </div>

        <div className="pt-20">
          <p className="text-xs font-light text-slate-400">Ende</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title="Jahres-Content Plan Generator - KI-gestützter Content-Kalender"
        description="Erstelle deinen strategischen Jahres-Content Plan mit KI-Unterstützung. Perfekt für Marketing-Manager und Content-Creator."
      />
      <Navigation />

      <div className="relative min-h-screen bg-gradient-to-b from-white to-slate-50 pt-40 pb-16 px-4 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 -right-32 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-7xl mx-auto z-10">
          {currentScreen > 0 && currentScreen < 6 && (
            <div className="mb-8 flex items-center justify-between">
              <button
                onClick={prevScreen}
                className="flex items-center gap-2 text-slate-600 hover:text-[#B8860B] transition-colors font-light"
              >
                <ArrowLeft className="w-5 h-5" />
                Zurück
              </button>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(num => (
                  <div
                    key={num}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentScreen === num ? 'bg-[#B8860B] w-8' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>
              {currentScreen < 5 && (
                <button
                  onClick={nextScreen}
                  disabled={!canProceedFromScreen(currentScreen)}
                  className="flex items-center gap-2 text-slate-600 hover:text-[#B8860B] transition-colors font-light disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Weiter
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
              {currentScreen === 5 && <div className="w-20"></div>}
            </div>
          )}

          {renderScreen()}
        </div>
      </div>

      <Footer />

      {selectedItem && (
        <ContentUploadModal
          isOpen={uploadModalOpen}
          onClose={() => {
            setUploadModalOpen(false);
            setSelectedItem(null);
          }}
          contentPlanId={selectedItem.id!}
          userEmail={formData.email}
          contentTitle={selectedItem.title}
          onUploadSuccess={handleUploadSuccess}
        />
      )}

      <SavePlanModal
        isOpen={savePlanModalOpen}
        onClose={() => setSavePlanModalOpen(false)}
        planData={{
          userName: formData.userName,
          businessType: formData.industry || formData.companyName,
          mainGoal: formData.contentGoal || formData.goals,
          platforms: formData.channels,
          contentPosts: generatedPlan,
          totalPosts: statsData.postsCreated,
        }}
        onSaveSuccess={() => {
          alert('Plan erfolgreich gespeichert!');
        }}
      />

      <PremiumUnlockModal
        isOpen={premiumModalOpen}
        onClose={() => setPremiumModalOpen(false)}
        featureName={premiumFeatureName}
      />
    </>
  );
}
