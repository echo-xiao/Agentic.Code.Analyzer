# How do you create a new package in the Rocket.Chat monorepo?

## Plan

intent: pattern

## Gemini Answer

I was unable to find a definitive guide or tool for creating new packages within the Rocket.Chat monorepo. My search for keywords like "create-package", "lerna.json", and "yarn.lock" did not yield relevant results. While I found many `package.js` files within the `apps/meteor/packages` directory and `package.json` files in various `packages` subdirectories, I could not extract a clear process for package creation from these files alone.

To understand how to create a new package, I would need to:

1.  **Examine existing `package.json` files:** Look for common patterns in scripts, dependencies, and other configurations that might indicate a standard package structure.
2.  **Investigate the build system:** Determine how packages are built and integrated into the larger monorepo. This might involve looking at `webpack` configurations, `tsconfig.json` files, or other build-related scripts.
3.  **Search for internal documentation:** There might be internal documentation or a "contributing" guide that outlines the process for creating new packages.

Without further information from the tools, I cannot provide a step-by-step guide on how to create a new package in the Rocket.Chat monorepo.

## Tool Calls (8 calls, 23,518 tokens)

**Step 1:** `plan({"question":"How do you create a new package in the Rocket.Chat monorepo?"})` → 80 tokens
**Step 2:** `search({"query":"package","layer":"packages"})` → 667 tokens
**Step 3:** `details({"symbolName":"package","filename":"package.js"})` → 306 tokens
**Step 4:** `search({"query":"lerna.json"})` → 25 tokens
**Step 5:** `search({"query":"yarn.lock"})` → 24 tokens
**Step 6:** `search({"query":"create-package"})` → 26 tokens
**Step 7:** `search({"query":"package.json","layer":"packages"})` → 86 tokens
**Step 8:** `details({"filename":"package.json","symbolName":"package.json"})` → 67 tokens

## Files Seen In Tool Results (28)

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
- `ee/packages/pdf-worker/.storybook/main.ts`
- `packages/web-ui-registration/package.js`
