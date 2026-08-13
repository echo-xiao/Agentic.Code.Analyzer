## File: ee/packages/abac/src/helper.ts

```typescript
import type { ILDAPEntry, IAbacAttributeDefinition, IRoom } from '@rocket.chat/core-typings';
import { AbacAttributes, Rooms } from '@rocket.chat/models';
import mem from 'mem';

import {
	AbacAttributeDefinitionNotFoundError,
	AbacCannotConvertDefaultRoomToAbacError,
	AbacInvalidAttributeKeyError,
	AbacInvalidAttributeValuesError,
	AbacRoomNotFoundError,
} from './errors';

export const MAX_ABAC_ATTRIBUTE_KEYS = 10;
export const MAX_ABAC_ATTRIBUTE_VALUES = 10;

export const extractAttribute = (ldapUser: ILDAPEntry, ldapKey: string, abacKey: string): IAbacAttributeDefinition | undefined => {
    /* Implementation Hidden */
};

export function diffAttributes(a: IAbacAttributeDefinition[] = [], b: IAbacAttributeDefinition[] = []): IAbacAttributeDefinition[] {
    /* Implementation Hidden */
}

export function validateAndNormalizeAttributes(attributes: Record<string, string[]>): IAbacAttributeDefinition[] {
    /* Implementation Hidden */
}

const getAttributeDefinitionsFromDb = async (keys: string[]) =>
	AbacAttributes.find({ key: { $in: keys } }, { projection: { key: 1, values: 1 } }).toArray();

const getAttributeDefinitionsCached = mem(getAttributeDefinitionsFromDb, {
	maxAge: 30_000,
	cacheKey: JSON.stringify,
});

export async function ensureAttributeDefinitionsExist(normalized: IAbacAttributeDefinition[]): Promise<void> {
    /* Implementation Hidden */
}

export function buildNonCompliantConditions(newAttributes: IAbacAttributeDefinition[]) {
    /* Implementation Hidden */
}

export function buildCompliantConditions(attributes: IAbacAttributeDefinition[]) {
    /* Implementation Hidden */
}

export function buildRoomNonCompliantConditionsFromSubject(subjectAttributes: IAbacAttributeDefinition[]) {
    /* Implementation Hidden */
}

export async function getAbacRoom(rid: string): Promise<IRoom> {
    /* Implementation Hidden */
}

export function diffAttributeSets(
	current: IAbacAttributeDefinition[] = [],
	next: IAbacAttributeDefinition[] = [],
): { added: boolean; removed: boolean } {
    /* Implementation Hidden */
}

export const stripTrailingSlashes = (value: string): string => value.replace(/\/+$/, '');

```