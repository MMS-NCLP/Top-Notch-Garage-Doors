'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Wrench, CheckCircle, Calendar, ChevronRight, Info } from 'lucide-react';
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

// ═══════════════════════════════════════════════════════════════════════════
// SHARED SVG HELPERS
// ═══════════════════════════════════════════════════════════════════════════

function springCoilPath(startX: number, y: number, width: number, amplitude: number, tight = false): string {
  const coilWidth = tight ? 6 : 10;
  const coils = Math.round(width / coilWidth);
  const cw = width / coils;
  let d = `M ${startX} ${y}`;
  for (let i = 0; i < coils; i++) {
    const x1 = startX + i * cw + cw * 0.25;
    const x2 = startX + i * cw + cw * 0.75;
    const x3 = startX + (i + 1) * cw;
    d += ` Q ${x1} ${y - amplitude} ${startX + i * cw + cw * 0.5} ${y}`;
    d += ` Q ${x2} ${y + amplitude} ${x3} ${y}`;
  }
  return d;
}

function RaisedPanel({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const inset = 8;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#e8eaed" stroke="#b8bcc2" strokeWidth="1" />
      <rect x={x + inset} y={y + 4} width={w - inset * 2} height={h - 8}
        fill="#dfe2e6" stroke="#c5c9ce" strokeWidth="0.5" rx="1" />
    </g>
  );
}

function WindowPane({ x, y, w, h, panes = 4 }: { x: number; y: number; w: number; h: number; panes?: number }) {
  const paneWidth = (w - (panes - 1) * 3) / panes;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#a8c8e8" stroke="#7ca0c4" strokeWidth="1" rx="1" />
      {Array.from({ length: panes }).map((_, i) => (
        <rect key={i} x={x + i * (paneWidth + 3) + 2} y={y + 2} width={paneWidth - 1} height={h - 4}
          fill="#c0daf0" stroke="#8eb4d4" strokeWidth="0.5" rx="1" />
      ))}
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke="#8eb4d4" strokeWidth="0.5" />
    </g>
  );
}

function Roller({ cx, cy, r = 7 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#c0c4ca" stroke="#6b7280" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r * 0.4} fill="#6b7280" />
      <circle cx={cx} cy={cy} r={r * 0.15} fill="#4b5563" />
    </g>
  );
}

