## File: apps/meteor/app/assets/server/assets.ts

```typescript
import crypto from 'node:crypto';
import type { ServerResponse, IncomingMessage } from 'node:http';

import type { IRocketChatAssets, IRocketChatAsset, ISetting } from '@rocket.chat/core-typings';
import { Settings } from '@rocket.chat/models';
import type { NextHandleFunction } from 'connect';
import sizeOf from 'image-size';
import { Meteor } from 'meteor/meteor';
import { WebApp, WebAppInternals } from 'meteor/webapp';
import sharp from 'sharp';

import { hasPermissionAsync } from '../../../server/lib/authorization/hasPermission';
import { RocketChatFile } from '../../file/server';
import { notifyOnSettingChangedById } from '../../lib/server/lib/notifyListener';
import { settings, settingsRegistry } from '../../settings/server';
import { getExtension } from '../../utils/lib/mimeTypes';
import { getURL } from '../../utils/server/getURL';

const RocketChatAssetsInstance = new RocketChatFile.GridFS({
	name: 'assets',
});

type IRocketChatAssetsConfig = Record<keyof IRocketChatAssets, IRocketChatAsset & { settingOptions?: Partial<ISetting> }>;

const assets: IRocketChatAssetsConfig = {
	logo: {
		label: 'logo (svg, png, jpg)',
		defaultUrl: 'images/logo/logo.svg',
		constraints: {
			type: 'image',
			extensions: ['svg', 'png', 'jpg', 'jpeg'],
		},
		wizard: {
			step: 3,
			order: 2,
		},
	},
	logo_dark: {
		label: 'logo - dark theme (svg, png, jpg)',
		defaultUrl: 'images/logo/logo_dark.svg',
		constraints: {
			type: 'image',
			extensions: ['svg', 'png', 'jpg', 'jpeg'],
		},
	},
	background: {
		label: 'login background (svg, png, jpg)',
		constraints: {
			type: 'image',
			extensions: ['svg', 'png', 'jpg', 'jpeg'],
		},
	},
	background_dark: {
		label: 'login background - dark theme (svg, png, jpg)',
		constraints: {
			type: 'image',
			extensions: ['svg', 'png', 'jpg', 'jpeg'],
		},
	},
	favicon_ico: {
		label: 'favicon (ico)',
		defaultUrl: 'favicon.ico',
		constraints: {
			type: 'image',
			extensions: ['ico'],
		},
	},
	favicon: {
		label: 'favicon (svg)',
		defaultUrl: 'images/logo/icon.svg',
		constraints: {
			type: 'image',
			extensions: ['svg'],
		},
	},
	favicon_16: {
		label: 'favicon 16x16 (png)',
		defaultUrl: 'images/logo/favicon-16x16.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 16,
			height: 16,
		},
	},
	favicon_32: {
		label: 'favicon 32x32 (png)',
		defaultUrl: 'images/logo/favicon-32x32.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 32,
			height: 32,
		},
	},
	favicon_192: {
		label: 'android-chrome 192x192 (png)',
		defaultUrl: 'images/logo/android-chrome-192x192.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 192,
			height: 192,
		},
	},
	favicon_512: {
		label: 'android-chrome 512x512 (png)',
		defaultUrl: 'images/logo/android-chrome-512x512.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 512,
			height: 512,
		},
	},
	touchicon_180: {
		label: 'apple-touch-icon 180x180 (png)',
		defaultUrl: 'images/logo/apple-touch-icon.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 180,
			height: 180,
		},
	},
	touchicon_180_pre: {
		label: 'apple-touch-icon-precomposed 180x180 (png)',
		defaultUrl: 'images/logo/apple-touch-icon-precomposed.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 180,
			height: 180,
		},
	},
	tile_70: {
		label: 'mstile 70x70 (png)',
		defaultUrl: 'images/logo/mstile-70x70.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 70,
			height: 70,
		},
	},
	tile_144: {
		label: 'mstile 144x144 (png)',
		defaultUrl: 'images/logo/mstile-144x144.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 144,
			height: 144,
		},
	},
	tile_150: {
		label: 'mstile 150x150 (png)',
		defaultUrl: 'images/logo/mstile-150x150.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 150,
			height: 150,
		},
	},
	tile_310_square: {
		label: 'mstile 310x310 (png)',
		defaultUrl: 'images/logo/mstile-310x310.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 310,
			height: 310,
		},
	},
	tile_310_wide: {
		label: 'mstile 310x150 (png)',
		defaultUrl: 'images/logo/mstile-310x150.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 310,
			height: 150,
		},
	},
	safari_pinned: {
		label: 'safari pinned tab (svg)',
		defaultUrl: 'images/logo/safari-pinned-tab.svg',
		constraints: {
			type: 'image',
			extensions: ['svg'],
		},
	},
	livechat_widget_logo: {
		label: 'widget logo (svg, png, jpg)',
		constraints: {
			type: 'image',
			extensions: ['svg', 'png', 'jpg', 'jpeg'],
		},
		settingOptions: {
			section: 'Livechat',
			group: 'Omnichannel',
			invalidValue: {
				defaultUrl: undefined,
			},
			enableQuery: { _id: 'Livechat_enabled', value: true },
			enterprise: true,
			modules: ['livechat-enterprise'],
			sorter: 999 + 1,
		},
	},
};

function getAssetByKey(key: string) {
    /* Implementation Hidden */
}

class RocketChatAssetsClass {
	get assets(): IRocketChatAssets {
		return assets;
	}

	public async setAssetWithBuffer(
		file: Buffer,
		contentType: string,
		asset: string,
	): Promise<{
		key: string;
		value: IRocketChatAsset;
	}> {
        /* Implementation Hidden */
    }

	public async unsetAsset(asset: string) {
        /* Implementation Hidden */
    }

	public refreshClients(): boolean {
        /* Implementation Hidden */
    }

	public async processAsset(settingKey: string, settingValue: any): Promise<Record<string, any> | undefined> {
        /* Implementation Hidden */
    }

	public getURL(assetName: string, options = { cdn: false, full: true }): string {
        /* Implementation Hidden */
    }
}

export const RocketChatAssets = new RocketChatAssetsClass();

export async function addAssetToSetting(asset: string, value: IRocketChatAsset, options?: Partial<ISetting>): Promise<void> {
    /* Implementation Hidden */
}

void (async () => {
	for (const key of Object.keys(assets)) {
		const { wizard, settingOptions, ...value } = getAssetByKey(key);
		await addAssetToSetting(key, value, { ...settingOptions, wizard });
	}
})();

Meteor.startup(() => {
	setTimeout(() => {
		process.emit('message', {
			refresh: 'client',
		});
	}, 200);
});

export const refreshClients = async (userId: string) => {
    /* Implementation Hidden */
};

const listener = (req: IncomingMessage, res: ServerResponse, next: NextHandleFunction) => {
    /* Implementation Hidden */
};

WebApp.connectHandlers.use('/assets/', listener);

```