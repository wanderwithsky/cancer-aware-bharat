import React from 'react';
import { Heart, Shield, Stethoscope, Award, Activity, Crosshair } from 'lucide-react';

export type PremiumSectionVariant = 'warm-1' | 'warm-2' | 'warm-3' | 'white';

interface PremiumSectionProps {
  children: React.ReactNode;
  variant?: PremiumSectionVariant;
  className?: string;
  containerClassName?: string;
  withGlow?: boolean;
  withIcons?: boolean;
  withTopDivider?: 'wave' | 'torn' | 'none';
  withBottomDivider?: 'wave' | 'torn' | 'none';
  paddingClass?: string;
  id?: string;
}

const backgroundMap = {
  'warm-1': 'bg-white',
  'warm-2': 'bg-[#F8FAFC]',
  'warm-3': 'bg-[#F1F5F9]',
  'white': 'bg-white',
};

export default function PremiumSection({
  children,
  variant = 'warm-1',
  className = '',
  containerClassName = '',
  withGlow = false,
  withIcons = false,
  withTopDivider = 'none',
  withBottomDivider = 'none',
  paddingClass = 'py-20 md:py-28',
  id,
}: PremiumSectionProps) {
  return (
    <section 
      id={id}
      className={`relative w-full ${backgroundMap[variant]} ${paddingClass} border-b border-slate-100/80 ${className}`}
    >
      {/* Content */}
      <div className={`section-container relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}

