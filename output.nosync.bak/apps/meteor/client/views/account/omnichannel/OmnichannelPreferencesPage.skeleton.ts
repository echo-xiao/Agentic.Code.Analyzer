## File: apps/meteor/client/views/account/omnichannel/OmnichannelPreferencesPage.tsx

```typescript
import { ButtonGroup, Button, Box, Accordion } from '@rocket.chat/fuselage';
import { Page, PageHeader, PageScrollableContentWithShadow, PageFooter } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useTranslation, useEndpoint, useUserPreference, useSetting } from '@rocket.chat/ui-contexts';
import { useForm, FormProvider } from 'react-hook-form';

import PreferencesConversationTranscript from './PreferencesConversationTranscript';
import { PreferencesGeneral } from './PreferencesGeneral';

type FormData = {
	omnichannelTranscriptPDF: boolean;
	omnichannelTranscriptEmail: boolean;
};

const OmnichannelPreferencesPage = () => {
    /* Implementation Hidden */
};

export default OmnichannelPreferencesPage;

```