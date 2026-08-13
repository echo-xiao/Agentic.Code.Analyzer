## File: apps/meteor/client/views/omnichannel/appearance/AppearanceFieldLabel.tsx

```typescript
import { FieldLabel, Box, Tag } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';

export type AppearanceFieldLabelProps = ComponentProps<typeof FieldLabel> & {
	premium?: boolean;
	children: string;
};

const AppearanceFieldLabel = ({ children, premium = false, ...props }: AppearanceFieldLabelProps) => {
    /* Implementation Hidden */
};

export default AppearanceFieldLabel;

```