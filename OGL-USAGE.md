# Using OGL Components in Framer

After deploying your updated ESM host with OGL support, you can now use both React components and OGL WebGL components in your Framer projects.

## Example Usage

### Import OGL Components in Framer

```tsx
import { addPropertyControls, ControlType } from "framer"
import { 
    Renderer,
    Program,
    Mesh,
    Color,
    Triangle,
    Geometry,
    Camera,
    Transform,
    Vec3
} from "https://your-username.github.io/your-repo-name/esmbuild@1.0.9/index.js"

// Example: Creating a WebGL Canvas Component
export default function WebGLTriangle() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    
    React.useEffect(() => {
        if (!canvasRef.current) return
        
        // Initialize WebGL context
        const renderer = new Renderer({ 
            canvas: canvasRef.current,
            width: 300,
            height: 300
        })
        const gl = renderer.gl
        
        // Create camera
        const camera = new Camera(gl, { fov: 35 })
        camera.position.set(0, 0, 5)
        
        // Create triangle geometry
        const geometry = new Triangle(gl)
        
        // Create shader program
        const program = new Program(gl, {
            vertex: `
                attribute vec3 position;
                uniform mat4 modelViewMatrix;
                uniform mat4 projectionMatrix;
                void main() {
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragment: `
                precision highp float;
                uniform vec3 uColor;
                void main() {
                    gl_Color = vec4(uColor, 1.0);
                }
            `,
            uniforms: {
                uColor: { value: new Color('red') }
            }
        })
        
        // Create mesh
        const mesh = new Mesh(gl, { geometry, program })
        
        // Render function
        function render() {
            renderer.render({ scene: mesh, camera })
            requestAnimationFrame(render)
        }
        render()
        
        // Cleanup
        return () => {
            geometry.remove()
            program.remove()
        }
    }, [])
    
    return <canvas ref={canvasRef} width={300} height={300} />
}

addPropertyControls(WebGLTriangle, {
    // Add property controls as needed
})
```

### Available OGL Components

All of these are now available from your ESM host:

**Core Classes:**
- `Renderer` - WebGL renderer
- `Camera` - Camera with perspective/orthographic projection
- `Program` - Shader program
- `Geometry` - Base geometry class
- `Mesh` - 3D mesh combining geometry and program
- `Texture` - Texture handling
- `Transform` - 3D transformation utilities

**Primitives:**
- `Triangle` - Basic triangle geometry

**Math Classes:**
- `Vec3` - 3D vector
- `Mat4` - 4x4 matrix
- `Color` - Color utilities

## Bundle Size

The current build includes the entire OGL library (~53KB minified), which provides a complete WebGL framework. This is perfect for creating:

- Interactive 3D components
- Custom WebGL effects  
- Data visualizations
- Creative coding projects
- Performance-optimized graphics

## React Components

You can still use the original React components:
- `Button` - Custom button component
- `MotionButton` - Animated button with Framer Motion
- `Battery` - Battery indicator component

Both types of components can be mixed and matched in your Framer projects!