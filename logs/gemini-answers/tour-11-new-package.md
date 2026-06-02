# How do you create a new package in the Rocket.Chat monorepo?

## Gemini Answer

To create a new package in the Rocket.Chat monorepo, you would follow a standard monorepo package creation process, establishing a consistent directory structure and essential configuration files. While specific `create-package` scripts may exist, the fundamental steps involve manually setting up the necessary files and directories.

Here's the typical process and structure:

**1. Create the Package Directory:**
   - Navigate to the `packages/` directory in the monorepo root.
   - Create a new directory for your package, e.g., `packages/your-new-package`.

**2. Initialize `package.json`:**
   - Inside `packages/your-new-package/`, create a `package.json` file. This file defines your package's metadata, dependencies, and scripts.
   - You can copy and adapt a `package.json` from an existing simple package (e.g., `packages/core-services/package.json`) as a starting point. Key fields to include are:
     - `name`: `@rocket.chat/your-new-package` (using the `@rocket.chat` scope is standard)
     - `version`: Initial version, e.g., `0.0.1`
     - `description`: A brief description of your package
     - `main` and `types`: Entry points for JavaScript and TypeScript, respectively (e.g., `dist/index.js`, `dist/index.d.ts`)
     - `scripts`: Common scripts like `build`, `start`, `test`, `lint`
     - `dependencies` and `devDependencies`: Any external or internal packages your new package relies on.

**3. Configure TypeScript (`tsconfig.json`):**
   - Create a `tsconfig.json` file in `packages/your-new-package/`.
   - This file configures the TypeScript compiler for your package. Again, you can adapt one from an existing package. It will typically extend a base `tsconfig` from the monorepo root (e.g., `../../tsconfig.json`) and specify `rootDir`, `outDir`, and files to include.

**4. Set up Source Code Directory:**
   - Create a `src/` directory inside `packages/your-new-package/`.
   - This is where your main TypeScript source files will reside (e.g., `packages/your-new-package/src/index.ts`).

**5. (Optional) Testing Configuration:**
   - If your package will have tests, create a `jest.config.ts` (or similar for other testing frameworks) in `packages/your-new-package/`.
   - Example: `packages/core-services/jest.config.ts` indicates a testing setup.

**6. Build and Link:**
   - Once these files are in place, the monorepo's build system (e.g., Turborepo, Lerna, pnpm workspaces) will typically pick up the new package.
   - You might need to run a command like `pnpm install` or `pnpm build` from the monorepo root to install dependencies and build your new package, making it available to other packages in the monorepo.

**Example File Structure:**


```
packages/
└── your-new-package/
    ├── src/
    │   └── index.ts
    ├── package.json
    ├── tsconfig.json
    └── jest.config.ts (optional)
```


By following these steps, you establish a new package that adheres to the monorepo's conventions, allowing for proper dependency management, building, and testing within the Rocket.Chat ecosystem.

## Tool Calls (5 calls, 20,562 tokens)

**Step 1:** `search({"query":"create package","layer":"packages"})` → 15 tokens
**Step 2:** `search({"query":"package.json","layer":"packages"})` → 42 tokens
**Step 3:** `search({"query":"packages/core-services"})` → 336 tokens
**Step 4:** `implement({"filename":"packages/core-services/package.json","symbolName":"package.json"})` → 16 tokens
**Step 5:** `implement({"filename":"packages/core-services/package.json","symbolName":"*"})` → 14 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/5 |
| Symbols hit | 0/1 |
| Tool calls | 5 |
| Total tokens | 20,562 |
