# What would be affected if the CachedSettings system were changed?

## Gemini Answer

Changing the `CachedSettings` system (defined in `apps/meteor/app/settings/server/CachedSettings.ts`) would affect the following components and files:

Call Chain: `CachedSettings` (apps/meteor/app/settings/server/CachedSettings.ts) → ...

*   **Direct Callers (1-hop):**
    *   `metricsMiddleware` in `apps/meteor/app/api/server/middlewares/metrics.ts`
    *   `cors` in `apps/meteor/app/api/server/middlewares/cors.ts`

*   **Indirect Dependents (2-hop):**
    *   `loadAPI` in `apps/meteor/ee/server/apps/communication/rest.ts`
    *   `api` in `apps/meteor/app/integrations/server/api/api.ts`
    *   `startRestAPI` in `apps/meteor/app/api/server/api.ts`

*   **3-hop Dependents:**
    *   `constructor` in `apps/meteor/ee/server/apps/communication/rest.ts`
    *   `main` in `apps/meteor/server/main.ts`
    *   `Wizard` in `packages/ui-client/src/components/Wizard/Wizard.tsx`

*   **4-hop Dependents:**
    *   `WizardActions.stories` in `packages/ui-client/src/components/Wizard/WizardActions.stories.tsx`
    *   `WizardExample` in `packages/ui-client/src/components/Wizard/Wizard.stories.tsx`
    *   `main` in `packages/apps-engine/deno-runtime/main.ts`

## Tool Calls (2 calls, 6,576 tokens)

**Step 1:** `search({"query":"CachedSettings"})` → 413 tokens
**Step 2:** `graph({"query":"CachedSettings","direction":"up","file":"apps/meteor/app/settings/server/CachedSettings.ts)` → 401 tokens
