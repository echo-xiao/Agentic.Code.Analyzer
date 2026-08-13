## File: packages/apps-engine/src/definition/abac/AbacAttributes.ts

```typescript
export interface IAbacAttributeDefinition {
	/**
	 * Validation expectation (NOT enforced here, must be enforced by caller):
	 *   /^[A-Za-z0-9_-]+$/
	 */
	key: string;

	/**
	 * List of string values for this attribute key.
	 */
	values: string[];
}

```