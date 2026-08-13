## File: packages/message-parser/src/BlockSplitter.ts

```typescript
export enum BlockType {
	PARAGRAPH = 'PARAGRAPH',
	HEADING = 'HEADING',
	CODE = 'CODE',
	LIST = 'LIST',
	QUOTE = 'QUOTE',
}

export type Block = {
	type: BlockType;
	content: string;
	level?: number;
	language?: string;
	ordered?: boolean;
	incomplete?: boolean;
};

export class BlockSplitter {
	public static split(input: string): Block[] {
        /* Implementation Hidden */
    }

	private static flush(blocks: Block[], block: Block | null) {
        /* Implementation Hidden */
    }
}

```