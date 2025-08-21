import React from "react";
import "./ReactBits.css";

// Iridescent Background Component from React Bits
export const IridescentBackground: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `
          radial-gradient(ellipse 800px 600px at 50% 0%, 
            rgba(120, 20, 200, 0.15) 0%, 
            transparent 50%),
          radial-gradient(ellipse 600px 400px at 50% 100%, 
            rgba(255, 100, 150, 0.1) 0%, 
            transparent 50%),
          radial-gradient(ellipse 400px 300px at 0% 50%, 
            rgba(100, 200, 255, 0.1) 0%, 
            transparent 50%),
          radial-gradient(ellipse 400px 300px at 100% 50%, 
            rgba(200, 255, 100, 0.1) 0%, 
            transparent 50%)
        `,
        backgroundColor: "#0a0a0a",
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.03) 2px,
              rgba(255, 255, 255, 0.03) 4px
            )
          `,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Animated Grid Background
export const AnimatedGridBackground: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: "#000",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "grid-move 20s linear infinite",
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Tailwind Gradient Background
export const TailwindGradientBackground: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div
      className={`relative min-h-screen ${className}`}
      style={{
        background: `
          linear-gradient(135deg, 
            #667eea 0%, 
            #764ba2 25%, 
            #f093fb 50%, 
            #f5576c 75%, 
            #4facfe 100%
          )
        `,
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// CSS Grid Pattern Background
export const CSSGridBackground: React.FC<{
  children?: React.ReactNode;
  className?: string;
  gridSize?: number;
  lineColor?: string;
}> = ({ children, className = "", gridSize = 40, lineColor = "rgba(255,255,255,0.1)" }) => {
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: "#0f0f0f",
        backgroundImage: `
          linear-gradient(${lineColor} 1px, transparent 1px),
          linear-gradient(90deg, ${lineColor} 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Animated Content Component
export const AnimatedContent: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div 
      className={`p-8 ${className}`}
      style={{
        animation: "fadeInUp 0.6s ease-out",
      }}
    >
      {children}
    </div>
  );
};

// Complete Example Component combining multiple React Bits patterns
export const ReactBitsShowcase: React.FC = () => {
  return (
    <IridescentBackground className="min-h-screen">
      <AnimatedContent className="flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            React Bits + Framer
          </h1>
          <p className="text-xl mb-12 opacity-80">
            Beautiful background components ready for Framer
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <h3 className="text-2xl font-semibold mb-4">Iridescent</h3>
              <p>Multi-layered gradient background with subtle patterns</p>
            </div>
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <h3 className="text-2xl font-semibold mb-4">Animated Grid</h3>
              <p>Moving grid pattern for dynamic backgrounds</p>
            </div>
          </div>
        </div>
      </AnimatedContent>
    </IridescentBackground>
  );
};