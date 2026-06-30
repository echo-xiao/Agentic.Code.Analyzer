# How do you create a new package in the Rocket.Chat monorepo?

## Baseline Answer (no tools)

Creating a new package in the Rocket.Chat monorepo primarily involves using the `nx generate` command, as Rocket.Chat leverages Nx for workspace management. This ensures that the package is correctly integrated into the monorepo's build, test, and linting systems.

Here's a step-by-step guide:

### Prerequisites

Before you start, make sure you have:

1.  **Cloned the Rocket.Chat monorepo:**
    ```bash
    git clone https://github.com/RocketChat/Rocket.Chat.git
    cd Rocket.Chat
    ```
2.  **Installed dependencies:**
    ```bash
    pnpm install
    ```
    (or `npm install`, `yarn install` if you're not using pnpm as the preferred package manager)
3.  **Nx CLI installed globally or locally:**
    ```bash
    npm install -g nx # or pnpm install -g nx
    ```
    (If you don't install globally, you can prefix commands with `npx nx` or `pnpm nx`).

### Recommended Method: Using `nx generate`

This is the preferred and most robust way to create a new package because it handles most of the boilerplate, including `project.json`, `package.json`, `tsconfig.json`, and initial source files, and correctly registers the project with Nx.

1.  **Generate a new JavaScript/TypeScript library:**

    We'll use the `@nrwl/js:library` generator. It's crucial to place it in the `packages` directory and use the `@rocket.chat/` scope for the `importPath`.

    ```bash
    pnpm nx g @nrwl/js:library --name=my-new-package \
      --directory=packages \
      --publishable \
      --importPath=@rocket.chat/my-new-package \
      --compiler=swc \
      --unitTestRunner=vitest \
      --linter=eslint \
      --tags="scope:my-new-package,type:library" \
      --strict \
      --buildable
    ```

    Let's break down these options:

    *   `--name=my-new-package`: The project name within the Nx workspace. This will typically match the package's folder name.
    *   `--directory=packages`: This tells Nx to create the package inside the `packages/` folder.
    *   `--publishable`: Marks the library as publishable to an NPM registry. This sets up the `build` target correctly to produce distributable artifacts.
    *   `--importPath=@rocket.chat/my-new-package`: **Crucial!** This defines the public NPM scope and how other packages will import it. Always use `@rocket.chat/` for internal Rocket.Chat packages.
    *   `--compiler=swc`: Uses SWC for faster compilation. Rocket.Chat heavily uses SWC.
    *   `--unitTestRunner=vitest`: Sets up Vitest for unit testing, which is the preferred modern testing framework in Rocket.Chat.
    *   `--linter=eslint`: Configures ESLint for linting.
    *   `--tags="scope:my-new-package,type:library"`: Adds tags to the project for better dependency graph visualization and linting rules. You can customize `scope` to a more generic group if it's part of a larger domain.
    *   `--strict`: Enables strict TypeScript mode.
    *   `--buildable`: Makes the library buildable, even if it's not strictly publishable (often used together with `--publishable`).

2.  **Review the generated files:**

    Nx will create a new folder `packages/my-new-package` with the following structure:

    ```
    packages/
    └── my-new-package/
        ├── project.json            # Nx configuration for this project (build, test, lint targets)
        ├── package.json            # Standard NPM package metadata
        ├── tsconfig.json           # TypeScript configuration for this package
        ├── tsconfig.lib.json
        ├── tsconfig.spec.json
        ├── .eslintrc.json          # ESLint configuration
        ├── README.md               # Basic README
        ├── src/
        │   ├── index.ts            # Entry point for your library
        │   └── lib/my-new-package.spec.ts # Example test file
        └── vite.config.ts          # Vitest configuration
    ```

    It will also update files like `tsconfig.base.json` (to include the new path alias) and potentially `nx.json` (to register the new project).

3.  **Add `CHANGELOG.md`:**

    Rocket.Chat packages usually include a `CHANGELOG.md`. Create an empty one:
    ```bash
    touch packages/my-new-package/CHANGELOG.md
    ```

4.  **Initial Development and Testing:**

    *   Start adding your code to `packages/my-new-package/src/index.ts` and other source files.
    *   You can run tests for your new package:
        ```bash
        pnpm nx test my-new-package
        ```
    *   You can build your new package:
        ```bash
        pnpm nx build my-new-package
        ```
        The output will be in `dist/packages/my-new-package`.

5.  **Commit your changes:**
    ```bash
    git add .
    git commit -m "feat(my-new-package): initialize new package"
    ```

### Manual Creation (for deep understanding or troubleshooting)

While `nx generate` is preferred, understanding the manual steps is helpful. If you were to create a package manually, you would essentially replicate what `nx generate` does:

1.  **Create the package directory:**
    ```bash
    mkdir -p packages/my-new-package/src
    ```

2.  **Create `packages/my-new-package/package.json`:**

    ```json
    {
      "name": "@rocket.chat/my-new-package",
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
      "publishConfig": {
        "access": "public"
      },
      "scripts": {
        "build": "pnpm nx build",
        "test": "pnpm nx test"
      },
      "dependencies": {},
      "devDependencies": {
        "@nrwl/js": "YOUR_NX_VERSION",
        "@nrwl/vite": "YOUR_NX_VERSION",
        "@swc/cli": "YOUR_SWC_VERSION",
        "@swc/core": "YOUR_SWC_VERSION",
        "@types/node": "YOUR_NODE_TYPES_VERSION",
        "typescript": "YOUR_TS_VERSION",
        "vite": "YOUR_VITE_VERSION",
        "vitest": "YOUR_VITEST_VERSION",
        "eslint": "YOUR_ESLINT_VERSION"
        // ... (look at other packages for common devDependencies)
      }
    }
    ```
    *   **Important:** Replace `YOUR_NX_VERSION`, `YOUR_SWC_VERSION`, etc., with the versions used in the root `package.json` or other Rocket.Chat packages.

3.  **Create `packages/my-new-package/project.json`:**

    This file is critical for Nx to understand your project. It defines build, test, and lint targets.

    ```json
    {
      "name": "my-new-package",
      "$schema": "../../node_modules/nx/schemas/project-schema.json",
      "sourceRoot": "packages/my-new-package/src",
      "projectType": "library",
      "tags": ["scope:my-new-package", "type:library"],
      "targets": {
        "build": {
          "executor": "@nrwl/js:swc",
          "outputs": ["{options.outputPath}"],
          "options": {
            "outputPath": "dist/packages/my-new-package",
            "tsConfig": "packages/my-new-package/tsconfig.lib.json",
            "packageJson": "packages/my-new-package/package.json",
            "main": "packages/my-new-package/src/index.ts",
            "assets": ["packages/my-new-package/*.md"]
          },
          "configurations": {
            "production": {
              "minify": true
            }
          }
        },
        "test": {
          "executor": "@nrwl/vite:test",
          "outputs": ["{options.reportsDirectory}"],
          "options": {
            "passWithNoTests": true,
            "reportsDirectory": "../../coverage/packages/my-new-package"
          }
        },
        "lint": {
          "executor": "@nrwl/linter:eslint",
          "outputs": ["{options.outputFile}"],
          "options": {
            "lintFilePatterns": ["packages/my-new-package/**/*.ts"]
          }
        }
      }
    }
    ```

4.  **Create `packages/my-new-package/tsconfig.json` and `tsconfig.lib.json`:**

    `tsconfig.json`:
    ```json
    {
      "extends": "../../tsconfig.base.json",
      "compilerOptions": {
        "outDir": "../../dist/out-tsc",
        "declaration": true,
        "declarationMap": true
      },
      "files": [],
      "include": [],
      "references": [
        {
          "path": "./tsconfig.lib.json"
        },
        {
          "path": "./tsconfig.spec.json"
        }
      ]
    }
    ```

    `tsconfig.lib.json`:
    ```json
    {
      "extends": "./tsconfig.json",
      "compilerOptions": {
        "outDir": "../../dist/out-tsc",
        "module": "ESNext",
        "target": "ESNext",
        "lib": ["es2021"],
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "importHelpers": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "noFallthroughCasesInSwitch": true,
        "noImplicitReturns": true,
        "noPropertyAccessFromIndexSignature": true,
        "noUncheckedIndexedAccess": true,
        "noImplicitOverride": true,
        "noImplicitAny": true,
        "esModuleInterop": true,
        "resolveJsonModule": true,
        "moduleResolution": "node",
        "baseUrl": ".",
        "paths": {
          "@rocket.chat/my-new-package": ["./src/index.ts"]
        }
      },
      "include": ["src/**/*.ts"],
      "exclude": ["src/**/*.spec.ts"]
    }
    ```
    You would also need `tsconfig.spec.json` for tests, usually extending `tsconfig.lib.json`.

5.  **Create `packages/my-new-package/.eslintrc.json`:**

    ```json
    {
      "extends": ["../../.eslintrc.json"],
      "ignorePatterns": ["!**/*"],
      "overrides": [
        {
          "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
          "rules": {}
        },
        {
          "files": ["*.ts", "*.tsx"],
          "rules": {}
        },
        {
          "files": ["*.js", "*.jsx"],
          "rules": {}
        }
      ]
    }
    ```

6.  **Create `packages/my-new-package/src/index.ts`:**

    ```typescript
    export function myNewPackage(): string {
      return 'Hello from my-new-package!';
    }
    ```

7.  **Create `packages/my-new-package/CHANGELOG.md` and `README.md`.**

8.  **Update `tsconfig.base.json` (Root level):**

    You'd need to manually add the path mapping to the root `tsconfig.base.json` so TypeScript can resolve imports:

    ```json
    // tsconfig.base.json
    {
      "compilerOptions": {
        // ... other options
        "paths": {
          "@rocket.chat/my-new-package": ["packages/my-new-package/src/index.ts"],
          // ... existing paths
        }
      }
    }
    ```

### Using the New Package in Other Projects

Once your package is created, you can import and use it in other Rocket.Chat projects within the monorepo:

```typescript
// packages/another-package/src/some-file.ts
import { myNewPackage } from '@rocket.chat/my-new-package';

console.log(myNewPackage()); // Outputs: Hello from my-new-package!
```

When you define dependencies in `packages/another-package/project.json`, you should specify `@rocket.chat/my-new-package` in its `implicitDependencies` or directly in the `dependencies` array within `package.json` if it's a runtime dependency. Nx will handle the build order automatically.

```json
// packages/another-package/project.json
{
  // ...
  "implicitDependencies": ["my-new-package"], // This tells Nx that `another-package` depends on `my-new-package`
  // ...
}
```

By following the `nx generate` method, you ensure consistency and proper integration into the Rocket.Chat development workflow.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 4,946 |
| Model | gemini-2.5-flash |
| Tools | NONE |
