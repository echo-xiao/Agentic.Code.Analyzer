## File: apps/meteor/tests/e2e/page-objects/fragments/home-content.ts

```typescript
import fs from 'fs/promises';
import { resolve, join, relative } from 'node:path';

import type { Locator, Page } from '@playwright/test';

import { RoomComposer, ThreadComposer } from './composer';
import { createMediaResponsePromise } from '../../fixtures/responses/mediaResponse';
import { expect } from '../../utils/test';

const FIXTURES_PATH = relative(process.cwd(), resolve(__dirname, '../../fixtures/files'));

export function getFilePath(fileName: string): string {
    /* Implementation Hidden */
}

export class HomeContent {
	protected readonly page: Page;

	readonly composer: RoomComposer;

	protected readonly threadComposer: ThreadComposer;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get channelHeader(): Locator {
		return this.page.locator('main header');
	}

	get burgerButton(): Locator {
		return this.channelHeader.getByRole('button', { name: 'Open sidebar' });
	}

	get channelRetentionPolicyWarning(): Locator {
		return this.page.locator('main').getByRole('alert', { name: 'Retention policy warning banner' });
	}

	get messagePopupUsers(): Locator {
		return this.page.locator('role=menu[name="People"]');
	}

	get mainMessageList(): Locator {
		return this.page.getByRole('list', { name: 'Message list', exact: true });
	}

	get threadMessageList(): Locator {
		return this.page.getByRole('list', { name: 'Thread message list', exact: true });
	}

	get messageListItems(): Locator {
		return this.mainMessageList.locator('[role="listitem"][aria-roledescription="message"]');
	}

	get mainMessageListScroller(): Locator {
		return this.page.locator('[data-overlayscrollbars]', { has: this.mainMessageList });
	}

	get threadMessageListScroller(): Locator {
		return this.page.locator('[data-overlayscrollbars]', { has: this.threadMessageList });
	}

	get systemMessageListItems(): Locator {
		return this.mainMessageList.locator('[role="listitem"][aria-roledescription="system message"]');
	}

	get threadMessageListItems(): Locator {
		return this.threadMessageList.locator('[role="listitem"][aria-roledescription="thread message"]');
	}

	get lastUserMessage(): Locator {
		return this.messageListItems.last();
	}

	get lastUserThreadMessage(): Locator {
		return this.threadMessageListItems.last();
	}

	get lastThreadMessagePreview(): Locator {
		return this.page.getByRole('listitem').locator('[role="link"][aria-roledescription="thread message preview"]').last();
	}

	get lastUserMessageDownloadLink(): Locator {
		return this.lastUserMessage.getByRole('link', { name: 'Download' });
	}

	nthMessage(index: number): Locator {
        /* Implementation Hidden */
    }

	get lastUserMessageBody(): Locator {
		return this.lastUserMessage.locator('[role="document"][aria-roledescription="message body"]');
	}

	get lastUserMessageAttachment(): Locator {
		return this.page.locator('[role="document"][aria-roledescription="message attachment"]').last();
	}

	get lastUserMessageNotSequential(): Locator {
		return this.mainMessageList.locator('[role="listitem"][aria-roledescription="message"][data-sequential="false"]').last();
	}

	get encryptedRoomHeaderIcon(): Locator {
		return this.page.locator('.rcx-room-header i.rcx-icon--name-key');
	}

	get lastIgnoredUserMessage(): Locator {
		return this.lastUserMessageBody.locator('role=button[name="This message was ignored"]');
	}

	async joinRoomIfNeeded(): Promise<void> {
        /* Implementation Hidden */
    }

	async sendMessage(text: string, enforce = true): Promise<void> {
        /* Implementation Hidden */
    }

	async dispatchSlashCommand(text: string): Promise<void> {
        /* Implementation Hidden */
    }

	async forwardMessage(chatName: string) {
        /* Implementation Hidden */
    }

	// TODO: use modal fragments -----------------------------------------
	get btnModalCancel(): Locator {
		return this.page.locator('#modal-root .rcx-button-group--align-end .rcx-button--secondary');
	}

	private get fileUploadModal(): Locator {
		return this.page.getByRole('dialog', { name: 'File Upload' });
	}

	get btnModalConfirm(): Locator {
		return this.page.locator('#modal-root .rcx-button-group--align-end .rcx-button--primary');
	}

	get btnModalConfirmDelete(): Locator {
		return this.page.getByRole('button', { name: 'Yes, delete', exact: true });
	}

	get btnCancelQuotePreview(): Locator {
		return this.page.getByRole('button', { name: 'Dismiss quoted message' });
	}

	get getFileDescription(): Locator {
		return this.lastUserMessage.locator('[role="document"][aria-roledescription="message body"]');
	}

	get inputFileUploadName(): Locator {
		return this.fileUploadModal.getByRole('textbox', { name: 'File name' });
	}

	get btnUpdateFileUpload(): Locator {
		return this.fileUploadModal.getByRole('button', { name: 'Update' });
	}

	get btnCancelUpdateFileUpload(): Locator {
		return this.fileUploadModal.getByRole('button', { name: 'Cancel' });
	}

	// -----------------------------------------

	getLastMessageByFileName(filename: string): Locator {
        /* Implementation Hidden */
    }

	get lastMessageTextAttachment(): Locator {
		return this.messageListItems.last().locator('[role="document"][aria-roledescription="message attachment"]');
	}

	get lastMessageTextAttachmentEqualsText(): Locator {
		return this.messageListItems.last().locator('.rcx-attachment__details .rcx-message-body');
	}

	get btnQuoteMessage(): Locator {
		return this.page.getByRole('button', { name: 'Quote' });
	}

	get quotePreview(): Locator {
		return this.page.locator('footer blockquote');
	}

	get quotedMessage(): Locator {
		return this.page.getByRole('blockquote');
	}

	quotedFileDescription(fileDescription: string): Locator {
        /* Implementation Hidden */
    }

	quotedFileName(fileName: string): Locator {
        /* Implementation Hidden */
    }

	threadMessageQuotedFileDescription(fileDescription: string): Locator {
        /* Implementation Hidden */
    }

	threadMessageQuotedFileName(fileName: string): Locator {
        /* Implementation Hidden */
    }

	get linkPreview(): Locator {
		return this.lastUserMessage.getByText('Link Preview');
	}

	quotedLinkText(name: string): Locator {
        /* Implementation Hidden */
    }

	get threadQuotedMessage(): Locator {
		return this.page.getByRole('dialog').getByRole('blockquote');
	}

	get threadQuotePreview(): Locator {
		return this.page.getByRole('dialog').locator('footer blockquote');
	}

	get lastThreadMessageTextAttachmentEqualsText(): Locator {
		return this.threadMessageListItems.last().locator('.rcx-attachment__details');
	}

	get mainThreadMessageText(): Locator {
		return this.threadMessageListItems.first();
	}

	get lastThreadMessagePreviewText(): Locator {
		return this.page.locator('div.messages-box .messages-list [role=link]').last();
	}

	get lastThreadMessageFileDescription(): Locator {
		return this.threadMessageListItems.last().locator('[role="document"][aria-roledescription="message body"]');
	}

	getLastThreadMessageByFileName(filename: string): Locator {
        /* Implementation Hidden */
    }

	// TODO: improve locator specificity
	get menuMore(): Locator {
		return this.page.getByRole('menu', { name: 'More', exact: true });
	}

	get lastThreadMessageTextAttachment(): Locator {
		return this.threadMessageListItems.last().locator('[role="document"][aria-roledescription="message attachment"]');
	}

	get btnOptionEditMessage(): Locator {
		return this.menuMore.getByRole('menuitem', { name: 'Edit', exact: true });
	}

	get btnOptionDeleteMessage(): Locator {
		return this.menuMore.getByRole('menuitem', { name: 'Delete', exact: true });
	}

	get btnOptionPinMessage(): Locator {
		return this.menuMore.getByRole('menuitem', { name: 'Pin', exact: true });
	}

	get btnOptionStarMessage(): Locator {
		return this.menuMore.getByRole('menuitem', { name: 'Star', exact: true });
	}

	get btnOptionReplyInDm(): Locator {
		return this.menuMore.getByRole('menuitem', { name: 'Reply in direct message', exact: true });
	}

	get btnVoiceCall(): Locator {
		return this.primaryRoomActionsToolbar.getByRole('button', { name: 'Voice call' });
	}

	get btnContactInformation(): Locator {
		return this.page.getByRole('button', { name: 'User Info' });
	}

	get btnContactInfoVoiceCall(): Locator {
		return this.page.getByRole('group').getByRole('button', { name: 'Voice call' });
	}

	get btnSendTranscript(): Locator {
		return this.page.locator('role=button[name="Send transcript"]');
	}

	get btnSendTranscriptToEmail(): Locator {
		return this.page.locator('li.rcx-option', { hasText: 'Send via email' });
	}

	get btnSendTranscriptAsPDF(): Locator {
		return this.page.locator('li.rcx-option', { hasText: 'Export as PDF' });
	}

	get btnNewCannedResponse(): Locator {
		return this.page.locator('.rcx-vertical-bar button:has-text("Create")');
	}

	get imageGallery(): Locator {
		return this.page.getByRole('dialog', { name: 'Image gallery', exact: true });
	}

	get imageGalleryImage(): Locator {
		return this.imageGallery.locator('.swiper-zoom-container img');
	}

	async getGalleryButtonByName(name: string) {
        /* Implementation Hidden */
    }

	async dragAndDropTxtFile({ waitForResponse = true }: { waitForResponse?: boolean } = {}): Promise<void> {
        /* Implementation Hidden */
    }

	async dragAndDropLstFile({ waitForResponse = true }: { waitForResponse?: boolean } = {}): Promise<void> {
        /* Implementation Hidden */
    }

	async dragAndDropTxtFileToThread({ waitForResponse = true }: { waitForResponse?: boolean } = {}): Promise<void> {
        /* Implementation Hidden */
    }

	async sendFileMessage(fileName: string, { waitForResponse = true }: { waitForResponse?: boolean } = {}): Promise<void> {
        /* Implementation Hidden */
    }

	async sendFileMessageToThread(fileName: string, { waitForResponse = true }: { waitForResponse?: boolean } = {}): Promise<void> {
        /* Implementation Hidden */
    }

	async openLastMessageMenu(): Promise<void> {
        /* Implementation Hidden */
    }

	async openLastThreadMessageMenu(): Promise<void> {
        /* Implementation Hidden */
    }

	async toggleAlsoSendThreadToChannel(isChecked: boolean): Promise<void> {
        /* Implementation Hidden */
    }

	get lastSystemMessageBody(): Locator {
		return this.page.locator('[role=document][aria-roledescription="system message body"]').last();
	}

	get resumeOnHoldOmnichannelChatButton(): Locator {
		return this.page.locator('button.rcx-button--primary >> text="Resume"');
	}

	get primaryRoomActionsToolbar(): Locator {
		return this.page.getByRole('toolbar', { name: 'Primary Room actions' });
	}

	get btnVideoCall(): Locator {
		return this.page.locator('[role=toolbar][aria-label="Primary Room actions"]').getByRole('button', { name: 'Video call' });
	}

	get btnToolbarOptions(): Locator {
		return this.primaryRoomActionsToolbar.getByRole('button', { name: 'Options', exact: true });
	}

	get optionsMenu(): Locator {
		return this.page.getByRole('menu', { name: 'Options', exact: true });
	}

	get starredMessagesMenuOption(): Locator {
		return this.optionsMenu.getByRole('menuitem', { name: 'Starred Messages', exact: true });
	}

	getVideoConfPopup(name?: string): Locator {
        /* Implementation Hidden */
    }

	get btnStartVideoCall(): Locator {
		return this.getVideoConfPopup().getByRole('button', { name: 'Start call' });
	}

	get btnVideoConfMic(): Locator {
		return this.getVideoConfPopup().getByRole('button', { name: 'Mic' });
	}

	get btnDeclineVideoCall(): Locator {
		return this.page.locator('.rcx-button--secondary-danger.rcx-button >> text="Decline"');
	}

	get videoConfMessageBlock(): Locator {
		return this.page.locator('.rcx-videoconf-message-block');
	}

	get btnAnonymousSignIn(): Locator {
		return this.page.locator('footer >> role=button[name="Sign in to start talking"]');
	}

	get btnAnonymousTalk(): Locator {
		return this.page.locator('role=button[name="Or talk as anonymous"]');
	}

	get nextSlideButton(): Locator {
		return this.page.getByLabel('Next slide');
	}

	get previousSlideButton(): Locator {
		return this.page.getByLabel('Previous slide');
	}

	get currentGalleryImage(): Locator {
		return this.page.locator('div[class="swiper-slide swiper-slide-active"] img');
	}

	// TODO: use getSystemMessageByText instead
	findSystemMessage(text: string): Locator {
        /* Implementation Hidden */
    }

	getSystemMessageByText(text: string): Locator {
        /* Implementation Hidden */
    }

	getMessageByText(text: string): Locator {
        /* Implementation Hidden */
    }

	getLastMessageActionButton(name: string): Locator {
        /* Implementation Hidden */
    }

	getLastThreadMessageActionButton(name: string): Locator {
        /* Implementation Hidden */
    }

	getMessageById(id: string): Locator {
        /* Implementation Hidden */
    }

	async scrollToMessage(messageLocator: Locator, direction: 'up' | 'down' = 'up'): Promise<Locator> {
        /* Implementation Hidden */
    }

	async waitForChannel(): Promise<void> {
        /* Implementation Hidden */
    }

	async waitForThread(): Promise<void> {
        /* Implementation Hidden */
    }

	async openReplyInThread(): Promise<void> {
        /* Implementation Hidden */
    }

	async sendMessageInThread(text: string): Promise<void> {
        /* Implementation Hidden */
    }

	async sendMessageInVideoConfPopup(text: string): Promise<void> {
        /* Implementation Hidden */
    }

	async deleteLastMessage(): Promise<void> {
        /* Implementation Hidden */
    }

	get btnClearSelection() {
		return this.page.getByRole('button', { name: 'Clear selection' });
	}

	get contactUnknownCallout() {
		return this.page.getByRole('status', { name: 'Unknown contact. This contact is not on the contact list.' });
	}

	get btnDismissContactUnknownCallout() {
		return this.contactUnknownCallout.getByRole('button', { name: 'Dismiss' });
	}

	get btnOptionStartDiscussion(): Locator {
		return this.page.getByRole('menuitem', { name: 'Start a Discussion' });
	}

	async quoteMessage(quoteText: string, originalMessageText?: string): Promise<void> {
        /* Implementation Hidden */
    }

	get clearAllUnreadsModal(): Locator {
		return this.page.getByRole('dialog', { name: 'Clear all unreads?' });
	}

	async markAllRoomsAsRead(): Promise<void> {
        /* Implementation Hidden */
    }
}

```