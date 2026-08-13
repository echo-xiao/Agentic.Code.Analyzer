## File: apps/meteor/tests/e2e/federation/page-objects/fragments/home-content.ts

```typescript
import type { Locator, Page } from '@playwright/test';

export class FederationHomeContent {
	protected readonly page: Page;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get inputMessage(): Locator {
		return this.page.locator('[name="msg"]');
	}

	get messagePopUpItems(): Locator {
		return this.page.locator('role=menu[name="People"]');
	}

	get messageListItems(): Locator {
		return this.page.locator('[role="listitem"][aria-roledescription="message"]');
	}

	get lastUserMessage(): Locator {
		return this.messageListItems.last();
	}

	get lastUserMessageBody(): Locator {
		return this.lastUserMessage.locator('[role="document"][aria-roledescription="message body"]');
	}

	async sendMessage(text: string): Promise<void> {
        /* Implementation Hidden */
    }

	async sendMessageUsingEnter(text: string): Promise<void> {
        /* Implementation Hidden */
    }

	async editLastMessage(message: string): Promise<void> {
        /* Implementation Hidden */
    }

	async deleteLastMessage(): Promise<void> {
        /* Implementation Hidden */
    }

	async starLastMessage(): Promise<void> {
        /* Implementation Hidden */
    }

	async replyInDm(message: string): Promise<void> {
        /* Implementation Hidden */
    }

	async sendAudioRecordedMessage(): Promise<void> {
        /* Implementation Hidden */
    }

	async sendAudioRecordedInThreadMessage(): Promise<void> {
        /* Implementation Hidden */
    }

	async sendVideoRecordedMessage(): Promise<void> {
        /* Implementation Hidden */
    }

	async dispatchSlashCommand(text: string): Promise<void> {
        /* Implementation Hidden */
    }

	get btnModalConfirm(): Locator {
		return this.page.locator('#modal-root .rcx-button-group--align-end .rcx-button--primary');
	}

	get lastMessageFileName(): Locator {
		return this.page.locator('[role="listitem"][aria-roledescription="message"]:last-child');
	}

	async getLastFileMessageByFileName(filename: string): Promise<Locator> {
        /* Implementation Hidden */
    }

	async getLastFileThreadMessageByFileName(filename: string): Promise<Locator> {
        /* Implementation Hidden */
    }

	get lastFileMessage(): Locator {
		return this.page.locator('[role="listitem"][aria-roledescription="message"]:last-child .rcx-message-container').last();
	}

	get waitForLastMessageTextAttachmentEqualsText(): Locator {
		return this.page.locator('[role="listitem"][aria-roledescription="message"]:last-child .rcx-attachment__details .rcx-message-body');
	}

	get waitForLastThreadMessageTextAttachmentEqualsText(): Locator {
		return this.page
			.locator('div.thread-list ul.thread [role="listitem"][aria-roledescription="message"]')
			.last()
			.locator('.rcx-attachment__details');
	}

	get btnOptionEditMessage(): Locator {
		return this.page.locator('[data-qa-id="edit-message"]');
	}

	get btnOptionDeleteMessage(): Locator {
		return this.page.locator('[data-qa-id="delete-message"]');
	}

	get btnOptionPinMessage(): Locator {
		return this.page.locator('[data-qa-id="pin-message"]');
	}

	get btnOptionStarMessage(): Locator {
		return this.page.locator('[data-qa-id="star-message"]');
	}

	get btnVideoMessage(): Locator {
		return this.page.locator('[data-qa-id="video-message"]');
	}

	get btnRecordAudio(): Locator {
		return this.page.locator('[data-qa-id="audio-record"]');
	}

	get btnMenuMoreActions() {
		return this.page.locator('[data-qa-id="menu-more-actions"]');
	}

	get btnContactEdit(): Locator {
		return this.page.locator('.rcx-vertical-bar button:has-text("Edit")');
	}

	get btnOptionReplyInThread(): Locator {
		return this.page.locator('[data-qa-id="reply-in-thread"]');
	}

	get btnOptionStartDiscussion(): Locator {
		return this.page.locator('[data-qa-id="start-discussion"]');
	}

	get btnOptionReplyDirectly(): Locator {
		return this.page.locator('[data-qa-id="reply-directly"]');
	}

	get lastThreadMessageText(): Locator {
		return this.page.locator('div.thread-list ul.thread [role="listitem"][aria-roledescription="message"]').last();
	}

	async sendFileMessage(fileName: string): Promise<void> {
        /* Implementation Hidden */
    }

	async sendThreadMessage(message: string): Promise<void> {
        /* Implementation Hidden */
    }

	async openLastMessageMenu(): Promise<void> {
        /* Implementation Hidden */
    }

	threadSendToChannelAlso(): Locator {
        /* Implementation Hidden */
    }

	async quoteMessage(message: string): Promise<void> {
        /* Implementation Hidden */
    }

	async openLastThreadMessageMenu(): Promise<void> {
        /* Implementation Hidden */
    }

	async quoteMessageInsideThread(message: string): Promise<void> {
        /* Implementation Hidden */
    }

	async reactToMessage(emoji: string): Promise<void> {
        /* Implementation Hidden */
    }

	async unreactLastMessage(): Promise<void> {
        /* Implementation Hidden */
    }

	async getSystemMessageByText(text: string): Promise<Locator> {
        /* Implementation Hidden */
    }

	async getLastSystemMessageName(): Promise<Locator> {
        /* Implementation Hidden */
    }

	async getAllReactions(): Promise<Locator> {
        /* Implementation Hidden */
    }
}

```