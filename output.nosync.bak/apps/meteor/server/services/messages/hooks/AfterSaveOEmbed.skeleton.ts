## File: apps/meteor/server/services/messages/hooks/AfterSaveOEmbed.ts

```typescript
import type {
	OEmbedUrlContentResult,
	MessageUrl,
	OEmbedUrlWithMetadata,
	OEmbedMeta,
	IMessage,
	OEmbedUrlContent,
} from '@rocket.chat/core-typings';
import { isOEmbedUrlWithMetadata } from '@rocket.chat/core-typings';
import { Logger } from '@rocket.chat/logger';
import { OEmbedCache, Messages } from '@rocket.chat/models';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import { isAbsoluteURL } from '@rocket.chat/tools';
import he from 'he';
import iconv from 'iconv-lite';
import ipRangeCheck from 'ip-range-check';
import jschardet from 'jschardet';
import { camelCase } from 'lodash';

import { settings } from '../../../../app/settings/server';
import { Info } from '../../../../app/utils/rocketchat.info';
import { afterParseUrlContent, beforeGetUrlContent } from '../lib/oembed/providers';

const MAX_EXTERNAL_URL_PREVIEWS = 5;
const log = new Logger('OEmbed');
//  Detect encoding
//  Priority:
//  Detected == HTTP Header > Detected == HTML meta > HTTP Header > HTML meta > Detected > Default (utf-8)
//  See also: https://www.w3.org/International/questions/qa-html-encoding-declarations.en#quickanswer
const getCharset = function (contentType: string, body: Buffer): string {
    /* Implementation Hidden */
};

const toUtf8 = function (contentType: string, body: Buffer): string {
    /* Implementation Hidden */
};

const getUrlContent = async (urlObj: URL, redirectCount = 5): Promise<OEmbedUrlContent> => {
    /* Implementation Hidden */
};

const parseUrl = async function (url: string): Promise<{ urlPreview: MessageUrl; foundMeta: boolean }> {
    /* Implementation Hidden */
};

const getUrlMeta = async function (
	url: string,
	withFragment?: boolean,
): Promise<OEmbedUrlWithMetadata | OEmbedUrlContentResult | undefined> {
    /* Implementation Hidden */
};

const getUrlMetaWithCache = async function (
	url: string,
	withFragment?: boolean,
): Promise<OEmbedUrlWithMetadata | undefined | OEmbedUrlContentResult> {
    /* Implementation Hidden */
};

const getRelevantMetaTags = function (metaObj: OEmbedMeta): Record<string, string> | void {
    /* Implementation Hidden */
};

const insertMaxWidthInOembedHtml = (oembedHtml?: string): string | undefined =>
	oembedHtml?.replace('iframe', 'iframe style="max-width: 100%;width:400px;height:225px"');

const rocketUrlParser = async function (message: IMessage): Promise<IMessage> {
    /* Implementation Hidden */
};

export const OEmbed: {
	rocketUrlParser: (message: IMessage) => Promise<IMessage>;
	parseUrl: (url: string) => Promise<{ urlPreview: MessageUrl; foundMeta: boolean }>;
} = {
	rocketUrlParser,
	parseUrl,
};

```