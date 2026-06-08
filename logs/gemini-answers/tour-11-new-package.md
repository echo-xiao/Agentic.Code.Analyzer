# How do you create a new package in the Rocket.Chat monorepo?

## Gemini Answer

To create a new package in the Rocket.Chat monorepo, you generally follow these steps, inspired by the structure of existing packages like `packages/ui-kit/`:

1.  **Create the Package Directory**:
    Create a new folder for your package inside the `packages/` directory. For example, `packages/my-new-package/`.

2.  **Initialize `package.json`**:
    Inside your new package directory (`packages/my-new-package/`), create a `package.json` file. This file defines your package's metadata, dependencies, and scripts.

    *   **Essential fields**:
        *   `name`: A unique name for your package (e.g., `@rocket.chat/my-new-package`).
        *   `version`: An initial version number (e.g., `1.0.0`).
        *   `main`, `module`, `types`: These specify the entry points for CommonJS, ES modules, and TypeScript declaration files, respectively (e.g., `"main": "lib/index.js"`, `"module": "src/index.ts"`, `"types": "src/index.ts"`).
        *   `scripts`: Define commands for building, testing, linting, etc. (e.g., `"build": "tsc"`, `"test": "jest"`).
        *   `dependencies`, `devDependencies`, `peerDependencies`: List any other packages your new package relies on.
    *   **Example from existing packages (inferred)**:
        *   `packages/ui-kit/package.json` would contain similar definitions for the `ui-kit` package.

3.  **Configure TypeScript (`tsconfig.json`)**:
    Add a `tsconfig.json` file to your package's root directory (`packages/my-new-package/tsconfig.json`). This configures TypeScript for your package. It often extends a base `tsconfig` from the monorepo to ensure consistency.

    *   **Example from existing packages**:
        *   `packages/ui-kit/tsconfig.json` defines the TypeScript compilation settings for the `ui-kit` package.

4.  **Create Source Code Directory (`src/`)**:
    Create a `src/` directory within your package (`packages/my-new-package/src/`). This will house your package's source code.

5.  **Define Main Entry Point (`src/index.ts`)**:
    Inside the `src/` directory, create an `index.ts` file (`packages/my-new-package/src/index.ts`). This file serves as the main entry point for your package, exporting its public API (functions, classes, interfaces).

    *   **Example from existing packages**:
        *   `packages/ui-kit/src/index.ts` is the main entry point for the `ui-kit` package.

6.  **Add Testing Configuration (e.g., `jest.config.ts`)**:
    If your package will have tests, include a testing configuration file, such as `jest.config.ts`, in the package's root (`packages/my-new-package/jest.config.ts`).

    *   **Example from existing packages**:
        *   `packages/ui-kit/jest.config.ts` defines the Jest testing configuration for the `ui-kit` package.

7.  **Add Documentation (`README.md`)**:
    It's good practice to include a `README.md` file in your package's root to describe its purpose, how to use it, and any other relevant information.

8.  **Integrate with Monorepo Workspaces**:
    Finally, you'll likely need to inform the monorepo's package manager (e.g., Yarn or npm workspaces) about your new package. This usually involves adding the path to your new package in the `workspaces` array within the root `package.json` of the monorepo.

**Call Chain (Inferred Structure):**

The process of creating a new package is not a direct code execution flow but rather a structural setup. The understanding is derived from observing the file structure of an existing package:

`packages/ui-kit/`
`  → packages/ui-kit/package.json` (defines the package)
`  → packages/ui-kit/tsconfig.json` (TypeScript configuration)
`  → packages/ui-kit/src/` (source code directory)
`    → packages/ui-kit/src/index.ts` (main entry point)
`  → packages/ui-kit/jest.config.ts` (testing configuration)

## Tool Calls (6 calls, 17,294 tokens)

**Step 1:** `search({"query":"package.json","layer":"packages"})` → 77 tokens
**Step 2:** `search({"layer":"packages","query":"ui-kit"})` → 370 tokens
**Step 3:** `search({"query":"packages/ui-kit/package.json"})` → 18 tokens
**Step 4:** `implement({"symbolName":"package.json","filename":"packages/ui-kit/package.json"})` → 40 tokens
**Step 5:** `search({"query":"packages/ui-kit/src/index.ts"})` → 59 tokens
**Step 6:** `implement({"filename":"packages/ui-kit/src/index.ts","symbolName":"index"})` → 15 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/5 |
| Symbols hit | 0/1 |
| Tool calls | 6 |
| Total tokens | 17,294 |
| Pass | NO |
