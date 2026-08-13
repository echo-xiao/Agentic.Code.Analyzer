## File: packages/livechat/src/lib/threads.js

```typescript
import { Livechat } from '../api';
import { upsert } from '../helpers/upsert';
import { store } from '../store';
import { createToken } from './random';

const addParentMessage = async (parentMessage) => {
    /* Implementation Hidden */
};

const isThreadMessage = async (message) => {
    /* Implementation Hidden */
};

const findParentMessage = async (tmid) => {
    /* Implementation Hidden */
};

const normalizeThreadMessage = async (message) => {
    /* Implementation Hidden */
};

export const normalizeMessage = async (message) => {
    /* Implementation Hidden */
};

export const normalizeMessages = (messages = []) =>
	Promise.all(
		messages.filter(async (message) => {
			const result = await normalizeMessage(message);
			return result;
		}),
	);

```