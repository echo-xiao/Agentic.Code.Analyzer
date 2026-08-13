## File: apps/meteor/app/markdown/lib/parser/original/token.ts

```typescript
/*
 * Markdown is a named function that will parse markdown syntax
 * @param {String} msg - The message html
 */
import type { TokenType, TokenExtra } from '@rocket.chat/core-typings';
import { Random } from '@rocket.chat/random';

type MessageTokens = {
	tokens?: {
		token: string;
		type: TokenType;
		text: string;
		extra?: TokenExtra;
	}[];
};

export const addAsToken = (message: MessageTokens, html: string, type: TokenType, extra?: TokenExtra): string => {
    /* Implementation Hidden */
};

export const isToken = (msg: string): boolean => /=!=[.a-z0-9]{17}=!=/gim.test(msg.trim());

export const validateAllowedTokens = (message: MessageTokens, id: string, desiredTokens: TokenType[]): boolean => {
    /* Implementation Hidden */
};

```