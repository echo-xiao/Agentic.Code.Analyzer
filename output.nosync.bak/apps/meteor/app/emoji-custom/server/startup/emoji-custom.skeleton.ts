## File: apps/meteor/app/emoji-custom/server/startup/emoji-custom.js

```typescript
import { EmojiCustom } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import _ from 'underscore';

import { SystemLogger } from '../../../../server/lib/logger/system';
import { RocketChatFile } from '../../../file/server';
import { settings } from '../../../settings/server';

export let RocketChatFileEmojiCustomInstance;

const writeSvgFallback = (res, req) => {
    /* Implementation Hidden */
};

const initializeEmojiCustomStorage = () => {
    /* Implementation Hidden */
};

Meteor.startup(() => {
	initializeEmojiCustomStorage();
	return WebApp.connectHandlers.use('/emoji-custom/', async (req, res /* , next*/) => {
		const params = { emoji: decodeURIComponent(req.url.replace(/^\//, '').replace(/\?.*$/, '')) };

		if (_.isEmpty(params.emoji)) {
			res.writeHead(403);
			res.write('Forbidden');
			res.end();
			return;
		}

		res.setHeader('Content-Disposition', 'inline');

		const emoji = await EmojiCustom.findOneByName(params.emoji.split('.')[0], { projection: { _id: 1 } });

		if (!emoji) {
			return writeSvgFallback(res, req);
		}

		const file = await RocketChatFileEmojiCustomInstance.getFileWithReadStream(encodeURIComponent(params.emoji));

		if (!file) {
			// use code from username initials renderer until file upload is complete
			return writeSvgFallback(res, req);
		}

		const fileUploadDate = file.uploadDate != null ? file.uploadDate.toUTCString() : undefined;

		const reqModifiedHeader = req.headers['if-modified-since'];
		if (reqModifiedHeader != null && reqModifiedHeader === fileUploadDate) {
			res.setHeader('Last-Modified', reqModifiedHeader);
			res.writeHead(304);
			res.end();
			return;
		}

		res.setHeader('Cache-Control', 'public, max-age=31536000');
		res.setHeader('Last-Modified', fileUploadDate || new Date().toUTCString());
		res.setHeader('Content-Length', file.length);

		if (/^svg$/i.test(params.emoji.split('.').pop())) {
			res.setHeader('Content-Type', 'image/svg+xml');
		} else if (/^png$/i.test(params.emoji.split('.').pop())) {
			res.setHeader('Content-Type', 'image/png');
		} else {
			res.setHeader('Content-Type', 'image/jpeg');
		}

		file.readStream.pipe(res);
	});
});

settings.watchMultiple(['EmojiUpload_Storage_Type', 'EmojiUpload_FileSystemPath'], initializeEmojiCustomStorage);

```