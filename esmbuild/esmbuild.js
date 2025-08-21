
const { join, resolve } = require("path")
const esbuild = require('esbuild')
const globby = require('globby');
const { esmPlugin } = require("./plugin.esm")
const { cssPlugin } = require("./plugin.css")

const color = (n, v) => `\x1b[${n}m${v}\x1b[0m`
const defaultPath = join(process.cwd(), "src")
const defaultOutdir = join(process.cwd(), "dist")

async function getBuildOptions(path, entryPoints = null) {
    if (!entryPoints) {
        // Use only the main index file as entry point
        const indexFile = `${path}/index.tsx`;
        const indexJsFile = `${path}/index.js`;
        
        // Check which index file exists
        const fs = require('fs');
        entryPoints = [];
        if (fs.existsSync(indexFile)) {
            entryPoints.push(indexFile);
        } else if (fs.existsSync(indexJsFile)) {
            entryPoints.push(indexJsFile);
        } else {
            // Fallback to finding all files
            entryPoints = await globby([`${path}/**/*.(t|j)s*`]);
        }
    }

    return {
        entryPoints,
        minify: true,
        format: 'esm',
        bundle: true,
        external: ["react", "react/jsx-runtime", "react-dom", "framer", "framer-motion"],
        plugins: [esmPlugin, cssPlugin({ inject: true })],
    }
}

async function build(path = defaultPath, outdir = defaultOutdir) {
    const fs = require('fs');
    outdir = resolve(outdir)
    
    // Build main bundle
    await esbuild.build({ outdir, ...(await getBuildOptions(path)) })
    console.log(`Main build done at ${outdir}`)
    
    // Build individual modules
    const moduleDirs = [
        { src: `${path}/ogl/index.js`, outDir: `${outdir}/ogl` },
        { src: `${path}/button/index.js`, outDir: `${outdir}/button` },
        { src: `${path}/battery/index.js`, outDir: `${outdir}/battery` },
        { src: `${path}/iridescence/index.js`, outDir: `${outdir}/iridescence` }
    ];
    
    for (const moduleInfo of moduleDirs) {
        if (fs.existsSync(moduleInfo.src)) {
            await esbuild.build({ 
                outdir: moduleInfo.outDir, 
                ...(await getBuildOptions(path, [moduleInfo.src])) 
            });
            console.log(`Module build done at ${moduleInfo.outDir}`);
        }
    }
}

async function serve(path = defaultPath, port = 8000) {

    function onRequest(info) {
        const status = color(info.status.toString().startsWith("2") ? 32 : 31, info.status)
        const line = color(37, `${info.method} ${status} ${info.path} [${info.timeInMS}ms]`)
        console.log(line)
    }

    await esbuild.serve({ port, onRequest }, await getBuildOptions(path))
    console.log(`Server listening at http://127.0.0.1:${port}`)
}

let [a, b, command, path, option] = process.argv

path = path && resolve(join(process.cwd(), path))

if (command === "serve") {
    serve(path, option && parseInt(option))
} else if (command === "build") {
    build(path, option && resolve(join(process.cwd(), option)))
} else {
    console.log(`Usage:\n  $ esbuild serve src 8000\n  $ esbuild build src dist`)
}


