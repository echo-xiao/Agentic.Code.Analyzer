## File: packages/apps-engine/src/definition/uikit/blocks/BlockBuilder.ts

```typescript
import { v1 as uuid } from 'uuid';

import type {
	IActionsBlock,
	IBlock,
	IConditionalBlock,
	IConditionalBlockFilters,
	IContextBlock,
	IImageBlock,
	IInputBlock,
	ISectionBlock,
} from './Blocks';
import { BlockType } from './Blocks';
import type {
	IBlockElement,
	IButtonElement,
	IImageElement,
	IInputElement,
	IInteractiveElement,
	IMultiStaticSelectElement,
	IOverflowMenuElement,
	IPlainTextInputElement,
	ISelectElement,
	IStaticSelectElement,
} from './Elements';
import { BlockElementType } from './Elements';
import type { ITextObject } from './Objects';
import { TextObjectType } from './Objects';

type BlockFunctionParameter<T extends IBlock> = Omit<T, 'type'>;
type ElementFunctionParameter<T extends IBlockElement> = T extends IInteractiveElement
	? Omit<T, 'type' | 'actionId'> | Partial<Pick<T, 'actionId'>>
	: Omit<T, 'type'>;

type SectionBlockParam = BlockFunctionParameter<ISectionBlock>;
type ImageBlockParam = BlockFunctionParameter<IImageBlock>;
type ActionsBlockParam = BlockFunctionParameter<IActionsBlock>;
type ContextBlockParam = BlockFunctionParameter<IContextBlock>;
type InputBlockParam = BlockFunctionParameter<IInputBlock>;

type ButtonElementParam = ElementFunctionParameter<IButtonElement>;
type ImageElementParam = ElementFunctionParameter<IImageElement>;
type OverflowMenuElementParam = ElementFunctionParameter<IOverflowMenuElement>;
type PlainTextInputElementParam = ElementFunctionParameter<IPlainTextInputElement>;
type StaticSelectElementParam = ElementFunctionParameter<IStaticSelectElement>;
type MultiStaticSelectElementParam = ElementFunctionParameter<IMultiStaticSelectElement>;

/**
 * @deprecated please prefer the rocket.chat/ui-kit components
 */
export class BlockBuilder {
	private readonly blocks: Array<IBlock>;

	constructor(private readonly appId: string) {
        /* Implementation Hidden */
    }

	public addSectionBlock(block: SectionBlockParam): BlockBuilder {
        /* Implementation Hidden */
    }

	public addImageBlock(block: ImageBlockParam): BlockBuilder {
        /* Implementation Hidden */
    }

	public addDividerBlock(): BlockBuilder {
        /* Implementation Hidden */
    }

	public addActionsBlock(block: ActionsBlockParam): BlockBuilder {
        /* Implementation Hidden */
    }

	public addContextBlock(block: ContextBlockParam): BlockBuilder {
        /* Implementation Hidden */
    }

	public addInputBlock(block: InputBlockParam): BlockBuilder {
        /* Implementation Hidden */
    }

	public addConditionalBlock(innerBlocks: BlockBuilder | Array<IBlock>, condition?: IConditionalBlockFilters): BlockBuilder {
        /* Implementation Hidden */
    }

	public getBlocks() {
        /* Implementation Hidden */
    }

	public newPlainTextObject(text: string, emoji = false): ITextObject {
        /* Implementation Hidden */
    }

	public newMarkdownTextObject(text: string): ITextObject {
        /* Implementation Hidden */
    }

	public newButtonElement(info: ButtonElementParam): IButtonElement {
        /* Implementation Hidden */
    }

	public newImageElement(info: ImageElementParam): IImageElement {
        /* Implementation Hidden */
    }

	public newOverflowMenuElement(info: OverflowMenuElementParam): IOverflowMenuElement {
        /* Implementation Hidden */
    }

	public newPlainTextInputElement(info: PlainTextInputElementParam): IPlainTextInputElement {
        /* Implementation Hidden */
    }

	public newStaticSelectElement(info: StaticSelectElementParam): IStaticSelectElement {
        /* Implementation Hidden */
    }

	public newMultiStaticElement(info: MultiStaticSelectElementParam): IMultiStaticSelectElement {
        /* Implementation Hidden */
    }

	private newInteractiveElement<T extends IInteractiveElement>(element: T): T {
        /* Implementation Hidden */
    }

	private newInputElement<T extends IInputElement>(element: T): T {
        /* Implementation Hidden */
    }

	private newSelectElement<T extends ISelectElement>(element: T): T {
        /* Implementation Hidden */
    }

	private addBlock(block: IBlock): void {
        /* Implementation Hidden */
    }

	private generateBlockId(): string {
        /* Implementation Hidden */
    }

	private generateActionId(): string {
        /* Implementation Hidden */
    }
}

```