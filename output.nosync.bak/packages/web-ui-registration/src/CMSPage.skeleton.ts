## File: packages/web-ui-registration/src/CMSPage.tsx

```typescript
import { Box, IconButton } from '@rocket.chat/fuselage';
import { VerticalWizardLayout, VerticalWizardLayoutFooter, VerticalWizardLayoutForm, VerticalWizardLayoutTitle } from '@rocket.chat/layout';
import { useSetting, useTranslation, useAssetWithDarkModePath } from '@rocket.chat/ui-contexts';

import { LoginPoweredBy } from './components/LoginPoweredBy';

type CMSPageProps = {
	page: 'Layout_Terms_of_Service' | 'Layout_Privacy_Policy' | 'Layout_Legal_Notice';
};

const CMSPage = ({ page }: CMSPageProps) => {
    /* Implementation Hidden */
};

export default CMSPage;

```