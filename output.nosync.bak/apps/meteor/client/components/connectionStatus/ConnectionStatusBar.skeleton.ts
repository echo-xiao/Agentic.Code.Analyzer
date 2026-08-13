## File: apps/meteor/client/components/connectionStatus/ConnectionStatusBar.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Button, Icon, Palette } from '@rocket.chat/fuselage';
import { useConnectionStatus } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { useReconnectCountdown } from './useReconnectCountdown';

const connectionStatusBarStyle = css`
	color: ${Palette.statusColor['status-font-on-warning']};
	background-color: ${Palette.surface['surface-tint']};
	border-color: ${Palette.statusColor['status-font-on-warning']};

	position: fixed;
	z-index: 1000000;

	display: flex;
	justify-content: space-between;
	align-items: center;

	.rcx-connection-status-bar--wrapper {
		display: flex;
		align-items: center;
		column-gap: 8px;
	}
	.rcx-connection-status-bar--content {
		display: flex;
		align-items: center;
		column-gap: 8px;
	}
	.rcx-connection-status-bar--info {
		color: ${Palette.text['font-default']};
	}
`;
function ConnectionStatusBar() {
    /* Implementation Hidden */
}

export default ConnectionStatusBar;

```