## File: apps/meteor/tests/mocks/server/mongodb.ts

```typescript
import proxyquire from 'proxyquire';

proxyquire.noCallThru().load('mongodb', {
	ObjectId: class ObjectId {
		toHexString(): string {
			return 'hexString';
		}
	},
	global: true,
});

```