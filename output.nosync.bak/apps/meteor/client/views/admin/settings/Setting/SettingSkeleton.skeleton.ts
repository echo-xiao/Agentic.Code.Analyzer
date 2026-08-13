## File: apps/meteor/client/views/admin/settings/Setting/SettingSkeleton.tsx

```typescript
import { Field, FieldLabel, FieldRow, FlexItem, InputBoxSkeleton, Skeleton } from '@rocket.chat/fuselage';

const SettingSkeleton = () => (
	<Field>
		<FlexItem align='stretch'>
			<FieldLabel>
				<Skeleton width='25%' />
			</FieldLabel>
		</FlexItem>
		<FieldRow>
			<InputBoxSkeleton />
		</FieldRow>
	</Field>
);

export default SettingSkeleton;

```