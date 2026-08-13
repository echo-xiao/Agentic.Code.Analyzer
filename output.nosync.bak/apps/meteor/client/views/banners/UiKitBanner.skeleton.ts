## File: apps/meteor/client/views/banners/UiKitBanner.tsx

```typescript
import { Banner, Icon } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { UiKitContext, bannerParser, UiKitBanner as UiKitBannerSurfaceRender, UiKitComponent } from '@rocket.chat/fuselage-ui-kit';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type * as UiKit from '@rocket.chat/ui-kit';
import { useMemo } from 'react';

import MarkdownText from '../../components/MarkdownText';
import { useBannerContextValue } from '../../uikit/hooks/useBannerContextValue';
import { useUiKitActionManager } from '../../uikit/hooks/useUiKitActionManager';
import { useUiKitView } from '../../uikit/hooks/useUiKitView';

// TODO: move this to fuselage-ui-kit itself
bannerParser.mrkdwn = ({ text }) => <MarkdownText variant='inline' content={text} />;

export type UiKitBannerProps = {
	key: UiKit.BannerView['viewId']; // force re-mount when viewId changes
	initialView: UiKit.BannerView;
};

const UiKitBanner = ({ initialView }: UiKitBannerProps) => {
    /* Implementation Hidden */
};

export default UiKitBanner;

```