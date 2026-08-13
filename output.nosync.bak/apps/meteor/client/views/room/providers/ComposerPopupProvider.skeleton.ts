## File: apps/meteor/client/views/room/providers/ComposerPopupProvider.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import { useLocalStorage } from '@rocket.chat/fuselage-hooks';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import { useEndpoint, useSetting, useUserId, useUserPreference } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { hasAtLeastOnePermission } from '../../../../app/authorization/client';
import { emoji } from '../../../../app/emoji/client';
import { slashCommands } from '../../../../app/utils/client';
import { cannedResponsesQueryKeys } from '../../../lib/queryKeys';
import { Messages, Subscriptions } from '../../../stores';
import ComposerBoxPopupCannedResponse from '../composer/ComposerBoxPopupCannedResponse';
import type { ComposerBoxPopupEmojiProps } from '../composer/ComposerBoxPopupEmoji';
import ComposerBoxPopupEmoji from '../composer/ComposerBoxPopupEmoji';
import ComposerBoxPopupRoom from '../composer/ComposerBoxPopupRoom';
import type { ComposerBoxPopupRoomProps } from '../composer/ComposerBoxPopupRoom';
import type { ComposerBoxPopupSlashCommandProps } from '../composer/ComposerBoxPopupSlashCommand';
import ComposerBoxPopupSlashCommand from '../composer/ComposerBoxPopupSlashCommand';
import ComposerBoxPopupUser from '../composer/ComposerBoxPopupUser';
import type { ComposerBoxPopupUserProps } from '../composer/ComposerBoxPopupUser';
import type { ComposerPopupContextValue } from '../contexts/ComposerPopupContext';
import { ComposerPopupContext, createMessageBoxPopupConfig } from '../contexts/ComposerPopupContext';
import useCannedResponsesQuery from './hooks/useCannedResponsesQuery';
import { normalizeUsername } from '../../../../lib/utils/normalizeUsername';
import { pipe } from '../../../lib/cachedStores/pipe';

export type CannedResponse = { _id: string; shortcut: string; text: string };

type ComposerPopupProviderProps = {
	children: ReactNode;
	room: IRoom;
};

const getLastRecentUsers = (rid: string, uid: string) => {
    /* Implementation Hidden */
};
const ComposerPopupProvider = ({ children, room }: ComposerPopupProviderProps) => {
    /* Implementation Hidden */
};

export default ComposerPopupProvider;

```