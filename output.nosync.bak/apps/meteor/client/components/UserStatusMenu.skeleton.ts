## File: apps/meteor/client/components/UserStatusMenu.tsx

```typescript
import { UserStatus as UserStatusType } from '@rocket.chat/core-typings';
import type { OptionType } from '@rocket.chat/fuselage';
import { Button, PositionAnimated, Options, useCursor, Box } from '@rocket.chat/fuselage';
import { useSetting } from '@rocket.chat/ui-contexts';
import type { ComponentProps, ReactNode } from 'react';
import { useRef, useCallback, useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { UserStatus } from './UserStatus';

export type UserStatusMenuProps = {
	onChange: (type: UserStatusType) => void;
	initialStatus?: UserStatusType;
	optionWidth?: ComponentProps<typeof Box>['width'];
	placement?: ComponentProps<typeof PositionAnimated>['placement'];
};

const UserStatusMenu = ({
	onChange,
	initialStatus = UserStatusType.OFFLINE,
	optionWidth = undefined,
	placement = 'bottom-start',
}: UserStatusMenuProps) => {
    /* Implementation Hidden */
};

export default UserStatusMenu;

```