function Hinge({ x, y, width = 22, height = 14, numbered }: { x: number; y: number; width?: number; height?: number; numbered?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1.5" />
      <circle cx={x + width / 2} cy={y + height / 2} r={2.5} fill="#4b5563" />
      <circle cx={x + 5} cy={y + height / 2} r={1.5} fill="#374151" />
      <circle cx={x + width - 5} cy={y + height / 2} r={1.5} fill="#374151" />
      {numbered && (
        <text x={x + width / 2} y={y - 3} textAnchor="middle" fill="#6b7280" fontSize="6.5" fontFamily="system-ui" fontWeight="600">#{numbered}</text>
      )}
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TORSION SPRING SYSTEM DIAGRAM
// ═══════════════════════════════════════════════════════════════════════════

const TORSION_POINTS: LabeledPoint[] = [
  { id: 'torsion-spring', x: 340, y: 88, labelX: 340, labelY: 35, anchor: 'middle' },
  { id: 'torsion-shaft', x: 450, y: 80, labelX: 450, labelY: 22, anchor: 'middle' },
  { id: 'winding-cone', x: 198, y: 88, labelX: 50, labelY: 42, anchor: 'start' },
  { id: 'stationary-cone', x: 472, y: 88, labelX: 472, labelY: 55, anchor: 'middle' },
  { id: 'cable-drum', x: 108, y: 88, labelX: 25, labelY: 68, anchor: 'start' },
  { id: 'end-bearing', x: 95, y: 98, labelX: 25, labelY: 110, anchor: 'start' },
  { id: 'center-bearing', x: 490, y: 98, labelX: 660, labelY: 68, anchor: 'start' },
  { id: 'lift-cable', x: 97, y: 320, labelX: 25, labelY: 305, anchor: 'start' },
  { id: 'panel-section', x: 450, y: 280, labelX: 800, labelY: 280, anchor: 'end' },
  { id: 'glass-section', x: 430, y: 210, labelX: 800, labelY: 210, anchor: 'end' },
  { id: 'hinge-3', x: 290, y: 172, labelX: 800, labelY: 168, anchor: 'end' },
  { id: 'hinge-2', x: 290, y: 258, labelX: 800, labelY: 250, anchor: 'end' },
  { id: 'hinge-1', x: 290, y: 345, labelX: 800, labelY: 340, anchor: 'end' },
  { id: 'roller', x: 97, y: 235, labelX: 25, labelY: 225, anchor: 'start' },
  { id: 'top-bracket', x: 97, y: 140, labelX: 25, labelY: 145, anchor: 'start' },
  { id: 'strut', x: 450, y: 155, labelX: 800, labelY: 145, anchor: 'end' },
  { id: 'bottom-bracket', x: 97, y: 430, labelX: 25, labelY: 430, anchor: 'start' },
  { id: 'bottom-seal', x: 420, y: 450, labelX: 800, labelY: 452, anchor: 'end' },
  { id: 'slide-lock', x: 705, y: 340, labelX: 800, labelY: 370, anchor: 'end' },
  { id: 'vertical-track', x: 88, y: 300, labelX: 25, labelY: 345, anchor: 'start' },
  { id: 'horizontal-track', x: 400, y: 104, labelX: 800, labelY: 108, anchor: 'end' },
  { id: 'radius-track', x: 118, y: 125, labelX: 25, labelY: 180, anchor: 'start' },
  { id: 'flag-bracket', x: 110, y: 118, labelX: 25, labelY: 135, anchor: 'start' },
  { id: 'jamb-bracket', x: 82, y: 380, labelX: 25, labelY: 385, anchor: 'start' },
  { id: 'rear-hang', x: 550, y: 80, labelX: 660, labelY: 40, anchor: 'start' },
];

function TorsionDiagramSVG() {
  const panelH = 58;
  const panelGap = 2;
  const doorTop = 130;
  const doorLeft = 100;
  const doorW = 620;
  const panels = 5;

  return (
    <g>
      {/* Wall / Header */}
      <rect x="70" y="55" width="680" height="40" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1" />
      <text x="410" y="73" textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="system-ui" fontWeight="500" letterSpacing="2">HEADER WALL</text>

      {/* Side jambs */}
      <rect x="70" y="55" width="18" height="410" fill="#c9cdd2" stroke="#9ca3af" strokeWidth="0.8" />
      <rect x="732" y="55" width="18" height="410" fill="#c9cdd2" stroke="#9ca3af" strokeWidth="0.8" />

      {/* Torsion shaft */}
      <line x1="92" y1="88" x2="728" y2="88" stroke="#374151" strokeWidth="4" />

      {/* End bearing plates */}
      <rect x="88" y="78" width="10" height="22" fill="#7c8590" stroke="#4b5563" strokeWidth="1.5" rx="1" />
      <rect x="722" y="78" width="10" height="22" fill="#7c8590" stroke="#4b5563" strokeWidth="1.5" rx="1" />

      {/* Center bearing plate */}
      <rect x="484" y="72" width="16" height="34" fill="#7c8590" stroke="#374151" strokeWidth="1.5" rx="1" />
      <line x1="492" y1="72" x2="492" y2="55" stroke="#6b7280" strokeWidth="1.5" />

      {/* Left torsion spring (right-hand wound — black cone) */}
      <rect x="195" y="82" width="12" height="12" fill="#C41E24" stroke="#991b1b" strokeWidth="1" rx="1" />
      <path d={springCoilPath(210, 88, 270, 8, true)} fill="none" stroke="#C41E24" strokeWidth="3" />
      <rect x="478" y="83" width="8" height="10" fill="#374151" stroke="#1f2937" strokeWidth="1" rx="0.5" />

      {/* Right torsion spring (left-hand wound — red cone) */}
      <rect x="500" y="83" width="8" height="10" fill="#374151" stroke="#1f2937" strokeWidth="1" rx="0.5" />
      <path d={springCoilPath(510, 88, 210, 8, true)} fill="none" stroke="#C41E24" strokeWidth="3" />
      <rect x="718" y="82" width="12" height="12" fill="#C41E24" stroke="#991b1b" strokeWidth="1" rx="1" />

      {/* Cable drums */}
      <circle cx="104" cy="88" r="12" fill="#b0b4ba" stroke="#4b5563" strokeWidth="1.5" />
      <circle cx="104" cy="88" r="5" fill="#6b7280" />
      <circle cx="104" cy="88" r="2" fill="#374151" />
      <circle cx="716" cy="88" r="12" fill="#b0b4ba" stroke="#4b5563" strokeWidth="1.5" />
      <circle cx="716" cy="88" r="5" fill="#6b7280" />
      <circle cx="716" cy="88" r="2" fill="#374151" />

      {/* Horizontal tracks */}
      <line x1="140" y1="100" x2="710" y2="100" stroke="#4b5563" strokeWidth="2" />
      <line x1="140" y1="108" x2="710" y2="108" stroke="#4b5563" strokeWidth="1.5" />

      {/* Radius curves */}
      <path d="M 97 130 Q 97 108 140 102" fill="none" stroke="#4b5563" strokeWidth="2" />
      <path d="M 723 130 Q 723 108 710 102" fill="none" stroke="#4b5563" strokeWidth="2" />

      {/* Vertical tracks */}
      <rect x="88" y="130" width="12" height="330" fill="none" stroke="#4b5563" strokeWidth="2" />
      <rect x="720" y="130" width="12" height="330" fill="none" stroke="#4b5563" strokeWidth="2" />

      {/* Flag brackets at curve */}
      <rect x="100" y="112" width="16" height="16" fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1" />
      <rect x="706" y="112" width="16" height="16" fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1" />

      {/* Rear track hangers */}
      {[300, 450, 600].map(hx => (
        <g key={hx}>
          <line x1={hx} y1="55" x2={hx} y2="100" stroke="#6b7280" strokeWidth="1.5" />
          <path d={`M ${hx - 6} 55 L ${hx - 6} 65 L ${hx + 6} 65 L ${hx + 6} 55`} fill="none" stroke="#6b7280" strokeWidth="1" />
        </g>
      ))}

      {/* Lift cables */}
      <line x1="100" y1="100" x2="94" y2="435" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="none" />
      <line x1="720" y1="100" x2="726" y2="435" stroke="#9ca3af" strokeWidth="1.5" />

      {/* Jamb brackets */}
      {[220, 340].map(jy => (
        <g key={`jl-${jy}`}>
          <rect x="75" y={jy} width="12" height="16" fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1" />
          <rect x="733" y={jy} width="12" height="16" fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1" />
        </g>
      ))}

      {/* Top bracket / fixture */}
      <rect x="90" y="130" width="14" height="18" fill="#6b7280" stroke="#374151" strokeWidth="1" rx="1" />
      <rect x="718" y="130" width="14" height="18" fill="#6b7280" stroke="#374151" strokeWidth="1" rx="1" />

      {/* Door panels — 5 sections with raised detail */}
      {Array.from({ length: panels }).map((_, i) => {
        const py = doorTop + i * (panelH + panelGap);
        if (i === 1) {
          return (
            <g key={i}>
              <rect x={doorLeft} y={py} width={doorW} height={panelH} fill="#e8eaed" stroke="#b8bcc2" strokeWidth="1" />
              <WindowPane x={doorLeft + 30} y={py + 6} w={doorW - 60} h={panelH - 12} panes={6} />
            </g>
          );
        }
        return <RaisedPanel key={i} x={doorLeft} y={py} w={doorW} h={panelH} />;
      })}

      {/* Top strut */}
      <line x1={doorLeft + 2} y1={doorTop + 8} x2={doorLeft + doorW - 2} y2={doorTop + 8} stroke="#4b5563" strokeWidth="3" />

      {/* Middle strut */}
      <line x1={doorLeft + 2} y1={doorTop + 2.5 * (panelH + panelGap)} x2={doorLeft + doorW - 2} y2={doorTop + 2.5 * (panelH + panelGap)} stroke="#4b5563" strokeWidth="2" />

      {/* Hinges at panel joints */}
      {[0, 1, 2, 3].map(i => {
        const hy = doorTop + (i + 1) * (panelH + panelGap) - 8;
        return (
          <g key={`hinge-${i}`}>
            <Hinge x={doorLeft + 80} y={hy} numbered={i === 0 ? '3' : i === 1 ? '2' : i === 2 ? '2' : '1'} />
            <Hinge x={doorLeft + doorW - 102} y={hy} />
          </g>
        );
      })}

      {/* Rollers in tracks */}
      {Array.from({ length: panels }).map((_, i) => {
        const ry = doorTop + i * (panelH + panelGap) + panelH / 2;
        return (
          <g key={`roller-${i}`}>
            <Roller cx={94} cy={ry} />
            <Roller cx={726} cy={ry} />
          </g>
        );
      })}

      {/* Bottom brackets */}
      <polygon points="92,428 92,448 110,448 110,440 100,428" fill="#6b7280" stroke="#374151" strokeWidth="1" />
      <polygon points="728,428 728,448 710,448 710,440 720,428" fill="#6b7280" stroke="#374151" strokeWidth="1" />

      {/* Bottom seal */}
      <rect x={doorLeft} y={doorTop + panels * (panelH + panelGap) - 2} width={doorW} height="6" fill="#374151" rx="2" />

      {/* Slide lock */}
      <rect x="700" y="330" width="8" height="28" fill="#6b7280" stroke="#374151" strokeWidth="1" rx="1" />
      <rect x="708" y="338" width="14" height="6" fill="#4b5563" stroke="#374151" strokeWidth="0.5" />

      {/* Floor */}
      <rect x="70" y="458" width="680" height="12" fill="#a0a4aa" stroke="#7c8085" strokeWidth="1" />
      <line x1="70" y1="458" x2="750" y2="458" stroke="#6b7280" strokeWidth="1.5" />
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXTENSION SPRING SYSTEM DIAGRAM
// ═══════════════════════════════════════════════════════════════════════════

const EXTENSION_POINTS: LabeledPoint[] = [
  { id: 'extension-spring', x: 380, y: 82, labelX: 380, labelY: 30, anchor: 'middle' },
  { id: 'safety-cable', x: 380, y: 90, labelX: 570, labelY: 30, anchor: 'middle' },
  { id: 'ext-pulley', x: 122, y: 108, labelX: 25, labelY: 60, anchor: 'start' },
  { id: 'ext-lift-cable', x: 97, y: 280, labelX: 25, labelY: 270, anchor: 'start' },
  { id: 's-hook', x: 210, y: 78, labelX: 25, labelY: 42, anchor: 'start' },
  { id: 'ext-rear-bracket', x: 680, y: 78, labelX: 800, labelY: 50, anchor: 'end' },
  { id: 'panel-section', x: 450, y: 280, labelX: 800, labelY: 280, anchor: 'end' },
  { id: 'glass-section', x: 430, y: 210, labelX: 800, labelY: 210, anchor: 'end' },
  { id: 'hinge-3', x: 290, y: 172, labelX: 800, labelY: 168, anchor: 'end' },
  { id: 'hinge-2', x: 290, y: 258, labelX: 800, labelY: 250, anchor: 'end' },
  { id: 'hinge-1', x: 290, y: 345, labelX: 800, labelY: 340, anchor: 'end' },
  { id: 'roller', x: 97, y: 235, labelX: 25, labelY: 225, anchor: 'start' },
  { id: 'top-bracket', x: 97, y: 140, labelX: 25, labelY: 145, anchor: 'start' },
  { id: 'strut', x: 450, y: 155, labelX: 800, labelY: 145, anchor: 'end' },
  { id: 'bottom-bracket', x: 97, y: 430, labelX: 25, labelY: 430, anchor: 'start' },
  { id: 'bottom-seal', x: 420, y: 450, labelX: 800, labelY: 452, anchor: 'end' },
  { id: 'slide-lock', x: 705, y: 340, labelX: 800, labelY: 370, anchor: 'end' },
  { id: 'vertical-track', x: 88, y: 300, labelX: 25, labelY: 345, anchor: 'start' },
  { id: 'horizontal-track', x: 400, y: 96, labelX: 800, labelY: 108, anchor: 'end' },
  { id: 'radius-track', x: 118, y: 125, labelX: 25, labelY: 180, anchor: 'start' },
  { id: 'flag-bracket', x: 110, y: 118, labelX: 25, labelY: 135, anchor: 'start' },
  { id: 'jamb-bracket', x: 82, y: 380, labelX: 25, labelY: 385, anchor: 'start' },
  { id: 'rear-hang', x: 550, y: 68, labelX: 660, labelY: 40, anchor: 'start' },
];

function ExtensionDiagramSVG() {
  const panelH = 58;
  const panelGap = 2;
  const doorTop = 130;
  const doorLeft = 100;
  const doorW = 620;
  const panels = 5;

  return (
    <g>
      {/* Ceiling */}
      <rect x="70" y="55" width="680" height="18" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1" />
      <text x="410" y="67" textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="system-ui" fontWeight="500" letterSpacing="2">CEILING / HEADER</text>

      {/* Side jambs */}
      <rect x="70" y="55" width="18" height="410" fill="#c9cdd2" stroke="#9ca3af" strokeWidth="0.8" />
      <rect x="732" y="55" width="18" height="410" fill="#c9cdd2" stroke="#9ca3af" strokeWidth="0.8" />

      {/* Horizontal tracks */}
      <line x1="140" y1="92" x2="710" y2="92" stroke="#4b5563" strokeWidth="2" />
      <line x1="140" y1="100" x2="710" y2="100" stroke="#4b5563" strokeWidth="1.5" />

      {/* Left extension spring along horizontal track */}
      <path d="M 210 75 Q 210 70 215 70 Q 220 70 220 75" fill="none" stroke="#4b5563" strokeWidth="2" />
      <path d={springCoilPath(225, 82, 240, 7)} fill="none" stroke="#C41E24" strokeWidth="2.5" />

      {/* Safety cable through left spring */}
      <line x1="210" y1="82" x2="470" y2="82" stroke="#d97706" strokeWidth="1.2" strokeDasharray="4 2" />

      {/* Right extension spring */}
      <path d="M 530 75 Q 530 70 535 70 Q 540 70 540 75" fill="none" stroke="#4b5563" strokeWidth="2" />
      <path d={springCoilPath(545, 82, 140, 7)} fill="none" stroke="#C41E24" strokeWidth="2.5" />
      <line x1="530" y1="82" x2="690" y2="82" stroke="#d97706" strokeWidth="1.2" strokeDasharray="4 2" />

      {/* Pulleys */}
      <circle cx="122" cy="108" r="10" fill="#c0c4ca" stroke="#4b5563" strokeWidth="1.5" />
      <circle cx="122" cy="108" r="4" fill="#6b7280" />
      <circle cx="698" cy="108" r="10" fill="#c0c4ca" stroke="#4b5563" strokeWidth="1.5" />
      <circle cx="698" cy="108" r="4" fill="#6b7280" />

      {/* Rear brackets */}
      <rect x="675" y="73" width="18" height="14" fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1" />

      {/* Rear track hangers */}
      {[300, 450, 600].map(hx => (
        <g key={hx}>
          <line x1={hx} y1="55" x2={hx} y2="92" stroke="#6b7280" strokeWidth="1.5" />
        </g>
      ))}

      {/* Lift cables routing through pulleys */}
      <line x1="94" y1="435" x2="94" y2="120" stroke="#9ca3af" strokeWidth="1.5" />
      <path d="M 94 120 Q 94 108 122 108" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="726" y1="435" x2="726" y2="120" stroke="#9ca3af" strokeWidth="1.5" />
      <path d="M 726 120 Q 726 108 698 108" fill="none" stroke="#9ca3af" strokeWidth="1.5" />

      {/* Radius curves */}
      <path d="M 97 130 Q 97 100 140 94" fill="none" stroke="#4b5563" strokeWidth="2" />
      <path d="M 723 130 Q 723 100 710 94" fill="none" stroke="#4b5563" strokeWidth="2" />

      {/* Vertical tracks */}
      <rect x="88" y="130" width="12" height="330" fill="none" stroke="#4b5563" strokeWidth="2" />
      <rect x="720" y="130" width="12" height="330" fill="none" stroke="#4b5563" strokeWidth="2" />

      {/* Flag brackets */}
      <rect x="100" y="112" width="16" height="16" fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1" />
      <rect x="706" y="112" width="16" height="16" fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1" />

      {/* Jamb brackets */}
      {[220, 340].map(jy => (
        <g key={`jl-${jy}`}>
          <rect x="75" y={jy} width="12" height="16" fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1" />
          <rect x="733" y={jy} width="12" height="16" fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1" />
        </g>
      ))}

      {/* Top bracket */}
      <rect x="90" y="130" width="14" height="18" fill="#6b7280" stroke="#374151" strokeWidth="1" rx="1" />

      {/* Door panels */}
      {Array.from({ length: panels }).map((_, i) => {
        const py = doorTop + i * (panelH + panelGap);
        if (i === 1) {
          return (
            <g key={i}>
              <rect x={doorLeft} y={py} width={doorW} height={panelH} fill="#e8eaed" stroke="#b8bcc2" strokeWidth="1" />
              <WindowPane x={doorLeft + 30} y={py + 6} w={doorW - 60} h={panelH - 12} panes={6} />
            </g>
          );
        }
        return <RaisedPanel key={i} x={doorLeft} y={py} w={doorW} h={panelH} />;
      })}

      {/* Strut */}
      <line x1={doorLeft + 2} y1={doorTop + 8} x2={doorLeft + doorW - 2} y2={doorTop + 8} stroke="#4b5563" strokeWidth="3" />

      {/* Hinges */}
      {[0, 1, 2, 3].map(i => {
        const hy = doorTop + (i + 1) * (panelH + panelGap) - 8;
        return (
          <g key={`hinge-${i}`}>
            <Hinge x={doorLeft + 80} y={hy} numbered={i === 0 ? '3' : i === 1 ? '2' : i === 2 ? '2' : '1'} />
            <Hinge x={doorLeft + doorW - 102} y={hy} />
          </g>
        );
      })}

      {/* Rollers */}
      {Array.from({ length: panels }).map((_, i) => {
        const ry = doorTop + i * (panelH + panelGap) + panelH / 2;
        return (
          <g key={`roller-${i}`}>
            <Roller cx={94} cy={ry} />
            <Roller cx={726} cy={ry} />
          </g>
        );
      })}

      {/* Bottom brackets */}
      <polygon points="92,428 92,448 110,448 110,440 100,428" fill="#6b7280" stroke="#374151" strokeWidth="1" />
      <polygon points="728,428 728,448 710,448 710,440 720,428" fill="#6b7280" stroke="#374151" strokeWidth="1" />

      {/* Bottom seal */}
      <rect x={doorLeft} y={doorTop + panels * (panelH + panelGap) - 2} width={doorW} height="6" fill="#374151" rx="2" />

      {/* Slide lock */}
      <rect x="700" y="330" width="8" height="28" fill="#6b7280" stroke="#374151" strokeWidth="1" rx="1" />
      <rect x="708" y="338" width="14" height="6" fill="#4b5563" stroke="#374151" strokeWidth="0.5" />

      {/* Floor */}
      <rect x="70" y="458" width="680" height="12" fill="#a0a4aa" stroke="#7c8085" strokeWidth="1" />
      <line x1="70" y1="458" x2="750" y2="458" stroke="#6b7280" strokeWidth="1.5" />
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// OPENER / OPERATOR SYSTEM DIAGRAM
// ═══════════════════════════════════════════════════════════════════════════

const OPENER_POINTS: LabeledPoint[] = [
  { id: 'opener-motor', x: 660, y: 78, labelX: 800, labelY: 58, anchor: 'end' },
  { id: 'opener-rail', x: 420, y: 105, labelX: 800, labelY: 108, anchor: 'end' },
  { id: 'trolley', x: 340, y: 108, labelX: 800, labelY: 128, anchor: 'end' },
  { id: 'door-arm', x: 310, y: 148, labelX: 800, labelY: 168, anchor: 'end' },
  { id: 'emergency-release', x: 340, y: 145, labelX: 800, labelY: 148, anchor: 'end' },
  { id: 'opener-bracket', x: 200, y: 108, labelX: 25, labelY: 88, anchor: 'start' },
  { id: 'orb', x: 400, y: 178, labelX: 800, labelY: 188, anchor: 'end' },
  { id: 'photo-eye', x: 112, y: 430, labelX: 25, labelY: 430, anchor: 'start' },
  { id: 'wall-control', x: 752, y: 300, labelX: 800, labelY: 310, anchor: 'end' },
  { id: 'panel-section', x: 420, y: 280, labelX: 800, labelY: 280, anchor: 'end' },
  { id: 'strut', x: 420, y: 195, labelX: 25, labelY: 200, anchor: 'start' },
];

function OpenerDiagramSVG() {
  const panelH = 58;
  const panelGap = 2;
  const doorTop = 130;
  const doorLeft = 105;
  const doorW = 610;
  const panels = 5;

  return (
    <g>
      {/* Ceiling */}
      <rect x="70" y="45" width="690" height="20" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1" />
      <text x="410" y="58" textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="system-ui" fontWeight="500" letterSpacing="2">CEILING</text>

      {/* Wall framing — left */}
      <rect x="70" y="65" width="30" height="400" fill="#c9cdd2" stroke="#9ca3af" strokeWidth="0.8" />
      {/* Wall framing — right */}
      <rect x="730" y="65" width="30" height="400" fill="#c9cdd2" stroke="#9ca3af" strokeWidth="0.8" />

      {/* Motor unit */}
      <rect x="630" y="63" width="100" height="42" fill="#4b5563" stroke="#374151" strokeWidth="1.5" rx="3" />
      <text x="680" y="88" textAnchor="middle" fill="#d1d5db" fontSize="10" fontFamily="system-ui" fontWeight="600">MOTOR</text>
      {/* Light bulbs */}
      <circle cx="622" cy="80" r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="1" opacity="0.8" />
      <circle cx="738" cy="80" r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="1" opacity="0.8" />
      {/* Ceiling mounts */}
      <line x1="655" y1="63" x2="655" y2="45" stroke="#6b7280" strokeWidth="2.5" />
      <line x1="710" y1="63" x2="710" y2="45" stroke="#6b7280" strokeWidth="2.5" />

      {/* Opener rail */}
      <line x1="196" y1="112" x2="630" y2="83" stroke="#6b7280" strokeWidth="4" />
      {/* Chain/belt inside rail */}
      <line x1="198" y1="115" x2="630" y2="86" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />

      {/* Header bracket */}
      <rect x="186" y="95" width="22" height="32" fill="#8a9199" stroke="#4b5563" strokeWidth="1.5" rx="2" />
      <line x1="197" y1="95" x2="197" y2="65" stroke="#6b7280" strokeWidth="2" />

      {/* Trolley */}
      <rect x="320" y="103" width="42" height="14" fill="#9ca3af" stroke="#4b5563" strokeWidth="1.5" rx="2" />

      {/* Emergency release rope + handle */}
      <line x1="341" y1="117" x2="341" y2="155" stroke="#dc2626" strokeWidth="2" />
      <circle cx="341" cy="158" r="6" fill="#dc2626" stroke="#b91c1c" strokeWidth="1" />
      <line x1="337" y1="155" x2="345" y2="155" stroke="#b91c1c" strokeWidth="1.5" />

      {/* Door arm (J-arm) */}
      <path d="M 341 117 Q 341 150 380 172" fill="none" stroke="#6b7280" strokeWidth="3" />

      {/* ORB (Operator Reinforcement Bracket) */}
      <rect x={doorLeft + 180} y={doorTop + panelH - 12} width={100} height={22}
        fill="#8a9199" stroke="#4b5563" strokeWidth="1.5" rx="1" />
      <text x={doorLeft + 230} y={doorTop + panelH + 4} textAnchor="middle" fill="#374151" fontSize="8" fontFamily="system-ui" fontWeight="600">ORB</text>

      {/* Door panels */}
      {Array.from({ length: panels }).map((_, i) => {
        const py = doorTop + i * (panelH + panelGap);
        if (i === 1) {
          return (
            <g key={i}>
              <rect x={doorLeft} y={py} width={doorW} height={panelH} fill="#e8eaed" stroke="#b8bcc2" strokeWidth="1" />
              <WindowPane x={doorLeft + 30} y={py + 6} w={doorW - 60} h={panelH - 12} panes={6} />
            </g>
          );
        }
        return <RaisedPanel key={i} x={doorLeft} y={py} w={doorW} h={panelH} />;
      })}

      {/* Top strut */}
      <line x1={doorLeft + 2} y1={doorTop + 8} x2={doorLeft + doorW - 2} y2={doorTop + 8} stroke="#4b5563" strokeWidth="3" />

      {/* Photo-eye safety sensors */}
      <rect x="105" y="425" width="12" height="18" fill="#059669" stroke="#047857" strokeWidth="1" rx="2" />
      <text x="111" y="450" textAnchor="middle" fill="#059669" fontSize="6" fontFamily="system-ui">TX</text>
      <rect x="713" y="425" width="12" height="18" fill="#dc2626" stroke="#b91c1c" strokeWidth="1" rx="2" />
      <text x="719" y="450" textAnchor="middle" fill="#dc2626" fontSize="6" fontFamily="system-ui">RX</text>
      {/* IR beam */}
      <line x1="117" y1="434" x2="713" y2="434" stroke="#059669" strokeWidth="0.6" strokeDasharray="6 4" opacity="0.5" />
      <text x="415" y="432" textAnchor="middle" fill="#059669" fontSize="7" fontFamily="system-ui" opacity="0.6">INFRARED SAFETY BEAM</text>

      {/* Wall control panel */}
      <rect x="740" y="290" width="18" height="30" fill="#4b5563" stroke="#374151" strokeWidth="1" rx="2" />
      <circle cx="749" cy="300" r="3.5" fill="#059669" />
      <rect x="744" y="308" width="10" height="5" fill="#6b7280" rx="1" />

      {/* Floor */}
      <rect x="70" y="458" width="690" height="12" fill="#a0a4aa" stroke="#7c8085" strokeWidth="1" />
      <line x1="70" y1="458" x2="760" y2="458" stroke="#6b7280" strokeWidth="1.5" />
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DIAGRAM RENDERER WITH LABELS + HOTSPOTS
// ═══════════════════════════════════════════════════════════════════════════

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
    <svg viewBox="0 0 830 480" className="w-full h-auto" style={{ maxHeight: '520px' }}
      role="img" aria-label={`Garage door ${VIEW_LABELS[view].label} diagram — interactive component reference`}>
      <defs>
        <filter id="glow-active">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="label-shadow">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="830" height="480" fill="#f8f9fa" rx="8" />

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
            {/* Leader line */}
            <line x1={pt.labelX} y1={pt.labelY - 2} x2={pt.x} y2={pt.y}
              stroke={isActive ? urgColor : '#9ca3af'} strokeWidth={isActive ? 1.5 : 0.7}
              strokeDasharray={isActive ? 'none' : '3 2'} opacity={isActive ? 1 : 0.5} />

            {/* Pulse ring when active */}
            {isActive && (
              <circle cx={pt.x} cy={pt.y} r="16" fill="none" stroke={urgColor} strokeWidth="1.5" opacity="0.3">
                <animate attributeName="r" from="10" to="20" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.2s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Hotspot dot */}
            <circle cx={pt.x} cy={pt.y} r={isActive ? 6 : 4.5} fill={isActive ? urgColor : 'white'}
              stroke={urgColor} strokeWidth={isActive ? 2.5 : 1.5}
              filter={isActive ? 'url(#glow-active)' : undefined} />

            {/* Label background for readability */}
            {isActive && (
              <rect x={pt.anchor === 'end' ? pt.labelX - (comp.name.length * 5.5 + 8) : pt.labelX - 4}
                y={pt.labelY - 14} width={comp.name.length * 5.5 + 8} height="16"
                fill="white" stroke={urgColor} strokeWidth="0.5" rx="3" opacity="0.95"
                filter="url(#label-shadow)" />
            )}

            {/* Label text */}
            <text
              x={pt.anchor === 'end' ? pt.labelX - 4 : pt.labelX + 4}
              y={pt.labelY - 3}
              textAnchor={pt.anchor}
              fill={isActive ? urgColor : '#4b5563'}
              fontSize={isActive ? '9' : '7.5'}
              fontFamily="system-ui"
              fontWeight={isActive ? '700' : '500'}
              className="pointer-events-none select-none"
            >
              {comp.name.length > 30 ? comp.name.slice(0, 28) + '…' : comp.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// INFO PANEL (component detail popout)
// ═══════════════════════════════════════════════════════════════════════════

function InfoPanel({ component, onClose }: { component: DoorComponent; onClose: () => void }) {
  const urgency = URGENCY_LABELS[component.urgency];
  const Icon = URGENCY_ICONS[component.urgency];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden max-w-md w-full">
      {/* Header */}
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

      {/* Body */}
      <div className="px-5 py-4 space-y-3">
        <p className="text-sm text-gray-600 leading-relaxed">{component.description}</p>
        {component.friendlyTip && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
            <p className="text-xs font-semibold text-amber-700 mb-0.5">Homeowner Tip</p>
            <p className="text-sm text-amber-800 leading-relaxed">{component.friendlyTip}</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
        {component.urgency === 'danger' ? (
          <div className="space-y-3">
            <p className="text-xs text-red-600 font-medium flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Professional service only — do not attempt adjustment or removal.
            </p>
            <Link href="/book"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red text-white text-sm font-display uppercase tracking-wider rounded-lg hover:bg-red-700 transition-colors">
              <Calendar className="w-4 h-4" />Schedule Service<ChevronRight className="w-3 h-3" />
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

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════

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
      {/* Section header */}
      <div className="grid lg:grid-cols-2 gap-8 items-center mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-brand-blue" />
            <span className="text-xs font-display uppercase tracking-widest text-brand-blue">Interactive Reference</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-brand-blue mb-3">
            Garage Door <span className="text-brand-red">Anatomy</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Explore every component of a residential garage door system. Three dedicated diagrams show how
            torsion springs, extension springs, and automatic openers integrate with the door, track, and hardware.
            Click any labeled part to see what it does, its urgency classification, and TNGD part number.
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
