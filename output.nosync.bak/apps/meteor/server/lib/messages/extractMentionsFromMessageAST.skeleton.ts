## File: apps/meteor/server/lib/messages/extractMentionsFromMessageAST.ts

```typescript
import type { Root, Paragraph, Blocks, Inlines, UserMention, ChannelMention, Task, ListItem, BigEmoji } from '@rocket.chat/message-parser';

type ExtractedMentions = {
	mentions: string[];
	channels: string[];
};

type MessageNode = Paragraph | Blocks | Inlines | Task | ListItem | BigEmoji;

function isUserMention(node: MessageNode): node is UserMention {
    /* Implementation Hidden */
}

function isChannelMention(node: MessageNode): node is ChannelMention {
    /* Implementation Hidden */
}

function hasArrayValue(node: MessageNode): node is MessageNode & { value: MessageNode[] } {
    /* Implementation Hidden */
}

function hasObjectValue(node: MessageNode): node is MessageNode & { value: Record<string, MessageNode> } {
    /* Implementation Hidden */
}

function traverse(node: MessageNode, mentions: Set<string>, channels: Set<string>): void {
    /* Implementation Hidden */
}

export function extractMentionsFromMessageAST(ast: Root): ExtractedMentions {
    /* Implementation Hidden */
}

```