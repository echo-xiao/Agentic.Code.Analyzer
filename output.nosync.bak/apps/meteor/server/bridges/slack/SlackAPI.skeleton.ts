## File: apps/meteor/server/bridges/slack/SlackAPI.ts

```typescript
// This is a JS File that was renamed to TS so it won't lose its git history when converted to TS
// TODO: Remove the following lint/ts instructions when the file gets properly converted
/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { serverFetch as fetch } from '@rocket.chat/server-fetch';

export class SlackAPI {
	constructor(apiOrBotToken) {
        /* Implementation Hidden */
    }

	async getChannels(cursor = null) {
        /* Implementation Hidden */
    }

	async getGroups(cursor = null) {
        /* Implementation Hidden */
    }

	async getRoomInfo(roomId) {
        /* Implementation Hidden */
    }

	async getMembers(channelId) {
        /* Implementation Hidden */
    }

	async react(data) {
        /* Implementation Hidden */
    }

	async removeReaction(data) {
        /* Implementation Hidden */
    }

	async removeMessage(data) {
        /* Implementation Hidden */
    }

	async sendMessage(data) {
        /* Implementation Hidden */
    }

	async updateMessage(data) {
        /* Implementation Hidden */
    }

	async getHistory(options) {
        /* Implementation Hidden */
    }

	async getPins(channelId) {
        /* Implementation Hidden */
    }

	async getUser(userId) {
        /* Implementation Hidden */
    }

	static async verifyToken(token) {
        /* Implementation Hidden */
    }

	static async verifyAppCredentials({ botToken, appToken }) {
        /* Implementation Hidden */
    }
}

```