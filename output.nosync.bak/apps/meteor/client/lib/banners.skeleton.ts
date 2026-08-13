## File: apps/meteor/client/lib/banners.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';
import type { Keys as IconName } from '@rocket.chat/icons';
import type * as UiKit from '@rocket.chat/ui-kit';

export type LegacyBannerPayload = {
	id: string;
	closable?: boolean;
	title?: string | (() => string);
	text?: string | (() => string);
	html?: string | (() => string);
	icon?: IconName;
	modifiers?: ('large' | 'danger')[];
	timer?: number;
	action?: () => Promise<void> | void;
	onClose?: () => Promise<void> | void;
};

type BannerPayload = LegacyBannerPayload | UiKit.BannerView;

export const isLegacyPayload = (payload: BannerPayload): payload is LegacyBannerPayload => !('blocks' in payload);

const queue: BannerPayload[] = [];
const emitter = new Emitter<{
	'update': undefined;
	'update-first': undefined;
}>();

export const firstSubscription = [
	(callback: () => void): (() => void) => emitter.on('update-first', callback),
	(): BannerPayload | null => queue[0] ?? null,
] as const;

export const open = (payload: BannerPayload): void => {
    /* Implementation Hidden */
};

export const closeById = (id: string): void => {
    /* Implementation Hidden */
};

export const close = (): void => {
    /* Implementation Hidden */
};

export const clear = (): void => {
    /* Implementation Hidden */
};

```