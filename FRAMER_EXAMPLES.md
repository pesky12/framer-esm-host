# React Bits Components for Framer

## Quick Copy-Paste Examples

### 1. Iridescent Background Component
```jsx
import { IridescentBackground } from "https://pesky12.github.io/framer-esm-host/reactbits/index.js"

export default function Component() {
    return (
        <IridescentBackground style={{ width: "100%", height: "100vh" }}>
            <div style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                height: "100%",
                color: "white",
                textAlign: "center"
            }}>
                <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
                    Beautiful Iridescent Background
                </h1>
            </div>
        </IridescentBackground>
    )
}
```

### 2. Animated Grid Background
```jsx
import { AnimatedGridBackground } from "https://pesky12.github.io/framer-esm-host/reactbits/index.js"

export default function Component() {
    return (
        <AnimatedGridBackground style={{ width: "100%", height: "100vh" }}>
            <div style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                height: "100%",
                color: "white",
                textAlign: "center"
            }}>
                <div>
                    <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}>
                        Animated Grid
                    </h1>
                    <p style={{ fontSize: "1.5rem" }}>
                        Moving grid background effect
                    </p>
                </div>
            </div>
        </AnimatedGridBackground>
    )
}
```

### 3. CSS Grid Background
```jsx
import { CSSGridBackground } from "https://pesky12.github.io/framer-esm-host/reactbits/index.js"

export default function Component() {
    return (
        <CSSGridBackground 
            className="w-full h-screen"
            gridSize={30}
            lineColor="rgba(0,255,255,0.2)"
        >
            <div className="flex items-center justify-center h-full">
                <h1 className="text-4xl font-bold text-cyan-400">
                    Custom Grid Pattern
                </h1>
            </div>
        </CSSGridBackground>
    )
}
```

### 4. Tailwind Gradient Background
```jsx
import { TailwindGradientBackground } from "https://pesky12.github.io/framer-esm-host/reactbits/index.js"

export default function Component() {
    return (
        <TailwindGradientBackground>
            <div className="flex items-center justify-center h-full">
                <h1 className="text-4xl font-bold text-white">
                    Tailwind Gradient
                </h1>
            </div>
        </TailwindGradientBackground>
    )
}
```

### 5. Complete Showcase (All Effects)
```jsx
import { ReactBitsShowcase } from "https://pesky12.github.io/framer-esm-host/reactbits/index.js"

// Just use this component directly - it includes everything!
export default ReactBitsShowcase
```

### 6. Mix and Match Components
```jsx
import { 
    IridescentBackground, 
    AnimatedContent 
} from "https://pesky12.github.io/framer-esm-host/reactbits/index.js"

export default function Component() {
    return (
        <IridescentBackground className="w-full h-screen">
            <AnimatedContent className="flex items-center justify-center h-full">
                <div className="text-center text-white">
                    <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        Your Content Here
                    </h1>
                    <p className="text-xl opacity-80">
                        Animated content with beautiful background
                    </p>
                </div>
            </AnimatedContent>
        </IridescentBackground>
    )
}
```

## Import Options

- **All React Bits**: `https://pesky12.github.io/framer-esm-host/reactbits/index.js`
- **Everything (React + OGL)**: `https://pesky12.github.io/framer-esm-host/index.js`
- **OGL Only**: `https://pesky12.github.io/framer-esm-host/ogl/index.js`

## Available Components

- `IridescentBackground` - Multi-layered gradient background
- `AnimatedGridBackground` - Moving grid pattern  
- `TailwindGradientBackground` - Colorful gradient background
- `CSSGridBackground` - Customizable grid pattern
- `AnimatedContent` - Fade-in animation wrapper
- `ReactBitsShowcase` - Complete demo component

Just copy any of these code blocks and paste them directly into a Framer code component!