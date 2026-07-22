# How do you create a new package in the Rocket.Chat monorepo?

## Plan

intent: unknown

## Gemini Answer

To create a new package in the Rocket.Chat monorepo, which utilizes Yarn Workspaces, follow these steps:

1.  **Create a new directory for your package:**
    Navigate to the `packages/` directory at the root of the Rocket.Chat repository. Create a new folder for your package, for example:
    `packages/my-new-package`

2.  **Create a `package.json` file for your new package:**
    Inside your newly created package directory (`packages/my-new-package/`), create a `package.json` file. This file will define your package's metadata, dependencies, and scripts. A basic `package.json` might look like this:

    
```json
    {
      "name": "@rocket.chat/my-new-package",
      "version": "1.0.0",
      "description": "A description of my new package",
      "main": "src/index.ts",
      "types": "src/index.ts",
      "scripts": {
        "lint": "eslint .",
        "build": "tsc"
      },
      "dependencies": {
        // Add any dependencies specific to this package
      },
      "devDependencies": {
        // Add any development dependencies
      }
    }
    ```


3.  **Add the new package to the root `package.json` workspaces:**
    The Rocket.Chat monorepo's root `package.json` (located at the repository's top level: `package.json`) defines the `workspaces` array. You need to add the path to your new package to this array. For example, if your package is in `packages/my-new-package`, you would add `"packages/my-new-package"` to the `workspaces` array.

    The relevant file for this step is:
    *   `package.json` (at the repository root)

    After this, run `yarn install` at the root of the monorepo to link your new package within the workspace.

This process ensures that Yarn recognizes your new package as part of the monorepo, allowing for proper dependency management and cross-package referencing.

## Tool Calls (7 calls, 41,603 tokens)

**Step 1:** `wiki({"question":"How do you create a new package in the Rocket.Chat monorepo?"})` → 3882 tokens
**Step 2:** `search({"query":"create new package monorepo"})` → 29 tokens
**Step 3:** `search({"query":"yarn workspace"})` → 95 tokens
**Step 4:** `search({"query":"package.json"})` → 360 tokens
**Step 5:** `search({"query":"package.json"})` → 360 tokens
**Step 6:** `details({"symbolName":"package.json","filename":"package.json"})` → 32 tokens
**Step 7:** `search({"query":"workspaces"})` → 314 tokens

## Files Seen In Tool Results (52)

- `apps/meteor/server/services/nps/service.ts`
- `packages/models/src/models/Nps.ts`
- `apps/meteor/server/services/nps/notification.ts`
- `apps/meteor/server/services/nps/getAndCreateNpsSurvey.ts`
- `packages/models/src/models/NpsVote.ts`
- `apps/meteor/server/cron/nps.ts`
- `apps/meteor/app/version-check/server/index.ts`
- `apps/meteor/app/version-check/server/functions/checkVersionUpdate.ts`
- `apps/meteor/app/version-check/server/functions/getNewUpdates.ts`
- `apps/meteor/client/views/room/index.ts`
- `apps/meteor/app/apps/server/bridges/messages.ts`
- `apps/meteor/ee/server/local-services/instance/service.ts`
- `apps/meteor/app/utils/client/lib/SDKClient.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/modify/ModifyCreator.ts`
- `packages/apps-engine/src/server/accessors/ModifyExtender.ts`
- `apps/meteor/app/apps/server/bridges/uploads.ts`
- `apps/meteor/client/lib/chats/data.ts`
- `apps/meteor/app/apps/server/converters/messages.js`
- `ee/packages/network-broker/src/NetworkBroker.ts`
- `packages/apps-engine/src/server/compiler/AppPackageParser.ts`
- `apps/meteor/app/apps/server/bridges/rooms.ts`
- `apps/meteor/app/apps/server/converters/settings.js`
- `packages/apps-engine/src/server/accessors/ContactCreator.ts`
- `apps/meteor/client/views/account/accessibility/hooks/useCreateFontStyleElement.ts`
- `packages/apps-engine/src/definition/accessors/IApiExtend.ts`
- `packages/apps-engine/src/server/compiler/AppCompiler.ts`
- `apps/meteor/server/lib/cas/createNewUser.ts`
- `apps/meteor/ee/server/apps/storage/AppRealStorage.ts`
- `packages/apps-engine/src/definition/accessors/IModify.ts`
- `apps/meteor/client/lib/e2ee/logger.ts`
- `packages/ddp-client/src/DDPSDK.ts`
- `apps/meteor/server/settings/index.ts`
- `apps/meteor/app/apps/server/converters/rooms.js`
- `apps/meteor/app/apps/server/converters/users.js`
- `packages/release-action/src/fixWorkspaceVersionsBeforePublish.ts`
- `ee/packages/pdf-worker/.storybook/main.ts`
- `packages/fuselage-ui-kit/.storybook/main.ts`
- `packages/fuselage-ui-kit/.storybook/preview.tsx`
- `packages/ui-video-conf/.storybook/main.ts`
- `packages/ui-composer/.storybook/main.ts`
- `packages/web-ui-registration/.storybook/main.ts`
- `packages/web-ui-registration/.storybook/preview.tsx`
- `packages/livechat/.storybook/preview.tsx`
- `packages/livechat/webpack.config.ts`
- `packages/core-typings/src/cloud/WorkspaceSyncPayload.ts`
- `apps/meteor/client/views/admin/workspace/VersionCard/modals/RegisterWorkspaceSetupModal/index.tsx`
- `apps/meteor/client/views/admin/workspace/VersionCard/modals/RegisterWorkspaceSetupModal/RegisterWorkspaceSetupStepTwoModal.tsx`
- `apps/meteor/client/views/admin/workspace/VersionCard/modals/RegisterWorkspaceSetupModal/RegisterWorkspaceSetupStepOneModal.tsx`
- `apps/meteor/client/views/admin/workspace/VersionCard/modals/RegisterWorkspaceSetupModal/RegisterWorkspaceSetupModal.tsx`
- `apps/meteor/client/views/admin/subscription/hooks/useWorkspaceSync.ts`
- `apps/meteor/app/cloud/server/functions/startRegisterWorkspaceSetupWizard.ts`
- `apps/meteor/app/cloud/server/functions/syncWorkspace/fetchWorkspaceSyncPayload.ts`
