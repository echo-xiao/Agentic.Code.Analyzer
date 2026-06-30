# How do you create a new package in the Rocket.Chat monorepo?

## Baseline Answer (no tools)

Creating a new package in the Rocket.Chat monorepo involves a few steps, leveraging Yarn Workspaces and the existing tooling for TypeScript, building, and linting. New packages are typically placed in the `packages/` directory.

Here's a step-by-step guide:

### 1. Create the Package Directory

Navigate to the `packages/` directory and create a new folder for your package. It's common practice to use a hyphen-separated name.

```bash
cd packages/
mkdir my-new-package
cd my-new-package
```

### 2. Initialize `package.json`

Create a `package.json` file. Rocket.Chat uses the `@rocket.chat/` scope for its internal packages.

```json
// packages/my-new-package/package.json
{
  "name": "@rocket.chat/my-new-package",
  "version": "0.0.1",
  "description": "A brief description of what your package does.",
  "license": "MIT",
  "private": false,
  "publishConfig": {
    "access": "public"
  },
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "lint": "eslint . --ext .ts,.tsx --cache",
    "lint:fix": "eslint . --ext .ts,.tsx --cache --fix",
    "test": "vitest run",
    "test:watch": "vitest watch"
  },
  "devDependencies": {
    "@rocket.chat/eslint-config": "workspace:~",
    "@rocket.chat/tsconfig": "workspace:~",
    "@types/node": "^20.11.5",
    "eslint": "^8.56.0",
    "tsup": "^8.0.1",
    "typescript": "~5.3.3",
    "vitest": "^1.2.1"
  },
  "peerDependencies": {
    "react": ">=18.0.0"
  }
}
```

**Key points in `package.json`:**

*   **`name`**: Must be scoped as `@rocket.chat/your-package-name`.
*   **`version`**: Start with `0.0.1`. Versioning is typically managed by Changesets for releases.
*   **`main`, `module`, `types`**: These point to the output files after building, usually in a `dist/` directory.
*   **`files`**: Specifies which files/directories to include when the package is published.
*   **`scripts`**:
    *   `build`: Uses `tsup` for building.
    *   `lint`: Uses `eslint` with the shared `@rocket.chat/eslint-config`.
    *   `test`: Uses `vitest` for testing.
*   **`devDependencies`**:
    *   `@rocket.chat/eslint-config`: Uses the shared ESLint configuration.
    *   `@rocket.chat/tsconfig`: Uses the shared TypeScript configuration.
    *   `tsup`: The build tool.
    *   `vitest`: The testing framework.
*   **`peerDependencies`**: If your package depends on a specific version of a library that consumers of your package should also provide (e.g., React), list it here.

### 3. Create `tsconfig.json`

Create a `tsconfig.json` file that extends the base Rocket.Chat TypeScript configuration.

```json
// packages/my-new-package/tsconfig.json
{
  "extends": "@rocket.chat/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

**Key points in `tsconfig.json`:**

*   **`extends`**: Points to the shared base TypeScript configuration located at `packages/tsconfig/base.json`.
*   **`compilerOptions.outDir`**: Where compiled JavaScript and type definitions will be placed.
*   **`compilerOptions.rootDir`**: The root directory for your source files.
*   **`include`**: Specifies which files to include in the compilation.
*   **`exclude`**: Specifies files to exclude.

### 4. Configure `tsup`

Create a `tsup.config.ts` file for your build configuration.

```typescript
// packages/my-new-package/tsup.config.ts
import { tsupConfig } from '@rocket.chat/ts-build-tools';

export default tsupConfig({
  // If your package has React components, uncomment the following line:
  // react: true,
});
```

**Key points in `tsup.config.ts`:**

*   **`@rocket.chat/ts-build-tools`**: This package provides a standardized `tsup` configuration for Rocket.Chat packages, located at `packages/ts-build-tools/src/tsup.ts`.
*   You can pass options to `tsupConfig` if your package has specific needs (e.g., `react: true` for React components).

### 5. Create Source Files

Create your main source file (e.g., `src/index.ts` or `src/index.tsx` if it's a React component).

```bash
mkdir src
touch src/index.ts
```

```typescript
// packages/my-new-package/src/index.ts
export const sayHello = (name: string): string => {
  return `Hello, ${name}! Welcome to @rocket.chat/my-new-package.`;
};
```

### 6. Install Dependencies

Go back to the monorepo root and run `yarn install` to hoist and link the new package's dependencies.

```bash
cd ../../ # From packages/my-new-package to monorepo root
yarn install
```

Yarn Workspaces will automatically detect the new package in `packages/my-new-package` and link it.

### 7. Build and Test

You can now build and test your new package:

```bash
cd packages/my-new-package
yarn build
yarn test
```

Or from the monorepo root:

```bash
yarn workspace @rocket.chat/my-new-package build
yarn workspace @rocket.chat/my-new-package test
```

### 8. Add to `changeset` (Optional, but recommended for future releases)

If your package is intended to be released, you'll want to create an initial changeset.

```bash
yarn changeset add
```

Follow the prompts to describe the initial change (e.g., "feat: Initial package setup"). This will create a markdown file in `.changeset/` that will be used to generate release notes and update versions.

### Example File Paths:

*   `packages/my-new-package/package.json`
*   `packages/my-new-package/tsconfig.json`
*   `packages/my-new-package/tsup.config.ts`
*   `packages/my-new-package/src/index.ts`

By following these steps, you'll have a new, properly configured package within the Rocket.Chat monorepo, ready for development and integration with other internal packages.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 2,150 |
| Model | gemini-2.5-flash |
| Tools | NONE |
