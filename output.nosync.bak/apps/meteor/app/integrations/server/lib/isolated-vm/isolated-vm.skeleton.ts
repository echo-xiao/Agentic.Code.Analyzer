## File: apps/meteor/app/integrations/server/lib/isolated-vm/isolated-vm.ts

```typescript
import type { IIntegration, ValueOf } from '@rocket.chat/core-typings';
import { pick } from '@rocket.chat/tools';
import ivm, { type Reference } from 'isolated-vm';

import { IntegrationScriptEngine } from '../ScriptEngine';
import type { IScriptClass, CompatibilityScriptResult, FullScriptClass } from '../definition';
import { buildSandbox } from './buildSandbox';
import { getCompatibilityScript } from './getCompatibilityScript';

const DISABLE_INTEGRATION_SCRIPTS = ['yes', 'true', 'ivm'].includes(String(process.env.DISABLE_INTEGRATION_SCRIPTS).toLowerCase());

export class IsolatedVMScriptEngine<IsIncoming extends boolean> extends IntegrationScriptEngine<IsIncoming> {
	protected isDisabled(): boolean {
        /* Implementation Hidden */
    }

	protected async callScriptFunction(
		scriptReference: Reference<ValueOf<IScriptClass>>,
		...params: Parameters<ValueOf<FullScriptClass>>
	): Promise<any> {
        /* Implementation Hidden */
    }

	protected async runScriptMethod({
		script,
		method,
		params,
	}: {
		integrationId: IIntegration['_id'];
		script: Partial<IScriptClass>;
		method: keyof IScriptClass;
		params: Record<string, any>;
	}): Promise<any> {
        /* Implementation Hidden */
    }

	protected async getIntegrationScript(integration: IIntegration): Promise<Partial<IScriptClass>> {
        /* Implementation Hidden */
    }
}

```