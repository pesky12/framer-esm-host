# Framer ESM Example Setup

This is an example how to set up a repository that builds code which can be consumed in Framer. It builds standard JavaScript into ES Modules that you can both use locally for development or to deploy to any http server for distribution across your team or the internet.

- `npm run serve` This runs a local web server with the built code.
- `npm run build` This builds the code in `dist`.

All the magic is in the `esmbuild` folder. Contributions are welcome.

### Features

- Built on `esbuild` for speed and to support JavaScript, TypeScript and JSX.
- Custom plugin to handle ESM imports and rewrite local import paths.
- CSS Modules plugin to support writing css scoped modules.
- GitHub Workflow to deploy versioned code on GitHub pages.
- Automatic minification for production builds.
- Support for both npm and legacy systems.

## 🏁 Quickstart

Start the development server with:

```
npm run serve
```

Open Framer, create a code file and paste the following:

```.tsx
import { addPropertyControls, ControlType } from "framer"
import { Button } from "http://127.0.0.1:8000/index.js"

export default Button as React.ComponentType

addPropertyControls(Button, {
    title: {
        title: "Title",
        type: ControlType.String,
        defaultValue: "Title",
    },
})
```

You can now add your component to the canvas and configure it using the defined `propertyControls`. This setup assumes you want to define them only on the Framer side (keeping your code clean) but you can also keep them in the original source.

The imported esm gets cached quite agressively, if you want to make sure you see the latest version you can add a random value to the imported url line:

```.tsx
import { Button } from "http://127.0.0.1:8001/index.js?123"
```

If you forget to start your local server, your component will render with:

```
Error in <name>.tsx Failed to Fetch
```

If you want to import a whole library to expose multiple components you can export them like this. Because Framer uses static analysis to recognize components, you will need one line per exported component.

```.tsx
import { addPropertyControls, ControlType } from "framer"
import * as lib from "http://127.0.0.1:8000/index.js"

addPropertyControls(lib.Button, {
    title: {
        title: "Title",
        type: ControlType.String,
        defaultValue: "Title",
    },
})

export const Button: React.ComponentType = lib.Button
export const Battery: React.ComponentType = lib.Battery
```

Beware that esm was designed for many small files that the browser can cache and optimize for. If you make your library too big, you'll lose out on these advantages. But it's a trade-off.


## Deployment

Once you are ready to deploy your code, it should be uploaded to an https endpoint with a versioned url. We have set up a [GitHub Pages Workflow](.github/workflows/deploy.yml) to build the code and deploy to GitHub Pages. To ship a new version you simply type:

```
npm run deploy
```

This will:
1. Bump the patch version (e.g., 1.0.8 → 1.0.9)
2. Create and push a version tag
3. Trigger the GitHub Pages deployment workflow

The workflow will build your code and deploy it to: `https://[your-username].github.io/[repository-name]/esmbuild@[version]/index.js`

For example: `https://pesky12.github.io/framer-esm-host/esmbuild@1.0.9/index.js`

You can now update your imports to the production url and you'll get the exact same result:

```.tsx
import { Button } from "https://pesky12.github.io/framer-esm-host/esmbuild@1.0.9/index.js"
```

### Version Types

- `npm run deploy` - Patch version (1.0.8 → 1.0.9)
- `npm run deploy:minor` - Minor version (1.0.8 → 1.1.0)
- `npm run deploy:major` - Major version (1.0.8 → 2.0.0)

### Manual Deployment

You can also trigger a deployment manually from GitHub Actions by going to the "Actions" tab and running the "Deploy to GitHub Pages" workflow with a specific version number.

It's very important to version your code, so endpoints stay stable. To move to a new version, you simply update the import urls wherever you need.

## CSS

You can use the default esbuild [css importer](https://esbuild.github.io/content-types/#css), or you can use a [plugin to use css modules](https://github.com/indooorsman/esbuild-css-modules-plugin), that optionally auto inserts the css as a `<style>` tag (as configured).

## Imports

The `plugin.esm.js` makes sure that your local file imports are translated to esm imports. In the example configurations it works as follows:

#### Externals (for import maps)

```.tsx
import React from "react"
import ReactDOM from "react-dom"
import Framer from "framer"
import motion from "framer-motion"
```

Externals work like externals, so they can be picked up by an [import map](https://github.com/WICG/import-maps). In Framer we defined specific ones in the current import map, so we marked them as externals in the setup here.

#### Node Modules

```.tsx
import * as _ from "lodash"
```

`node_modules` work like you would expect. You can just install them with `yarn` and they'll be inlined in the module that imports them.

#### URLs

```.tsx
import * as _ from "https://ga.jspm.io/npm:lodash@4.17.21/index.js"
```

Url imports will just be kept intact so you can do non local esm imports.

#### ESM

```.tsx
import { Button } from "./Button"
```

Local esm imports will be rewritten to include the file extension:

```.tsx
import { Button } from "./Button.js"
```

## Gotchas

- **Private code**: you should keep your source private, but not your built code. Make sure to enable `minify` in the `esmbuild.js` script to minify your code.
- **Assets**: you can host your assets (images, movies) anywhere you like and just use the full urls to use them in your components.
- **Auto refresh**: you currently have to manually reload your components to see changes in your development code. It should be doable to make an `esbuild` plugin that inserts a snippet to auto reload after changes. Contributions are welcome.
- **Other build tools**: this is just an example setup, but you should be able to use Rollup, Webpack, SWC, etc. as long as you set the output format to `esm`.
