## File: packages/models/src/models/Sessions.ts

```typescript
import type {
	ISession,
	UserSessionAggregation,
	DeviceSessionAggregation,
	OSSessionAggregation,
	UserSessionAggregationResult,
	DeviceSessionAggregationResult,
	DeviceManagementSession,
	DeviceManagementPopulatedSession,
	OSSessionAggregationResult,
	IUser,
	RocketChatRecordDeleted,
} from '@rocket.chat/core-typings';
import type { ISessionsModel } from '@rocket.chat/model-typings';
import type { PaginatedResult, WithItemCount } from '@rocket.chat/rest-typings';
import type {
	AggregationCursor,
	AnyBulkWriteOperation,
	BulkWriteResult,
	Collection,
	Document,
	FindCursor,
	Db,
	Filter,
	IndexDescription,
	UpdateResult,
	OptionalId,
	FindOptions,
} from 'mongodb';

import { getCollectionName } from '../index';
import { BaseRaw } from './BaseRaw';
import { readSecondaryPreferred } from '../readSecondaryPreferred';

type DestructuredDate = { year: number; month: number; day: number };
type DestructuredDateWithType = {
	year: number;
	month: number;
	day: number;
	type?: 'month' | 'week';
};
type DestructuredRange = { start: DestructuredDate; end: DestructuredDate };
type DateRange = { start: Date; end: Date };

type CustomSortOp = 'loginAt' | 'device.name' | 'device.os.name';
type CustomSortOpAdmin = CustomSortOp | '_user.username' | '_user.name';

const matchBasedOnDate = (start: DestructuredDate, end: DestructuredDate): Filter<ISession> => {
    /* Implementation Hidden */
};

const getGroupSessionsByHour = (
	_id: { range: string; day: string; month: string; year: string } | string,
): { listGroup: object; countGroup: object } => {
    /* Implementation Hidden */
};

const getSortByFullDate = (): { year: number; month: number; day: number } => ({
	year: -1,
	month: -1,
	day: -1,
});

const getProjectionByFullDate = (): { day: string; month: string; year: string } => ({
	day: '$_id.day',
	month: '$_id.month',
	year: '$_id.year',
});

const getProjectionFullDate = (): { day: string; month: string; year: string } => ({
	day: '$day',
	month: '$month',
	year: '$year',
});

export const aggregates = {
	dailySessions(
		collection: Collection<ISession>,
		{ start, end }: DestructuredRange,
	): AggregationCursor<
		Pick<ISession, 'mostImportantRole' | 'userId' | 'day' | 'year' | 'month' | 'type'> & {
			time: number;
			sessions: number;
			devices: ISession['device'][];
			_computedAt: string;
		}
	> {
		const pipeline = [
			{
				$match: {
					userId: { $exists: true },
					lastActivityAt: { $exists: true },
					device: { $exists: true },
					type: 'session',
					...matchBasedOnDate(start, end),
				},
			},
			{
				$project: {
					userId: 1,
					device: 1,
					day: 1,
					month: 1,
					year: 1,
					mostImportantRole: 1,
					time: { $trunc: { $divide: [{ $subtract: ['$lastActivityAt', '$loginAt'] }, 1000] } },
				},
			},
			{
				$match: {
					time: { $gt: 0 },
				},
			},
			{
				$group: {
					_id: {
						userId: '$userId',
						device: '$device',
						...getProjectionFullDate(),
					},
					mostImportantRole: { $first: '$mostImportantRole' },
					time: { $sum: '$time' },
					sessions: { $sum: 1 },
				},
			},
			{
				$sort: {
					time: -1,
				},
			},
			{
				$group: {
					_id: {
						userId: '$_id.userId',
						...getProjectionByFullDate(),
					},
					mostImportantRole: { $first: '$mostImportantRole' },
					time: { $sum: '$time' },
					sessions: { $sum: '$sessions' },
					devices: {
						$push: {
							sessions: '$sessions',
							time: '$time',
							device: '$_id.device',
						},
					},
				},
			},
			{
				$sort: {
					_id: 1,
				},
			},
			{
				$project: {
					_id: 0,
					type: { $literal: 'user_daily' },
					_computedAt: { $literal: new Date() },
					...getProjectionByFullDate(),
					userId: '$_id.userId',
					mostImportantRole: 1,
					time: 1,
					sessions: 1,
					devices: 1,
				},
			},
		];

		return collection.aggregate<
			Pick<ISession, 'mostImportantRole' | 'userId' | 'day' | 'year' | 'month' | 'type'> & {
				time: number;
				sessions: number;
				devices: ISession['device'][];
				_computedAt: string;
			}
		>(pipeline, { allowDiskUse: true });
	},

	async getUniqueUsersOfYesterday(
		collection: Collection<ISession>,
		{ year, month, day }: DestructuredDate,
	): Promise<UserSessionAggregation[]> {
		return collection
			.aggregate<UserSessionAggregation>([
				{
					$match: {
						year,
						month,
						day,
						type: 'user_daily',
					},
				},
				{
					$group: {
						_id: {
							...getProjectionFullDate(),
							mostImportantRole: '$mostImportantRole',
						},
						count: {
							$sum: 1,
						},
						sessions: {
							$sum: '$sessions',
						},
						time: {
							$sum: '$time',
						},
					},
				},
				{
					$group: {
						_id: {
							...getProjectionFullDate(),
						},
						roles: {
							$push: {
								role: '$_id.mostImportantRole',
								count: '$count',
								sessions: '$sessions',
								time: '$time',
							},
						},
						count: {
							$sum: '$count',
						},
						sessions: {
							$sum: '$sessions',
						},
						time: {
							$sum: '$time',
						},
					},
				},
				{
					$project: {
						_id: 0,
						count: 1,
						sessions: 1,
						time: 1,
						roles: 1,
					},
				},
			])
			.toArray();
	},

	async getUniqueUsersOfLastMonthOrWeek(
		collection: Collection<ISession>,
		{ year, month, day, type = 'month' }: DestructuredDateWithType,
	): Promise<UserSessionAggregation[]> {
		return collection
			.aggregate<UserSessionAggregation>(
				[
					{
						$match: {
							type: 'user_daily',
							...aggregates.getMatchOfLastMonthOrWeek({ year, month, day, type }),
						},
					},
					{
						$group: {
							_id: {
								userId: '$userId',
							},
							mostImportantRole: { $first: '$mostImportantRole' },
							sessions: {
								$sum: '$sessions',
							},
							time: {
								$sum: '$time',
							},
						},
					},
					{
						$group: {
							_id: {
								mostImportantRole: '$mostImportantRole',
							},
							count: {
								$sum: 1,
							},
							sessions: {
								$sum: '$sessions',
							},
							time: {
								$sum: '$time',
							},
						},
					},
					{
						$sort: {
							time: -1,
						},
					},
					{
						$group: {
							_id: 1,
							roles: {
								$push: {
									role: '$_id.mostImportantRole',
									count: '$count',
									sessions: '$sessions',
									time: '$time',
								},
							},
							count: {
								$sum: '$count',
							},
							sessions: {
								$sum: '$sessions',
							},
							time: {
								$sum: '$time',
							},
						},
					},
					{
						$project: {
							_id: 0,
							count: 1,
							roles: 1,
							sessions: 1,
							time: 1,
						},
					},
				],
				{ allowDiskUse: true },
			)
			.toArray();
	},

	getMatchOfLastMonthOrWeek({ year, month, day, type = 'month' }: DestructuredDateWithType): Filter<ISession> {
		let startOfPeriod;

		if (type === 'month') {
			const pastMonthLastDay = new Date(year, month - 1, 0).getDate();
			const currMonthLastDay = new Date(year, month, 0).getDate();

			startOfPeriod = new Date(year, month - 1, day);
			startOfPeriod.setMonth(
				startOfPeriod.getMonth() - 1,
				(currMonthLastDay === day ? pastMonthLastDay : Math.min(pastMonthLastDay, day)) + 1,
			);
		} else {
			startOfPeriod = new Date(year, month - 1, day - 6);
		}

		const startOfPeriodObject = {
			year: startOfPeriod.getFullYear(),
			month: startOfPeriod.getMonth() + 1,
			day: startOfPeriod.getDate(),
		};

		if (year === startOfPeriodObject.year && month === startOfPeriodObject.month) {
			return {
				year,
				month,
				day: { $gte: startOfPeriodObject.day, $lte: day },
			};
		}

		if (year === startOfPeriodObject.year) {
			return {
				year,
				$and: [
					{
						$or: [
							{
								month: { $gt: startOfPeriodObject.month },
							},
							{
								month: startOfPeriodObject.month,
								day: { $gte: startOfPeriodObject.day },
							},
						],
					},
					{
						$or: [
							{
								month: { $lt: month },
							},
							{
								month,
								day: { $lte: day },
							},
						],
					},
				],
			};
		}

		return {
			$and: [
				{
					$or: [
						{
							year: { $gt: startOfPeriodObject.year },
						},
						{
							year: startOfPeriodObject.year,
							month: { $gt: startOfPeriodObject.month },
						},
						{
							year: startOfPeriodObject.year,
							month: startOfPeriodObject.month,
							day: { $gte: startOfPeriodObject.day },
						},
					],
				},
				{
					$or: [
						{
							year: { $lt: year },
						},
						{
							year,
							month: { $lt: month },
						},
						{
							year,
							month,
							day: { $lte: day },
						},
					],
				},
			],
		};
	},

	async getUniqueDevicesOfLastMonthOrWeek(
		collection: Collection<ISession>,
		{ year, month, day, type = 'month' }: DestructuredDateWithType,
	): Promise<DeviceSessionAggregation[]> {
		return collection
			.aggregate<DeviceSessionAggregation>(
				[
					{
						$match: {
							type: 'user_daily',
							...aggregates.getMatchOfLastMonthOrWeek({ year, month, day, type }),
						},
					},
					{
						$unwind: '$devices',
					},
					{
						$group: {
							_id: {
								type: '$devices.device.type',
								name: '$devices.device.name',
								version: '$devices.device.version',
							},
							count: {
								$sum: '$devices.sessions',
							},
							time: {
								$sum: '$devices.time',
							},
						},
					},
					{
						$sort: {
							time: -1,
						},
					},
					{
						$project: {
							_id: 0,
							type: '$_id.type',
							name: '$_id.name',
							version: '$_id.version',
							count: 1,
							time: 1,
						},
					},
				],
				{ allowDiskUse: true },
			)
			.toArray();
	},

	getUniqueDevicesOfYesterday(
		collection: Collection<ISession>,
		{ year, month, day }: DestructuredDate,
	): Promise<DeviceSessionAggregation[]> {
		return collection
			.aggregate<DeviceSessionAggregation>([
				{
					$match: {
						year,
						month,
						day,
						type: 'user_daily',
					},
				},
				{
					$unwind: '$devices',
				},
				{
					$group: {
						_id: {
							type: '$devices.device.type',
							name: '$devices.device.name',
							version: '$devices.device.version',
						},
						count: {
							$sum: '$devices.sessions',
						},
						time: {
							$sum: '$devices.time',
						},
					},
				},
				{
					$sort: {
						time: -1,
					},
				},
				{
					$project: {
						_id: 0,
						type: '$_id.type',
						name: '$_id.name',
						version: '$_id.version',
						count: 1,
						time: 1,
					},
				},
			])
			.toArray();
	},

	getUniqueOSOfLastMonthOrWeek(
		collection: Collection<ISession>,
		{ year, month, day, type = 'month' }: DestructuredDateWithType,
	): Promise<OSSessionAggregation[]> {
		return collection
			.aggregate<OSSessionAggregation>(
				[
					{
						$match: {
							'type': 'user_daily',
							'devices.device.os.name': {
								$exists: true,
							},
							...aggregates.getMatchOfLastMonthOrWeek({ year, month, day, type }),
						},
					},
					{
						$unwind: '$devices',
					},
					{
						$group: {
							_id: {
								name: '$devices.device.os.name',
								version: '$devices.device.os.version',
							},
							count: {
								$sum: '$devices.sessions',
							},
							time: {
								$sum: '$devices.time',
							},
						},
					},
					{
						$sort: {
							time: -1,
						},
					},
					{
						$project: {
							_id: 0,
							name: '$_id.name',
							version: '$_id.version',
							count: 1,
							time: 1,
						},
					},
				],
				{ allowDiskUse: true },
			)
			.toArray();
	},

	getUniqueOSOfYesterday(collection: Collection<ISession>, { year, month, day }: DestructuredDate): Promise<OSSessionAggregation[]> {
		return collection
			.aggregate<OSSessionAggregation>([
				{
					$match: {
						year,
						month,
						day,
						'type': 'user_daily',
						'devices.device.os.name': {
							$exists: true,
						},
					},
				},
				{
					$unwind: '$devices',
				},
				{
					$group: {
						_id: {
							name: '$devices.device.os.name',
							version: '$devices.device.os.version',
						},
						count: {
							$sum: '$devices.sessions',
						},
						time: {
							$sum: '$devices.time',
						},
					},
				},
				{
					$sort: {
						time: -1,
					},
				},
				{
					$project: {
						_id: 0,
						name: '$_id.name',
						version: '$_id.version',
						count: 1,
						time: 1,
					},
				},
			])
			.toArray();
	},
};

export class SessionsRaw extends BaseRaw<ISession> implements ISessionsModel {
	private secondaryCollection: Collection<ISession>;

	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ISession>>) {
        /* Implementation Hidden */
    }

	async aggregateSessionsByUserId({
		uid,
		sort,
		search,
		offset = 0,
		count = 10,
		currentLoginToken,
	}: {
		uid: string;
		sort?: Record<CustomSortOp, 1 | -1>;
		search?: string | null;
		offset?: number;
		count?: number;
		currentLoginToken?: string;
	}): Promise<PaginatedResult<{ sessions: DeviceManagementSession[] }>> {
        /* Implementation Hidden */
    }

	async aggregateSessionsAndPopulate({
		sort,
		search,
		offset = 0,
		count = 10,
	}: {
		sort?: Record<CustomSortOpAdmin, 1 | -1>;
		search?: string | null;
		offset?: number;
		count?: number;
	}): Promise<PaginatedResult<{ sessions: DeviceManagementPopulatedSession[] }>> {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async getActiveUsersBetweenDates({ start, end }: DestructuredRange): Promise<ISession[]> {
        /* Implementation Hidden */
    }

	async findLastLoginByIp(ip: string): Promise<ISession | null> {
        /* Implementation Hidden */
    }

	findOneBySessionId(sessionId: string): Promise<ISession | null> {
        /* Implementation Hidden */
    }

	findOneBySessionIdAndUserId(sessionId: string, userId: string): Promise<ISession | null> {
        /* Implementation Hidden */
    }

	findSessionsNotClosedByDateWithoutLastActivity({ year, month, day }: DestructuredDate): FindCursor<ISession> {
        /* Implementation Hidden */
    }

	async getActiveUsersOfPeriodByDayBetweenDates({ start, end }: DestructuredRange): Promise<
		{
			day: number;
			month: number;
			year: number;
			usersList: IUser['_id'][];
			users: number;
		}[]
	> {
        /* Implementation Hidden */
    }

	async getBusiestTimeWithinHoursPeriod({ start, end, groupSize }: DateRange & { groupSize: number }): Promise<
		{
			hour: number;
			users: number;
		}[]
	> {
        /* Implementation Hidden */
    }

	async getTotalOfSessionsByDayBetweenDates({ start, end }: DestructuredRange): Promise<
		{
			day: number;
			month: number;
			year: number;
			users: number;
		}[]
	> {
        /* Implementation Hidden */
    }

	async getTotalOfSessionByHourAndDayBetweenDates({ start, end }: DateRange): Promise<
		{
			hour: number;
			day: number;
			month: number;
			year: number;
			users: number;
		}[]
	> {
        /* Implementation Hidden */
    }

	async getUniqueUsersOfYesterday(): Promise<UserSessionAggregationResult> {
        /* Implementation Hidden */
    }

	async getUniqueUsersOfLastMonth(): Promise<UserSessionAggregationResult> {
        /* Implementation Hidden */
    }

	async getUniqueUsersOfLastWeek(): Promise<UserSessionAggregationResult> {
        /* Implementation Hidden */
    }

	async getUniqueDevicesOfYesterday(): Promise<DeviceSessionAggregationResult> {
        /* Implementation Hidden */
    }

	async getUniqueDevicesOfLastMonth(): Promise<DeviceSessionAggregationResult> {
        /* Implementation Hidden */
    }

	async getUniqueDevicesOfLastWeek(): Promise<DeviceSessionAggregationResult> {
        /* Implementation Hidden */
    }

	async getUniqueOSOfYesterday(): Promise<OSSessionAggregationResult> {
        /* Implementation Hidden */
    }

	async getUniqueOSOfLastMonth(): Promise<OSSessionAggregationResult> {
        /* Implementation Hidden */
    }

	async getUniqueOSOfLastWeek(): Promise<OSSessionAggregationResult> {
        /* Implementation Hidden */
    }

	private isValidData(data: Omit<ISession, '_id' | 'createdAt' | '_updatedAt'>): boolean {
        /* Implementation Hidden */
    }

	async createOrUpdate(data: Omit<ISession, '_id' | 'createdAt' | '_updatedAt'>): Promise<UpdateResult | undefined> {
        /* Implementation Hidden */
    }

	async closeByInstanceIdAndSessionId(instanceId: string, sessionId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async updateActiveSessionsByDateAndInstanceIdAndIds(
		{ year, month, day }: Partial<DestructuredDate> = {},
		instanceId: string,
		sessions: string[],
		data: Record<string, any> = {},
	): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	async updateActiveSessionsByDate(
		{ year, month, day }: DestructuredDate,
		data: Record<string, any> = {},
	): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	async logoutByInstanceIdAndSessionIdAndUserId(instanceId: string, sessionId: string, userId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async logoutBySessionIdAndUserId({
		loginToken,
		userId,
	}: {
		loginToken: ISession['loginToken'];
		userId: IUser['_id'];
	}): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	async logoutByloginTokenAndUserId({
		loginToken,
		userId,
		logoutBy,
	}: {
		loginToken: ISession['loginToken'];
		userId: IUser['_id'];
		logoutBy?: IUser['_id'];
	}): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	async logoutAllByUserId(userId: IUser['_id'], logoutBy: IUser['_id']): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	async createBatch(sessions: OptionalId<ISession>[]): Promise<BulkWriteResult | undefined> {
        /* Implementation Hidden */
    }

	async updateDailySessionById(_id: ISession['_id'], record: Partial<ISession>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async updateAllSessionsByDateToComputed({ start, end }: DestructuredRange): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	async getLoggedInByUserIdAndSessionId<T extends Document = ISession>(
		userId: string,
		sessionId: string,
		options?: FindOptions<T>,
	): Promise<T | null> {
        /* Implementation Hidden */
    }
}

```