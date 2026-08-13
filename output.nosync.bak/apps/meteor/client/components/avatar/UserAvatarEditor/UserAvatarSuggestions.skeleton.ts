## File: apps/meteor/client/components/avatar/UserAvatarEditor/UserAvatarSuggestions.tsx

```typescript
import { Button, Avatar } from '@rocket.chat/fuselage';
import { useCallback } from 'react';

import type { UserAvatarSuggestion } from './UserAvatarSuggestion';
import { useUserAvatarSuggestions } from './useUserAvatarSuggestions';

export type UserAvatarSuggestionsProps = {
	disabled?: boolean;
	onSelectOne?: (suggestion: UserAvatarSuggestion) => void;
};

function UserAvatarSuggestions({ disabled, onSelectOne }: UserAvatarSuggestionsProps) {
    /* Implementation Hidden */
}

export default UserAvatarSuggestions;

```