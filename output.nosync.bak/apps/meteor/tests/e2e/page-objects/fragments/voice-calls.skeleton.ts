## File: apps/meteor/tests/e2e/page-objects/fragments/voice-calls.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { expect } from '../../utils/test';

const timerToSeconds = (time: string): number => {
    /* Implementation Hidden */
};

export class VoiceCallControls {
	private readonly _controls: Locator;

	constructor(controls: Locator) {
        /* Implementation Hidden */
    }

	get call(): Locator {
		return this._controls.getByRole('button', { name: 'Call', exact: true });
	}

	get accept(): Locator {
		return this._controls.getByRole('button', { name: 'Accept', exact: true });
	}

	get hangup(): Locator {
		return this._controls.getByRole('button', { name: /End call|Reject/, exact: true });
	}

	get cancel(): Locator {
		return this._controls.getByRole('button', { name: 'Cancel', exact: true });
	}

	get dialpad(): Locator {
		return this._controls.getByRole('button', { name: /Dialpad/i });
	}

	get mute(): Locator {
		return this._controls.getByRole('button', { name: /Mute/i });
	}

	get hold(): Locator {
		return this._controls.getByRole('button', { name: /Hold|Resume/i });
	}

	get transfer(): Locator {
		return this._controls.getByRole('button', { name: 'Forward', exact: true });
	}

	get shareScreen(): Locator {
		return this._controls.getByRole('button', { name: /Share screen|Stop sharing screen/i });
	}

	get toggleChat(): Locator {
		return this._controls.getByRole('button', { name: /Hide chat|Show chat/i });
	}

	get directMessage(): Locator {
		return this._controls.getByRole('button', { name: /Direct message/i });
	}

	get popout(): Locator {
		return this._controls.getByRole('button', { name: /Open in new window|Return to main window/i });
	}
}

export class TransferModal {
	private readonly root: Locator;

	private readonly page: Page;

	constructor(page: Page, root: Locator) {
        /* Implementation Hidden */
    }

	get content(): Locator {
		return this.root;
	}

	get input(): Locator {
		return this.root.getByRole('textbox');
	}

	get hangUpAndTransfer(): Locator {
		return this.root.getByRole('button', { name: 'Hang up and transfer call', exact: true });
	}

	async transferCall(username: string): Promise<void> {
        /* Implementation Hidden */
    }
}

export class Widget {
	private readonly root: Locator;

	private readonly callControls: VoiceCallControls;

	private readonly headerControls: VoiceCallControls;

	private readonly transferModal: TransferModal;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get content(): Locator {
		return this.root;
	}

	get controls(): VoiceCallControls {
		return this.callControls;
	}

	get timer(): Locator {
		return this.root.getByRole('time');
	}

	get btnShowCallHere(): Locator {
		return this.root.getByRole('button', { name: 'Show call here' });
	}

	async showCallHere(): Promise<void> {
        /* Implementation Hidden */
    }

	async getTimerContentInSeconds() {
        /* Implementation Hidden */
    }

	async initiateCall(): Promise<void> {
        /* Implementation Hidden */
    }

	async acceptCall(): Promise<void> {
        /* Implementation Hidden */
    }

	async endCall(): Promise<void> {
        /* Implementation Hidden */
    }

	async goToDm(): Promise<void> {
        /* Implementation Hidden */
    }

	async transferCall(username: string): Promise<void> {
        /* Implementation Hidden */
    }

	async muteSelf(): Promise<void> {
        /* Implementation Hidden */
    }

	async unmuteSelf(): Promise<void> {
        /* Implementation Hidden */
    }

	async holdSelf(): Promise<void> {
        /* Implementation Hidden */
    }

	async resumeSelf(): Promise<void> {
        /* Implementation Hidden */
    }

	async openDialpad(): Promise<void> {
        /* Implementation Hidden */
    }

	async closeDialpad(): Promise<void> {
        /* Implementation Hidden */
    }

	get allScreenShareVideos(): Locator {
		return this.root.locator('video');
	}

	async shareScreen(): Promise<void> {
        /* Implementation Hidden */
    }

	async stopSharing(): Promise<void> {
        /* Implementation Hidden */
    }

	async openPopout(): Promise<void> {
        /* Implementation Hidden */
    }

	peerCard(username: string): Locator {
        /* Implementation Hidden */
    }
}

export class RoomSection {
	private readonly root: Locator;

	public readonly callControls: VoiceCallControls;

	public readonly otherControls: VoiceCallControls;

	constructor(root: Locator) {
        /* Implementation Hidden */
    }

	get content(): Locator {
		return this.root;
	}

	get controls(): VoiceCallControls {
		return this.callControls;
	}

	get timer(): Locator {
		return this.root.getByRole('time');
	}

	get allScreenShareVideos(): Locator {
		return this.root.locator('video');
	}

	get btnShowCallHere(): Locator {
		return this.root.getByRole('button', { name: 'Show call here' });
	}

	async showCallHere(): Promise<void> {
        /* Implementation Hidden */
    }

	async getTimerContentInSeconds() {
        /* Implementation Hidden */
    }

	async endCall(): Promise<void> {
        /* Implementation Hidden */
    }

	async hideChat(): Promise<void> {
        /* Implementation Hidden */
    }

	async showChat(): Promise<void> {
        /* Implementation Hidden */
    }

	async muteSelf(): Promise<void> {
        /* Implementation Hidden */
    }

	async unmuteSelf(): Promise<void> {
        /* Implementation Hidden */
    }

	async holdSelf(): Promise<void> {
        /* Implementation Hidden */
    }

	async resumeSelf(): Promise<void> {
        /* Implementation Hidden */
    }

	async shareScreen(): Promise<void> {
        /* Implementation Hidden */
    }

	async stopSharing(): Promise<void> {
        /* Implementation Hidden */
    }

	peerCard(username: string): Locator {
        /* Implementation Hidden */
    }

	async openPopout(): Promise<void> {
        /* Implementation Hidden */
    }
}

export class PopoutPage extends RoomSection {
	private readonly page: Page;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	override async endCall(): Promise<void> {
        /* Implementation Hidden */
    }
}

export class VoiceCalls {
	public readonly widget: Widget;

	public readonly roomSection: RoomSection;

	public popoutPage: PopoutPage | undefined;

	private readonly page: Page;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get popout(): PopoutPage {
		if (!this.popoutPage) {
			throw new Error('Voice call - Popout is not open (call openPopout(Room|Widget) first)');
		}
		return this.popoutPage;
	}

	// Open the popout from the room section
	async openPopoutRoom(): Promise<void> {
        /* Implementation Hidden */
    }

	// Open the popout from the widget
	async openPopoutWidget(): Promise<void> {
        /* Implementation Hidden */
    }
}

```