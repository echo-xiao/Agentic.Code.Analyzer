## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-livechat-embedded.ts

```typescript
import type { Page, Locator } from '@playwright/test';

export class OmnichannelLiveChatEmbedded {
	readonly page: Page;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	btnOpenLiveChat(): Locator {
        /* Implementation Hidden */
    }

	btnFinishOfflineMessage(): Locator {
        /* Implementation Hidden */
    }

	get btnOptions(): Locator {
		return this.page.frameLocator('#rocketchat-iframe').locator(`button >> text="Options"`);
	}

	get btnCloseChat(): Locator {
		return this.page.frameLocator('#rocketchat-iframe').locator(`button >> text="Finish this chat"`);
	}

	get btnCloseChatConfirm(): Locator {
		return this.page.frameLocator('#rocketchat-iframe').locator(`button >> text="Yes"`);
	}

	get headerTitle(): Locator {
		return this.page.frameLocator('#rocketchat-iframe').locator('[data-qa="header-title"]');
	}

	get btnNewChat(): Locator {
		return this.page.frameLocator('#rocketchat-iframe').locator(`role=button[name="New Chat"]`);
	}

	get messageList(): Locator {
		return this.page.frameLocator('#rocketchat-iframe').locator('[data-qa="message-list"]');
	}

	get messageListBackground(): Promise<string> {
		return this.messageList.evaluate((el) => window.getComputedStyle(el).getPropertyValue('background-color'));
	}

	messageBubble(message: string): Locator {
        /* Implementation Hidden */
    }

	messageBubbleBackground(message: string): Promise<string> {
        /* Implementation Hidden */
    }

	txtChatMessage(message: string): Locator {
        /* Implementation Hidden */
    }

	imgAvatar(username: string): Locator {
        /* Implementation Hidden */
    }

	async openLiveChat(): Promise<void> {
        /* Implementation Hidden */
    }

	get inputName(): Locator {
		return this.page.frameLocator('#rocketchat-iframe').locator('[name="name"]');
	}

	get inputEmail(): Locator {
		return this.page.frameLocator('#rocketchat-iframe').locator('[name="email"]');
	}

	get textAreaMessage(): Locator {
		return this.page.frameLocator('#rocketchat-iframe').locator('[name="message"]');
	}

	btnSendMessage(btnText: string): Locator {
        /* Implementation Hidden */
    }

	get onlineAgentMessage(): Locator {
		return this.page.frameLocator('#rocketchat-iframe').locator('[contenteditable="true"]');
	}

	get btnSendMessageToOnlineAgent(): Locator {
		return this.page.frameLocator('#rocketchat-iframe').locator('footer div div div:nth-child(3) button');
	}

	get btnExpandChat(): Locator {
		return this.page.frameLocator('#rocketchat-iframe').getByRole('button', { name: 'Expand chat', exact: true });
	}

	public async sendMessage(liveChatUser: { name: string; email: string }, isOffline = true): Promise<void> {
        /* Implementation Hidden */
    }
}

```