## File: packages/models/src/models/CalendarEvent.ts

```typescript
import type { ICalendarEvent, IUser, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { ICalendarEventModel } from '@rocket.chat/model-typings';
import type { FindCursor, IndexDescription, Collection, Db, UpdateResult } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class CalendarEventRaw extends BaseRaw<ICalendarEvent> implements ICalendarEventModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ICalendarEvent>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	public async findOneByExternalIdAndUserId(
		externalId: Required<ICalendarEvent>['externalId'],
		uid: ICalendarEvent['uid'],
	): Promise<ICalendarEvent | null> {
        /* Implementation Hidden */
    }

	public findByUserIdAndDate(uid: IUser['_id'], date: Date): FindCursor<ICalendarEvent> {
        /* Implementation Hidden */
    }

	public async updateEvent(
		eventId: ICalendarEvent['_id'],
		{ subject, description, startTime, endTime, meetingUrl, reminderMinutesBeforeStart, reminderTime, busy }: Partial<ICalendarEvent>,
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	public async findNextNotificationDate(): Promise<Date | null> {
        /* Implementation Hidden */
    }

	public findEventsToNotify(notificationTime: Date, minutes: number): FindCursor<ICalendarEvent> {
        /* Implementation Hidden */
    }

	public async flagNotificationSent(eventId: ICalendarEvent['_id']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	public findOverlappingEvents(
		eventId: ICalendarEvent['_id'],
		uid: IUser['_id'],
		startTime: Date,
		endTime: Date,
	): FindCursor<ICalendarEvent> {
        /* Implementation Hidden */
    }

	public async findNextFutureEvent(startTime: Date): Promise<ICalendarEvent | null> {
        /* Implementation Hidden */
    }

	public findEventsStartingNow({ now, offset = 1000 }: { now: Date; offset?: number }): FindCursor<ICalendarEvent> {
        /* Implementation Hidden */
    }
}

```