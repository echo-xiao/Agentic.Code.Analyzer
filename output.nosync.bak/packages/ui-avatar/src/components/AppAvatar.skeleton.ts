## File: packages/ui-avatar/src/components/AppAvatar.tsx

```typescript
import type { BaseAvatarProps } from './BaseAvatar';
import BaseAvatar from './BaseAvatar';

type AppAvatarProps = Pick<BaseAvatarProps, 'size'> & {
	iconFileContent: string;
	iconFileData: string;
};

export default function AppAvatar({ iconFileContent, iconFileData, size }: AppAvatarProps) {
    /* Implementation Hidden */
}

```