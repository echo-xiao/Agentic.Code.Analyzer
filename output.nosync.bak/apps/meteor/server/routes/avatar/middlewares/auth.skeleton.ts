## File: apps/meteor/server/routes/avatar/middlewares/auth.ts

```typescript
import type { IncomingMessage, ServerResponse } from 'node:http';

import type { IIncomingMessage } from '@rocket.chat/core-typings';
import type { NextFunction } from 'connect';

import { userCanAccessAvatar, renderSVGLetters } from '../utils';

const renderFallback = (req: IncomingMessage, res: ServerResponse) => {
    /* Implementation Hidden */
};

const getProtectAvatars = (callback?: typeof renderFallback) => async (req: IncomingMessage, res: ServerResponse, next: NextFunction) => {
	if (!(await userCanAccessAvatar(req as IIncomingMessage))) {
		if (callback) {
			callback(req, res);
			return;
		}

		res.writeHead(404);
		res.end();
		return;
	}

	return next();
};

// If unauthorized returns the SVG fallback (letter avatar)
export const protectAvatarsWithFallback = getProtectAvatars(renderFallback);

// Just returns 404
export const protectAvatars = getProtectAvatars();

```