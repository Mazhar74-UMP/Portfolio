import React from 'react';

export const BackgroundNoise: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />

      {/* Atmospheric Gradients */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-lime/10 via-dark-900/10 to-transparent blur-[140px] opacity-70" />
      <div className="absolute top-[35%] -left-[10%] w-[500px] h-[500px] bg-gradient-to-r from-lime/5 to-transparent blur-[120px] opacity-40" />
      <div className="absolute top-[65%] -right-[10%] w-[600px] h-[600px] bg-gradient-to-l from-emerald-500/5 to-transparent blur-[140px] opacity-40" />
      
      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </div>
  );
};
