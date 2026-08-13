## File: packages/ui-client/src/components/Wizard/lib/StepsLinkedList.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';

import type { StepMetadata } from './StepNode';
import StepNode from './StepNode';

/**
 * A doubly linked list implementation to manage the state of wizard steps.
 * It extends Emitter to notify about state changes.
 */
class StepsLinkedList extends Emitter<{ stateChanged: undefined }> {
	public head: StepNode | null = null;

	public tail: StepNode | null = null;

	private stepNodeMap: Map<string | number, StepNode> = new Map();

	/**
	 * Creates an instance of StepsLinkedList.
	 * @param steps - An array of step metadata to initialize the list with.
	 */
	constructor(steps: readonly StepMetadata[]) {
        /* Implementation Hidden */
    }

	/**
	 * Appends a new step to the end of the list or updates an existing one.
	 * @param value - The metadata for the step to append or update.
	 * @returns The created or updated StepNode.
	 */
	public append(value: StepMetadata): StepNode {
        /* Implementation Hidden */
    }

	/**
	 * Removes a step from the list by its ID.
	 * @param id - The ID of the step to remove.
	 * @returns The removed StepNode, or null if not found.
	 */
	public remove(id: string | number): StepNode | null {
        /* Implementation Hidden */
    }

	/**
	 * Enables a specific step.
	 * @param step - The StepNode to enable.
	 */
	public enableStep(step: StepNode) {
        /* Implementation Hidden */
    }

	/**
	 * Disables a specific step.
	 * @param step - The StepNode to disable.
	 */
	public disableStep(step: StepNode) {
        /* Implementation Hidden */
    }

	/**
	 * Emits a 'stateChanged' event to notify listeners of changes.
	 */
	private notifyChanges() {
        /* Implementation Hidden */
    }

	/**
	 * Retrieves a step by its ID.
	 * @param id - The ID of the step to retrieve.
	 * @returns The StepNode if found, otherwise null.
	 */
	public get(id: string | number): StepNode | null {
        /* Implementation Hidden */
    }

	/**
	 * Converts the linked list to an array of StepNodes.
	 * @returns An array of all StepNodes in the list.
	 */
	public toArray(): StepNode[] {
        /* Implementation Hidden */
    }

	/**
	 * Gets the total number of steps in the list.
	 */
	get size(): number {
		return this.stepNodeMap.size;
	}
}

export default StepsLinkedList;

```