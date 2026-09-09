import React from 'react';

export type PremiumSectionVariant = 'warm-1' | 'warm-2' | 'warm-3' | 'white' | 'paper' | 'dusk';

interface PremiumSectionProps {
  children: React.ReactNode;
  variant?: PremiumSectionVariant;
  className?: string;
  containerClassName?: string;
  withGlow?: boolean;
  withIcons?: boolean;
  withTopDivider?: 'wave' | 'torn' | 'kantha' | 'none';
  withBottomDivider?: 'wave' | 'torn' | 'kantha' | 'none';
  paddingClass?: string;
  id?: string;
}

const backgroundMap: Record<PremiumSectionVariant, string> = {
  'warm-1': 'bg-paper text-ink',
  'warm-2': 'bg-white text-ink',
  'warm-3': 'bg-[#EEF3EF] text-ink',
  'white': 'bg-white text-ink',
  'paper': 'bg-paper text-ink',
  'dusk': 'bg-ink-teal text-white',
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
  paddingClass = 'py-16 md:py-24',
  id,
}: PremiumSectionProps) {
  return (
    <section 
      id={id}
      className={`relative w-full ${backgroundMap[variant]} ${paddingClass} border-b border-outline/50 transition-colors duration-300 ${className}`}
    >
      {withTopDivider === 'kantha' && (
        <div className="absolute top-0 left-0 right-0 h-[1px] kantha-divider z-20" />
      )}
      
      {/* Content */}
      <div className={`section-container relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {children}
      </div>

      {withBottomDivider === 'kantha' && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] kantha-divider z-20" />
      )}
    </section>
  );
}
