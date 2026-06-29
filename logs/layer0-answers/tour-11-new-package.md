# How do you create a new package in the Rocket.Chat monorepo?

## Baseline Answer (no tools)

Creating a new package in the Rocket.Chat monorepo involves a few standardized steps to ensure it integrates smoothly with the existing build system, tooling, and conventions. Rocket.Chat uses `pnpm` for package management and `Turborepo` for orchestrating builds.

Here's a step-by-step guide:

### 1. Create the Package Directory

Navigate to the `packages/` directory at the root of the Rocket.Chat monorepo and create a new folder for your package.
Packages are usually prefixed with `@rocket.chat/`.

```bash
cd packages/
mkdir your-new-package-name
cd your-new-package-name
```

For example, `packages/example-utils`.

### 2. Initialize `package.json`

Create a `package.json` file inside your new package directory. You can use `pnpm init` and then modify it, or create it manually.

**`packages/your-new-package-name/package.json`**

```json
{
  "name": "@rocket.chat/your-new-package-name",
  "version": "0.0.1",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsc -b",
    "dev": "tsc -b --watch",
    "clean": "rimraf dist tsconfig.tsbuildinfo",
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx --cache",
    "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --cache --fix",
    "test": "jest",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "@rocket.chat/eslint-config": "workspace:*",
    "@rocket.chat/prettier-config": "workspace:*",
    "@rocket.chat/tsconfig": "workspace:*",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.12.7",
    "eslint": "^8.57.0",
    "jest": "^29.7.0",
    "prettier": "^3.2.5",
    "rimraf": "^5.0.5",
    "ts-jest": "^29.1.2",
    "typescript": "5.4.5"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

**Key points for `package.json`:**
*   **`name`**: Follow the `@rocket.chat/` prefix for internal packages.
*   **`version`**: Start with `0.0.1` or `1.0.0` depending on initial stability.
*   **`type: "module"`**: Ensures ES Modules are used.
*   **`main`, `module`, `types`, `exports`**: Point to the compiled output files in `dist/`. `exports` is the modern and recommended way.
*   **`files: ["dist"]`**: Only publish the `dist` directory.
*   **`scripts`**: Include standard scripts like `build`, `dev`, `clean`, `lint`, `test`, `type-check`. These are picked up by Turborepo.
*   **`devDependencies`**:
    *   `"workspace:*" `: Use this for internal monorepo packages (like `@rocket.chat/eslint-config`, `@rocket.chat/prettier-config`, `@rocket.chat/tsconfig`) to automatically link them.
    *   Ensure `typescript` version matches the root `package.json`.
    *   Include necessary testing and linting tools.
*   **`publishConfig`**: Set `access: "public"` if you intend to publish this package to a public registry (like npmjs.com).

### 3. Configure TypeScript (`tsconfig.json`)

Create a `tsconfig.json` file in your package directory. It should extend from the monorepo's base `tsconfig.build.json` for consistent build options.

**`packages/your-new-package-name/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.build.json",
  "compilerOptions": {
    "composite": true,
    "rootDir": "src",
    "outDir": "dist",
    "declarationMap": true
  },
  "include": [
    "src"
  ],
  "exclude": [
    "dist",
    "node_modules"
  ],
  "references": []
}
```

**Key points for `tsconfig.json`:**
*   **`extends`**: Crucial to inherit shared configurations. For library packages, `../../tsconfig.build.json` is common. For UI packages, you might extend `../../tsconfig.react.json`.
*   **`composite: true`**: Required for `pnpm` and `Turborepo` to optimize incremental builds across packages.
*   **`rootDir`**: Specifies the directory where your source files are located.
*   **`outDir`**: Specifies the output directory for compiled JavaScript and type declaration files.
*   **`declarationMap: true`**: Generates source maps for declaration files, improving debuggability.
*   **`include`**: Specify directories to include (usually `src`).
*   **`exclude`**: Specify directories to exclude (usually `dist` and `node_modules`).
*   **`references`**: If your package depends on other internal monorepo packages, you would list them here (e.g., `{"path": "../other-internal-package"}`).

### 4. Configure ESLint (`.eslintrc.js`) and Prettier (`.prettierrc.js`)

While you can create dedicated config files, it's often sufficient to inherit from the monorepo's root configurations. If you need specific overrides, create them in your package.

**`packages/your-new-package-name/.eslintrc.js`** (Optional, if you need specific overrides)

```js
// .eslintrc.js
module.exports = {
  root: true,
  extends: ["@rocket.chat/eslint-config"], // Extends the monorepo's base config
  parserOptions: {
    project: ["./tsconfig.json"], // Important for type-aware linting
    tsconfigRootDir: __dirname,
  },
  rules: {
    // Add any package-specific linting rules here
  },
};
```

**`packages/your-new-package-name/.prettierrc.js`** (Optional, usually inherited)

```js
// .prettierrc.js
module.exports = {
  ...require('@rocket.chat/prettier-config'),
  // Add any package-specific prettier overrides here
};
```

### 5. Configure Jest (`jest.config.js`)

**`packages/your-new-package-name/jest.config.js`**

```js
module.exports = {
  ...require('../../jest.config.js'), // Extend from the root Jest config
  rootDir: './', // Jest's root directory for this package
  // Specific configurations for this package if needed
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Example for a setup file
};
```

**`packages/your-new-package-name/jest.setup.js`** (Optional, for global test setup)

```js
// Example setup file if needed
// import '@testing-library/jest-dom';
```

### 6. Create Source Code

Create your main source file, typically `src/index.ts`.

**`packages/your-new-package-name/src/index.ts`**

```typescript
export const greet = (name: string): string => {
  return `Hello, ${name}! Welcome to @rocket.chat/your-new-package-name!`;
};

export const add = (a: number, b: number): number => {
  return a + b;
};
```

### 7. Add Your Package to the Monorepo Workspaces

This is crucial for `pnpm` to recognize your new package and link its dependencies correctly.

Edit the root `pnpm-workspace.yaml` file:

**`pnpm-workspace.yaml`** (at the monorepo root)

```yaml
packages:
  # ... other packages
  - 'packages/your-new-package-name'
```

### 8. Install Dependencies

From the monorepo root, run `pnpm install` to link your new package and its dependencies.

```bash
pnpm install
```

### 9. Build and Test Your Package

You can now build and test your package:

**Build:**
From the package directory:
```bash
pnpm build
```
From the monorepo root (using Turborepo filters):
```bash
pnpm --filter @rocket.chat/your-new-package-name build
```

**Run tests:**
From the package directory:
```bash
pnpm test
```
From the monorepo root:
```bash
pnpm --filter @rocket.chat/your-new-package-name test
```

### 10. Using Your New Package

You can now import your new package into other internal monorepo packages or applications.

In another package's `package.json`:

```json
{
  "dependencies": {
    "@rocket.chat/your-new-package-name": "workspace:*"
  }
}
```

Then, in your TypeScript code:

```typescript
import { greet, add } from '@rocket.chat/your-new-package-name';

console.log(greet('Architect')); // Output: Hello, Architect! Welcome to @rocket.chat/your-new-package-name!
console.log(add(5, 3));        // Output: 8
```

Remember to run `pnpm install` at the root whenever you add a new internal dependency.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 4,081 |
| Model | gemini-2.5-flash |
| Tools | NONE |
