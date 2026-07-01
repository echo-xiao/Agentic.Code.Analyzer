# How do you create a new package in the Rocket.Chat monorepo?

## Gemini Answer

To create a new package in the Rocket.Chat monorepo, you generally follow a standard pattern for JavaScript/TypeScript packages within a monorepo structure. The core idea is to create a new directory under the `packages/` root, and then populate it with the necessary configuration and source files.

Here's a breakdown of the typical process and the key files involved:

**Call Chain:** This process is conceptual and involves manual file creation and configuration, rather than a direct code execution chain.

**Entry Point:** The `packages/` directory within the Rocket.Chat monorepo.

**Steps to Create a New Package:**

1.  **Create a New Package Directory:**
    *   Navigate to the `packages/` directory in the monorepo root.
    *   Create a new directory for your package (e.g., `packages/my-new-package`).
    *   *Example Location:* `packages/web-ui-registration/` (as seen in `search` results for `packages/web-ui-registration/src/index.ts`)

2.  **Initialize `package.json`:**
    *   Inside your new package directory (`packages/my-new-package/`), create a `package.json` file.
    *   This file defines your package's metadata, scripts, and dependencies.
    *   *Key fields to include:*
        *   `name`: The unique name of your package (e.g., `@rocket.chat/my-new-package`).
        *   `version`: The package version (e.g., `1.0.0`).
        *   `main`: The entry point for your package (e.g., `dist/index.js`).
        *   `types`: The TypeScript declaration file entry point (e.g., `dist/index.d.ts`).
        *   `scripts`: Build, test, and other utility scripts (e.g., `build`, `test`).
        *   `dependencies` and `devDependencies`: Other packages your package relies on.

3.  **Add Source Code:**
    *   Create a `src/` directory inside your package (e.g., `packages/my-new-package/src/`).
    *   Place your TypeScript or JavaScript source files here (e.g., `packages/my-new-package/src/index.ts`).
    *   *Example File:* `packages/web-ui-registration/src/index.ts`

4.  **Configure TypeScript (if applicable):**
    *   If your package uses TypeScript, create a `tsconfig.json` file in your package's root (e.g., `packages/my-new-package/tsconfig.json`).
    *   This file configures the TypeScript compiler for your package.

5.  **Set up Build Process:**
    *   Configure a build process to compile your source code (e.g., TypeScript to JavaScript, bundling). This often involves tools like Rollup, Webpack, or simply `tsc`.
    *   The build script would be defined in your `package.json` (e.g., `"build": "rollup -c"`).

6.  **Add Tests:**
    *   Create a `__tests__/` or `tests/` directory for your unit and integration tests.
    *   Configure a testing framework like Jest.

**Distinction from Meteor Packages:**

It's important to note that the `search` results also showed `package.js` files (e.g., `apps/meteor/packages/rocketchat-version/package.js`). These are specific to Meteor packages, which have a different structure and build process than standard npm packages within the `packages/` directory. When creating a "new package in the Rocket.Chat monorepo," the expectation is typically a standard npm package under `packages/`.

By following these steps, you can establish a new, independent package within the Rocket.Chat monorepo, allowing for modular development and reusability.

## Tool Calls (5 calls, 15,255 tokens)

**Step 1:** `search({"query":"create new package monorepo"})` → 18 tokens
**Step 2:** `search({"query":"packages/package.json"})` → 16 tokens
**Step 3:** `search({"query":"package","layer":"packages"})` → 839 tokens
**Step 4:** `graph({"query":"web-ui-registration","layer":"packages"})` → 15 tokens
**Step 5:** `search({"layer":"packages","query":"package.json"})` → 77 tokens

## Files Seen In Tool Results (36)

- `packages/package.js`
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
- `packages/release-action/src/utils.ts`
- `packages/apps-engine/src/server/compiler/AppPackageParser.ts`
- `apps/meteor/packages/rocketchat-postcss/build.js`
- `packages/apps-engine/src/server/compiler/IParseAppPackageResult.ts`
- `apps/meteor/app/emoji/lib/rocketchat.ts`
- `packages/livechat/src/components/Button/stories.tsx`
- `apps/meteor/tests/data/apps/helper.ts`
- `packages/apps-engine/src/server/AppManager.ts`
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
