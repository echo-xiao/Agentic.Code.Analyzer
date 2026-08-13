## File: apps/meteor/client/views/marketplace/helpers/handleInstallError.ts

```typescript
import { t } from '../../../../app/utils/lib/i18n';
import { dispatchToastMessage } from '../../../lib/toast';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface ApiError {
	xhr: {
		responseJSON: {
			error: string;
			status: string;
			messages: string[];
			payload?: any;
		};
	};
}

export function handleInstallError(apiError: ApiError | Error): void {
    /* Implementation Hidden */
}

```