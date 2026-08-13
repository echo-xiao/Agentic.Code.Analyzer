## File: apps/meteor/client/components/message/content/UrlPreviews.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { MessageBlock } from '@rocket.chat/fuselage';

import { useOembedLayout } from '../hooks/useOembedLayout';
import type { OEmbedPreviewMetadata } from './urlPreviews/OEmbedPreviewMetadata';
import OEmbedResolver from './urlPreviews/OEmbedResolver';
import UrlPreview from './urlPreviews/UrlPreview';
import type { UrlPreviewMetadata } from './urlPreviews/UrlPreviewMetadata';
import { buildImageURL } from './urlPreviews/buildImageURL';

type OembedUrlLegacy = Required<IMessage>['urls'][0];

type PreviewTypes = 'headers' | 'oembed';

type PreviewData = {
	type: PreviewTypes;
	data: OEmbedPreviewMetadata | UrlPreviewMetadata;
};

const normalizeMeta = ({ url, meta }: { url: string; meta: Record<string, string> }): OEmbedPreviewMetadata => {
    /* Implementation Hidden */
};

const hasContentType = (headers: OembedUrlLegacy['headers']): headers is { contentType: string } =>
	headers ? 'contentType' in headers : false;

const getHeaderType = (headers: OembedUrlLegacy['headers']): UrlPreviewMetadata['type'] | undefined => {
    /* Implementation Hidden */
};

const isValidPreviewMeta = ({
	siteName,
	siteUrl,
	authorName,
	authorUrl,
	title,
	description,
	image,
	html,
}: OEmbedPreviewMetadata): boolean =>
	!((!siteName || !siteUrl) && (!authorName || !authorUrl) && !title && !description && !image && !html);

const hasMeta = (url: OembedUrlLegacy): url is { url: string; meta: Record<string, string> } => !!url.meta && !!Object.values(url.meta);

const processMetaAndHeaders = (url: OembedUrlLegacy): PreviewData | false => {
    /* Implementation Hidden */
};

const isPreviewData = (data: PreviewData | false): data is PreviewData => !!data;

const isMetaPreview = (_data: PreviewData['data'], type: PreviewTypes): _data is OEmbedPreviewMetadata => type === 'oembed';

export type UrlPreviewsProps = { urls: OembedUrlLegacy[] };

const UrlPreviews = ({ urls }: UrlPreviewsProps) => {
    /* Implementation Hidden */
};

export default UrlPreviews;

```