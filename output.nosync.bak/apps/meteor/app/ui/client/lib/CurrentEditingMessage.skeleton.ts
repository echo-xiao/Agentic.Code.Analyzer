## File: apps/meteor/app/ui/client/lib/CurrentEditingMessage.ts

```typescript
import type { ChatAPI } from '../../../../client/lib/chats/ChatAPI';
import { clearHighlightMessage } from '../../../../client/views/room/MessageList/providers/messageHighlightSubscription';

export class CurrentEditingMessage {
	private lock = false;

	private mid?: string;

	private queue: {
		resolve: (release: () => void) => void;
	}[] = [];

	private chat: ChatAPI;

	constructor(chat: ChatAPI) {
        /* Implementation Hidden */
    }

	public reset = async () => {
		return this.runExclusive(async () => {
			if (!this.chat.composer || !this.mid) {
				return false;
			}

			const message = await this.chat.data.findMessageByID(this.mid);

			if (this.chat.composer.text !== message?.msg) {
				this.chat.composer.setText(message?.msg ?? '');
				return true;
			}

			return false;
		});
	};

	public stop = async () => {
		await this.runExclusive(async () => {
			if (!this.chat.composer || !this.mid) {
				return;
			}

			const message = await this.chat.data.findMessageByID(this.mid);
			const draft = this.chat.composer.text;

			if (draft === message?.msg) {
				await this.chat.data.discardDraft(this.mid);
			} else {
				await this.chat.data.saveDraft(this.mid, (await this.chat.data.getDraft(this.mid)) || draft);
			}

			this.chat.composer.setEditingMode(false);
			this.mid = undefined;
			clearHighlightMessage();
		});
	};

	public cancel = async () => {
		await this.runExclusive(async () => {
			if (!this.mid) {
				return;
			}

			await this.chat.data.discardDraft(this.mid);
			this.chat.composer?.setText((await this.chat.data.getDraft(undefined)) ?? '');
		});
	};

	private acquire = async () => {
		return new Promise<() => void>((resolve) => {
			this.queue.push({ resolve });
			this.dispatch();
		});
	};

	private dispatch() {
        /* Implementation Hidden */
    }

	private buildRelease = () => {
		return async () => {
			this.lock = false;
			this.dispatch();
		};
	};

	public getMID() {
        /* Implementation Hidden */
    }

	public setMID(mid: string) {
        /* Implementation Hidden */
    }

	private async runExclusive<T>(callback: () => Promise<T>) {
        /* Implementation Hidden */
    }
}

```