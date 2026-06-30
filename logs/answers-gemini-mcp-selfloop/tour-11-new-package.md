# How do you create a new package in the Rocket.Chat monorepo?

## Gemini Answer

To create a new package in the Rocket.Chat monorepo, follow these general steps. While I cannot directly show file contents, these are the typical actions you would take:

**1. Create the Package Directory:**

*   Navigate to the `packages/` directory in the monorepo root.
*   Create a new folder for your package, e.g., `packages/my-new-package`.

**2. Initialize `package.json`:**

*   Inside your new package directory (`packages/my-new-package`), create a `package.json` file. This file will define your package's metadata, scripts, and dependencies.
*   A basic `package.json` might look something like this (you'll fill in specific details):

    
```json
    {
      "name": "@rocket.chat/my-new-package",
      "version": "1.0.0",
      "description": "A new package for Rocket.Chat",
      "main": "dist/index.js",
      "types": "dist/index.d.ts",
      "scripts": {
        "build": "tsup",
        "dev": "tsup --watch",
        "lint": "eslint src --ext .ts,.tsx",
        "clean": "rm -rf dist",
        "test": "vitest"
      },
      "dependencies": {},
      "devDependencies": {
        "@rocket.chat/eslint-config": "workspace:*",
        "@rocket.chat/ts-config": "workspace:*",
        "tsup": "^8.0.0",
        "typescript": "~5.3.3"
      },
      "publishConfig": {
        "access": "public"
      }
    }
    ```


**3. Configure TypeScript (`tsconfig.json`):**

*   If your package uses TypeScript, create a `tsconfig.json` file in your new package directory. You'll likely extend a base TypeScript configuration from the monorepo.

    
```json
    {
      "extends": "@rocket.chat/ts-config/tsconfig.json",
      "compilerOptions": {
        "rootDir": "./src",
        "outDir": "./dist",
        "tsBuildInfoFile": "./.tsbuildinfo"
      },
      "include": ["./src"],
      "references": []
    }
    ```


**4. Add Source Code:**

*   Create a `src/` directory within your new package folder (`packages/my-new-package/src`).
*   Add your TypeScript or JavaScript files here, starting with `index.ts` (or `index.js`).

**5. Register the Package in the Monorepo:**

*   Locate the root `package.json` file of the Rocket.Chat monorepo (in the project root).
*   Find the `workspaces` array (or similar configuration if a different monorepo tool is used).
*   Add a reference to your new package's directory to this array, e.g.:

    
```json
    // In the root package.json
    {
      "name": "rocket.chat-monorepo",
      // ...
      "workspaces": [
        "packages/*",
        "ee/packages/*",
        "apps/*",
        "packages/my-new-package" // Add this line
      ],
      // ...
    }
    ```


**6. Install Dependencies:**

*   From the monorepo root, run your package manager's install command (e.g., `pnpm install` or `yarn install`) to hoist dependencies and link your new package within the monorepo.

**Summary of Key Files and Their Roles:**

*   `packages/my-new-package/`: The root directory for your new package.
*   `packages/my-new-package/package.json`: Defines package metadata, scripts, and dependencies.
*   `packages/my-new-package/tsconfig.json`: TypeScript configuration for the package.
*   `packages/my-new-package/src/index.ts`: The entry point for your package's source code.
*   `package.json` (root): Registers the new package in the monorepo's `workspaces`.

## Tool Calls (5 calls, 11,634 tokens)

**Step 1:** `search({"query":"create package"})` → 15 tokens
**Step 2:** `search({"query":"new package"})` → 68 tokens
**Step 3:** `search({"query":"package.json","layer":"packages"})` → 77 tokens
**Step 4:** `implement({"symbolName":"package.json","filename":"packages/rest-api/package.json"})` → 41 tokens
**Step 5:** `implement({"symbolName":"package","filename":"packages/rest-api/package.json"})` → 15 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/5 |
| Symbols hit | 0/1 |
| Tool calls | 5 |
| Total tokens | 11,634 |
| Pass | YES |
