## File: apps/meteor/server/services/messages/lib/oembed/providers.ts

```typescript
import type { OEmbedMeta, OEmbedUrlContent, OEmbedProvider } from '@rocket.chat/core-typings';
import { camelCase } from 'change-case';

import { settings } from '../../../../../app/settings/server';
import { Info } from '../../../../../app/utils/rocketchat.info';
import { SystemLogger } from '../../../../lib/logger/system';

class Providers {
	private providers: OEmbedProvider[];

	constructor() {
        /* Implementation Hidden */
    }

	static getConsumerUrl(provider: OEmbedProvider, url: string): string | undefined {
        /* Implementation Hidden */
    }

	static getCustomHeaders(provider: OEmbedProvider): { [k: string]: string } {
        /* Implementation Hidden */
    }

	registerProvider(provider: OEmbedProvider): number {
        /* Implementation Hidden */
    }

	getProviders(): OEmbedProvider[] {
        /* Implementation Hidden */
    }

	getProviderForUrl(url: string): OEmbedProvider | undefined {
        /* Implementation Hidden */
    }
}

const providers = new Providers();

providers.registerProvider({
	urls: [new RegExp('https?://soundcloud\\.com/\\S+')],
	endPoint: 'https://soundcloud.com/oembed?format=json&maxheight=150',
});

providers.registerProvider({
	urls: [
		new RegExp('https?://vimeo\\.com/[^/]+'),
		new RegExp('https?://vimeo\\.com/channels/[^/]+/[^/]+'),
		new RegExp('https://vimeo\\.com/groups/[^/]+/videos/[^/]+'),
	],
	endPoint: 'https://vimeo.com/api/oembed.json?maxheight=200',
});

providers.registerProvider({
	urls: [new RegExp('https?://www\\.youtube\\.com/\\S+'), new RegExp('https?://youtu\\.be/\\S+')],
	endPoint: 'https://www.youtube.com/oembed?maxheight=200',
});

providers.registerProvider({
	urls: [new RegExp('https?://www\\.rdio\\.com/\\S+'), new RegExp('https?://rd\\.io/\\S+')],
	endPoint: 'https://www.rdio.com/api/oembed/?format=json&maxheight=150',
});

providers.registerProvider({
	urls: [new RegExp('https?://www\\.slideshare\\.net/[^/]+/[^/]+')],
	endPoint: 'https://www.slideshare.net/api/oembed/2?format=json&maxheight=200',
});

providers.registerProvider({
	urls: [new RegExp('https?://www\\.dailymotion\\.com/video/\\S+')],
	endPoint: 'https://www.dailymotion.com/services/oembed?maxheight=200',
});

providers.registerProvider({
	urls: [new RegExp('https?://(twitter|x)\\.com/[^/]+/status/\\S+')],
	getHeaderOverrides: () => {
		return {
			'User-Agent': `${settings.get('API_Embed_UserAgent')} Rocket.Chat/${Info.version} Googlebot/2.1`,
		};
	},
});

providers.registerProvider({
	urls: [new RegExp('https?://(play|open)\\.spotify\\.com/(track|album|playlist|show)/\\S+')],
	endPoint: 'https://open.spotify.com/oembed',
});

providers.registerProvider({
	urls: [new RegExp('https?://www\\.loom\\.com/\\S+')],
	endPoint: 'https://www.loom.com/v1/oembed?format=json',
});

export const beforeGetUrlContent = (data: {
	urlObj: URL;
}): {
	urlObj: URL;
	headerOverrides?: { [k: string]: string };
} => {
    /* Implementation Hidden */
};

const cleanupOembed = (data: {
	url: string;
	meta: OEmbedMeta;
	headers: { [k: string]: string };
	content: OEmbedUrlContent;
}): {
	url: string;
	meta: OEmbedMeta;
	headers: { [k: string]: string };
	content: OEmbedUrlContent;
} => {
    /* Implementation Hidden */
};

export const afterParseUrlContent = (data: {
	url: string;
	meta: OEmbedMeta;
	headers: { [k: string]: string };
	content: OEmbedUrlContent;
}): {
	url: string;
	meta: OEmbedMeta;
	headers: { [k: string]: string };
	content: OEmbedUrlContent;
} => {
    /* Implementation Hidden */
};

```