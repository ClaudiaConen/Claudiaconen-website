import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Check, Sparkles } from 'lucide-react';

interface PremiumUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export default function PremiumUnlockModal({ isOpen, onClose, featureName }: PremiumUnlockModalProps) {
  const premiumFeatures = [
    'PDF-Export für alle Content-Posts',
    'Direkte Canva-Integration',
    'Kalender-Export (Google Calendar & ICS)',
    'Notion-Export für nahtloses Workflow-Management',
    'Buffer Auto-Posting für automatische Veröffentlichung',
    'Erweiterte Analytics und Insights',
    'Prioritäter Support',
    'Unbegrenzte Content-Pläne speichern'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-gradient-to-r from-[#1a2744] to-[#2a3f5f] text-white px-8 py-6 rounded-t-2xl z-10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#e8b84a] rounded-full flex items-center justify-center">
                      <Crown className="w-6 h-6 text-[#1a2744]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">Premium freischalten</h2>
                      {featureName && (
                        <p className="text-white/80 text-sm mt-1">
                          {featureName} ist ein Premium-Feature
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors p-1"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 bg-[#e8b84a]/10 border border-[#e8b84a]/20 rounded-full px-4 py-2 mb-4">
                    <Sparkles className="w-4 h-4 text-[#e8b84a]" />
                    <span className="text-sm font-medium text-[#1a2744]">
                      Upgrade auf Premium und hol dir alle Features
                    </span>
                  </div>

                  <p className="text-slate-600 font-light leading-relaxed">
                    Erweitere deinen Content-Planer mit professionellen Features und spare Zeit bei deinem Content-Marketing.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 mb-8">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-[#1a2744] mb-2">
                      29,90€
                      <span className="text-lg font-normal text-slate-600">/Monat</span>
                    </div>
                    <p className="text-sm text-slate-500">
                      oder 299€/Jahr (2 Monate gratis)
                    </p>
                  </div>

                  <div className="space-y-3">
                    {premiumFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#16a34a] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-slate-700 font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      window.location.href = '/contact?subject=Premium%20Upgrade';
                    }}
                    className="w-full bg-[#1a2744] hover:bg-[#e8b84a] text-white font-medium py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <Crown className="w-5 h-5" />
                    Jetzt Premium werden
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full bg-white hover:bg-slate-50 text-slate-600 font-light py-3 rounded-lg transition-colors border border-slate-200"
                  >
                    Vielleicht später
                  </button>
                </div>

                <p className="text-center text-xs text-slate-500 mt-6">
                  30 Tage Geld-zurück-Garantie • Jederzeit kündbar
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
