## File: apps/meteor/app/importer-slack/server/SlackImporter.ts

```typescript
import type { IImportUser, IImportMessage, IImportPendingFile } from '@rocket.chat/core-typings';
import { Messages, Settings, ImportData } from '@rocket.chat/models';
import type { IZipEntry } from 'adm-zip';

import { Importer, ProgressStep, ImporterWebsocket } from '../../importer/server';
import type { ImporterProgress } from '../../importer/server/classes/ImporterProgress';
import { notifyOnSettingChanged } from '../../lib/server/lib/notifyListener';
import { MentionsParser } from '../../mentions/lib/MentionsParser';
import { settings } from '../../settings/server';
import { getUserAvatarURL } from '../../utils/server/getUserAvatarURL';

type SlackChannel = {
	id: string;
	name: string;
	topic?: {
		value: string;
		creator: string;
		last_set: number;
	};
	members: string[];
	purpose?: {
		value: string;
		creator: string;
		last_set: number;
	};
	created: number;
	creator: string | null;
	is_general: boolean;
	is_archived: boolean;
};

type SlackUser = {
	id: string;
	name: string;
	profile: {
		real_name: string;
		email: string;
		image_512: string;
		image_original: string;
		status_text: string;
		title: string;
	};
	tz_offset: number;
	deleted: boolean;
	is_bot: boolean;
};

type SlackFile = {
	id: string;
	url_private_download: string;
	size: number;
	name: string;
	is_external: boolean;
};

type SlackMessage = {
	id: string;
	ts: string;
	user: string;
	reactions?: {
		name: string;
		users: string[];
	}[];
	type: 'message';
	subtype?: string;
	files?: SlackFile[];
	text: string;
	edited?: {
		ts: string;
		user: string;
	};
	thread_ts?: string;
	reply_users?: string[];
	reply_count?: number;
	replies?: {
		user: string;
	}[];
	latest_reply: string;
	icons?: {
		emoji: string;
	};
	attachments?: SlackAttachment[];
} & (
	| {
			subtype: 'channel_purpose' | 'group_purpose';
			purpose: string;
	  }
	| {
			subtype: 'channel_join' | 'group_join' | 'channel_leave' | 'group_leave';
	  }
	| {
			subtype: 'channel_topic' | 'group_topic';
			topic: string;
	  }
	| {
			subtype: 'channel_name' | 'group_name';
			name: string;
	  }
	| {
			subtype: 'pinned_item';
			attachments: SlackAttachment[];
	  }
	| {
			subtype: 'file_share';
			file: SlackFile;
	  }
	| {
			subtype: 'me_message';
	  }
);

type SlackAttachment = {
	text: string;
	title: string;
	fallback: string;
	author_subname: string;
};

export class SlackImporter extends Importer {
	private _useUpsert = false;

	async prepareChannelsFile(entry: IZipEntry): Promise<number> {
        /* Implementation Hidden */
    }

	async prepareGroupsFile(entry: IZipEntry): Promise<number> {
        /* Implementation Hidden */
    }

	async prepareMpimpsFile(entry: IZipEntry): Promise<number> {
        /* Implementation Hidden */
    }

	async prepareDMsFile(entry: IZipEntry): Promise<number> {
        /* Implementation Hidden */
    }

	async prepareUsersFile(entry: IZipEntry): Promise<number> {
        /* Implementation Hidden */
    }

	override async prepareUsingLocalFile(fullFilePath: string): Promise<ImporterProgress> {
        /* Implementation Hidden */
    }

	parseMentions(newMessage: IImportMessage): void {
        /* Implementation Hidden */
    }

	async processMessageSubType(
		message: SlackMessage,
		slackChannelId: string,
		newMessage: IImportMessage,
		missedTypes: Record<string, SlackMessage>,
	): Promise<boolean> {
        /* Implementation Hidden */
    }

	makeSlackMessageId(channelId: string, ts: string, fileIndex?: string): string {
        /* Implementation Hidden */
    }

	async prepareMessageObject(message: SlackMessage, missedTypes: Record<string, SlackMessage>, slackChannelId: string): Promise<void> {
        /* Implementation Hidden */
    }

	_replaceSlackUserId(userId: string): string {
        /* Implementation Hidden */
    }

	_replaceSlackUserIds(members: string[]) {
        /* Implementation Hidden */
    }

	convertSlackMessageToRocketChat(message: string): string {
        /* Implementation Hidden */
    }

	convertSlackFileToPendingFile(file: SlackFile): IImportPendingFile {
        /* Implementation Hidden */
    }

	convertMessageAttachments(attachments: SlackAttachment[]): IImportMessage['attachments'] {
        /* Implementation Hidden */
    }
}

```