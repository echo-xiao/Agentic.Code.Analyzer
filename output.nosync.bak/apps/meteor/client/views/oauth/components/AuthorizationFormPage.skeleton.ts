## File: apps/meteor/client/views/oauth/components/AuthorizationFormPage.tsx

```typescript
import type { IOAuthApps, IUser } from '@rocket.chat/core-typings';
import { Box, Button, ButtonGroup } from '@rocket.chat/fuselage';
import { Form, FormContainer, FormFooter, FormHeader, FormTitle } from '@rocket.chat/layout';
import { useLoginToken, useLogout, useRoute } from '@rocket.chat/ui-contexts';
import { useEffect, useId, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import CurrentUserDisplay from './CurrentUserDisplay';
import Layout from './Layout';

export type AuthorizationFormPageProps = {
	oauthApp: IOAuthApps;
	redirectUri: string;
	user: IUser;
};

const AuthorizationFormPage = ({ oauthApp, redirectUri, user }: AuthorizationFormPageProps) => {
    /* Implementation Hidden */
};

export default AuthorizationFormPage;

```