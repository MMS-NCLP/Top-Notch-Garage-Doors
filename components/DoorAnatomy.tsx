'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Wrench, CheckCircle, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  getComponentsForView,
  URGENCY_LABELS,
  VIEW_LABELS,
  type DoorComponent,
  type UrgencyLevel,
  type DiagramView,
} from '@/lib/door-components';

const URGENCY_ICONS = {
  danger: AlertTriangle,
  wear: Wrench,
  serviceable: CheckCircle,
};

interface LabeledPoint {
  id: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  anchor: 'start' | 'end' | 'middle';
}

// --- TORSION SYSTEM DIAGRAM ---
const TORSION_POINTS: LabeledPoint[] = [
  // Spring system (top area)
  { id: 'torsion-spring', x: 380, y: 85, labelX: 500, labelY: 50, anchor: 'middle' },
  { id: 'torsion-shaft', x: 500, y: 100, labelX: 500, labelY: 30, anchor: 'middle' },
  { id: 'winding-cone', x: 200, y: 90, labelX: 100, labelY: 50, anchor: 'start' },
  { id: 'stationary-cone', x: 480, y: 90, labelX: 580, labelY: 50, anchor: 'start' },
  { id: 'cable-drum', x: 110, y: 95, labelX: 30, labelY: 70, anchor: 'start' },
  { id: 'end-bearing', x: 90, y: 100, labelX: 30, labelY: 115, anchor: 'start' },
  { id: 'center-bearing', x: 500, y: 105, labelX: 620, labelY: 95, anchor: 'start' },
  { id: 'lift-cable', x: 95, y: 300, labelX: 30, labelY: 300, anchor: 'start' },
  // Door hardware
  { id: 'panel-section', x: 500, y: 310, labelX: 750, labelY: 310, anchor: 'start' },
  { id: 'hinge-3', x: 300, y: 200, labelX: 750, labelY: 195, anchor: 'start' },
  { id: 'hinge-2', x: 300, y: 320, labelX: 750, labelY: 330, anchor: 'start' },
  { id: 'hinge-1', x: 300, y: 440, labelX: 750, labelY: 440, anchor: 'start' },
  { id: 'roller', x: 95, y: 250, labelX: 30, labelY: 250, anchor: 'start' },
  { id: 'top-bracket', x: 95, y: 145, labelX: 30, labelY: 160, anchor: 'start' },
  { id: 'glass-section', x: 400, y: 250, labelX: 750, labelY: 250, anchor: 'start' },
  { id: 'strut', x: 500, y: 175, labelX: 750, labelY: 170, anchor: 'start' },
  { id: 'bottom-bracket', x: 95, y: 510, labelX: 30, labelY: 510, anchor: 'start' },
  { id: 'bottom-seal', x: 400, y: 530, labelX: 750, labelY: 530, anchor: 'start' },
  { id: 'slide-lock', x: 700, y: 400, labelX: 750, labelY: 400, anchor: 'start' },
  // Track
  { id: 'vertical-track', x: 85, y: 380, labelX: 30, labelY: 380, anchor: 'start' },
  { id: 'horizontal-track', x: 400, y: 120, labelX: 750, labelY: 120, anchor: 'start' },
  { id: 'radius-track', x: 115, y: 140, labelX: 30, labelY: 200, anchor: 'start' },
  { id: 'flag-bracket', x: 105, y: 130, labelX: 30, labelY: 135, anchor: 'start' },
  { id: 'jamb-bracket', x: 80, y: 450, labelX: 30, labelY: 450, anchor: 'start' },
  { id: 'rear-hang', x: 600, y: 105, labelX: 750, labelY: 85, anchor: 'start' },
];

