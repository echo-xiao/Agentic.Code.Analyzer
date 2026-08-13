## File: apps/meteor/client/views/admin/subscription/surface/UiKitSubscriptionLicense.tsx

```typescript
import { useDebouncedCallback } from '@rocket.chat/fuselage-hooks';
import { UiKitContext, bannerParser, UiKitComponent } from '@rocket.chat/fuselage-ui-kit';
import type { View } from '@rocket.chat/ui-kit';
import type { ContextType, Dispatch } from 'react';
import { useMemo } from 'react';

import type { SubscriptionLicenseLayout } from './UiKitSubscriptionLicenseSurface';
import { UiKitSubscriptionLicenseSurface } from './UiKitSubscriptionLicenseSurface';
import MarkdownText from '../../../../components/MarkdownText';
import { useUiKitActionManager } from '../../../../uikit/hooks/useUiKitActionManager';
import { useUiKitView } from '../../../../uikit/hooks/useUiKitView';

// TODO: move this to fuselage-ui-kit itself
bannerParser.mrkdwn = ({ text }) => <MarkdownText variant='inline' content={text} />;

export type UiKitSubscriptionLicenseProps = {
	key: string;
	initialView: {
		viewId: string;
		appId: string;
		blocks: SubscriptionLicenseLayout;
	};
};

type UseSubscriptionLicenseContextValueParams = {
	view: View & {
		viewId: string;
	};
	values: {
		[actionId: string]: {
			value: unknown;
			blockId?: string | undefined;
		};
	};
	updateValues: Dispatch<{
		actionId: string;
		payload: {
			value: unknown;
			blockId?: string | undefined;
		};
	}>;
};
type UseSubscriptionLicenseContextValueReturn = ContextType<typeof UiKitContext>;

const useSubscriptionLicenseContextValue = ({
	view,
	values,
	updateValues,
}: UseSubscriptionLicenseContextValueParams): UseSubscriptionLicenseContextValueReturn => {
    /* Implementation Hidden */
};

const UiKitSubscriptionLicense = ({ initialView }: UiKitSubscriptionLicenseProps) => {
    /* Implementation Hidden */
};

export default UiKitSubscriptionLicense;

```