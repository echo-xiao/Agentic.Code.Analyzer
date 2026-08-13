## File: packages/apps/base-runtime/src/lib/ast/operations.ts

```typescript
import type { AnyNode, AssignmentExpression, Function, AwaitExpression, Expression, Identifier, MethodDefinition, Property } from 'acorn';
import type { FullAncestorWalkerCallback } from 'acorn-walk';

export type WalkerState = {
	isModified: boolean;
	functionIdentifiers: Set<string>;
};

export function getFunctionIdentifier(ancestors: AnyNode[], functionNodeIndex: number) {
    /* Implementation Hidden */
}

export function wrapWithAwait(node: Expression) {
    /* Implementation Hidden */
}

export function asyncifyScope(ancestors: AnyNode[], state: WalkerState) {
    /* Implementation Hidden */
}

export function buildFixModifiedFunctionsOperation(functionIdentifiers: Set<string>): FullAncestorWalkerCallback<WalkerState> {
    /* Implementation Hidden */
}

export const checkReassignmentOfModifiedIdentifiers: FullAncestorWalkerCallback<WalkerState> = (
	node,
	{ functionIdentifiers },
	_ancestors,
) => {
    /* Implementation Hidden */
};

export const fixLivechatIsOnlineCalls: FullAncestorWalkerCallback<WalkerState> = (node, state, ancestors) => {
    /* Implementation Hidden */
};

export const fixRoomUsernamesCalls: FullAncestorWalkerCallback<WalkerState> = (node, state, ancestors) => {
    /* Implementation Hidden */
};

```