// --- EXTENSION SYSTEM DIAGRAM ---
const EXTENSION_POINTS: LabeledPoint[] = [
  // Extension spring system
  { id: 'extension-spring', x: 400, y: 85, labelX: 500, labelY: 50, anchor: 'middle' },
  { id: 'safety-cable', x: 400, y: 95, labelX: 500, labelY: 30, anchor: 'middle' },
  { id: 'ext-pulley', x: 120, y: 120, labelX: 30, labelY: 70, anchor: 'start' },
  { id: 'ext-lift-cable', x: 95, y: 300, labelX: 30, labelY: 300, anchor: 'start' },
  { id: 's-hook', x: 200, y: 88, labelX: 100, labelY: 50, anchor: 'start' },
  { id: 'ext-rear-bracket', x: 680, y: 85, labelX: 750, labelY: 60, anchor: 'start' },
  // Door hardware (same as torsion)
  { id: 'panel-section', x: 500, y: 310, labelX: 750, labelY: 310, anchor: 'start' },
  { id: 'hinge-3', x: 300, y: 200, labelX: 750, labelY: 195, anchor: 'start' },
  { id: 'hinge-2', x: 300, y: 320, labelX: 750, labelY: 330, anchor: 'start' },
  { id: 'hinge-1', x: 300, y: 440, labelX: 750, labelY: 440, anchor: 'start' },
  { id: 'roller', x: 95, y: 250, labelX: 30, labelY: 250, anchor: 'start' },
  { id: 'top-bracket', x: 95, y: 145, labelX: 30, labelY: 160, anchor: 'start' },
  { id: 'glass-section', x: 400, y: 250, labelX: 750, labelY: 250, anchor: 'start' },
  { id: 'strut', x: 500, y: 175, labelX: 750, labelY: 170, anchor: 'start' },
  { id: 'bottom-bracket', x: 95, y: 510, labelX: 30, labelY: 510, anchor: 'start' },
  { id: 'bottom-seal', x: 400, y: 530, labelX: 750, labelY: 530, anchor: 'start' },
  { id: 'slide-lock', x: 700, y: 400, labelX: 750, labelY: 400, anchor: 'start' },
  // Track
  { id: 'vertical-track', x: 85, y: 380, labelX: 30, labelY: 380, anchor: 'start' },
  { id: 'horizontal-track', x: 500, y: 105, labelX: 750, labelY: 105, anchor: 'start' },
  { id: 'radius-track', x: 115, y: 140, labelX: 30, labelY: 200, anchor: 'start' },
  { id: 'flag-bracket', x: 105, y: 130, labelX: 30, labelY: 135, anchor: 'start' },
  { id: 'jamb-bracket', x: 80, y: 450, labelX: 30, labelY: 450, anchor: 'start' },
  { id: 'rear-hang', x: 600, y: 105, labelX: 750, labelY: 120, anchor: 'start' },
];

// --- OPERATOR SYSTEM DIAGRAM ---
const OPENER_POINTS: LabeledPoint[] = [
  { id: 'opener-motor', x: 700, y: 80, labelX: 780, labelY: 60, anchor: 'start' },
  { id: 'opener-rail', x: 450, y: 110, labelX: 780, labelY: 110, anchor: 'start' },
  { id: 'trolley', x: 350, y: 115, labelX: 780, labelY: 140, anchor: 'start' },
  { id: 'door-arm', x: 320, y: 180, labelX: 780, labelY: 180, anchor: 'start' },
  { id: 'emergency-release', x: 360, y: 155, labelX: 780, labelY: 160, anchor: 'start' },
  { id: 'opener-bracket', x: 200, y: 125, labelX: 30, labelY: 90, anchor: 'start' },
  { id: 'orb', x: 400, y: 215, labelX: 780, labelY: 220, anchor: 'start' },
  { id: 'photo-eye', x: 120, y: 500, labelX: 30, labelY: 500, anchor: 'start' },
  { id: 'wall-control', x: 850, y: 350, labelX: 780, labelY: 350, anchor: 'start' },
  { id: 'panel-section', x: 450, y: 350, labelX: 780, labelY: 300, anchor: 'start' },
  { id: 'strut', x: 450, y: 230, labelX: 30, labelY: 230, anchor: 'start' },
];

