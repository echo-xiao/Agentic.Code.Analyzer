## File: apps/meteor/app/ui-message/client/ActionManager.ts

```typescript
import type { DistributiveOmit } from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';
import { Random } from '@rocket.chat/random';
import { imperativeModal } from '@rocket.chat/ui-client';
import type { RouterContext, IActionManager } from '@rocket.chat/ui-contexts';
import type * as UiKit from '@rocket.chat/ui-kit';
import { t } from 'i18next';
import type { ContextType } from 'react';
import { lazy } from 'react';

import { UiKitTriggerTimeoutError } from './UiKitTriggerTimeoutError';
import * as banners from '../../../client/lib/banners';
import { dispatchToastMessage } from '../../../client/lib/toast';
import { exhaustiveCheck } from '../../../lib/utils/exhaustiveCheck';
import { sdk } from '../../utils/client/lib/SDKClient';

const UiKitModal = lazy(() => import('../../../client/views/modal/uikit/UiKitModal'));

export class ActionManager implements IActionManager {
	protected static TRIGGER_TIMEOUT = 5000;

	protected static TRIGGER_TIMEOUT_ERROR = 'TRIGGER_TIMEOUT_ERROR';

	protected events = new Emitter<{ busy: { busy: boolean }; [viewId: string]: any }>();

	protected appIdByTriggerId = new Map<string, string | undefined>();

	protected viewInstances = new Map<
		string,
		{
			payload?: {
				view: UiKit.ContextualBarView;
			};
			close: () => void;
		}
	>();

	public constructor(protected router: ContextType<typeof RouterContext>) {
        /* Implementation Hidden */
    }

	protected invalidateTriggerId(id: string) {
        /* Implementation Hidden */
    }

	public on(viewId: string, listener: (data: any) => void): void;

	public on(eventName: 'busy', listener: ({ busy }: { busy: boolean }) => void): void;

	public on(eventName: string, listener: (data: any) => void) {
        /* Implementation Hidden */
    }

	public off(viewId: string, listener: (data: any) => any): void;

	public off(eventName: 'busy', listener: ({ busy }: { busy: boolean }) => void): void;

	public off(eventName: string, listener: (data: any) => void) {
        /* Implementation Hidden */
    }

	public notifyBusy() {
        /* Implementation Hidden */
    }

	public notifyIdle() {
        /* Implementation Hidden */
    }

	public generateTriggerId(appId: string | undefined) {
        /* Implementation Hidden */
    }

	public async emitInteraction(appId: string, userInteraction: DistributiveOmit<UiKit.UserInteraction, 'triggerId'>) {
        /* Implementation Hidden */
    }

	protected async runWithTimeout<T>(task: () => Promise<T>, details: { triggerId: string; appId: string; viewId?: string }) {
        /* Implementation Hidden */
    }

	public handleServerInteraction(interaction: UiKit.ServerInteraction): UiKit.ServerInteraction['type'] | undefined {
        /* Implementation Hidden */
    }

	public getInteractionPayloadByViewId(viewId: UiKit.ContextualBarView['id']) {
        /* Implementation Hidden */
    }

	public openView(surface: 'modal', view: UiKit.ModalView): void;

	public openView(surface: 'banner', view: UiKit.BannerView): void;

	public openView(surface: 'contextual_bar', view: UiKit.ContextualBarView): void;

	public openView(surface: string, view: UiKit.View) {
        /* Implementation Hidden */
    }

	private openModal(view: UiKit.ModalView) {
        /* Implementation Hidden */
    }

	private openBanner(view: UiKit.BannerView) {
        /* Implementation Hidden */
    }

	private openContextualBar(view: UiKit.ContextualBarView) {
        /* Implementation Hidden */
    }

	public disposeView(viewId: UiKit.ModalView['id'] | UiKit.BannerView['viewId'] | UiKit.ContextualBarView['id']) {
        /* Implementation Hidden */
    }
}

```