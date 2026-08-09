'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronRight, ChevronLeft, Calendar, AlertTriangle, CheckCircle, RotateCcw } from 'lucide-react';
import Link from 'next/link';

interface DiagnosticStep {
  id: string;
  question: string;
  context: string;
  options: {
    label: string;
    description: string;
    next: string | null; // null = terminal diagnosis
    diagnosis?: Diagnosis;
  }[];
}

interface Diagnosis {
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  likelyCause: string;
  action: string;
  diyPossible: boolean;
  partNumbers?: string[];
}

const SEVERITY_CONFIG = {
  low: { color: '#059669', bg: '#f0fdf4', border: '#bbf7d0', label: 'Low Urgency', icon: CheckCircle },
  medium: { color: '#d97706', bg: '#fffbeb', border: '#fde68a', label: 'Moderate', icon: AlertTriangle },
  high: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', label: 'High Priority', icon: AlertTriangle },
  critical: { color: '#991b1b', bg: '#fef2f2', border: '#fca5a5', label: 'Immediate Attention', icon: AlertTriangle },
};

const DIAGNOSTIC_STEPS: DiagnosticStep[] = [
  {
    id: 'start',
    question: 'What type of noise is your garage door making?',
    context: 'Select the description that best matches what you hear.',
    options: [
      {
        label: 'Grinding / Metal-on-Metal',
        description: 'A harsh scraping sound, like metal rubbing together',
        next: 'grinding-when',
      },
      {
        label: 'Squeaking / Squealing',
        description: 'High-pitched whining or squealing noise',
        next: 'squeak-when',
      },
      {
        label: 'Popping / Banging',
        description: 'Sudden loud pop or bang during operation',
        next: 'pop-when',
      },
      {
        label: 'Rattling / Vibrating',
        description: 'Loose, shaking, or buzzing sounds',
        next: 'rattle-source',
      },
      {
        label: 'Rumbling / Low Hum',
        description: 'Deep vibration throughout the door or structure',
        next: 'rumble-source',
      },
    ],
  },
  {
    id: 'grinding-when',
    question: 'When does the grinding occur?',
    context: 'The timing helps identify which component is causing it.',
    options: [
      {
        label: 'Throughout entire travel',
        description: 'Constant grinding from open to close',
        next: null,
        diagnosis: {
          title: 'Worn Rollers',
          severity: 'medium',
          description: 'Metal rollers grinding against the track indicates worn bearings or rollers that have lost their lubrication and are metal-on-metal.',
          likelyCause: 'Steel rollers past their service life (typically 5–7 years), or nylon rollers with seized bearings.',
          action: 'Replace all rollers. Upgrade to sealed nylon rollers for quieter, longer-lasting operation. This is a common maintenance item.',
          diyPossible: false,
          partNumbers: ['TNGD-RLR-1003'],
        },
      },
      {
        label: 'Only at the top or bottom',
        description: 'Grinding at the end of travel',
        next: null,
        diagnosis: {
          title: 'Track Misalignment or Binding',
          severity: 'medium',
          description: 'Grinding at travel endpoints typically indicates the track is misaligned at the radius section, or the door is binding where vertical meets horizontal track.',
          likelyCause: 'Track shifted from vibration, loose flag brackets, or damaged radius section.',
          action: 'Professional track realignment. Attempting to bend or adjust tracks without proper tools can make the problem worse.',
          diyPossible: false,
          partNumbers: ['TNGD-TRK-2003', 'TNGD-BRK-2004'],
        },
      },
      {
        label: 'Only when opening',
        description: 'Grinding in one direction only',
        next: null,
        diagnosis: {
          title: 'Cable Drum or Bearing Issue',
          severity: 'high',
          description: 'Directional grinding often indicates a dry or failing bearing plate, or a cable that has jumped the drum groove.',
          likelyCause: 'Worn center or end bearing plates, or a cable drum with damaged grooves.',
          action: 'Professional inspection required. Cable and bearing issues can rapidly escalate if the cable frays or snaps.',
          diyPossible: false,
          partNumbers: ['TNGD-SPR-4005', 'TNGD-SPR-4007', 'TNGD-SPR-4008'],
        },
      },
    ],
  },
  {
    id: 'squeak-when',
    question: 'Is the squeaking constant, or does it come and go?',
    context: 'Temperature and humidity affect lubrication behavior.',
    options: [
      {
        label: 'Constant every cycle',
        description: 'Squeaks reliably every time the door moves',
        next: null,
        diagnosis: {
          title: 'Dry Hinges and Rollers',
          severity: 'low',
          description: 'Consistent squeaking across cycles indicates dry metal-on-metal contact at hinge pins and roller stems.',
          likelyCause: 'Normal lubricant depletion. Hinges and roller stems need lubrication every 6 months.',
          action: 'Apply white lithium grease to all hinge pins and roller stems. Spray silicone on weatherseals. Avoid WD-40 — it is a degreaser, not a lubricant.',
          diyPossible: true,
          partNumbers: ['TNGD-HNG-1002', 'TNGD-RLR-1003'],
        },
      },
      {
        label: 'Worse in cold weather',
        description: 'More noticeable in winter or early morning',
        next: null,
        diagnosis: {
          title: 'Cold-Thickened Lubricant',
          severity: 'low',
          description: 'Lubricant thickens in cold temperatures, reducing its effectiveness. Springs also stiffen slightly, increasing friction.',
          likelyCause: 'Standard grease solidifying below 40°F. Springs and rollers operating at higher friction in cold conditions.',
          action: 'Apply a low-temperature white lithium grease rated for cold weather. Lubricate springs, bearings, hinges, and roller stems. Consider upgrading to nylon rollers which are less temperature-sensitive.',
          diyPossible: true,
        },
      },
      {
        label: 'New and getting worse',
        description: 'Started recently and is escalating',
        next: null,
        diagnosis: {
          title: 'Developing Mechanical Wear',
          severity: 'medium',
          description: 'A new, worsening squeak that does not respond to lubrication indicates a component that is wearing and will eventually fail.',
          likelyCause: 'Roller bearings beginning to seize, torsion spring nearing end of life, or a hinge hole wearing oval.',
          action: 'Professional inspection to identify the specific failing component before it causes collateral damage.',
          diyPossible: false,
        },
      },
    ],
  },
  {
    id: 'pop-when',
    question: 'Where does the pop or bang seem to come from?',
    context: 'Location is critical — some popping sounds indicate dangerous conditions.',
    options: [
      {
        label: 'Above the door (spring area)',
        description: 'Sound originates from the header / spring zone',
        next: null,
        diagnosis: {
          title: 'Spring Stress or Coil Shift',
          severity: 'critical',
          description: 'Popping from the spring area is serious — it may indicate a spring at or near failure, a coil that has shifted on the shaft, or a winding cone slipping.',
          likelyCause: 'Torsion spring fatigue, loose winding cone set screws, or a spring that has exceeded its rated cycle life.',
          action: 'Stop using the door immediately and call for professional inspection. A failing spring can snap with lethal force. Do not attempt any adjustment.',
          diyPossible: false,
          partNumbers: ['TNGD-SPR-4001', 'TNGD-SPR-4003'],
        },
      },
      {
        label: 'At the track curves',
        description: 'Popping at the radius/bend sections',
        next: null,
        diagnosis: {
          title: 'Roller Jumping or Track Bind',
          severity: 'medium',
          description: 'A pop at the track radius usually means a roller is momentarily binding or jumping as it transitions through the curve.',
          likelyCause: 'Worn rollers, a damaged radius section, or a roller stem that is slightly bent.',
          action: 'Inspect rollers for flat spots and the radius section for dents. Replace affected rollers and realign if necessary.',
          diyPossible: false,
          partNumbers: ['TNGD-RLR-1003', 'TNGD-TRK-2003'],
        },
      },
      {
        label: 'From the door panels',
        description: 'Sound comes from the door face itself',
        next: null,
        diagnosis: {
          title: 'Panel Stress or Loose Hardware',
          severity: 'low',
          description: 'Popping from panels is usually thermal expansion/contraction, or loose hinge bolts allowing panels to flex and snap back.',
          likelyCause: 'Temperature changes causing steel panels to expand/contract, or hinge mounting bolts that need tightening.',
          action: 'Tighten all hinge bolts and check for loose struts. If the sound occurs with temperature changes, it is normal panel behavior.',
          diyPossible: true,
          partNumbers: ['TNGD-HNG-1002', 'TNGD-STR-1007'],
        },
      },
    ],
  },
  {
    id: 'rattle-source',
    question: 'Can you identify the general area of the rattling?',
    context: 'Rattling is almost always loose hardware or a component vibrating against another.',
    options: [
      {
        label: 'Opener / ceiling area',
        description: 'Rattling from the motor unit or rail',
        next: null,
        diagnosis: {
          title: 'Loose Opener Hardware',
          severity: 'low',
          description: 'Opener vibration rattles mounting hardware over time. The motor unit, rail connections, and ceiling mounts all loosen gradually.',
          likelyCause: 'Vibration-loosened bolts on the motor mount, rail hangers, or header bracket.',
          action: 'Tighten all opener mounting bolts — motor bracket, ceiling mount, rail joints, and header bracket. Check for loose light covers or lens covers on the motor unit.',
          diyPossible: true,
          partNumbers: ['TNGD-OPN-3001', 'TNGD-OPN-3008'],
        },
      },
      {
        label: 'Track / wall area',
        description: 'Rattling from the tracks or wall brackets',
        next: null,
        diagnosis: {
          title: 'Loose Track Hardware',
          severity: 'medium',
          description: 'Track brackets vibrating against the wall or each other. Lag bolts can work loose in framing over years of operation.',
          likelyCause: 'Loosened lag bolts in the header bracket, flag bracket, or rear track hangers.',
          action: 'Re-tighten all track mounting hardware. If lag bolts are loose in the wood, they may need to be replaced with larger diameter fasteners or the holes filled and re-drilled.',
          diyPossible: false,
          partNumbers: ['TNGD-BRK-2004', 'TNGD-BRK-2005', 'TNGD-HNG-2006'],
        },
      },
      {
        label: 'The door itself',
        description: 'Panels or hardware on the door rattling',
        next: null,
        diagnosis: {
          title: 'Loose Panel Hardware',
          severity: 'low',
          description: 'Loose hinges, strut bolts, or decorative hardware on the door panels.',
          likelyCause: 'Vibration over time loosening hinge bolts, strut connections, or decorative window frames and handles.',
          action: 'Tighten all visible bolts on the door interior — hinges, struts, and bracket connections. Check decorative hardware on the exterior.',
          diyPossible: true,
          partNumbers: ['TNGD-HNG-1002', 'TNGD-STR-1007'],
        },
      },
    ],
  },
  {
    id: 'rumble-source',
    question: 'Does the rumbling change with door speed, or is it constant?',
    context: 'The relationship between speed and noise points to different root causes.',
    options: [
      {
        label: 'Gets louder as door moves faster',
        description: 'Noise scales with speed',
        next: null,
        diagnosis: {
          title: 'Steel Rollers on Steel Track',
          severity: 'medium',
          description: 'Steel rollers transmit vibration directly into the tracks and wall framing. The faster the door moves, the more vibration is generated.',
          likelyCause: 'Standard steel rollers — the most common source of rumbling in residential garage doors.',
          action: 'Upgrade to 13-ball nylon rollers. This single change typically reduces door noise by 50–75%. Nylon rollers last 2–3x longer than steel.',
          diyPossible: false,
          partNumbers: ['TNGD-RLR-1003'],
        },
      },
      {
        label: 'Constant vibration / hum',
        description: 'Steady rumble regardless of speed',
        next: null,
        diagnosis: {
          title: 'Opener Drive Vibration',
          severity: 'low',
          description: 'A chain-drive opener transmits motor vibration through the rail and into the ceiling structure. This is characteristic of chain-drive units.',
          likelyCause: 'Chain-drive opener (vs. belt-drive), or the motor unit directly mounted to ceiling drywall without solid framing.',
          action: 'Consider upgrading to a belt-drive opener for significantly quieter operation. In the interim, ensure the motor unit is mounted to solid framing, not just drywall.',
          diyPossible: false,
          partNumbers: ['TNGD-OPN-3001'],
        },
      },
    ],
  },
];

