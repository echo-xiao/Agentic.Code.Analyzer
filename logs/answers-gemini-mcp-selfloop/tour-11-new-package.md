# How do you create a new package in the Rocket.Chat monorepo?

## Gemini Answer

To create a new package in the Rocket.Chat monorepo, you typically follow a structured manual process that mirrors existing packages, rather than using an automated script. This involves setting up the necessary directory structure and configuration files.

Here's a breakdown of the steps and key files, using `packages/web-ui-registration` as an example of an existing package structure:

**Call Chain (Inferred from common monorepo practices):**

1.  **Create Directory:** Manually create a new folder for your package:
    `packages/your-new-package-name/`
    (or `ee/packages/your-new-package-name/` for enterprise features).

2.  **Initialize `package.json`:** Create the primary configuration file for your package.
    *   **File:** `packages/your-new-package-name/package.json`
    *   **Purpose:** Defines package metadata, dependencies, scripts, and entry points.
    *   **Key fields to include:**
        *   `name`: e.g., `@rocket.chat/your-new-package-name`
        *   `version`: e.g., `1.0.0`
        *   `private`: `true` (for internal monorepo packages)
        *   `main`: `dist/index.js` (JavaScript entry point after build)
        *   `types`: `dist/index.d.ts` (TypeScript declaration file)
        *   `scripts`: e.g., `"build": "tsc -p tsconfig.json"`, `"lint": "eslint src --ext .ts,.tsx"`
        *   `dependencies`, `devDependencies`, `peerDependencies`: List external and internal package requirements.

3.  **Create `tsconfig.json`:** Configure TypeScript compilation for your package.
    *   **File:** `packages/your-new-package-name/tsconfig.json`
    *   **Purpose:** Extends the monorepo's base TypeScript configuration and defines package-specific options.
    *   **Key fields to include:**
        *   `extends`: Typically `@rocket.chat/tsconfig/references/packages`
        *   `compilerOptions`: e.g., `"rootDir": "./src"`, `"outDir": "./dist"`
        *   `include`: e.g., `"./src"`
        *   `references`: List any other internal monorepo packages your package depends on.

4.  **Create Source Entry Point:** Set up your main source code directory and file.
    *   **File:** `packages/your-new-package-name/src/index.ts`
    *   **Purpose:** The main entry point for your package's logic.

5.  **Monorepo Integration (Root `package.json`):** Ensure the root `package.json` of the monorepo includes your new package in its `workspaces` configuration. This is crucial for `yarn` or `npm` to recognize and link your new package.

    *   **File:** `package.json` (at the monorepo root)
    *   **Purpose:** Lists all packages managed by the monorepo.
    *   **Example entry (if not already covered by a wildcard):**
        
```json
        "workspaces": [
          "packages/*",
          "ee/packages/*",
          "packages/your-new-package-name"
        ]
        ```


6.  **Install Dependencies:** After setting up the files, run your package manager's install command from the monorepo root:
    `yarn install`

This process ensures your new package is correctly integrated into the Rocket.Chat monorepo, allowing for proper dependency resolution, build processes, and linting.

## Tool Calls (6 calls, 18,981 tokens)

**Step 1:** `search({"query":"create package","layer":"packages"})` → 369 tokens
**Step 2:** `search({"query":"new package template"})` → 16 tokens
**Step 3:** `search({"query":"package.json","layer":"packages"})` → 77 tokens
**Step 4:** `search({"query":"index.ts","layer":"packages"})` → 363 tokens
**Step 5:** `implement({"symbolName":"index.ts","filename":"packages/web-ui-registration/src/index.ts"})` → 45 tokens
**Step 6:** `implement({"filename":"packages/web-ui-registration/package.json","symbolName":"package.json"})` → 47 tokens
