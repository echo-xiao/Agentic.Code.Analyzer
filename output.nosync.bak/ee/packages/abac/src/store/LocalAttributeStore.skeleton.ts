## File: ee/packages/abac/src/store/LocalAttributeStore.ts

```typescript
import type { AbacActor } from '@rocket.chat/core-services';
import type { IAbacAttributeDefinition, IRoom, IRoomAbacRedaction } from '@rocket.chat/core-typings';
import { AbacAttributes } from '@rocket.chat/models';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { Document } from 'mongodb';

import { ensureAttributeDefinitionsExist } from '../helper';
import type { AttributeEntitlements, IAttributeStore, ListAttributesOptions, ListAttributesResult } from './types';

export class LocalAttributeStore implements IAttributeStore {
	async list(_actor: AbacActor | undefined, opts?: ListAttributesOptions): Promise<ListAttributesResult> {
        /* Implementation Hidden */
    }

	async validateAssignable(attrs: IAbacAttributeDefinition[], _actor: AbacActor): Promise<void> {
        /* Implementation Hidden */
    }

	async entitlementsOf(_actor: AbacActor): Promise<AttributeEntitlements> {
        /* Implementation Hidden */
    }

	async scopeRoomsPage<T extends Pick<IRoom, '_id' | 'abacAttributes'>>(
		rooms: T[],
		_actor: AbacActor,
	): Promise<Array<T & IRoomAbacRedaction>> {
        /* Implementation Hidden */
    }

	async assertCanModifyRoom(_room: Pick<IRoom, '_id' | 'abacAttributes'>, _actor: AbacActor): Promise<void> {
        /* Implementation Hidden */
    }
}

```