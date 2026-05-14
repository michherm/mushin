/**
 * ANATOMY — Knochen-Skizzen im Morgenwasser-Stil.
 * Knochen in tiefem Blaugrau, aktiver Muskel in gedämpftem Terrakotta.
 */

'use client';

const BONE = '#485861';       // Knochen in tiefem Blaugrau
const BONE_DIM = '#9AA5AB';   // gedämpft
const MUSCLE = '#A35446';     // gedämpftes Terrakotta für Muskel
const MUSCLE_DIM = '#7E3F35'; // dunkler

interface AnatomyProps {
  size?: number;
  className?: string;
}

export function FootArch({ size = 120, className = '' }: AnatomyProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className}
         role="img" aria-label="Fußgewölbe mit aktivem Fußgewölbemuskel">
      <path d="M 30 175 Q 50 170 70 175 Q 90 180 110 175 Q 130 170 150 175"
            stroke={BONE_DIM} strokeWidth="0.8" fill="none" opacity="0.5" strokeDasharray="3 2" />
      <path d="M 80 30 Q 75 60 70 90" stroke={BONE} strokeWidth="2" fill="none" />
      <ellipse cx="55" cy="140" rx="22" ry="20" stroke={BONE} strokeWidth="1.8" fill="none" />
      <ellipse cx="75" cy="115" rx="14" ry="11" stroke={BONE} strokeWidth="1.5" fill="none" />
      <path d="M 75 125 L 95 135 L 120 140 L 145 155" stroke={BONE} strokeWidth="1.5" fill="none" />
      <line x1="95" y1="140" x2="145" y2="160" stroke={BONE} strokeWidth="1.2" />
      <line x1="100" y1="143" x2="155" y2="158" stroke={BONE} strokeWidth="1.2" />
      <line x1="105" y1="146" x2="162" y2="156" stroke={BONE} strokeWidth="1.2" />
      <line x1="110" y1="149" x2="168" y2="154" stroke={BONE} strokeWidth="1.2" />
      <circle cx="160" cy="155" r="3" stroke={BONE} strokeWidth="1.2" fill="none" />
      <circle cx="168" cy="153" r="3" stroke={BONE} strokeWidth="1.2" fill="none" />
      <circle cx="173" cy="152" r="2.5" stroke={BONE} strokeWidth="1.2" fill="none" />
      <path d="M 55 150 Q 85 132 130 152" stroke={MUSCLE} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 60 155 Q 90 138 135 156" stroke={MUSCLE} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 65 158 Q 95 144 140 158" stroke={MUSCLE_DIM} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function PelvisLevator({ size = 140, className = '' }: AnatomyProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className}
         role="img" aria-label="Becken mit aktivem Levator ani">
      <path d="M 30 70 Q 50 50 100 50 Q 150 50 170 70" stroke={BONE} strokeWidth="2" fill="none" />
      <path d="M 30 70 Q 28 100 40 130 L 50 140" stroke={BONE} strokeWidth="1.8" fill="none" />
      <path d="M 170 70 Q 172 100 160 130 L 150 140" stroke={BONE} strokeWidth="1.8" fill="none" />
      <path d="M 85 145 Q 100 155 115 145" stroke={BONE} strokeWidth="1.8" fill="none" />
      <circle cx="65" cy="148" r="6" stroke={BONE} strokeWidth="1.8" fill="none" />
      <circle cx="135" cy="148" r="6" stroke={BONE} strokeWidth="1.8" fill="none" />
      <path d="M 50 140 Q 58 144 65 148" stroke={BONE} strokeWidth="1.5" fill="none" />
      <path d="M 150 140 Q 142 144 135 148" stroke={BONE} strokeWidth="1.5" fill="none" />
      <line x1="100" y1="115" x2="100" y2="155" stroke={BONE} strokeWidth="1.5" />
      <circle cx="100" cy="158" r="2" stroke={BONE} strokeWidth="1.2" fill="none" />
      <path d="M 75 148 Q 100 155 125 148" stroke={MUSCLE} strokeWidth="3" fill={MUSCLE} fillOpacity="0.15" strokeLinecap="round" />
      <path d="M 71 148 Q 100 160 129 148" stroke={MUSCLE} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 78 145 Q 100 150 122 145" stroke={MUSCLE_DIM} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M 70 132 L 78 140" stroke={MUSCLE} strokeWidth="1" opacity="0.5" />
      <path d="M 130 132 L 122 140" stroke={MUSCLE} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