export default function NoiseDiagnostic() {
  const [currentStepId, setCurrentStepId] = useState('start');
  const [history, setHistory] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);

  const currentStep = DIAGNOSTIC_STEPS.find(s => s.id === currentStepId);

  const handleSelect = (option: DiagnosticStep['options'][0]) => {
    if (option.diagnosis) {
      setDiagnosis(option.diagnosis);
    } else if (option.next) {
      setHistory(prev => [...prev, currentStepId]);
      setCurrentStepId(option.next);
    }
  };

  const goBack = () => {
    if (diagnosis) {
      setDiagnosis(null);
      return;
    }
    const prev = history[history.length - 1];
    if (prev) {
      setHistory(h => h.slice(0, -1));
      setCurrentStepId(prev);
    }
  };

  const reset = () => {
    setCurrentStepId('start');
    setHistory([]);
    setDiagnosis(null);
  };

  const stepNumber = history.length + 1;

  return (
    <section id="noise-diagnostic" className="scroll-mt-24">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl md:text-4xl text-brand-blue mb-3">
          Noise Diagnostic Wizard
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Identify what your garage door is telling you. Answer a few questions about the sound,
          and we will pinpoint the likely cause and recommended action.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {diagnosis ? (
            <motion.div
              key="diagnosis"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Diagnosis result */}
              {(() => {
                const sev = SEVERITY_CONFIG[diagnosis.severity];
                const SevIcon = sev.icon;
                return (
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    {/* Severity header */}
                    <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: sev.bg, borderBottom: `2px solid ${sev.border}` }}>
                      <SevIcon className="w-6 h-6" style={{ color: sev.color }} />
                      <div>
                        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: sev.color }}>{sev.label}</span>
                        <h3 className="font-display text-xl text-gray-900">{diagnosis.title}</h3>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Description</h4>
                        <p className="text-sm text-gray-600">{diagnosis.description}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Likely Cause</h4>
                        <p className="text-sm text-gray-600">{diagnosis.likelyCause}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Recommended Action</h4>
                        <p className="text-sm text-gray-600">{diagnosis.action}</p>
                      </div>

                      {diagnosis.partNumbers && diagnosis.partNumbers.length > 0 && (
                        <div className="pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-400">Related TNGD Parts: </span>
                          <span className="text-xs font-mono text-gray-500">{diagnosis.partNumbers.join(', ')}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-2">
                        {diagnosis.diyPossible ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            <CheckCircle className="w-3 h-3" />
                            Homeowner-serviceable
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
                            <AlertTriangle className="w-3 h-3" />
                            Professional service recommended
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <Link
                        href="/book"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white text-sm font-display uppercase tracking-wider rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Calendar className="w-4 h-4" />
                        Schedule Diagnostic Visit
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                      <button
                        onClick={reset}
                        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Start Over
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          ) : currentStep ? (
            <motion.div
              key={currentStepId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              {/* Step header */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center">
                    <Volume2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Step {stepNumber}</span>
                </div>
                <h3 className="font-display text-xl text-gray-900">{currentStep.question}</h3>
                <p className="text-sm text-gray-500 mt-1">{currentStep.context}</p>
              </div>

              {/* Options */}
              <div className="p-4 space-y-2">
                {currentStep.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(option)}
                    className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-brand-blue/40 hover:bg-brand-blue/5 transition-all duration-150 group"
                  >
                    <span className="block text-sm font-medium text-gray-900 group-hover:text-brand-blue">{option.label}</span>
                    <span className="block text-xs text-gray-500 mt-0.5">{option.description}</span>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              {history.length > 0 && (
                <div className="px-6 py-3 border-t border-gray-100">
                  <button onClick={goBack} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
