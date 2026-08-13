## File: apps/meteor/client/sidebar/header/MatrixFederationSearch/MatrixFederationRemoveServerList.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Option, Icon } from '@rocket.chat/fuselage';
import { useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type MatrixFederationRemoveServerListProps = {
	servers: Array<{ name: string; default: boolean; local: boolean }>;
};

const style = css`
	i {
		visibility: hidden;
	}
	li {
		cursor: default;
	}
	li:hover {
		i {
			cursor: pointer;
			visibility: visible;
		}
	}
`;

const MatrixFederationRemoveServerList = ({ servers }: MatrixFederationRemoveServerListProps) => {
    /* Implementation Hidden */
};

export default MatrixFederationRemoveServerList;

```