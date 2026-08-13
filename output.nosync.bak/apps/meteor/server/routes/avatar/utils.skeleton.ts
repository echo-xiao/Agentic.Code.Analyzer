## File: apps/meteor/server/routes/avatar/utils.ts

```typescript
import type { ServerResponse } from 'node:http';

import { hashLoginToken } from '@rocket.chat/account-utils';
import type { IIncomingMessage, IUpload } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import type { NextFunction } from 'connect';
import { Cookies } from 'meteor/ostrio:cookies';
import sanitizeHtml from 'sanitize-html';
import sharp from 'sharp';
import { throttle } from 'underscore';

import { FileUpload } from '../../../app/file-upload/server';
import { settings } from '../../../app/settings/server';
import { getAvatarColor } from '../../../app/utils/lib/getAvatarColor';

const FALLBACK_LAST_MODIFIED = 'Thu, 01 Jan 2015 00:00:00 GMT';

const cookie = new Cookies();

export const MAX_SVG_AVATAR_SIZE = 1024;
export const MIN_SVG_AVATAR_SIZE = 16;
const MAX_SVG_AVATAR_INITIALS = 3;

export const serveAvatarFile = (file: IUpload, req: IIncomingMessage, res: ServerResponse, next: NextFunction) => {
    /* Implementation Hidden */
};

export const getAvatarSizeFromRequest = (req: IIncomingMessage) => {
    /* Implementation Hidden */
};
export const serveSvgAvatarInRequestedFormat = ({
	nameOrUsername,
	req,
	res,
	useAllInitials = false,
}: {
	nameOrUsername: string;
	req: IIncomingMessage;
	res: ServerResponse;
	useAllInitials?: boolean;
}) => {
    /* Implementation Hidden */
};

export const wasFallbackModified = (reqModifiedHeader?: string) => {
    /* Implementation Hidden */
};

async function isUserAuthenticated({ headers, query }: Pick<IIncomingMessage, 'headers' | 'query'>) {
    /* Implementation Hidden */
}

const warnUnauthenticatedAccess = throttle(() => {
	console.warn('The server detected an unauthenticated access to an user avatar. This type of request will soon be blocked by default.');
}, 60000 * 30); // 30 minutes

export async function userCanAccessAvatar({ headers = {}, query = {} }: IIncomingMessage) {
    /* Implementation Hidden */
}

const getFirstLetter = (name: string) => {
    /* Implementation Hidden */
};

const getInitials = (name: string) => name.split(' ').slice(0, MAX_SVG_AVATAR_INITIALS).map(getFirstLetter).join('');

export const renderSVGLetters = (name: string, viewSize = 200, useAllInitials = false) => {
    /* Implementation Hidden */
};

const getCacheTime = (cacheTime: number) => cacheTime || settings.get('Accounts_AvatarCacheTime');

export function setCacheAndDispositionHeaders(req: IIncomingMessage, res: ServerResponse) {
    /* Implementation Hidden */
}

```