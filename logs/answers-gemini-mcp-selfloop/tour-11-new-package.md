# How do you create a new package in the Rocket.Chat monorepo?

## Gemini Answer

To create a new package in the Rocket.Chat monorepo, you'll follow a manual process that involves setting up the package's directory structure, `package.json`, and `tsconfig.json`. There isn't a dedicated script for generating new packages, so you'll need to create these files and configurations yourself.

Here's a step-by-step guide:

1.  **Create the Package Directory:**
    *   Navigate to the `packages/` directory in the Rocket.Chat monorepo root.
    *   Create a new directory for your package. The directory name will typically be the package name (e.g., `packages/my-new-package`).
    *   If your package is an Enterprise Edition (EE) feature, create it under `ee/packages/` instead.

2.  **Initialize `package.json`:**
    *   Inside your new package directory (e.g., `packages/my-new-package/`), create a `package.json` file.
    *   Populate it with essential information, including:
        *   `name`: The unique name of your package (e.g., `@rocket.chat/my-new-package`).
        *   `version`: Initial version (e.g., `1.0.0`).
        *   `main`: The entry point for your package (e.g., `dist/index.js`).
        *   `types`: The TypeScript declaration file entry point (e.g., `dist/index.d.ts`).
        *   `scripts`: Build scripts (e.g., `build`, `dev`, `lint`).
        *   `dependencies` and `devDependencies`: Any external or internal packages your new package relies on.

    *Example `package.json` structure:*
    
```json
    {
      "name": "@rocket.chat/my-new-package",
      "version": "1.0.0",
      "description": "A brief description of your new package.",
      "main": "dist/index.js",
      "types": "dist/index.d.ts",
      "scripts": {
        "build": "tsc -p tsconfig.json",
        "dev": "tsc -p tsconfig.json --watch",
        "lint": "eslint src/",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "dependencies": {
        // Add your dependencies here
      },
      "devDependencies": {
        "@rocket.chat/eslint-config": "latest",
        "@rocket.chat/tsconfig": "latest",
        "@types/node": "^18.0.0",
        "eslint": "^8.0.0",
        "typescript": "~5.3.0"
      },
      "publishConfig": {
        "access": "public"
      }
    }
    ```


3.  **Configure TypeScript (`tsconfig.json`):**
    *   Create a `tsconfig.json` file in your new package directory.
    *   It's recommended to extend the base Rocket.Chat `tsconfig` for consistency.
    *   Define your `compilerOptions` and `include` paths.

    *Example `tsconfig.json` structure:*
    
```json
    {
      "extends": "@rocket.chat/tsconfig/bases/react-library.json", // Or another appropriate base
      "compilerOptions": {
        "rootDir": "./src",
        "outDir": "./dist",
        "tsBuildInfoFile": "./dist/.tsbuildinfo"
      },
      "include": [
        "./src/**/*.ts",
        "./src/**/*.tsx"
      ],
      "exclude": [
        "node_modules",
        "dist"
      ]
    }
    ```

    *Note: You might need to adjust `extends` based on whether your package is a React library, a Node.js library, etc. Common bases are found in `packages/tsconfig/bases/`.*

4.  **Create Source Code Directory:**
    *   Inside your package directory, create a `src/` directory.
    *   Add your TypeScript/JavaScript files here (e.g., `src/index.ts`).

5.  **Add to Monorepo Workspaces:**
    *   Open the root `package.json` file of the Rocket.Chat monorepo.
    *   Locate the `workspaces` array.
    *   Add the path to your new package (e.g., `packages/my-new-package`) to this array. This allows the monorepo's package manager (e.g., Yarn, pnpm) to recognize and manage your package.

    *Example root `package.json` modification:*
    
```json
    {
      "name": "rocketchat-monorepo",
      "private": true,
      "workspaces": [
        "apps/*",
        "packages/*",
        "ee/apps/*",
        "ee/packages/*",
        "packages/my-new-package" // Add your new package here
      ],
      // ... other configurations
    }
    ```


6.  **Install Dependencies:**
    *   From the monorepo root, run your package manager's install command (e.g., `yarn install` or `pnpm install`). This will hoist dependencies and link your new package within the monorepo.

7.  **Build and Test:**
    *   Run the build script for your new package (e.g., `yarn workspace @rocket.chat/my-new-package build`).
    *   Implement and run tests for your package.

By following these steps, you can successfully integrate a new package into the Rocket.Chat monorepo.

## Tool Calls (5 calls, 12,339 tokens)

**Step 1:** `search({"query":"new package"})` → 69 tokens
**Step 2:** `search({"query":"package.json","layer":"packages"})` → 77 tokens
**Step 3:** `search({"query":"packages/*/package.json"})` → 17 tokens
**Step 4:** `search({"query":"packages/ui-kit/package.json"})` → 18 tokens
**Step 5:** `search({"layer":"packages","query":"package.json"})` → 77 tokens

## Files Seen In Tool Results (3)

- `packages/livechat/src/components/Button/stories.tsx`
- `ee/packages/pdf-worker/.storybook/main.ts`
- `packages/ui-kit/package.js`
