## File: apps/meteor/client/hooks/useEndpointUploadMutation.ts

```typescript
import type { PathFor, PathPattern } from '@rocket.chat/rest-typings';
import { useToastMessageDispatch, useUpload, type UploadResult } from '@rocket.chat/ui-contexts';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { t } from 'i18next';

type UseEndpointUploadOptions<TData extends UploadResult> = Omit<UseMutationOptions<TData, Error, FormData>, 'mutationFn'>;

export const useEndpointUploadMutation = <TPathPattern extends PathPattern, TData extends UploadResult = UploadResult>(
	endpoint: TPathPattern,
	options?: UseEndpointUploadOptions<TData>,
) => {
    /* Implementation Hidden */
};

```