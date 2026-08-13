## File: apps/meteor/client/views/admin/integrations/NewZapier.tsx

```typescript
import { Box, Skeleton, Margins, Callout } from '@rocket.chat/fuselage';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useOAuthAppQuery } from '../../oauth/hooks/useOAuthAppQuery';
import PageLoading from '../../root/PageLoading';

const blogSpotStyleScriptImport = (src: string) =>
	new Promise((resolve) => {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		document.body.appendChild(script);

		const resolveFunc = (event: Event) => resolve(event.currentTarget);

		script.addEventListener('readystatechange', (event) => resolveFunc(event));
		script.addEventListener('load', (event) => resolveFunc(event));
		script.src = src;
	});

const NewZapier = ({ ...props }) => {
    /* Implementation Hidden */
};

export default NewZapier;

```