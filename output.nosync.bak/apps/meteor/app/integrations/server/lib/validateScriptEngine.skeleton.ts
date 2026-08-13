## File: apps/meteor/app/integrations/server/lib/validateScriptEngine.ts

```typescript
import type { IntegrationScriptEngine } from '@rocket.chat/core-typings';
import { wrapExceptions } from '@rocket.chat/tools';

const FREEZE_INTEGRATION_SCRIPTS_VALUE = String(process.env.FREEZE_INTEGRATION_SCRIPTS).toLowerCase();
const FREEZE_INTEGRATION_SCRIPTS = ['yes', 'true'].includes(FREEZE_INTEGRATION_SCRIPTS_VALUE);

export const validateScriptEngine = (engine?: IntegrationScriptEngine) => {
    /* Implementation Hidden */
};

export const isScriptEngineFrozen = (engine?: IntegrationScriptEngine) =>
	wrapExceptions(() => !validateScriptEngine(engine)).catch(() => true);

```