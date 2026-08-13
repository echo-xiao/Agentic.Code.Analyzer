## File: apps/meteor/client/views/room/composer/ComposerBoxPopupUser.tsx

```typescript
import { OptionAvatar, OptionColumn, OptionContent, OptionInput } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { useSetting } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { getUserDisplayNames } from '../../../../lib/getUserDisplayNames';
import ReactiveUserStatus from '../../../components/UserStatus/ReactiveUserStatus';

export type ComposerBoxPopupUserProps = {
	_id: string;
	system?: boolean;
	outside?: boolean;
	suggestion?: boolean;
	username: string;
	name?: string;
	nickname?: string;
	status?: string;
	sort?: number;
	variant?: 'small' | 'large';
};

function ComposerBoxPopupUser({ _id, system, username, name, nickname, outside, suggestion, variant }: ComposerBoxPopupUserProps) {
    /* Implementation Hidden */
}

export default ComposerBoxPopupUser;

```