function TorsionDiagramSVG() {
  return (
    <g>
      {/* Header / wall above door */}
      <rect x="70" y="60" width="730" height="60" fill="#e2e4e8" stroke="#9ca3af" strokeWidth="1" />
      <text x="450" y="78" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="system-ui">HEADER WALL</text>

      {/* Torsion shaft */}
      <line x1="85" y1="100" x2="800" y2="100" stroke="#374151" strokeWidth="3" />

      {/* Center bearing plate */}
      <rect x="490" y="85" width="20" height="30" fill="#7c8590" stroke="#374151" strokeWidth="1.5" rx="1" />

      {/* End bearing plates */}
      <rect x="82" y="88" width="12" height="24" fill="#7c8590" stroke="#374151" strokeWidth="1" rx="1" />
      <rect x="788" y="88" width="12" height="24" fill="#7c8590" stroke="#374151" strokeWidth="1" rx="1" />

      {/* Torsion springs */}
      <path d={springCoilPath(160, 95, 310, 7)} fill="none" stroke="#C41E24" strokeWidth="2.5" />
      <path d={springCoilPath(520, 95, 250, 7)} fill="none" stroke="#C41E24" strokeWidth="2.5" />

      {/* Winding cones */}
      <rect x="148" y="88" width="14" height="14" fill="#C41E24" stroke="#991b1b" strokeWidth="1" rx="1" />
      <rect x="770" y="88" width="14" height="14" fill="#C41E24" stroke="#991b1b" strokeWidth="1" rx="1" />

      {/* Stationary cones */}
      <rect x="472" y="90" width="10" height="12" fill="#374151" stroke="#1f2937" strokeWidth="1" rx="1" />
      <rect x="512" y="90" width="10" height="12" fill="#374151" stroke="#1f2937" strokeWidth="1" rx="1" />

      {/* Cable drums */}
      <circle cx="102" cy="100" r="11" fill="#b0b0b0" stroke="#374151" strokeWidth="1.5" />
      <circle cx="102" cy="100" r="4" fill="#374151" />
      <circle cx="795" cy="100" r="11" fill="#b0b0b0" stroke="#374151" strokeWidth="1.5" />
      <circle cx="795" cy="100" r="4" fill="#374151" />

      {/* Lift cables */}
      <line x1="102" y1="111" x2="90" y2="515" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="795" y1="111" x2="805" y2="515" stroke="#9ca3af" strokeWidth="1.5" />

      {/* Vertical tracks */}
      <rect x="78" y="130" width="14" height="405" fill="none" stroke="#4b5563" strokeWidth="2" />
      <rect x="800" y="130" width="14" height="405" fill="none" stroke="#4b5563" strokeWidth="2" />

      {/* Radius / curved sections */}
      <path d="M 92 130 Q 92 110 140 108" fill="none" stroke="#4b5563" strokeWidth="2" />
      <path d="M 807 130 Q 807 110 760 108" fill="none" stroke="#4b5563" strokeWidth="2" />

      {/* Horizontal tracks */}
      <line x1="140" y1="106" x2="760" y2="106" stroke="#4b5563" strokeWidth="2" />

      {/* Flag brackets */}
      <rect x="97" y="118" width="14" height="14" fill="#7c8590" stroke="#4b5563" strokeWidth="1" rx="1" />
      <rect x="790" y="118" width="14" height="14" fill="#7c8590" stroke="#4b5563" strokeWidth="1" rx="1" />

      {/* Rear track hangers */}
      {[350, 500, 650].map(hx => (
        <g key={hx}>
          <line x1={hx} y1="60" x2={hx} y2="106" stroke="#6b7280" strokeWidth="1.5" />
          <rect x={hx - 4} y="96" width="8" height="10" fill="none" stroke="#6b7280" strokeWidth="1" />
        </g>
      ))}

      {/* Jamb brackets */}
      <rect x="68" y="200" width="12" height="18" fill="#7c8590" stroke="#4b5563" strokeWidth="1" rx="1" />
      <rect x="68" y="380" width="12" height="18" fill="#7c8590" stroke="#4b5563" strokeWidth="1" rx="1" />
      <rect x="812" y="200" width="12" height="18" fill="#7c8590" stroke="#4b5563" strokeWidth="1" rx="1" />
      <rect x="812" y="380" width="12" height="18" fill="#7c8590" stroke="#4b5563" strokeWidth="1" rx="1" />

      {/* Door panels — 5 sections */}
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x="95" y={140 + i * 78} width="705" height="74" fill="#e8e8e8" stroke="#b0b0b0" strokeWidth="1" rx="1" />
      ))}

      {/* Glass window in panel 2 */}
      <rect x="320" y="226" width="260" height="52" fill="#c8ddf0" stroke="#93b3d0" strokeWidth="1" rx="2" />
      <line x1="450" y1="226" x2="450" y2="278" stroke="#93b3d0" strokeWidth="0.5" />

      {/* Hinges */}
      {[0, 1, 2, 3].map(i => (
        <g key={`h-${i}`}>
          <rect x="250" y={210 + i * 78} width="18" height="12" fill="#7c8590" stroke="#4b5563" strokeWidth="1" rx="1" />
          <rect x="630" y={210 + i * 78} width="18" height="12" fill="#7c8590" stroke="#4b5563" strokeWidth="1" rx="1" />
        </g>
      ))}

      {/* Rollers */}
      {[0, 1, 2, 3, 4].map(i => (
        <g key={`r-${i}`}>
          <circle cx="92" cy={175 + i * 78} r="6" fill="#b0b0b0" stroke="#4b5563" strokeWidth="1" />
          <circle cx="807" cy={175 + i * 78} r="6" fill="#b0b0b0" stroke="#4b5563" strokeWidth="1" />
        </g>
      ))}

      {/* Struts */}
      <line x1="100" y1="170" x2="795" y2="170" stroke="#4b5563" strokeWidth="2.5" />
      <line x1="100" y1="325" x2="795" y2="325" stroke="#4b5563" strokeWidth="1.5" />

      {/* Bottom brackets */}
      <polygon points="92,510 92,535 108,535 108,520 100,510" fill="#6b7280" stroke="#374151" strokeWidth="1" />
      <polygon points="807,510 807,535 793,535 793,520 800,510" fill="#6b7280" stroke="#374151" strokeWidth="1" />

      {/* Bottom seal */}
      <rect x="95" y="530" width="705" height="6" fill="#374151" rx="2" />

      {/* Top bracket */}
      <rect x="86" y="132" width="12" height="16" fill="#6b7280" stroke="#374151" strokeWidth="1" rx="1" />

      {/* Slide lock */}
      <rect x="695" y="390" width="8" height="30" fill="#6b7280" stroke="#374151" strokeWidth="1" rx="1" />
      <rect x="703" y="398" width="12" height="6" fill="#4b5563" stroke="#374151" strokeWidth="0.5" />

      {/* Floor */}
      <rect x="70" y="536" width="760" height="14" fill="#9ca3af" stroke="#6b7280" strokeWidth="1" />
    </g>
  );
}

