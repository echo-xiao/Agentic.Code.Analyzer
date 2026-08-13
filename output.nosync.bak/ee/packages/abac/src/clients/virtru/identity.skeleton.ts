## File: ee/packages/abac/src/clients/virtru/identity.ts

```typescript
import type { IAbacAttributeDefinition, IUser } from '@rocket.chat/core-typings';

import type { IEntityIdentifier } from '../../pdp/types';

export type EntityKeyType = 'emailAddress' | 'oidcIdentifier';

export function buildEntityIdentifier(defaultEntityKey: EntityKeyType, entityKey: string): IEntityIdentifier {
    /* Implementation Hidden */
}

export function getUserEntityKey(defaultEntityKey: EntityKeyType, user: Pick<IUser, '_id' | 'emails' | 'username'>): string | undefined {
    /* Implementation Hidden */
}

export function buildAttributeFqns(attributeNamespace: string, attributes: IAbacAttributeDefinition[]): string[] {
    /* Implementation Hidden */
}

const FQN_RE = /^https:\/\/[^/]+\/attr\/([^/]+)\/value\/(.+)$/;

export function parseAttributeFqns(fqns: string[]): { attributes: IAbacAttributeDefinition[]; malformed: string[] } {
    /* Implementation Hidden */
}

```