export function SpineDeep({ size = 140, className = '' }: AnatomyProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 220" className={className}
         role="img" aria-label="Wirbelsäule mit tiefer autochthoner Muskulatur">
      <path d="M 90 195 L 110 195 L 105 215 L 95 215 Z" stroke={BONE} strokeWidth="1.5" fill="none" />
      {Array.from({ length: 17 }).map((_, i) => {
        const y = 30 + i * 10;
        const w = 14 + Math.sin(i * 0.3) * 1;
        return (
          <g key={i}>
            <rect x={100 - w / 2} y={y} width={w} height={6} rx={1.5}
                  stroke={BONE} strokeWidth="1.2" fill="none" />
            <line x1="100" y1={y + 3} x2="100" y2={y + 9}
                  stroke={BONE_DIM} strokeWidth="0.8" opacity="0.6" />
          </g>
        );
      })}
      <path d="M 88 30 Q 86 100 88 180 L 90 195" stroke={MUSCLE} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 112 30 Q 114 100 112 180 L 110 195" stroke={MUSCLE} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 93 35 Q 92 100 93 175" stroke={MUSCLE_DIM} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 107 35 Q 108 100 107 175" stroke={MUSCLE_DIM} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function Diaphragm({ size = 140, className = '' }: AnatomyProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className}
         role="img" aria-label="Zwerchfell unter dem Brustkorb">
      <line x1="100" y1="30" x2="100" y2="115" stroke={BONE} strokeWidth="2" />
      {Array.from({ length: 6 }).map((_, i) => {
        const y = 35 + i * 13;
        const curve = 50 + i * 8;
        return (
          <g key={i}>
            <path d={`M 100 ${y} Q ${50 - i * 2} ${y + curve / 2} ${30 + i * 2} ${y + curve}`}
                  stroke={BONE} strokeWidth="1.5" fill="none" />
            <path d={`M 100 ${y} Q ${150 + i * 2} ${y + curve / 2} ${170 - i * 2} ${y + curve}`}
                  stroke={BONE} strokeWidth="1.5" fill="none" />
          </g>
        );
      })}
      <line x1="100" y1="35" x2="100" y2="170" stroke={BONE_DIM} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5" />
      <path d="M 35 125 Q 60 105 100 115 Q 140 105 165 125" stroke={MUSCLE} strokeWidth="3" fill={MUSCLE} fillOpacity="0.15" strokeLinecap="round" />
      <path d="M 100 115 L 50 130" stroke={MUSCLE_DIM} strokeWidth="1" opacity="0.5" />
      <path d="M 100 115 L 75 125" stroke={MUSCLE_DIM} strokeWidth="1" opacity="0.5" />
      <path d="M 100 115 L 125 125" stroke={MUSCLE_DIM} strokeWidth="1" opacity="0.5" />
      <path d="M 100 115 L 150 130" stroke={MUSCLE_DIM} strokeWidth="1" opacity="0.5" />
      <path d="M 100 130 L 100 140 M 96 137 L 100 141 L 104 137" stroke={MUSCLE} strokeWidth="1" opacity="0.6" fill="none" />
    </svg>
  );
}

export function Scapula({ size = 140, className = '' }: AnatomyProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className}
         role="img" aria-label="Schulterblätter mit tiefer Muskulatur">
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={95} y={40 + i * 12} width={10} height={6} rx={1}
              stroke={BONE} strokeWidth="1.2" fill="none" />
      ))}
      <path d="M 75 50 L 35 70 L 50 130 L 78 95 Z" stroke={BONE} strokeWidth="1.8" fill="none" />
      <line x1="40" y1="75" x2="78" y2="62" stroke={BONE} strokeWidth="1.5" />
      <path d="M 125 50 L 165 70 L 150 130 L 122 95 Z" stroke={BONE} strokeWidth="1.8" fill="none" />
      <line x1="160" y1="75" x2="122" y2="62" stroke={BONE} strokeWidth="1.5" />
      <path d="M 100 60 Q 75 75 60 95" stroke={BONE_DIM} strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 100 80 Q 78 90 65 115" stroke={BONE_DIM} strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 100 60 Q 125 75 140 95" stroke={BONE_DIM} strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 100 80 Q 122 90 135 115" stroke={BONE_DIM} strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 95 55 L 78 75" stroke={MUSCLE} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 95 65 L 75 85" stroke={MUSCLE} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 95 75 L 73 95" stroke={MUSCLE} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 95 85 L 75 110" stroke={MUSCLE} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 105 55 L 122 75" stroke={MUSCLE} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 105 65 L 125 85" stroke={MUSCLE} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 105 75 L 127 95" stroke={MUSCLE} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 105 85 L 125 110" stroke={MUSCLE} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 50 135 L 50 145 M 46 142 L 50 146 L 54 142" stroke={MUSCLE_DIM} strokeWidth="1" opacity="0.5" fill="none" />
      <path d="M 150 135 L 150 145 M 146 142 L 150 146 L 154 142" stroke={MUSCLE_DIM} strokeWidth="1" opacity="0.5" fill="none" />
    </svg>
  );
}

export function CrownPoint({ size = 140, className = '' }: AnatomyProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className}
         role="img" aria-label="Hinterkopf mit Kronenpunkt und tiefer Halsmuskulatur">
      <path d="M 100 30 Q 60 30 50 65 Q 45 90 55 105 Q 65 115 80 115 L 95 115" stroke={BONE} strokeWidth="2" fill="none" />
      <path d="M 95 115 L 85 130 Q 100 138 115 130 L 115 120" stroke={BONE} strokeWidth="1.8" fill="none" />
      <path d="M 100 30 Q 130 32 140 55 Q 145 80 135 100" stroke={BONE} strokeWidth="2" fill="none" />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x={107} y={115 + i * 9} width={12} height={5} rx={1}
              stroke={BONE} strokeWidth="1.2" fill="none" />
      ))}
      <g transform="translate(120, 32)">
        <path d="M 0 -8 L 6 0 L 0 8 L -6 0 Z" fill={MUSCLE} stroke={MUSCLE} strokeWidth="1" />
        <line x1="0" y1="-14" x2="0" y2="-25" stroke={MUSCLE} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M -3 -22 L 0 -27 L 3 -22" stroke={MUSCLE} strokeWidth="1.2" fill="none" />
        <line x1="-10" y1="-5" x2="-16" y2="-9" stroke={MUSCLE} strokeWidth="0.8" opacity="0.6" />
        <line x1="10" y1="-5" x2="16" y2="-9" stroke={MUSCLE} strokeWidth="0.8" opacity="0.6" />
      </g>
      <path d="M 110 38 Q 108 70 110 115 L 112 165" stroke={MUSCLE} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 116 40 Q 114 70 117 115 L 119 165" stroke={MUSCLE_DIM} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 120 35 Q 115 45 110 60" stroke={MUSCLE_DIM} strokeWidth="1" fill="none" strokeDasharray="2 2" opacity="0.5" />
    </svg>
  );
}