function ExtensionDiagramSVG() {
  return (
    <g>
      {/* Header / ceiling */}
      <rect x="70" y="60" width="730" height="30" fill="#e2e4e8" stroke="#9ca3af" strokeWidth="1" />
      <text x="450" y="78" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="system-ui">CEILING</text>

      {/* Horizontal tracks */}
      <line x1="140" y1="98" x2="760" y2="98" stroke="#4b5563" strokeWidth="2" />
      <line x1="140" y1="104" x2="760" y2="104" stroke="#4b5563" strokeWidth="1" strokeDasharray="3 3" />

      {/* Extension springs along tracks — left */}
      <path d={springCoilPath(200, 88, 280, 5)} fill="none" stroke="#C41E24" strokeWidth="2" />
      {/* Safety cable through left spring */}
      <line x1="195" y1="88" x2="490" y2="88" stroke="#d97706" strokeWidth="1" strokeDasharray="4 2" />

      {/* Extension springs — right */}
      <path d={springCoilPath(500, 88, 280, 5)} fill="none" stroke="#C41E24" strokeWidth="2" />
      <line x1="495" y1="88" x2="790" y2="88" stroke="#d97706" strokeWidth="1" strokeDasharray="4 2" />

      {/* Pulleys at track curves */}
      <circle cx="120" cy="118" r="9" fill="#b0b0b0" stroke="#374151" strokeWidth="1.5" />
      <circle cx="120" cy="118" r="3" fill="#374151" />
      <circle cx="785" cy="118" r="9" fill="#b0b0b0" stroke="#374151" strokeWidth="1.5" />
      <circle cx="785" cy="118" r="3" fill="#374151" />

      {/* S-hooks */}
      <path d="M 195 82 Q 195 76 200 76 Q 205 76 205 82" fill="none" stroke="#374151" strokeWidth="2" />
      <path d="M 495 82 Q 495 76 500 76 Q 505 76 505 82" fill="none" stroke="#374151" strokeWidth="2" />

      {/* Rear brackets */}
      <rect x="670" y="78" width="16" height="14" fill="#7c8590" stroke="#374151" strokeWidth="1" rx="1" />

      {/* Rear hangers */}
      {[350, 500, 650].map(hx => (
        <g key={hx}>
          <line x1={hx} y1="60" x2={hx} y2="98" stroke="#6b7280" strokeWidth="1.5" />
        </g>
      ))}

      {/* Lift cables */}
      <line x1="90" y1="515" x2="90" y2="130" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="90" y1="130" x2="120" y2="118" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="807" y1="515" x2="807" y2="130" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="807" y1="130" x2="785" y2="118" stroke="#9ca3af" strokeWidth="1.5" />

      {/* Vertical tracks */}
      <rect x="78" y="130" width="14" height="405" fill="none" stroke="#4b5563" strokeWidth="2" />
      <rect x="800" y="130" width="14" height="405" fill="none" stroke="#4b5563" strokeWidth="2" />

      {/* Radius */}
      <path d="M 92 130 Q 92 108 140 100" fill="none" stroke="#4b5563" strokeWidth="2" />
      <path d="M 807 130 Q 807 108 760 100" fill="none" stroke="#4b5563" strokeWidth="2" />

      {/* Flag brackets */}
      <rect x="97" y="118" width="14" height="14" fill="#7c8590" stroke="#4b5563" strokeWidth="1" rx="1" />

      {/* Jamb brackets */}
      <rect x="68" y="200" width="12" height="18" fill="#7c8590" stroke="#4b5563" strokeWidth="1" rx="1" />
      <rect x="68" y="380" width="12" height="18" fill="#7c8590" stroke="#4b5563" strokeWidth="1" rx="1" />

      {/* Door panels */}
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x="95" y={140 + i * 78} width="705" height="74" fill="#e8e8e8" stroke="#b0b0b0" strokeWidth="1" rx="1" />
      ))}

      {/* Glass */}
      <rect x="320" y="226" width="260" height="52" fill="#c8ddf0" stroke="#93b3d0" strokeWidth="1" rx="2" />

      {/* Hinges */}
      {[0, 1, 2, 3].map(i => (
        <g key={`h-${i}`}>
          <rect x="250" y={210 + i * 78} width="18" height="12" fill="#7c8590" stroke="#4b5563" strokeWidth="1" rx="1" />
          <rect x="630" y={210 + i * 78} width="18" height="12" fill="#7c8590" stroke="#4b5563" strokeWidth="1" rx="1" />
        </g>
      ))}

      {/* Rollers */}
      {[0, 1, 2, 3, 4].map(i => (
        <g key={`r-${i}`}>
          <circle cx="92" cy={175 + i * 78} r="6" fill="#b0b0b0" stroke="#4b5563" strokeWidth="1" />
          <circle cx="807" cy={175 + i * 78} r="6" fill="#b0b0b0" stroke="#4b5563" strokeWidth="1" />
        </g>
      ))}

      {/* Struts */}
      <line x1="100" y1="170" x2="795" y2="170" stroke="#4b5563" strokeWidth="2.5" />

      {/* Bottom brackets */}
      <polygon points="92,510 92,535 108,535 108,520 100,510" fill="#6b7280" stroke="#374151" strokeWidth="1" />

      {/* Bottom seal */}
      <rect x="95" y="530" width="705" height="6" fill="#374151" rx="2" />

      {/* Top bracket */}
      <rect x="86" y="132" width="12" height="16" fill="#6b7280" stroke="#374151" strokeWidth="1" rx="1" />

      {/* Slide lock */}
      <rect x="695" y="390" width="8" height="30" fill="#6b7280" stroke="#374151" strokeWidth="1" rx="1" />

      {/* Floor */}
      <rect x="70" y="536" width="760" height="14" fill="#9ca3af" stroke="#6b7280" strokeWidth="1" />
    </g>
  );
}

