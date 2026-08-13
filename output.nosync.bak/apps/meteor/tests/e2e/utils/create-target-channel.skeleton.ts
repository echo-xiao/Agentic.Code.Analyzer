## File: apps/meteor/tests/e2e/utils/create-target-channel.ts

```typescript
import { faker } from '@faker-js/faker';
import type { IRoom, IMessage } from '@rocket.chat/core-typings';
import type { ChannelsCreateProps, GroupsCreateProps } from '@rocket.chat/rest-typings';

import type { BaseTest } from './test';

/**
 * createTargetChannel:
 *  - Usefull to create a target channel for message related tests
 */
export async function createTargetChannel(api: BaseTest['api'], options?: Omit<ChannelsCreateProps, 'name'>): Promise<string> {
    /* Implementation Hidden */
}

export async function createTargetChannelAndReturnFullRoom(
	api: BaseTest['api'],
	options?: Omit<ChannelsCreateProps, 'name'>,
): Promise<{ channel: IRoom }> {
    /* Implementation Hidden */
}

export async function sendTargetChannelMessage(api: BaseTest['api'], roomName: string, options?: Partial<IMessage>) {
    /* Implementation Hidden */
}

export async function deleteChannel(api: BaseTest['api'], roomName: string): Promise<void> {
    /* Implementation Hidden */
}

export async function isChannelMember(api: BaseTest['api'], roomName: string, username: string): Promise<boolean> {
    /* Implementation Hidden */
}

export async function deleteRoom(api: BaseTest['api'], roomId: string): Promise<void> {
    /* Implementation Hidden */
}

export async function createTargetPrivateChannel(api: BaseTest['api'], options?: Omit<GroupsCreateProps, 'name'>): Promise<string> {
    /* Implementation Hidden */
}

export async function createTargetTeam(api: BaseTest['api'], options?: Omit<GroupsCreateProps, 'name'>): Promise<string> {
    /* Implementation Hidden */
}

export async function deleteTeam(api: BaseTest['api'], teamName: string): Promise<void> {
    /* Implementation Hidden */
}

export async function createDirectMessage(api: BaseTest['api']): Promise<void> {
    /* Implementation Hidden */
}

export async function createTargetDiscussion(api: BaseTest['api']): Promise<Record<string, string>> {
    /* Implementation Hidden */
}

export async function createChannelWithTeam(api: BaseTest['api']): Promise<Record<string, string>> {
    /* Implementation Hidden */
}

export async function createArchivedChannel(api: BaseTest['api']): Promise<string> {
    /* Implementation Hidden */
}

export async function createTargetGroupAndReturnFullRoom(
	api: BaseTest['api'],
	options?: Omit<GroupsCreateProps, 'name'>,
): Promise<{ group: IRoom }> {
    /* Implementation Hidden */
}

export async function sendMessage(api: BaseTest['api'], roomId: string, msg: string, threadId?: string): Promise<string> {
    /* Implementation Hidden */
}

export async function createDiscussion(api: BaseTest['api'], parentRoomId: string, parentMessageId: string, name: string): Promise<string> {
    /* Implementation Hidden */
}

export async function createDirectMessageRoom(api: BaseTest['api'], username: string): Promise<string> {
    /* Implementation Hidden */
}

```