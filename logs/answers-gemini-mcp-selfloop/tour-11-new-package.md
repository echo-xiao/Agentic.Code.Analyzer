# How do you create a new package in the Rocket.Chat monorepo?

## Gemini Answer

I was unable to find a definitive guide or tool within the Rocket.Chat codebase for creating a new package. My searches for "create package", "new-package", "generate package", "yarn workspace", and "CONTRIBUTING.md" did not yield specific instructions or scripts for this process.

While I found many `package.json` files and references to existing packages, I could not locate a clear pattern or utility for generating a new one. This suggests that the process might involve manual creation and configuration, or that the relevant information is not directly discoverable through code navigation alone.

To create a new package in the Rocket.Chat monorepo, you would likely need to:

1.  **Manually create a new directory** within the `packages/` directory.
2.  **Create a `package.json` file** inside this new directory, defining the package's name, version, dependencies, and scripts. You can refer to existing `package.json` files in other packages (e.g., `packages/web-ui-registration/package.json`) for structure and common configurations.
3.  **Add source code** (e.g., TypeScript files) to the new package.
4.  **Configure build processes** (e.g., `tsconfig.json`, webpack configurations) if necessary, again by referencing existing packages.
5.  **Integrate the new package** into the monorepo's build system, which likely involves updating the root `package.json` workspaces or other configuration files.

Without a dedicated tool or explicit documentation within the codebase, the exact steps for integration would require further investigation into the monorepo's build and dependency management.

## Tool Calls (8 calls, 20,502 tokens)

**Step 1:** `plan({"question":"How do you create a new package in the Rocket.Chat monorepo?","intent":"pattern"})` → 80 tokens
**Step 2:** `search({"query":"create package"})` → 26 tokens
**Step 3:** `search({"query":"new-package"})` → 25 tokens
**Step 4:** `search({"query":"generate","layer":"packages"})` → 384 tokens
**Step 5:** `search({"query":"package"})` → 667 tokens
**Step 6:** `search({"query":"yarn workspace"})` → 95 tokens
**Step 7:** `search({"query":"package.json"})` → 360 tokens
**Step 8:** `search({"query":"CONTRIBUTING.md"})` → 26 tokens

## Files Seen In Tool Results (49)

- `packages/message-parser/tests/helpers.ts`
- `packages/message-parser/src/utils.ts`
- `apps/meteor/tests/unit/server/services/calendar/statusEvents/generateCronJobId.tests.ts`
- `apps/meteor/server/startup/generateKeys.ts`
- `apps/meteor/server/services/calendar/statusEvents/generateCronJobId.ts`
- `apps/meteor/lib/utils/generatePath.ts`
- `apps/meteor/imports/personal-access-tokens/server/api/methods/regenerateToken.ts`
- `apps/meteor/imports/personal-access-tokens/server/api/methods/generateToken.ts`
- `apps/meteor/app/smarsh-connector/server/functions/generateEml.ts`
- `apps/meteor/app/lib/server/lib/generatePassword.ts`
- `apps/meteor/app/importer/server/classes/converters/generateTempPassword.ts`
- `apps/meteor/app/2fa/server/methods/regenerateCodes.ts`
- `apps/meteor/packages/rocketchat-version/package.js`
- `apps/meteor/packages/rocketchat-postcss/package.js`
- `apps/meteor/packages/rocketchat-mongo-config/package.js`
- `apps/meteor/packages/rocketchat-livechat/package.js`
- `apps/meteor/packages/rocketchat-i18n/package.js`
- `apps/meteor/packages/rocketchat-coverage/package.js`
- `apps/meteor/packages/meteor-run-as-user/package.js`
- `apps/meteor/packages/meteor-inject-initial/package.js`
- `apps/meteor/packages/meteor-cookies/package.js`
- `apps/meteor/packages/linkedin-oauth/package.js`
- `apps/meteor/packages/autoupdate/package.js`
- `packages/web-ui-registration/src/index.ts`
- `packages/web-ui-registration/src/SecretRegisterInvalidForm.tsx`
- `packages/web-ui-registration/src/SecretRegisterForm.tsx`
- `packages/web-ui-registration/src/ResetPasswordForm.tsx`
- `packages/web-ui-registration/src/RegistrationPageRouter.tsx`
- `packages/web-ui-registration/src/RegisterTemplate.tsx`
- `packages/web-ui-registration/src/RegisterSecretPageRouter.tsx`
- `packages/web-ui-registration/src/RegisterFormDisabled.tsx`
- `packages/web-ui-registration/src/RegisterForm.tsx`
- `packages/web-ui-registration/src/LoginServicesButton.tsx`
- `packages/web-ui-registration/src/LoginServices.tsx`
- `packages/web-ui-registration/src/LoginForm.tsx`
- `packages/web-ui-registration/src/GuestForm.tsx`
- `packages/web-ui-registration/src/EmailConfirmationForm.tsx`
- `packages/web-ui-registration/src/CMSPage.tsx`
- `packages/release-action/src/fixWorkspaceVersionsBeforePublish.ts`
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
