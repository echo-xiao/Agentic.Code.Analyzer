## File: packages/ui-kit/src/rendering/SurfaceRenderer.ts

```typescript
import { BlockContext } from './BlockContext';
import type { BlockRenderers } from './BlockRenderers';
import type { Conditions } from './Conditions';
import { renderBlockElement } from './renderBlockElement';
import { renderLayoutBlock } from './renderLayoutBlock';
import { renderTextObject } from './renderTextObject';
import { resolveConditionalBlocks } from './resolveConditionalBlocks';
import type { Block } from '../blocks/Block';
import type { BlockElement } from '../blocks/BlockElement';
import { LayoutBlockType } from '../blocks/LayoutBlockType';
import type { RenderableLayoutBlock } from '../blocks/RenderableLayoutBlock';
import type { TextObject } from '../blocks/TextObject';
import { isActionsBlockElement } from '../blocks/isActionsBlockElement';
import { isContextBlockElement } from '../blocks/isContextBlockElement';
import { isInputBlockElement } from '../blocks/isInputBlockElement';
import { isSectionBlockAccessoryElement } from '../blocks/isSectionBlockAccessoryElement';
import { isTextObject } from '../blocks/isTextObject';
import type { Markdown } from '../blocks/text/Markdown';
import type { PlainText } from '../blocks/text/PlainText';

export abstract class SurfaceRenderer<TOutputObject, TAllowedLayoutBlock extends RenderableLayoutBlock = RenderableLayoutBlock>
	implements BlockRenderers<TOutputObject>
{
	protected readonly allowedLayoutBlockTypes: Set<TAllowedLayoutBlock['type']>;

	public constructor(allowedLayoutBlockTypes: TAllowedLayoutBlock['type'][]) {
        /* Implementation Hidden */
    }

	private isAllowedLayoutBlock = (block: Block): block is TAllowedLayoutBlock =>
		this.allowedLayoutBlockTypes.has(block.type as TAllowedLayoutBlock['type']);

	public render(blocks: readonly Block[], conditions?: Conditions): TOutputObject[] {
        /* Implementation Hidden */
    }

	public renderTextObject(textObject: TextObject, index: number, context: BlockContext = BlockContext.NONE): TOutputObject | null {
        /* Implementation Hidden */
    }

	public renderActionsBlockElement(block: BlockElement, index: number): TOutputObject | null {
        /* Implementation Hidden */
    }

	public renderContextBlockElement(block: TextObject | BlockElement, index: number): TOutputObject | null {
        /* Implementation Hidden */
    }

	public renderInputBlockElement(block: BlockElement, index: number): TOutputObject | null {
        /* Implementation Hidden */
    }

	public renderSectionAccessoryBlockElement(block: BlockElement, index: number): TOutputObject | null {
        /* Implementation Hidden */
    }

	public abstract plain_text(textObject: PlainText, context: BlockContext, index: number): TOutputObject | null;

	public abstract mrkdwn(textObject: Markdown, context: BlockContext, index: number): TOutputObject | null;
}

```