## File: packages/apps-engine/src/definition/metadata/RocketChatAssociations.ts

```typescript
export enum RocketChatAssociationModel {
	ROOM = 'room',
	DISCUSSION = 'discussion',
	MESSAGE = 'message',
	LIVECHAT_MESSAGE = 'livechat-message',
	USER = 'user',
	FILE = 'file',
	MISC = 'misc',
	VIDEO_CONFERENCE = 'video-conference',
}

export class RocketChatAssociationRecord {
	constructor(
		private model: RocketChatAssociationModel,
		private id: string,
	) {
        /* Implementation Hidden */
    }

	public getModel() {
        /* Implementation Hidden */
    }

	public getID() {
        /* Implementation Hidden */
    }
}

```