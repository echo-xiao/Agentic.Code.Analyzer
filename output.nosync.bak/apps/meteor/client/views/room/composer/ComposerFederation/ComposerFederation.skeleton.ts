## File: apps/meteor/client/views/room/composer/ComposerFederation/ComposerFederation.tsx

```typescript
import { useHasLicenseModule } from '../../../../hooks/useHasLicenseModule';
import type { ComposerMessageProps } from '../ComposerMessage';
import ComposerMessage from '../ComposerMessage';
import ComposerFederationDisabled from './ComposerFederationDisabled';
import ComposerFederationInvalidVersion from './ComposerFederationInvalidVersion';
import ComposerFederationJoinRoomDisabled from './ComposerFederationJoinRoomDisabled';
import { useIsFederationEnabled } from '../../../../hooks/useIsFederationEnabled';

type ComposerFederationProps = ComposerMessageProps & {
	blocked?: boolean;
};

const ComposerFederation = ({ children, blocked, ...props }: ComposerFederationProps) => {
    /* Implementation Hidden */
};

export default ComposerFederation;

```