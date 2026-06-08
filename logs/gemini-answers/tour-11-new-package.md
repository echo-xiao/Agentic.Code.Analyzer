# How do you create a new package in the Rocket.Chat monorepo?

## Gemini Answer

Creating a new package in the Rocket.Chat monorepo typically involves a manual process, as no dedicated script for "create package" was found within the codebase via search.

Here are the general steps to create a new package:

1.  **Create a New Directory**:
    *   Navigate to the `packages/` directory at the root of the monorepo.
    *   Create a new directory for your package (e.g., `packages/your-new-package`).

2.  **Initialize `package.json`**:
    *   Inside your new package directory (`packages/your-new-package`), create a `package.json` file.
    *   Populate it with essential information such as `name`, `version`, `description`, `main` (entry point), and `scripts` (e.g., `build`, `test`).

    Example `package.json`:
    
```json
    {
      "name": "@rocket.chat/your-new-package",
      "version": "1.0.0",
      "description": "A brief description of your new package",
      "main": "src/index.ts",
      "types": "src/index.ts",
      "scripts": {
        "build": "tsc",
        "start": "tsc --watch"
      },
      "dependencies": {
        // Add dependencies here
      },
      "devDependencies": {
        "@tsconfig/recommended": "1.0.1",
        "typescript": "4.9.5"
      },
      "publishConfig": {
        "access": "public"
      }
    }
    ```


3.  **Add `tsconfig.json` (for TypeScript packages)**:
    *   If your package uses TypeScript, create a `tsconfig.json` file in your new package directory.
    *   This file will configure the TypeScript compiler for your package.

    Example `tsconfig.json`:
    
```json
    {
      "extends": "@tsconfig/recommended/tsconfig.json",
      "compilerOptions": {
        "rootDir": "./src",
        "outDir": "./dist",
        "declaration": true,
        "tsBuildInfoFile": "node_modules/.tsbuildinfo"
      },
      "include": ["src"],
      "references": [
        // Add references to other internal packages if needed
      ]
    }
    ```


4.  **Install Dependencies and Bootstrap**:
    *   After creating the directory and basic configuration files, run the monorepo's package manager command to install dependencies and link the new package. Rocket.Chat uses Lerna and Yarn Workspaces, so you would typically run:
        
```bash
        yarn
        ```

        or if using Lerna directly:
        
```bash
        npx lerna bootstrap
        ```

    *   These commands will discover your new package, install its dependencies, and create symlinks for any local dependencies within the monorepo.

**Call Chain:**
The creation process is manual, involving direct interaction with the file system and running monorepo-level commands.

**Key Files/Paths:**
*   `packages/your-new-package/`: The directory for your new package.
*   `packages/your-new-package/package.json`: Defines the package's metadata and scripts.
*   `packages/your-new-package/tsconfig.json`: (For TypeScript) Configures TypeScript compilation.

## Tool Calls (4 calls, 12,070 tokens)

**Step 1:** `search({"query":"create package"})` → 15 tokens
**Step 2:** `search({"query":"package","layer":"packages"})` → 556 tokens
**Step 3:** `search({"query":"lerna.json"})` → 14 tokens
**Step 4:** `search({"layer":"server","query":"create-package"})` → 15 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/5 |
| Symbols hit | 0/1 |
| Tool calls | 4 |
| Total tokens | 12,070 |
| Pass | NO |
