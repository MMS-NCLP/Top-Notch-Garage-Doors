'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Wrench, CheckCircle, Calendar, ChevronRight, ChevronLeft, Info } from 'lucide-react';
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
// SVG HELPERS
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

// Door layout constants for the 1400×620 viewBox
const D = {
  vbW: 1400, vbH: 620,
  doorL: 250, doorW: 900, // double-wide 16' door
  doorT: 170, panelH: 68, panelGap: 2, panels: 5,
  get doorR() { return this.doorL + this.doorW; },
  get doorB() { return this.doorT + this.panels * this.panelH + (this.panels - 1) * this.panelGap; },
  jambW: 20,
  trackW: 12,
  floorY: 548,
} as const;

const panelY = (i: number) => D.doorT + i * (D.panelH + D.panelGap);
const panelMidY = (i: number) => panelY(i) + D.panelH / 2;
const jointY = (i: number) => panelY(i + 1) - 1;

// ═══════════════════════════════════════════════════════════════════════════
// BASE DOOR (shared by all three views)
// ═══════════════════════════════════════════════════════════════════════════

function BaseDoorSVG({ dimSprings }: { dimSprings?: boolean }) {
  const halfW = D.doorW / 2;

  return (
    <g opacity={dimSprings ? 0.35 : 1}>
      {/* ── Wall / Header ── */}
      <rect x={D.doorL - D.jambW} y={60} width={D.doorW + D.jambW * 2} height={50}
        fill="url(#headerGrad)" stroke="#8a9199" strokeWidth="1" />
      <text x={D.doorL + halfW} y={88} textAnchor="middle" fill="#9ca3af"
        fontSize="10" fontFamily="system-ui" fontWeight="500" letterSpacing="3">HEADER</text>

      {/* ── Side Jambs ── */}
      <rect x={D.doorL - D.jambW} y={60} width={D.jambW} height={D.floorY - 60}
        fill="url(#jambGrad)" stroke="#8a9199" strokeWidth="0.8" />
      <rect x={D.doorR} y={60} width={D.jambW} height={D.floorY - 60}
        fill="url(#jambGrad)" stroke="#8a9199" strokeWidth="0.8" />

      {/* ── Vertical Tracks ── */}
      <rect x={D.doorL - 6} y={D.doorT - 2} width={D.trackW} height={D.doorB - D.doorT + 4}
        fill="none" stroke="#4b5563" strokeWidth="2.5" />
      <rect x={D.doorR - 6} y={D.doorT - 2} width={D.trackW} height={D.doorB - D.doorT + 4}
        fill="none" stroke="#4b5563" strokeWidth="2.5" />

      {/* ── Panels ── */}
      {Array.from({ length: D.panels }).map((_, i) => {
        const py = panelY(i);
        const isWindow = i === 1;
        return (
          <g key={`panel-${i}`}>
            {/* Panel body */}
            <rect x={D.doorL} y={py} width={D.doorW} height={D.panelH}
              fill="url(#panelGrad)" stroke="#b0b5bb" strokeWidth="1" />
            {isWindow ? (
              // Window row — 8 panes across
              <>
                {Array.from({ length: 8 }).map((_, pi) => {
                  const pw = (D.doorW - 60) / 8;
                  const px = D.doorL + 30 + pi * pw;
                  return (
                    <g key={`win-${pi}`}>
                      <rect x={px + 2} y={py + 8} width={pw - 4} height={D.panelH - 16}
                        fill="#b8d4f0" stroke="#7ca0c4" strokeWidth="1" rx="1" />
                      <line x1={px + 2} y1={py + 8 + (D.panelH - 16) / 2}
                        x2={px + pw - 2} y2={py + 8 + (D.panelH - 16) / 2}
                        stroke="#8eb4d4" strokeWidth="0.5" />
                    </g>
                  );
                })}
              </>
            ) : (
              // Raised panel insets — two columns for double-wide
              <>
                {[0, 1].map(col => {
                  const colW = (D.doorW - 20) / 2;
                  const cx = D.doorL + 10 + col * colW;
                  return (
                    <rect key={`raised-${i}-${col}`} x={cx + 6} y={py + 6}
                      width={colW - 12} height={D.panelH - 12}
                      fill="url(#raisedGrad)" stroke="#c5c9ce" strokeWidth="0.5" rx="2" />
                  );
                })}
              </>
            )}
          </g>
        );
      })}

      {/* ── Center Hinges (at each joint, middle of door) ── */}
      {Array.from({ length: D.panels - 1 }).map((_, i) => {
        const hy = jointY(i) - 6;
        const cx = D.doorL + halfW;
        return (
          <g key={`chinge-${i}`}>
            <rect x={cx - 12} y={hy} width={24} height={14}
              fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1.5" />
            <circle cx={cx} cy={hy + 7} r={2.5} fill="#4b5563" />
          </g>
        );
      })}

      {/* ── Side Hinges (at each joint, both sides) ── */}
      {Array.from({ length: D.panels - 1 }).map((_, i) => {
        const hy = jointY(i) - 6;
        const hingeNum = i === 0 ? '3' : i === D.panels - 2 ? '1' : '2';
        return (
          <g key={`shinge-${i}`}>
            {/* Left side */}
            <rect x={D.doorL + 60} y={hy} width={24} height={14}
              fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1.5" />
            <circle cx={D.doorL + 72} cy={hy + 7} r={2.5} fill="#4b5563" />
            <text x={D.doorL + 72} y={hy - 3} textAnchor="middle" fill="#6b7280"
              fontSize="7" fontFamily="system-ui" fontWeight="600">#{hingeNum}</text>
            {/* Right side */}
            <rect x={D.doorR - 84} y={hy} width={24} height={14}
              fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1.5" />
            <circle cx={D.doorR - 72} cy={hy + 7} r={2.5} fill="#4b5563" />
          </g>
        );
      })}

      {/* ── Rollers ── */}
      {Array.from({ length: D.panels }).map((_, i) => {
        const ry = panelMidY(i);
        return (
          <g key={`roller-${i}`}>
            {/* Left */}
            <circle cx={D.doorL - 1} cy={ry} r={7} fill="#c0c4ca" stroke="#6b7280" strokeWidth="1.5" />
            <circle cx={D.doorL - 1} cy={ry} r={3} fill="#6b7280" />
            {/* Right */}
            <circle cx={D.doorR + 1} cy={ry} r={7} fill="#c0c4ca" stroke="#6b7280" strokeWidth="1.5" />
            <circle cx={D.doorR + 1} cy={ry} r={3} fill="#6b7280" />
          </g>
        );
      })}

      {/* ── Reinforcement Struts ── */}
      <line x1={D.doorL + 4} y1={D.doorT + 10} x2={D.doorR - 4} y2={D.doorT + 10}
        stroke="#4b5563" strokeWidth="3.5" />
      <line x1={D.doorL + 4} y1={panelY(2) + D.panelH / 2}
        x2={D.doorR - 4} y2={panelY(2) + D.panelH / 2}
        stroke="#4b5563" strokeWidth="2.5" />

      {/* ── Bottom Rubber Seal ── */}
      <rect x={D.doorL} y={D.doorB} width={D.doorW} height={7}
        fill="#2d3238" rx="3" />

      {/* ── Bottom Brackets ── */}
      <polygon points={`${D.doorL - 2},${D.doorB - 10} ${D.doorL - 2},${D.doorB + 7} ${D.doorL + 18},${D.doorB + 7} ${D.doorL + 18},${D.doorB} ${D.doorL + 8},${D.doorB - 10}`}
        fill="#6b7280" stroke="#374151" strokeWidth="1" />
      <polygon points={`${D.doorR + 2},${D.doorB - 10} ${D.doorR + 2},${D.doorB + 7} ${D.doorR - 18},${D.doorB + 7} ${D.doorR - 18},${D.doorB} ${D.doorR - 8},${D.doorB - 10}`}
        fill="#6b7280" stroke="#374151" strokeWidth="1" />

      {/* ── Slide Lock ── */}
      <rect x={D.doorR - 28} y={panelY(3) + 10} width={8} height={28}
        fill="#6b7280" stroke="#374151" strokeWidth="1" rx="1" />
      <rect x={D.doorR - 20} y={panelY(3) + 18} width={14} height={6}
        fill="#4b5563" stroke="#374151" strokeWidth="0.5" />

      {/* ── Floor ── */}
      <rect x={D.doorL - D.jambW - 40} y={D.floorY} width={D.doorW + D.jambW * 2 + 80} height={14}
        fill="#a0a4aa" stroke="#7c8085" strokeWidth="1" />
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TRACK SYSTEM (shared by torsion + extension)
// ═══════════════════════════════════════════════════════════════════════════

function TrackSystemSVG({ dim }: { dim?: boolean }) {
  return (
    <g opacity={dim ? 0.25 : 1}>
      {/* Horizontal tracks */}
      <line x1={D.doorL + 30} y1={115} x2={D.doorR - 30} y2={115} stroke="#4b5563" strokeWidth="2.5" />
      <line x1={D.doorL + 30} y1={123} x2={D.doorR - 30} y2={123} stroke="#4b5563" strokeWidth="1.5" />

      {/* Radius curves (left) */}
      <path d={`M ${D.doorL} ${D.doorT} Q ${D.doorL} ${123} ${D.doorL + 30} ${117}`}
        fill="none" stroke="#4b5563" strokeWidth="2.5" />
      {/* Radius curves (right) */}
      <path d={`M ${D.doorR} ${D.doorT} Q ${D.doorR} ${123} ${D.doorR - 30} ${117}`}
        fill="none" stroke="#4b5563" strokeWidth="2.5" />

      {/* Flag brackets at curve */}
      <rect x={D.doorL + 8} y={D.doorT - 16} width={18} height={18}
        fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1" />
      <rect x={D.doorR - 26} y={D.doorT - 16} width={18} height={18}
        fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1" />

      {/* Top brackets */}
      <rect x={D.doorL - 4} y={D.doorT} width={16} height={20}
        fill="#6b7280" stroke="#374151" strokeWidth="1" rx="1" />
      <rect x={D.doorR - 12} y={D.doorT} width={16} height={20}
        fill="#6b7280" stroke="#374151" strokeWidth="1" rx="1" />

      {/* Rear track hangers */}
      {[0.25, 0.5, 0.75].map(pct => {
        const hx = D.doorL + D.doorW * pct;
        return (
          <g key={`hang-${pct}`}>
            <line x1={hx} y1={60} x2={hx} y2={115} stroke="#6b7280" strokeWidth="1.8" />
            <path d={`M ${hx - 7} 60 L ${hx - 7} 72 L ${hx + 7} 72 L ${hx + 7} 60`}
              fill="none" stroke="#6b7280" strokeWidth="1" />
          </g>
        );
      })}

      {/* Jamb brackets */}
      {[0.3, 0.6].map(pct => {
        const jy = D.doorT + (D.doorB - D.doorT) * pct;
        return (
          <g key={`jb-${pct}`}>
            <rect x={D.doorL - D.jambW - 2} y={jy} width={14} height={18}
              fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1" />
            <rect x={D.doorR + D.jambW - 12} y={jy} width={14} height={18}
              fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1" />
          </g>
        );
      })}
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TORSION SPRING SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

const TORSION_POINTS: LabeledPoint[] = [
  { id: 'torsion-spring', x: 500, y: 130, labelX: 500, labelY: 38, anchor: 'middle' },
  { id: 'torsion-shaft', x: 700, y: 122, labelX: 700, labelY: 38, anchor: 'middle' },
  { id: 'winding-cone', x: 350, y: 130, labelX: 120, labelY: 52, anchor: 'start' },
  { id: 'stationary-cone', x: 680, y: 130, labelX: 680, labelY: 55, anchor: 'middle' },
  { id: 'cable-drum', x: 260, y: 130, labelX: 80, labelY: 82, anchor: 'start' },
  { id: 'end-bearing', x: 245, y: 140, labelX: 80, labelY: 110, anchor: 'start' },
  { id: 'center-bearing', x: 700, y: 140, labelX: 1320, labelY: 82, anchor: 'end' },
  { id: 'lift-cable', x: 255, y: 380, labelX: 80, labelY: 380, anchor: 'start' },
  { id: 'panel-section', x: 700, y: 310, labelX: 1320, labelY: 310, anchor: 'end' },
  { id: 'glass-section', x: 700, y: 250, labelX: 1320, labelY: 250, anchor: 'end' },
  { id: 'hinge-3', x: 540, y: jointY(0), labelX: 1320, labelY: 175, anchor: 'end' },
  { id: 'hinge-2', x: 540, y: jointY(1), labelX: 1320, labelY: 210, anchor: 'end' },
  { id: 'hinge-1', x: 540, y: jointY(3), labelX: 1320, labelY: 440, anchor: 'end' },
  { id: 'roller', x: 249, y: panelMidY(2), labelX: 80, labelY: 310, anchor: 'start' },
  { id: 'top-bracket', x: 255, y: D.doorT + 5, labelX: 80, labelY: 180, anchor: 'start' },
  { id: 'strut', x: 700, y: D.doorT + 10, labelX: 1320, labelY: 140, anchor: 'end' },
  { id: 'bottom-bracket', x: 255, y: D.doorB - 5, labelX: 80, labelY: D.doorB, anchor: 'start' },
  { id: 'bottom-seal', x: 700, y: D.doorB + 3, labelX: 1320, labelY: D.doorB + 5, anchor: 'end' },
  { id: 'slide-lock', x: D.doorR - 24, y: panelY(3) + 24, labelX: 1320, labelY: 400, anchor: 'end' },
  { id: 'vertical-track', x: 248, y: panelMidY(3), labelX: 80, labelY: 430, anchor: 'start' },
  { id: 'horizontal-track', x: 600, y: 119, labelX: 1320, labelY: 115, anchor: 'end' },
  { id: 'radius-track', x: D.doorL + 15, y: D.doorT - 10, labelX: 80, labelY: 150, anchor: 'start' },
  { id: 'flag-bracket', x: D.doorL + 17, y: D.doorT - 10, labelX: 80, labelY: 150, anchor: 'start' },
  { id: 'jamb-bracket', x: D.doorL - D.jambW + 5, y: D.doorT + (D.doorB - D.doorT) * 0.6 + 9, labelX: 80, labelY: 460, anchor: 'start' },
  { id: 'rear-hang', x: D.doorL + D.doorW * 0.5, y: 90, labelX: 1320, labelY: 60, anchor: 'end' },
];

function TorsionSystemSVG() {
  const shaftY = 130;
  const springGap = 680; // center bearing
  const brokenMid = 920; // where the right spring "breaks"

  return (
    <g>
      {/* Torsion shaft */}
      <line x1={245} y1={shaftY} x2={D.doorR + 10} y2={shaftY}
        stroke="#374151" strokeWidth="5" />

      {/* End bearing plates */}
      <rect x={238} y={118} width={12} height={26} fill="#7c8590" stroke="#4b5563" strokeWidth="1.5" rx="1" />
      <rect x={D.doorR + 2} y={118} width={12} height={26} fill="#7c8590" stroke="#4b5563" strokeWidth="1.5" rx="1" />

      {/* Center bearing plate */}
      <rect x={springGap - 8} y={110} width={18} height={42} fill="#7c8590" stroke="#374151" strokeWidth="1.5" rx="1" />
      <line x1={springGap + 1} y1={110} x2={springGap + 1} y2={60} stroke="#6b7280" strokeWidth="2" />

      {/* ═══ LEFT SPRING — INTACT ═══ */}
      <rect x={348} y={123} width={14} height={14} fill="#C41E24" stroke="#991b1b" strokeWidth="1" rx="1" />
      <path d={springCoilPath(365, shaftY, 300, 9, true)} fill="none" stroke="#C41E24" strokeWidth="3.5" />
      <rect x={springGap - 14} y={124} width={10} height={12} fill="#374151" stroke="#1f2937" strokeWidth="1" rx="0.5" />

      {/* ═══ RIGHT SPRING — BROKEN ═══ */}
      <rect x={springGap + 8} y={124} width={10} height={12} fill="#374151" stroke="#1f2937" strokeWidth="1" rx="0.5" />
      {/* Left portion of broken spring */}
      <path d={springCoilPath(springGap + 20, shaftY, brokenMid - springGap - 20, 9, true)}
        fill="none" stroke="#C41E24" strokeWidth="3.5" />
      {/* GAP — the break point */}
      {/* Right portion — slightly drooped */}
      <path d={springCoilPath(brokenMid + 16, shaftY + 2, D.doorR - 20 - brokenMid - 16, 7, true)}
        fill="none" stroke="#C41E24" strokeWidth="3" opacity="0.7" />
      <rect x={D.doorR - 8} y={123} width={14} height={14} fill="#C41E24" stroke="#991b1b" strokeWidth="1" rx="1" />

      {/* BROKEN label */}
      <g>
        <rect x={brokenMid - 52} y={88} width={120} height={26} rx="4"
          fill="#C41E24" stroke="#991b1b" strokeWidth="1.5" />
        <text x={brokenMid + 8} y={105} textAnchor="middle" fill="white"
          fontSize="12" fontFamily="system-ui" fontWeight="800" letterSpacing="1">
          ⚠ BROKEN
        </text>
        <line x1={brokenMid + 8} y1={114} x2={brokenMid + 8} y2={shaftY - 4}
          stroke="#C41E24" strokeWidth="2" />
        {/* Break indicator lines */}
        <line x1={brokenMid - 2} y1={shaftY - 8} x2={brokenMid + 6} y2={shaftY + 8}
          stroke="#C41E24" strokeWidth="3" />
        <line x1={brokenMid + 10} y1={shaftY - 8} x2={brokenMid + 18} y2={shaftY + 8}
          stroke="#C41E24" strokeWidth="3" />
      </g>

      {/* Cable drums */}
      <circle cx={258} cy={shaftY} r={14} fill="#b0b4ba" stroke="#4b5563" strokeWidth="2" />
      <circle cx={258} cy={shaftY} r={6} fill="#6b7280" />
      <circle cx={258} cy={shaftY} r={2.5} fill="#374151" />
      <circle cx={D.doorR + 6} cy={shaftY} r={14} fill="#b0b4ba" stroke="#4b5563" strokeWidth="2" />
      <circle cx={D.doorR + 6} cy={shaftY} r={6} fill="#6b7280" />
      <circle cx={D.doorR + 6} cy={shaftY} r={2.5} fill="#374151" />

      {/* Lift cables */}
      <line x1={255} y1={shaftY + 14} x2={252} y2={D.doorB} stroke="#9ca3af" strokeWidth="2" />
      <line x1={D.doorR + 8} y1={shaftY + 14} x2={D.doorR + 5} y2={D.doorB} stroke="#9ca3af" strokeWidth="2" />
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXTENSION SPRING SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

const EXTENSION_POINTS: LabeledPoint[] = [
  { id: 'extension-spring', x: 550, y: 100, labelX: 550, labelY: 38, anchor: 'middle' },
  { id: 'safety-cable', x: 550, y: 108, labelX: 750, labelY: 38, anchor: 'middle' },
  { id: 'ext-pulley', x: D.doorL + 25, y: 128, labelX: 80, labelY: 82, anchor: 'start' },
  { id: 'ext-lift-cable', x: 252, y: 350, labelX: 80, labelY: 350, anchor: 'start' },
  { id: 's-hook', x: 380, y: 96, labelX: 80, labelY: 52, anchor: 'start' },
  { id: 'ext-rear-bracket', x: D.doorR - 60, y: 96, labelX: 1320, labelY: 52, anchor: 'end' },
  { id: 'panel-section', x: 700, y: 310, labelX: 1320, labelY: 310, anchor: 'end' },
  { id: 'glass-section', x: 700, y: 250, labelX: 1320, labelY: 250, anchor: 'end' },
  { id: 'hinge-3', x: 540, y: jointY(0), labelX: 1320, labelY: 175, anchor: 'end' },
  { id: 'hinge-2', x: 540, y: jointY(1), labelX: 1320, labelY: 210, anchor: 'end' },
  { id: 'hinge-1', x: 540, y: jointY(3), labelX: 1320, labelY: 440, anchor: 'end' },
  { id: 'roller', x: 249, y: panelMidY(2), labelX: 80, labelY: 310, anchor: 'start' },
  { id: 'top-bracket', x: 255, y: D.doorT + 5, labelX: 80, labelY: 180, anchor: 'start' },
  { id: 'strut', x: 700, y: D.doorT + 10, labelX: 1320, labelY: 140, anchor: 'end' },
  { id: 'bottom-bracket', x: 255, y: D.doorB - 5, labelX: 80, labelY: D.doorB, anchor: 'start' },
  { id: 'bottom-seal', x: 700, y: D.doorB + 3, labelX: 1320, labelY: D.doorB + 5, anchor: 'end' },
  { id: 'slide-lock', x: D.doorR - 24, y: panelY(3) + 24, labelX: 1320, labelY: 400, anchor: 'end' },
  { id: 'vertical-track', x: 248, y: panelMidY(3), labelX: 80, labelY: 430, anchor: 'start' },
  { id: 'horizontal-track', x: 600, y: 119, labelX: 1320, labelY: 115, anchor: 'end' },
  { id: 'radius-track', x: D.doorL + 15, y: D.doorT - 10, labelX: 80, labelY: 150, anchor: 'start' },
  { id: 'flag-bracket', x: D.doorL + 17, y: D.doorT - 10, labelX: 80, labelY: 150, anchor: 'start' },
  { id: 'jamb-bracket', x: D.doorL - D.jambW + 5, y: D.doorT + (D.doorB - D.doorT) * 0.6 + 9, labelX: 80, labelY: 460, anchor: 'start' },
  { id: 'rear-hang', x: D.doorL + D.doorW * 0.5, y: 90, labelX: 1320, labelY: 60, anchor: 'end' },
];

function ExtensionSystemSVG() {
  const springY = 100;

  return (
    <g>
      {/* ── Left Extension Spring ── */}
      <path d="M 370 90 Q 370 84 376 84 Q 382 84 382 90" fill="none" stroke="#4b5563" strokeWidth="2" />
      <path d={springCoilPath(385, springY, 280, 8)} fill="none" stroke="#D97706" strokeWidth="3" />
      {/* Safety cable */}
      <line x1={370} y1={springY} x2={670} y2={springY} stroke="#d97706" strokeWidth="1.5" strokeDasharray="5 3" />

      {/* ── Right Extension Spring ── */}
      <path d="M 740 90 Q 740 84 746 84 Q 752 84 752 90" fill="none" stroke="#4b5563" strokeWidth="2" />
      <path d={springCoilPath(755, springY, 280, 8)} fill="none" stroke="#D97706" strokeWidth="3" />
      <line x1={740} y1={springY} x2={1040} y2={springY} stroke="#d97706" strokeWidth="1.5" strokeDasharray="5 3" />

      {/* Pulleys */}
      <circle cx={D.doorL + 25} cy={128} r={12} fill="#c0c4ca" stroke="#4b5563" strokeWidth="2" />
      <circle cx={D.doorL + 25} cy={128} r={5} fill="#6b7280" />
      <circle cx={D.doorR - 25} cy={128} r={12} fill="#c0c4ca" stroke="#4b5563" strokeWidth="2" />
      <circle cx={D.doorR - 25} cy={128} r={5} fill="#6b7280" />

      {/* Rear brackets */}
      <rect x={D.doorR - 68} y={88} width={20} height={16} fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1" />
      <rect x={D.doorL + 40} y={88} width={20} height={16} fill="#8a9199" stroke="#4b5563" strokeWidth="1" rx="1" />

      {/* Lift cables routing through pulleys */}
      <line x1={252} y1={D.doorB} x2={252} y2={140} stroke="#9ca3af" strokeWidth="2" />
      <path d={`M 252 140 Q 252 128 ${D.doorL + 25} 128`} fill="none" stroke="#9ca3af" strokeWidth="2" />
      <line x1={D.doorR + 5} y1={D.doorB} x2={D.doorR + 5} y2={140} stroke="#9ca3af" strokeWidth="2" />
      <path d={`M ${D.doorR + 5} 140 Q ${D.doorR + 5} 128 ${D.doorR - 25} 128`}
        fill="none" stroke="#9ca3af" strokeWidth="2" />

      {/* S-hooks */}
      {[370, 665, 740, 1035].map((sx, i) => (
        <g key={`shook-${i}`}>
          <path d={`M ${sx} ${springY - 6} Q ${sx + 4} ${springY - 10} ${sx + 4} ${springY - 4} Q ${sx + 4} ${springY + 2} ${sx} ${springY + 2}`}
            fill="none" stroke="#4b5563" strokeWidth="2" />
        </g>
      ))}
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// OPENER / OPERATOR SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

const OPENER_POINTS: LabeledPoint[] = [
  { id: 'opener-motor', x: 950, y: 80, labelX: 1320, labelY: 60, anchor: 'end' },
  { id: 'opener-rail', x: 600, y: 120, labelX: 1320, labelY: 120, anchor: 'end' },
  { id: 'trolley', x: 500, y: 123, labelX: 1320, labelY: 150, anchor: 'end' },
  { id: 'door-arm', x: 470, y: 155, labelX: 1320, labelY: 180, anchor: 'end' },
  { id: 'emergency-release', x: 500, y: 165, labelX: 80, labelY: 130, anchor: 'start' },
  { id: 'opener-bracket', x: 340, y: 120, labelX: 80, labelY: 100, anchor: 'start' },
  { id: 'orb', x: 600, y: D.doorT + D.panelH - 5, labelX: 1320, labelY: 210, anchor: 'end' },
  { id: 'photo-eye', x: 268, y: D.floorY - 24, labelX: 80, labelY: D.floorY - 20, anchor: 'start' },
  { id: 'wall-control', x: D.doorR + D.jambW + 10, y: 360, labelX: 1320, labelY: 360, anchor: 'end' },
  { id: 'panel-section', x: 700, y: 310, labelX: 1320, labelY: 310, anchor: 'end' },
  { id: 'strut', x: 700, y: D.doorT + 10, labelX: 80, labelY: 180, anchor: 'start' },
];

function OpenerSystemSVG() {
  const motorX = 900;
  const motorW = 120;
  const motorY = 62;
  const motorH = 46;
  const railFrontX = 330;

  return (
    <g>
      {/* ── Motor Unit ── */}
      <rect x={motorX} y={motorY} width={motorW} height={motorH}
        fill="#3b4252" stroke="#2e3440" strokeWidth="2" rx="4" />
      <text x={motorX + motorW / 2} y={motorY + motorH / 2 + 4} textAnchor="middle"
        fill="#d8dee9" fontSize="12" fontFamily="system-ui" fontWeight="700">MOTOR</text>
      {/* Light bulbs */}
      <circle cx={motorX - 10} cy={motorY + motorH / 2} r={7} fill="#fbbf24" stroke="#d97706" strokeWidth="1" opacity="0.85" />
      <circle cx={motorX + motorW + 10} cy={motorY + motorH / 2} r={7} fill="#fbbf24" stroke="#d97706" strokeWidth="1" opacity="0.85" />
      {/* Ceiling mounts */}
      <line x1={motorX + 25} y1={motorY} x2={motorX + 25} y2={40} stroke="#6b7280" strokeWidth="3" />
      <line x1={motorX + motorW - 25} y1={motorY} x2={motorX + motorW - 25} y2={40} stroke="#6b7280" strokeWidth="3" />

      {/* ── Ceiling line ── */}
      <rect x={D.doorL - D.jambW - 40} y={38} width={D.doorW + D.jambW * 2 + 80} height={22}
        fill="#d1d5db" stroke="#9ca3af" strokeWidth="1" />
      <text x={D.doorL + D.doorW / 2} y={52} textAnchor="middle" fill="#9ca3af"
        fontSize="10" fontFamily="system-ui" fontWeight="500" letterSpacing="3">CEILING</text>

      {/* ── Opener Rail ── */}
      <line x1={railFrontX} y1={128} x2={motorX} y2={motorY + motorH - 2}
        stroke="#6b7280" strokeWidth="5" />
      {/* Chain/belt */}
      <line x1={railFrontX + 2} y1={131} x2={motorX} y2={motorY + motorH + 1}
        stroke="#9ca3af" strokeWidth="1.2" strokeDasharray="4 4" />

      {/* ── Header Bracket ── */}
      <rect x={railFrontX - 12} y={108} width={26} height={36}
        fill="#8a9199" stroke="#4b5563" strokeWidth="1.5" rx="2" />
      <line x1={railFrontX + 1} y1={108} x2={railFrontX + 1} y2={60}
        stroke="#6b7280" strokeWidth="2.5" />

      {/* ── Trolley ── */}
      <rect x={478} y={118} width={48} height={16}
        fill="#9ca3af" stroke="#4b5563" strokeWidth="1.5" rx="2" />

      {/* ── Emergency Release ── */}
      <line x1={502} y1={134} x2={502} y2={175} stroke="#dc2626" strokeWidth="2.5" />
      <circle cx={502} cy={180} r={7} fill="#dc2626" stroke="#b91c1c" strokeWidth="1.5" />
      <line x1={497} y1={176} x2={507} y2={176} stroke="#b91c1c" strokeWidth="2" />

      {/* ── Door Arm (J-arm) ── */}
      <path d="M 502 134 Q 502 165 550 185" fill="none" stroke="#6b7280" strokeWidth="3.5" />

      {/* ── ORB ── */}
      <rect x={D.doorL + D.doorW / 2 - 60} y={D.doorT + D.panelH - 15} width={120} height={24}
        fill="#8a9199" stroke="#4b5563" strokeWidth="1.5" rx="1" />
      <text x={D.doorL + D.doorW / 2} y={D.doorT + D.panelH + 2} textAnchor="middle"
        fill="#374151" fontSize="9" fontFamily="system-ui" fontWeight="700">ORB</text>

      {/* ── Photo-Eye Sensors ── */}
      <rect x={D.doorL + 10} y={D.floorY - 28} width={14} height={20}
        fill="#059669" stroke="#047857" strokeWidth="1.5" rx="2" />
      <text x={D.doorL + 17} y={D.floorY - 4} textAnchor="middle" fill="#059669"
        fontSize="7" fontFamily="system-ui" fontWeight="600">TX</text>
      <rect x={D.doorR - 24} y={D.floorY - 28} width={14} height={20}
        fill="#dc2626" stroke="#b91c1c" strokeWidth="1.5" rx="2" />
      <text x={D.doorR - 17} y={D.floorY - 4} textAnchor="middle" fill="#dc2626"
        fontSize="7" fontFamily="system-ui" fontWeight="600">RX</text>
      {/* IR beam */}
      <line x1={D.doorL + 24} y1={D.floorY - 18} x2={D.doorR - 24} y2={D.floorY - 18}
        stroke="#059669" strokeWidth="0.8" strokeDasharray="8 5" opacity="0.5" />
      <text x={D.doorL + D.doorW / 2} y={D.floorY - 22} textAnchor="middle"
        fill="#059669" fontSize="8" fontFamily="system-ui" opacity="0.6">INFRARED SAFETY BEAM</text>

      {/* ── Wall Control Panel ── */}
      <rect x={D.doorR + D.jambW + 4} y={345} width={20} height={34}
        fill="#3b4252" stroke="#2e3440" strokeWidth="1.5" rx="3" />
      <circle cx={D.doorR + D.jambW + 14} cy={355} r={4} fill="#059669" />
      <rect x={D.doorR + D.jambW + 8} y={365} width={12} height={6} fill="#6b7280" rx="1" />
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SVG DEFS (gradients)
// ═══════════════════════════════════════════════════════════════════════════

function DiagramDefs() {
  return (
    <defs>
      <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#eef0f3" />
        <stop offset="100%" stopColor="#dce0e5" />
      </linearGradient>
      <linearGradient id="raisedGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e4e7ec" />
        <stop offset="50%" stopColor="#d8dce2" />
        <stop offset="100%" stopColor="#e0e3e8" />
      </linearGradient>
      <linearGradient id="headerGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c9cdd2" />
        <stop offset="100%" stopColor="#b8bcc2" />
      </linearGradient>
      <linearGradient id="jambGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#bfc3c8" />
        <stop offset="100%" stopColor="#cdd1d6" />
      </linearGradient>
      <filter id="glow-active">
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="label-shadow">
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.18" />
      </filter>
    </defs>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DIAGRAM SVG (labels + hotspots)
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
  const isOpener = view === 'opener';

  return (
    <svg viewBox={`0 0 ${D.vbW} ${D.vbH}`} className="w-full h-auto"
      style={{ minWidth: '900px' }}
      role="img" aria-label={`Garage door ${VIEW_LABELS[view].label} diagram — interactive component reference`}>
      <DiagramDefs />

      {/* Background */}
      <rect width={D.vbW} height={D.vbH} fill="#f8f9fa" rx="8" />

      {/* Base door */}
      <BaseDoorSVG dimSprings={false} />

      {/* Track system */}
      {!isOpener && <TrackSystemSVG />}
      {isOpener && <TrackSystemSVG dim />}

      {/* System-specific overlay */}
      {view === 'torsion' && <TorsionSystemSVG />}
      {view === 'extension' && <ExtensionSystemSVG />}
      {view === 'opener' && <OpenerSystemSVG />}

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
            {/* Invisible hit area for easier clicking */}
            <circle cx={pt.x} cy={pt.y} r={18} fill="transparent" />

            {/* Leader line */}
            <line x1={pt.labelX + (pt.anchor === 'end' ? -4 : pt.anchor === 'start' ? 4 : 0)} y1={pt.labelY}
              x2={pt.x} y2={pt.y}
              stroke={isActive ? urgColor : '#9ca3af'} strokeWidth={isActive ? 1.8 : 0.8}
              strokeDasharray={isActive ? 'none' : '3 2'} opacity={isActive ? 1 : 0.5} />

            {/* Pulse ring */}
            {isActive && (
              <circle cx={pt.x} cy={pt.y} r="16" fill="none" stroke={urgColor} strokeWidth="1.5" opacity="0.3">
                <animate attributeName="r" from="10" to="22" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.2s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Hotspot dot */}
            <circle cx={pt.x} cy={pt.y} r={isActive ? 7 : 5} fill={isActive ? urgColor : 'white'}
              stroke={urgColor} strokeWidth={isActive ? 2.5 : 1.5}
              filter={isActive ? 'url(#glow-active)' : undefined} />

            {/* Label bg */}
            {isActive && (
              <rect x={pt.anchor === 'end' ? pt.labelX - (comp.name.length * 5.8 + 10) : pt.labelX - 5}
                y={pt.labelY - 14} width={comp.name.length * 5.8 + 10} height="18"
                fill="white" stroke={urgColor} strokeWidth="0.5" rx="4" opacity="0.95"
                filter="url(#label-shadow)" />
            )}

            {/* Label text */}
            <text
              x={pt.anchor === 'end' ? pt.labelX - 5 : pt.labelX + 5}
              y={pt.labelY}
              textAnchor={pt.anchor}
              fill={isActive ? urgColor : '#4b5563'}
              fontSize={isActive ? '10' : '8.5'}
              fontFamily="system-ui"
              fontWeight={isActive ? '700' : '500'}
              className="select-none"
            >
              {comp.name.length > 32 ? comp.name.slice(0, 30) + '…' : comp.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// INFO PANEL (with product image)
// ═══════════════════════════════════════════════════════════════════════════

function InfoPanel({ component, onClose }: { component: DoorComponent; onClose: () => void }) {
  const urgency = URGENCY_LABELS[component.urgency];
  const Icon = URGENCY_ICONS[component.urgency];
  const imgSrc = component.imageUrl || '/images/logos/tngd-logo-badge.png';

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden max-w-md w-full">
      {/* Product Image */}
      <div className="relative h-36 bg-gray-50 flex items-center justify-center border-b border-gray-100">
        <Image
          src={imgSrc}
          alt={component.name}
          width={component.imageUrl ? 200 : 80}
          height={component.imageUrl ? 120 : 80}
          className="object-contain max-h-32"
          style={{ opacity: component.imageUrl ? 1 : 0.3 }}
        />
        {!component.imageUrl && (
          <span className="absolute bottom-2 text-[10px] text-gray-300 font-display uppercase tracking-wider">
            Product image coming soon
          </span>
        )}
      </div>

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
        <button onClick={onClose}
          className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close">
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const components = getComponentsForView(view);
  const selected = activeId ? components.find(c => c.id === activeId) ?? null : null;

  const handleSelect = useCallback((id: string) => {
    setActiveId(prev => prev === id ? null : id);
  }, []);

  const scroll = useCallback((dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
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
            Identify every component of a residential garage door system. Three dedicated diagrams
            isolate the <strong>torsion spring</strong>, <strong>extension spring</strong>, and{' '}
            <strong>automatic opener</strong> systems so you can tell our office exactly what you&apos;re
            looking at — or confirm what needs attention before we arrive.
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
        {/* Scrollable diagram */}
        <div className="flex-1 min-w-0 relative">
          {/* Scroll hint arrows */}
          <button onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 border border-gray-200 shadow-md flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-800 transition-colors lg:hidden"
            aria-label="Scroll left">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 border border-gray-200 shadow-md flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-800 transition-colors lg:hidden"
            aria-label="Scroll right">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div ref={scrollRef}
            className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <DiagramSVG view={view} activeId={activeId} onSelect={handleSelect} components={components} />
          </div>

          <p className="text-center text-xs text-gray-400 mt-2 lg:hidden">
            ← Scroll to explore the full diagram →
          </p>
        </div>

        {/* Info panel */}
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
