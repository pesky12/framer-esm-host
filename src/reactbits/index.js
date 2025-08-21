// React Bits Components - Self-contained module
import React from "react";

// Iridescent Background Component
export const IridescentBackground = ({ children, className = "" }) => {
  return React.createElement(
    "div",
    {
      className: `relative overflow-hidden ${className}`,
      style: {
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
      },
    },
    [
      React.createElement("div", {
        key: "overlay",
        className: "absolute inset-0 opacity-30",
        style: {
          background: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.03) 2px,
              rgba(255, 255, 255, 0.03) 4px
            )
          `,
        },
      }),
      React.createElement(
        "div",
        { key: "content", className: "relative z-10" },
        children
      ),
    ]
  );
};

// Animated Grid Background
export const AnimatedGridBackground = ({ children, className = "" }) => {
  return React.createElement(
    "div",
    { className: `relative overflow-hidden ${className}` },
    [
      React.createElement("div", {
        key: "grid",
        className: "absolute inset-0",
        style: {
          background: "#000",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "gridMove 20s linear infinite",
        },
      }),
      React.createElement("style", {
        key: "keyframes",
        dangerouslySetInnerHTML: {
          __html: `
            @keyframes gridMove {
              0% { transform: translate(0, 0); }
              100% { transform: translate(50px, 50px); }
            }
          `,
        },
      }),
      React.createElement(
        "div",
        { key: "content", className: "relative z-10" },
        children
      ),
    ]
  );
};

// CSS Grid Background
export const CSSGridBackground = ({ 
  children, 
  className = "", 
  gridSize = 40, 
  lineColor = "rgba(255,255,255,0.1)" 
}) => {
  return React.createElement(
    "div",
    {
      className: `relative overflow-hidden ${className}`,
      style: {
        backgroundColor: "#0f0f0f",
        backgroundImage: `
          linear-gradient(${lineColor} 1px, transparent 1px),
          linear-gradient(90deg, ${lineColor} 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      },
    },
    React.createElement(
      "div",
      { className: "relative z-10" },
      children
    )
  );
};

// Tailwind Gradient Background
export const TailwindGradientBackground = ({ children, className = "" }) => {
  return React.createElement(
    "div",
    {
      className: `relative min-h-screen ${className}`,
      style: {
        background: `
          linear-gradient(135deg, 
            #667eea 0%, 
            #764ba2 25%, 
            #f093fb 50%, 
            #f5576c 75%, 
            #4facfe 100%
          )
        `,
      },
    },
    [
      React.createElement("div", {
        key: "overlay",
        className: "absolute inset-0 bg-black/20",
      }),
      React.createElement(
        "div",
        { key: "content", className: "relative z-10" },
        children
      ),
    ]
  );
};

// Animated Content
export const AnimatedContent = ({ children, className = "" }) => {
  return React.createElement(
    "div",
    {
      className: `p-8 ${className}`,
      style: {
        animation: "fadeInUp 0.6s ease-out",
      },
    },
    [
      React.createElement("style", {
        key: "keyframes",
        dangerouslySetInnerHTML: {
          __html: `
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `,
        },
      }),
      children,
    ]
  );
};

// Complete Showcase
export const ReactBitsShowcase = () => {
  return React.createElement(
    IridescentBackground,
    { className: "min-h-screen" },
    React.createElement(
      AnimatedContent,
      { className: "flex items-center justify-center min-h-screen" },
      React.createElement(
        "div",
        { className: "max-w-4xl mx-auto text-center text-white" },
        [
          React.createElement(
            "h1",
            {
              key: "title",
              className: "text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent",
            },
            "React Bits + Framer"
          ),
          React.createElement(
            "p",
            { key: "subtitle", className: "text-xl mb-12 opacity-80" },
            "Beautiful background components ready for Framer"
          ),
          React.createElement(
            "div",
            { key: "grid", className: "grid grid-cols-1 md:grid-cols-2 gap-8" },
            [
              React.createElement(
                "div",
                {
                  key: "card1",
                  className: "p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20",
                },
                [
                  React.createElement(
                    "h3",
                    { key: "h3", className: "text-2xl font-semibold mb-4" },
                    "Iridescent"
                  ),
                  React.createElement(
                    "p",
                    { key: "p" },
                    "Multi-layered gradient background with subtle patterns"
                  ),
                ]
              ),
              React.createElement(
                "div",
                {
                  key: "card2",
                  className: "p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20",
                },
                [
                  React.createElement(
                    "h3",
                    { key: "h3", className: "text-2xl font-semibold mb-4" },
                    "Animated Grid"
                  ),
                  React.createElement(
                    "p",
                    { key: "p" },
                    "Moving grid pattern for dynamic backgrounds"
                  ),
                ]
              ),
            ]
          ),
        ]
      )
    )
  );
};