## File: apps/meteor/client/views/admin/import/PrepareImportPage.tsx

```typescript
import type { IImport, IImporterSelection, IImporterSelectionContact, Serialized } from '@rocket.chat/core-typings';
import { Badge, Box, Button, ButtonGroup, Margins, ProgressBar, Throbber, Tabs, TabsItem } from '@rocket.chat/fuselage';
import { useDebouncedValue, useSafely } from '@rocket.chat/fuselage-hooks';
import { Page, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useEndpoint, useTranslation, useStream, useRouter } from '@rocket.chat/ui-contexts';
import { useEffect, useState, useMemo } from 'react';

import type { ChannelDescriptor } from './ChannelDescriptor';
import PrepareChannels from './PrepareChannels';
import PrepareContacts from './PrepareContacts';
import PrepareUsers from './PrepareUsers';
import type { UserDescriptor } from './UserDescriptor';
import { useErrorHandler } from './useErrorHandler';
import {
	ProgressStep,
	ImportWaitingStates,
	ImportFileReadyStates,
	ImportPreparingStartedStates,
	ImportingStartedStates,
	ImportingErrorStates,
} from '../../../../app/importer/lib/ImporterProgressStep';
import { numberFormat } from '../../../../lib/utils/stringUtils';

const waitFor = <T, U extends T>(fn: () => Promise<T>, predicate: (arg: T) => arg is U) =>
	new Promise<U>((resolve, reject) => {
		const callPromise = () => {
			fn().then((result) => {
				if (predicate(result)) {
					resolve(result);
					return;
				}

				setTimeout(callPromise, 1000);
			}, reject);
		};

		callPromise();
	});

// TODO: review inner logic
function PrepareImportPage() {
    /* Implementation Hidden */
}

export default PrepareImportPage;

```