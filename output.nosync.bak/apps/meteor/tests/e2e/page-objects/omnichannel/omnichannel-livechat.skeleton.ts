## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-livechat.ts

```typescript
import fs from 'fs/promises';

import type { Page, Locator, APIResponse } from '@playwright/test';

import { expect } from '../../utils/test';

export class OmnichannelLiveChat {
	readonly page: Page;

	constructor(
		page: Page,
		private readonly api: { get(url: string): Promise<APIResponse> },
	) {
        /* Implementation Hidden */
    }

	btnOpenOnlineLiveChat(label: string): Locator {
        /* Implementation Hidden */
    }

	get btnOpenLiveChat(): Locator {
		return this.page.locator(`[data-qa-id="chat-button"]`);
	}

	get btnNewChat(): Locator {
		return this.page.locator(`role=button[name="New Chat"]`);
	}

	get btnOptions(): Locator {
		return this.page.locator(`button >> text="Options"`);
	}

	get btnCloseChat(): Locator {
		return this.page.locator(`button >> text="Finish this chat"`);
	}

	get btnChangeDepartment(): Locator {
		return this.page.locator(`button >> text="Change department"`);
	}

	get btnCloseChatConfirm(): Locator {
		return this.page.locator(`button >> text="Yes"`);
	}

	get btnExpandChat(): Locator {
		return this.page.getByRole('button', { name: 'Expand chat' });
	}

	get txtHeaderTitle(): Locator {
		return this.page.locator('div >> text="Chat Finished"');
	}

	get btnChatNow(): Locator {
		return this.page.locator('[type="button"] >> text="Chat now"');
	}

	get headerTitle(): Locator {
		return this.page.locator('[data-qa="header-title"]');
	}

	get txtWatermark(): Locator {
		return this.page.locator('[data-qa="livechat-watermark"]');
	}

	get imgLogo(): Locator {
		return this.btnOpenLiveChat.locator('img[alt="Livechat"]');
	}

	alertMessage(message: string): Locator {
        /* Implementation Hidden */
    }

	txtChatMessage(message: string): Locator {
        /* Implementation Hidden */
    }

	async closeChat(): Promise<void> {
        /* Implementation Hidden */
    }

	async openLiveChat(): Promise<void> {
        /* Implementation Hidden */
    }

	// TODO: replace openLivechat with this method and create a new method for openOnlineLivechat
	// as openLivechat only opens a chat that is in the 'online' state
	async openAnyLiveChat(): Promise<void> {
        /* Implementation Hidden */
    }

	async startNewChat(): Promise<void> {
        /* Implementation Hidden */
    }

	async openAnyLiveChatAndSendMessage(params: {
		liveChatUser: { name: string; email: string };
		message: string;
		isOffline?: boolean;
		department?: string;
	}): Promise<void> {
        /* Implementation Hidden */
    }

	unreadMessagesBadge(count: number): Locator {
        /* Implementation Hidden */
    }

	get inputName(): Locator {
		return this.page.locator('[name="name"]');
	}

	get inputEmail(): Locator {
		return this.page.locator('[name="email"]');
	}

	get selectDepartment(): Locator {
		return this.page.locator('[name="department"]');
	}

	get textAreaMessage(): Locator {
		return this.page.locator('[name="message"]');
	}

	btnSendMessage(btnText: string): Locator {
        /* Implementation Hidden */
    }

	get btnOk(): Locator {
		return this.page.locator('role=button[name="OK"]');
	}

	get btnYes(): Locator {
		return this.page.locator('role=button[name="Yes"]');
	}

	get onlineAgentMessage(): Locator {
		return this.page.locator('[contenteditable="true"]');
	}

	get btnSendMessageToOnlineAgent(): Locator {
		return this.page.locator('footer div div div:nth-child(3) button');
	}

	get livechatModal(): Locator {
		return this.page.locator('[data-qa-type="modal-overlay"]');
	}

	livechatModalText(text: string): Locator {
        /* Implementation Hidden */
    }

	get fileUploadTarget(): Locator {
		return this.page.locator('#files-drop-target');
	}

	findUploadedFileLink(fileName: string): Locator {
        /* Implementation Hidden */
    }

	get typingIndicatorForVisitor(): Locator {
		return this.page.getByRole('status', { name: /typing/i });
	}

	public async sendMessage(liveChatUser: { name: string; email: string }, isOffline = true, department?: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async sendMessageAndCloseChat(
		liveChatUser: { name: string; email: string },
		message = 'this_a_test_message_from_user',
	): Promise<void> {
        /* Implementation Hidden */
    }

	async dragAndDropTxtFile(): Promise<void> {
        /* Implementation Hidden */
    }

	async dragAndDropLstFile(): Promise<void> {
        /* Implementation Hidden */
    }

	queuePosition(position: number): Locator {
        /* Implementation Hidden */
    }
}

```