function OpenerDiagramSVG() {
  return (
    <g>
      {/* Ceiling */}
      <rect x="70" y="50" width="780" height="30" fill="#e2e4e8" stroke="#9ca3af" strokeWidth="1" />
      <text x="450" y="68" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="system-ui">CEILING</text>

      {/* Motor unit */}
      <rect x="660" y="65" width="90" height="40" fill="#4b5563" stroke="#374151" strokeWidth="1.5" rx="3" />
      <text x="705" y="89" textAnchor="middle" fill="#d1d5db" fontSize="9" fontFamily="system-ui">MOTOR</text>
      {/* Lights */}
      <circle cx="650" cy="82" r="5" fill="#fbbf24" stroke="#d97706" strokeWidth="1" opacity="0.7" />
      <circle cx="760" cy="82" r="5" fill="#fbbf24" stroke="#d97706" strokeWidth="1" opacity="0.7" />

      {/* Motor ceiling mount */}
      <line x1="680" y1="65" x2="680" y2="50" stroke="#6b7280" strokeWidth="2" />
      <line x1="730" y1="65" x2="730" y2="50" stroke="#6b7280" strokeWidth="2" />

      {/* Opener rail */}
      <line x1="195" y1="118" x2="660" y2="85" stroke="#6b7280" strokeWidth="3.5" />

      {/* Trolley */}
      <rect x="330" y="108" width="40" height="14" fill="#9ca3af" stroke="#4b5563" strokeWidth="1.5" rx="2" />

      {/* Emergency release rope */}
      <line x1="350" y1="122" x2="350" y2="165" stroke="#dc2626" strokeWidth="2" />
      <circle cx="350" cy="168" r="6" fill="#dc2626" stroke="#b91c1c" strokeWidth="1" />

      {/* Door arm (J-arm) */}
      <path d="M 350 122 Q 350 175 420 210" fill="none" stroke="#6b7280" strokeWidth="2.5" />

      {/* Opener header bracket */}
      <rect x="185" y="100" width="20" height="35" fill="#7c8590" stroke="#4b5563" strokeWidth="1" rx="2" />

      {/* ORB (Operator Reinforcement Bracket) */}
      <rect x="380" y="205" width="80" height="20" fill="#7c8590" stroke="#4b5563" strokeWidth="1.5" rx="1" />
      <text x="420" y="218" textAnchor="middle" fill="#374151" fontSize="7" fontFamily="system-ui">ORB</text>

      {/* Wall framing — right */}
      <rect x="830" y="80" width="30" height="470" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1" />

      {/* Wall framing — left */}
      <rect x="70" y="80" width="30" height="470" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1" />

      {/* Door panels */}
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x="105" y={145 + i * 78} width="720" height="74" fill="#e8e8e8" stroke="#b0b0b0" strokeWidth="1" rx="1" />
      ))}

      {/* Strut on top panel */}
      <line x1="110" y1="224" x2="820" y2="224" stroke="#4b5563" strokeWidth="2.5" />

      {/* Photo-eye sensors */}
      <rect x="103" y="492" width="10" height="14" fill="#059669" stroke="#047857" strokeWidth="1" rx="2" />
      <rect x="818" y="492" width="10" height="14" fill="#dc2626" stroke="#b91c1c" strokeWidth="1" rx="2" />
      <line x1="113" y1="499" x2="818" y2="499" stroke="#059669" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.4" />
      <text x="465" y="497" textAnchor="middle" fill="#059669" fontSize="7" fontFamily="system-ui" opacity="0.6">IR BEAM</text>

      {/* Wall control */}
      <rect x="840" y="340" width="16" height="28" fill="#4b5563" stroke="#374151" strokeWidth="1" rx="2" />
      <circle cx="848" cy="350" r="3" fill="#059669" />
      <rect x="843" y="358" width="8" height="4" fill="#6b7280" rx="1" />

      {/* Floor */}
      <rect x="70" y="536" width="790" height="14" fill="#9ca3af" stroke="#6b7280" strokeWidth="1" />
    </g>
  );
}

