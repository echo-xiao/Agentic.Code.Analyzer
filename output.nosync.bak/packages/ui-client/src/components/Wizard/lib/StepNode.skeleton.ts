## File: packages/ui-client/src/components/Wizard/lib/StepNode.ts

```typescript
/**
 * Represents the metadata for a step in the wizard.
 * @property id - Unique identifier for the step.
 * @property title - Title of the step.
 * @property onNext - Optional callback function to execute when moving to the next step.
 * @property onPrev - Optional callback function to execute when moving to the previous step.
 */
export type StepMetadata = {
	id: string;
	title: string;
};

/**
 * Represents a node in the linked list for managing wizard steps.
 * It contains the step metadata and pointers to the next and previous nodes.
 */
class StepNode {
	public value: StepMetadata;

	public next: StepNode | null = null;

	public prev: StepNode | null = null;

	public disabled = true;

	/**
	 * Creates an instance of StepNode.
	 * @param value - The metadata for the step.
	 * @param disabled - Whether the step should be initially disabled. Defaults to true.
	 */
	constructor(value: StepMetadata, disabled = true) {
        /* Implementation Hidden */
    }

	get id() {
		return this.value.id;
	}

	get title() {
		return this.value.title;
	}

	setDisabled(disabled: boolean) {
        /* Implementation Hidden */
    }

	enable() {
        /* Implementation Hidden */
    }

	disable() {
        /* Implementation Hidden */
    }
}

export default StepNode;

```