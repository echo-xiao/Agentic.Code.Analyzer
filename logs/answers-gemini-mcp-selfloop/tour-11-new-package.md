# How do you create a new package in the Rocket.Chat monorepo?

## Plan

intent: pattern

## Gemini Answer

To create a new package in the Rocket.Chat monorepo, you'll follow a pattern consistent with existing packages, leveraging Yarn workspaces and Turbo for build orchestration. The process involves creating a new directory, defining the package's metadata and scripts, and setting up its development environment.

Here's a step-by-step guide:

**1. Choose a Location:**
   *   For Community Edition packages, create a new directory under `packages/`.
   *   For Enterprise Edition packages, create a new directory under `ee/packages/`.
   *   **Example:** `packages/my-new-package`

**2. Create `package.json`:**
   *   Inside your new package directory, create a `package.json` file. This file defines your package's identity, dependencies, and scripts.

**3. Define Package Metadata:**
   *   **`name`**: Follow the `@rocket.chat/` naming convention.
      *   **Example:** `"name": "@rocket.chat/my-new-package"`
   *   **`version`**: Start with an initial version (e.g., `"1.0.0"`). Versioning is independently managed for each package using Changesets.
   *   **`main`**: Specify the entry point for your package (e.g., `"src/index.ts"` or `"dist/index.js"` if compiled).
   *   **`types`**: If it's a TypeScript package, specify the main TypeScript declaration file (e.g., `"src/index.ts"`).
   *   **`private`**: Set to `true` if the package is not intended for public npm publication.

**4. Add Scripts:**
   *   Include standard npm scripts for common tasks, consistent with other packages in the monorepo. These scripts will be orchestrated by Turbo.
   *   **Common scripts:** `build`, `dev`, `lint`, `testunit`.
   *   **Example (within `package.json`):**
     
```json
     "scripts": {
       "build": "tsup src --out-dir dist",
       "dev": "tsup src --out-dir dist --watch",
       "lint": "eslint src",
       "testunit": "vitest"
     }
     ```


**5. Manage Dependencies:**
   *   **Internal Dependencies:** For dependencies on other packages within the Rocket.Chat monorepo, use the `workspace:` protocol.
      *   **Example:** `"@rocket.chat/core-typings": "workspace:^"`
   *   **External Dependencies:** Add external npm packages as usual under `dependencies` or `devDependencies`.

**6. Add `tsconfig.json` (for TypeScript packages):**
   *   If your package uses TypeScript, create a `tsconfig.json` file in the package root. It should typically extend a base `tsconfig.json` from the monorepo to ensure consistent configuration.
   *   **Example:**
     
```json
     {
       "extends": "../../tsconfig.json",
       "compilerOptions": {
         "outDir": "./dist",
         "rootDir": "./src"
       },
       "include": ["src/**/*.ts"],
       "exclude": ["node_modules", "dist"]
     }
     ```


**7. Create Source Code:**
   *   Create a `src/` directory within your package and start writing your TypeScript or JavaScript code (e.g., `src/index.ts`).

**Key Files Involved:**

*   `packages/<your-package-name>/package.json`: Defines the package's metadata, scripts, and dependencies.
*   `packages/<your-package-name>/src/index.ts`: The main entry point for your package's source code.
*   `packages/<your-package-name>/tsconfig.json`: (Optional, for TypeScript packages) Configures the TypeScript compiler for the package.
*   `package.json` (root of the monorepo): Defines the Yarn workspaces, which implicitly includes your new package.

By following these steps, you can successfully integrate a new package into the Rocket.Chat monorepo, leveraging its established build and dependency management systems.

## Tool Calls (7 calls, 18,113 tokens)

**Step 1:** `plan({"question":"How do you create a new package in the Rocket.Chat monorepo?"})` → 118 tokens
**Step 2:** `wiki({"question":"Rocket.Chat monorepo package structure"})` → 941 tokens
**Step 3:** `search({"query":"package.json","layer":"packages"})` → 86 tokens
**Step 4:** `details({"filename":"package.json","symbolName":"package.json"})` → 43 tokens
**Step 5:** `graph({"query":"packages/core-typings","move":"expand","depth":1})` → 23 tokens
**Step 6:** `details({"filename":"package.json","symbolName":"name"})` → 71 tokens
**Step 7:** `search({"layer":"packages","query":"\"name\": \"@rocket.chat/"})` → 28 tokens

## Files Seen In Tool Results (3)

- `ee/packages/pdf-worker/.storybook/main.ts`
- `packages/core-typings/package.js`
- `apps/meteor/app/lib/server/functions/getUsernameSuggestion.ts`
