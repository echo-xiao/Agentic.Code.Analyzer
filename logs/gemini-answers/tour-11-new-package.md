# How do you create a new package in the Rocket.Chat monorepo?

## Gemini Answer

I was unable to find a dedicated script for creating new packages by searching for `create-package`, `lerna.json`, or `plopfile.js`. This suggests that creating a new package is a manual process.

Based on the standard structure of a JavaScript monorepo, here is the likely process:

1.  **Create a new directory**: Navigate to the `packages/` directory at the root of the monorepo and create a new folder for your package. The name should be descriptive of its function (e.g., `packages/new-package`).

2.  **Initialize `package.json`**: Inside your new package directory, create a `package.json` file. You can do this by running `npm init` or by creating the file manually. It should include standard fields like `name`, `version`, `main`, `dependencies`, and `devDependencies`. The package name should be scoped, like `@rocket.chat/new-package`.

3.  **Add a `tsconfig.json`**: Since Rocket.Chat uses TypeScript, you will need to add a `tsconfig.json` file to your new package's directory. You can usually copy this from an existing package and modify it as needed.

4.  **Update Root Dependencies**: After creating the new package, you need to run the package manager's install command from the root of the monorepo. This will link the new package and install any dependencies. The command is likely `yarn` or `npm install`.

5.  **Build the package**: Add a `build` script to your new package's `package.json` that compiles the TypeScript code. Then you can run it to make sure your package builds correctly.

Without a dedicated script, you must manually create the files and structure, then rely on the monorepo's tooling (like Yarn workspaces or Lerna) to link everything together.

## Tool Calls (8 calls, 20,014 tokens)

**Step 1:** `search({"query":"create-package"})` → 15 tokens
**Step 2:** `search({"query":"create-package.mjs"})` → 16 tokens
**Step 3:** `search({"query":"prompt package name"})` → 16 tokens
**Step 4:** `search({"query":"lerna.json"})` → 14 tokens
**Step 5:** `search({"query":"plopfile.js"})` → 14 tokens
**Step 6:** `search({"query":"\"new package\""})` → 14 tokens
**Step 7:** `search({"query":"\"workspaces\":"})` → 14 tokens
**Step 8:** `search({"query":"build:packages"})` → 15 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 0/5 |
| Symbols hit | 0/1 |
| Tool calls | 8 |
| Total tokens | 20,014 |
| Pass | NO |