function springCoilPath(startX: number, y: number, width: number, amp: number): string {
  const coils = Math.round(width / 16);
  const cw = width / coils;
  let d = `M ${startX} ${y}`;
  for (let i = 0; i < coils; i++) {
    const x1 = startX + i * cw + cw * 0.25;
    const x2 = startX + i * cw + cw * 0.75;
    const x3 = startX + (i + 1) * cw;
    d += ` Q ${x1} ${y - amp} ${startX + i * cw + cw * 0.5} ${y}`;
    d += ` Q ${x2} ${y + amp} ${x3} ${y}`;
  }
  return d;
}

function DiagramSVG({
  view,
  activeId,
  onSelect,
  components,
}: {
  view: DiagramView;
  activeId: string | null;
  onSelect: (id: string) => void;
  components: DoorComponent[];
}) {
  const points = view === 'torsion' ? TORSION_POINTS : view === 'extension' ? EXTENSION_POINTS : OPENER_POINTS;
  const componentMap = new Map(components.map(c => [c.id, c]));

  return (
    <svg viewBox="0 0 900 560" className="w-full h-auto" style={{ maxHeight: '560px' }}
      role="img" aria-label={`Garage door ${VIEW_LABELS[view].label} diagram`}>
      <defs>
        <filter id="glow-active">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="900" height="560" fill="#f8f9fa" rx="8" />

      {/* Diagram content */}
      {view === 'torsion' && <TorsionDiagramSVG />}
      {view === 'extension' && <ExtensionDiagramSVG />}
      {view === 'opener' && <OpenerDiagramSVG />}

      {/* Labels and hotspots */}
      {points.map(pt => {
        const comp = componentMap.get(pt.id);
        if (!comp) return null;
        const urgColor = URGENCY_LABELS[comp.urgency].color;
        const isActive = activeId === pt.id;

        return (
          <g key={pt.id} onClick={() => onSelect(pt.id)} className="cursor-pointer" role="button" tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(pt.id); } }}
            aria-label={comp.name}
          >
            {/* Leader line from label to point */}
            <line x1={pt.labelX + (pt.anchor === 'start' ? 0 : pt.anchor === 'end' ? 0 : 0)} y1={pt.labelY}
              x2={pt.x} y2={pt.y} stroke={isActive ? urgColor : '#9ca3af'} strokeWidth={isActive ? 1.5 : 0.8}
              strokeDasharray={isActive ? 'none' : '2 2'} opacity={isActive ? 1 : 0.6} />

            {/* Hotspot dot */}
            {isActive && (
              <circle cx={pt.x} cy={pt.y} r="14" fill="none" stroke={urgColor} strokeWidth="1.5" opacity="0.3">
                <animate attributeName="r" from="10" to="18" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={pt.x} cy={pt.y} r={isActive ? 6 : 4} fill={isActive ? urgColor : 'white'}
              stroke={urgColor} strokeWidth={isActive ? 2 : 1.5}
              filter={isActive ? 'url(#glow-active)' : undefined} />

            {/* Label text */}
            <text x={pt.labelX} y={pt.labelY - 4} textAnchor={pt.anchor}
              fill={isActive ? urgColor : '#4b5563'} fontSize={isActive ? '9' : '8'}
              fontFamily="system-ui" fontWeight={isActive ? '700' : '500'}
              className="pointer-events-none select-none"
            >
              {comp.name.length > 28 ? comp.name.slice(0, 26) + '…' : comp.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function InfoPanel({ component, onClose }: { component: DoorComponent; onClose: () => void }) {
  const urgency = URGENCY_LABELS[component.urgency];
  const Icon = URGENCY_ICONS[component.urgency];
  const hasTip = !!component.friendlyTip;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden max-w-md w-full">
      <div className="px-5 py-4 border-b border-gray-100 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg text-gray-900 leading-tight">{component.name}</h3>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${urgency.color}15`, color: urgency.color }}>
              <Icon className="w-3 h-3" />{urgency.label}
            </span>
            <span className="text-xs text-gray-400 font-mono">{component.partNumber}</span>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-5 py-4 space-y-3">
        <p className="text-sm text-gray-600 leading-relaxed">{component.description}</p>
        {hasTip && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
            <p className="text-xs font-semibold text-amber-700 mb-0.5">💡 Homeowner Tip</p>
            <p className="text-sm text-amber-800 leading-relaxed">{component.friendlyTip}</p>
          </div>
        )}
      </div>

      <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
        {component.urgency === 'danger' ? (
          <div className="space-y-3">
            <p className="text-xs text-red-600 font-medium flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Professional service only — do not attempt adjustment or removal.
            </p>
            <Link href="/book"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red text-white text-sm font-display uppercase tracking-wider rounded-lg hover:bg-red-700 transition-colors">
              <Calendar className="w-4 h-4" />Schedule Professional Service<ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        ) : (
          <Link href="/book"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue text-white text-sm font-display uppercase tracking-wider rounded-lg hover:bg-blue-900 transition-colors">
            <Calendar className="w-4 h-4" />Get a Free Estimate<ChevronRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default function DoorAnatomy() {
  const [view, setView] = useState<DiagramView>('torsion');
  const [activeId, setActiveId] = useState<string | null>(null);

  const components = getComponentsForView(view);
  const selected = activeId ? components.find(c => c.id === activeId) ?? null : null;

  const handleSelect = useCallback((id: string) => {
    setActiveId(prev => prev === id ? null : id);
  }, []);

  return (
    <section id="door-anatomy" className="scroll-mt-24">
      {/* Section header with image */}
      <div className="grid lg:grid-cols-2 gap-8 items-center mb-10">
        <div>
          <h2 className="font-display text-3xl md:text-4xl text-brand-blue mb-3">
            Interactive Door Anatomy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Explore every component of a residential garage door system.
            Click any labeled part to learn what it does, its urgency classification, and TNGD part number.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Three dedicated diagrams — each system shown clearly with all its components.
          </p>
        </div>
        <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[16/10]">
          <Image src="/images/portfolio/before-after/door-installation-guilford-county-after-interior.jpg"
            alt="Garage door interior components" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/40 to-transparent" />
        </div>
      </div>

      {/* 3-tab system selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {(['torsion', 'extension', 'opener'] as DiagramView[]).map(v => {
          const vl = VIEW_LABELS[v];
          const isActive = view === v;
          return (
            <button key={v} onClick={() => { setView(v); setActiveId(null); }}
              className={`px-5 py-3 rounded-lg text-sm font-display uppercase tracking-wider transition-all duration-200 border-2 ${
                isActive ? 'text-white shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
              style={isActive ? { backgroundColor: vl.color, borderColor: vl.color } : undefined}
            >
              <span className="block">{vl.label}</span>
              <span className={`block text-[10px] mt-0.5 font-normal normal-case tracking-normal ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                {vl.description}
              </span>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {(Object.entries(URGENCY_LABELS) as [UrgencyLevel, typeof URGENCY_LABELS['danger']][]).map(([key, val]) => {
          const Ic = URGENCY_ICONS[key];
          return (
            <div key={key} className="flex items-center gap-1.5 text-xs">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: val.color }} />
              <Ic className="w-3.5 h-3.5" style={{ color: val.color }} />
              <span className="text-gray-600">{val.label}</span>
            </div>
          );
        })}
      </div>

      {/* Diagram + Panel */}
      <div className="relative flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <DiagramSVG view={view} activeId={activeId} onSelect={handleSelect} components={components} />
        </div>
        <div className="w-full lg:w-96 lg:sticky lg:top-24">
          <AnimatePresence mode="wait">
            {selected ? (
              <InfoPanel key={selected.id} component={selected} onClose={() => setActiveId(null)} />
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="border border-dashed border-gray-300 rounded-xl p-8 text-center"
                style={{ backgroundColor: `${VIEW_LABELS[view].color}08` }}>
                <Wrench className="w-10 h-10 mx-auto mb-3" style={{ color: VIEW_LABELS[view].color, opacity: 0.4 }} />
                <p className="text-sm text-gray-500 font-medium">Click any labeled component</p>
                <p className="text-xs text-gray-400 mt-1">{components.length} parts in this view</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
