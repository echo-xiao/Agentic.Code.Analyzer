## File: apps/meteor/client/views/oauth/components/ErrorPage.tsx

```typescript
import { States, StatesIcon, StatesSubtitle, StatesTitle } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import Layout from './Layout';
import { getErrorMessage } from '../../../lib/errorHandling';

export type ErrorPageProps = {
	error: unknown;
};

const ErrorPage = ({ error }: ErrorPageProps) => {
    /* Implementation Hidden */
};

export default ErrorPage;

```