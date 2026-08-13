## File: apps/meteor/server/services/calendar/service.ts

```typescript
import type { ICalendarService } from '@rocket.chat/core-services';
import { Presence, ServiceClassInternal, api } from '@rocket.chat/core-services';
import type { IUser, ICalendarEvent } from '@rocket.chat/core-typings';
import { UserStatus } from '@rocket.chat/core-typings';
import { cronJobs } from '@rocket.chat/cron';
import { Logger } from '@rocket.chat/logger';
import type { InsertionModel } from '@rocket.chat/model-typings';
import { CalendarEvent, Users } from '@rocket.chat/models';
import type { UpdateResult, DeleteResult } from 'mongodb';

import { getShiftedTime } from './utils/getShiftedTime';
import { settings } from '../../../app/settings/server';
import { getUserPreference } from '../../../app/utils/server/lib/getUserPreference';
import { i18n } from '../../lib/i18n';

const logger = new Logger('Calendar');

const defaultMinutesForNotifications = 5;

export class CalendarService extends ServiceClassInternal implements ICalendarService {
	protected name = 'calendar';

	public async create(data: Omit<InsertionModel<ICalendarEvent>, 'reminderTime' | 'notificationSent'>): Promise<ICalendarEvent['_id']> {
        /* Implementation Hidden */
    }

	public async import(data: Omit<InsertionModel<ICalendarEvent>, 'notificationSent'>): Promise<ICalendarEvent['_id']> {
        /* Implementation Hidden */
    }

	public async get(eventId: ICalendarEvent['_id']): Promise<ICalendarEvent | null> {
        /* Implementation Hidden */
    }

	public async list(uid: IUser['_id'], date: Date): Promise<ICalendarEvent[]> {
        /* Implementation Hidden */
    }

	public async update(eventId: ICalendarEvent['_id'], data: Partial<ICalendarEvent>): Promise<UpdateResult | null> {
        /* Implementation Hidden */
    }

	public async delete(eventId: ICalendarEvent['_id']): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	public async setupNextNotification(): Promise<void> {
        /* Implementation Hidden */
    }

	public async setupNextStatusChange(): Promise<void> {
        /* Implementation Hidden */
    }

	private async getMeetingUrl(eventData: Partial<ICalendarEvent>): Promise<string | undefined> {
        /* Implementation Hidden */
    }

	private async doSetupNextNotification(isRecursive: boolean): Promise<void> {
        /* Implementation Hidden */
    }

	private async doSetupNextStatusChange(): Promise<void> {
        /* Implementation Hidden */
    }

	private async processStatusChangesAtTime(): Promise<void> {
        /* Implementation Hidden */
    }

	private async processEventStart(event: ICalendarEvent): Promise<void> {
        /* Implementation Hidden */
    }

	// The start scheduler only fires at start times, so it misses an event imported already in progress.
	private async reconcileInProgressEvent(eventId: ICalendarEvent['_id']): Promise<void> {
        /* Implementation Hidden */
    }

	// Derives "busy until the latest active meeting ends" from the events in progress now and applies
	// it as one calendar claim. `excludeEventId`/`seedEndTime` re-add the triggering event's own end.
	private async syncBusyPresence(
		uid: IUser['_id'],
		{ excludeEventId, seedEndTime, now = new Date() }: { excludeEventId?: ICalendarEvent['_id']; seedEndTime?: Date; now?: Date } = {},
	): Promise<void> {
        /* Implementation Hidden */
    }

	private async sendCurrentNotifications(date: Date): Promise<void> {
        /* Implementation Hidden */
    }

	private async sendEventNotification(event: ICalendarEvent): Promise<void> {
        /* Implementation Hidden */
    }

	private async findImportedEvent(
		externalId: Required<ICalendarEvent>['externalId'],
		uid: ICalendarEvent['uid'],
	): Promise<ICalendarEvent | null> {
        /* Implementation Hidden */
    }

	private async parseDescriptionForMeetingUrl(description: string): Promise<string | undefined> {
        /* Implementation Hidden */
    }
}

```