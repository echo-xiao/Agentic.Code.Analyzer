## File: packages/ui-client/src/views/setupWizard/hooks/useParameters.ts

```typescript
import type { ISetting } from '@rocket.chat/core-typings';
import { useMethod } from '@rocket.chat/ui-contexts';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

type SetupWizardParameters = {
	settings: ISetting[];
	serverAlreadyRegistered: boolean;
};

export const useParameters = (): Exclude<UseQueryResult<SetupWizardParameters, Error>, { data: undefined }> => {
    /* Implementation Hidden */
};

```