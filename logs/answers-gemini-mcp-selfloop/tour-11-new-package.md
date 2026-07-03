# How do you create a new package in the Rocket.Chat monorepo?

## Plan

intent: pattern

## Gemini Answer

To create a new package in the Rocket.Chat monorepo, which utilizes pnpm workspaces, you generally follow these steps:

1.  **Create a new directory for your package:**
    Navigate to the `packages/` directory in the Rocket.Chat monorepo root. This directory is where all individual packages are located. Create a new subdirectory for your package, for example, `packages/my-new-package`.

2.  **Initialize a `package.json` file:**
    Inside your new package directory (`packages/my-new-package`), create a `package.json` file. You can do this manually or by running `pnpm init` within that directory. This file will define your package's name, version, dependencies, and scripts.

    Example `package.json`:
    
```json
    {
      "name": "@rocket.chat/my-new-package",
      "version": "1.0.0",
      "description": "A new package for Rocket.Chat",
      "main": "dist/index.js",
      "types": "dist/index.d.ts",
      "scripts": {
        "build": "your-build-command",
        "test": "your-test-command"
      },
      "dependencies": {
        // your package dependencies
      },
      "devDependencies": {
        // your package dev dependencies
      },
      "publishConfig": {
        "access": "public"
      }
    }
    ```


3.  **Add the new package to the monorepo's workspaces:**
    The Rocket.Chat monorepo's root `package.json` file (located at the top level of the repository) contains a `workspaces` field. You need to add the path to your new package to this array.

    For example, if your new package is at `packages/my-new-package`, you would add `"packages/my-new-package"` to the `workspaces` array in the root `package.json`.

    Example of a `workspaces` field in the root `package.json`:
    
```json
    {
      "name": "rocket.chat",
      "version": "6.0.0",
      "private": true,
      "workspaces": [
        "apps/*",
        "packages/*",
        "ee/packages/*",
        "packages/my-new-package" // Add your new package here
      ],
      "scripts": {
        // ...
      }
    }
    ```


4.  **Run `pnpm install`:**
    After modifying the root `package.json`, navigate to the monorepo's root directory and run `pnpm install`. This command will discover your new package, hoist its dependencies, and create the necessary symlinks within the monorepo, making it available to other packages.

This process ensures that your new package is properly integrated into the Rocket.Chat monorepo and can be managed by pnpm. Existing packages, such as `packages/apps-engine/package.json`, follow a similar structure within the `packages` directory.

## Tool Calls (8 calls, 16,431 tokens)

**Step 1:** `plan({"question":"How do you create a new package in the Rocket.Chat monorepo?","intent":"pattern"})` → 250 tokens
**Step 2:** `search({"query":"create package"})` → 26 tokens
**Step 3:** `search({"query":"new package"})` → 25 tokens
**Step 4:** `search({"query":"workspace"})` → 415 tokens
**Step 5:** `search({"query":"create-package"})` → 26 tokens
**Step 6:** `search({"query":"pnpm-workspace.yaml"})` → 27 tokens
**Step 7:** `search({"query":"package.json"})` → 360 tokens
**Step 8:** `details({"symbolName":"AppPackageParser","filename":"AppPackageParser.ts"})` → 251 tokens

## Files Seen In Tool Results (25)

- `packages/release-action/src/fixWorkspaceVersionsBeforePublish.ts`
- `packages/models/src/models/WorkspaceCredentials.ts`
- `packages/model-typings/src/models/IWorkspaceCredentialsModel.ts`
- `packages/core-typings/src/IWorkspaceInfo.ts`
- `packages/core-typings/src/ee/IWorkspaceCredentials.ts`
- `packages/core-typings/src/cloud/WorkspaceSyncPayload.ts`
- `packages/core-typings/src/cloud/WorkspaceLicensePayload.ts`
- `packages/apps-engine/src/server/bridges/CloudWorkspaceBridge.ts`
- `packages/apps-engine/src/server/accessors/CloudWorkspaceRead.ts`
- `packages/apps-engine/src/definition/cloud/IWorkspaceToken.ts`
- `packages/apps-engine/src/definition/accessors/ICloudWorkspaceRead.ts`
- `apps/meteor/lib/errors/CloudWorkspaceRegistrationError.ts`
- `apps/meteor/lib/errors/CloudWorkspaceLicenseError.ts`
- `apps/meteor/lib/errors/CloudWorkspaceError.ts`
- `apps/meteor/lib/errors/CloudWorkspaceConnectionError.ts`
- `packages/apps-engine/src/server/compiler/AppPackageParser.ts`
- `ee/packages/pdf-worker/.storybook/main.ts`
- `packages/fuselage-ui-kit/.storybook/main.ts`
- `packages/fuselage-ui-kit/.storybook/preview.tsx`
- `packages/ui-video-conf/.storybook/main.ts`
- `packages/ui-composer/.storybook/main.ts`
- `packages/web-ui-registration/.storybook/main.ts`
- `packages/web-ui-registration/.storybook/preview.tsx`
- `packages/livechat/.storybook/preview.tsx`
- `packages/livechat/webpack.config.ts`
