## File: packages/ui-client/src/components/Contextualbar/ContextualbarSkeleton.tsx

```typescript
import ContextualbarDialog from './ContextualbarDialog';
import ContextualbarSkeletonBody from './ContextualbarSkeletonBody';

const ContextualbarSkeleton = ({ onClose }: { onClose?: () => void }) => (
	<ContextualbarDialog onClose={onClose}>
		<ContextualbarSkeletonBody />
	</ContextualbarDialog>
);

export default ContextualbarSkeleton;

```