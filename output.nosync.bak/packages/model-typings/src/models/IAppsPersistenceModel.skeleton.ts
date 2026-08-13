## File: packages/model-typings/src/models/IAppsPersistenceModel.ts

```typescript
import type { DeleteResult, Filter } from 'mongodb';

import type { IBaseModel } from './IBaseModel';

// TODO: type for appspersistence
export interface IAppsPersistenceModel extends IBaseModel<any> {
	remove(query: Filter<any>): Promise<DeleteResult>;
}

```