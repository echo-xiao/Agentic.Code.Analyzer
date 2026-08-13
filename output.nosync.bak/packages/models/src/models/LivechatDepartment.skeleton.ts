## File: packages/models/src/models/LivechatDepartment.ts

```typescript
import type { ILivechatDepartment, LivechatDepartmentDTO, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { ILivechatDepartmentModel } from '@rocket.chat/model-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type {
	Collection,
	FindCursor,
	Db,
	Filter,
	FindOptions,
	UpdateResult,
	Document,
	IndexDescription,
	DeleteResult,
	UpdateFilter,
	AggregationCursor,
} from 'mongodb';

import { LivechatDepartmentAgents, LivechatUnitMonitors } from '../index';
import { BaseRaw } from './BaseRaw';

export class LivechatDepartmentRaw extends BaseRaw<ILivechatDepartment> implements ILivechatDepartmentModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ILivechatDepartment>>) {
        /* Implementation Hidden */
    }

	unfilteredFind(_query: Filter<ILivechatDepartment>, _options: FindOptions<ILivechatDepartment>): FindCursor<ILivechatDepartment> {
        /* Implementation Hidden */
    }

	unfilteredFindOne(_query: Filter<ILivechatDepartment>, _options: FindOptions<ILivechatDepartment>): Promise<ILivechatDepartment | null> {
        /* Implementation Hidden */
    }

	unfilteredUpdate(
		_query: Filter<ILivechatDepartment>,
		_update: UpdateFilter<ILivechatDepartment>,
		_options: FindOptions<ILivechatDepartment>,
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	unfilteredRemove(_query: Filter<ILivechatDepartment>): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeParentAndAncestorById(_id: string): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): Array<IndexDescription> {
        /* Implementation Hidden */
    }

	countTotal(): Promise<number> {
        /* Implementation Hidden */
    }

	findInIds(departmentsIds: string[], options: FindOptions<ILivechatDepartment>): FindCursor<ILivechatDepartment> {
        /* Implementation Hidden */
    }

	findByNameRegexWithExceptionsAndConditions(
		searchTerm: string,
		exceptions: string[] = [],
		conditions: Filter<ILivechatDepartment> = {},
		options: FindOptions<ILivechatDepartment> = {},
	): FindCursor<ILivechatDepartment> {
        /* Implementation Hidden */
    }

	findByBusinessHourId(businessHourId: string, options: FindOptions<ILivechatDepartment>): FindCursor<ILivechatDepartment> {
        /* Implementation Hidden */
    }

	countByBusinessHourIdExcludingDepartmentId(businessHourId: string, departmentId: string): Promise<number> {
        /* Implementation Hidden */
    }

	findEnabledByBusinessHourId(businessHourId: string, options: FindOptions<ILivechatDepartment>): FindCursor<ILivechatDepartment> {
        /* Implementation Hidden */
    }

	findActiveDepartmentsWithoutBusinessHour(options: FindOptions<ILivechatDepartment>): FindCursor<ILivechatDepartment> {
        /* Implementation Hidden */
    }

	findEnabledByListOfBusinessHourIdsAndDepartmentIds(
		businessHourIds: string[],
		departmentIds: string[],
		options: FindOptions<ILivechatDepartment>,
	): FindCursor<ILivechatDepartment> {
        /* Implementation Hidden */
    }

	findEnabledInIds(departmentsIds: string[], options?: FindOptions<ILivechatDepartment>): FindCursor<ILivechatDepartment> {
        /* Implementation Hidden */
    }

	addBusinessHourToDepartmentsByIds(ids: string[] = [], businessHourId: string): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	removeBusinessHourFromDepartmentsByIdsAndBusinessHourId(ids: string[] = [], businessHourId: string): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	removeBusinessHourFromDepartmentsByBusinessHourId(businessHourId: string): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	unarchiveDepartment(_id: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	archiveDepartment(_id: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	addDepartmentToUnit(_id: string, unitId: string, ancestors: string[]): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	removeDepartmentFromUnit(_id: string): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	async createOrUpdateDepartment(_id: string | null, data: LivechatDepartmentDTO & { type?: string }): Promise<ILivechatDepartment> {
        /* Implementation Hidden */
    }

	unsetFallbackDepartmentByDepartmentId(departmentId: string): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	removeDepartmentFromForwardListById(_departmentId: string): Promise<void> {
        /* Implementation Hidden */
    }

	updateById(_id: string, update: Partial<ILivechatDepartment>): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	updateNumAgentsById(_id: string, numAgents: number): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	decreaseNumberOfAgentsByIds(_ids: string[]): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	findEnabledWithAgents<T extends Document = ILivechatDepartment>(projection: FindOptions<T>['projection'] = {}): FindCursor<T> {
        /* Implementation Hidden */
    }

	findEnabledWithAgentsAndRegistration<T extends Document = ILivechatDepartment>(
		projection: FindOptions<T>['projection'] = {},
	): FindCursor<T> {
        /* Implementation Hidden */
    }

	findOneEnabledWithAgentsAndRegistration<T extends Document = ILivechatDepartment>(
		projection: FindOptions<T>['projection'] = {},
	): Promise<T | null> {
        /* Implementation Hidden */
    }

	findEnabledWithAgentsAndBusinessUnit<T extends Document = ILivechatDepartment>(
		_: any,
		projection?: FindOptions<T>['projection'],
	): FindCursor<T> {
        /* Implementation Hidden */
    }

	findOneByIdOrName(_idOrName: string, options: FindOptions<ILivechatDepartment> = {}): Promise<ILivechatDepartment | null> {
        /* Implementation Hidden */
    }

	findByUnitIds(unitIds: string[], options: FindOptions<ILivechatDepartment> = {}): FindCursor<ILivechatDepartment> {
        /* Implementation Hidden */
    }

	countDepartmentsInUnit(unitId: string): Promise<number> {
        /* Implementation Hidden */
    }

	findActiveByUnitIds<T extends Document = ILivechatDepartment>(_unitIds: string[], _options: FindOptions<T> = {}): FindCursor<T> {
        /* Implementation Hidden */
    }

	findNotArchived(options: FindOptions<ILivechatDepartment> = {}): FindCursor<ILivechatDepartment> {
        /* Implementation Hidden */
    }

	getBusinessHoursWithDepartmentStatuses(): Promise<
		{
			_id: string;
			validDepartments: string[];
			invalidDepartments: string[];
		}[]
	> {
        /* Implementation Hidden */
    }

	checkIfMonitorIsMonitoringDepartmentById(monitorId: string, departmentId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	countArchived(): Promise<number> {
        /* Implementation Hidden */
    }

	findByParentId(_parentId: string, _options?: FindOptions<ILivechatDepartment> | undefined): FindCursor<ILivechatDepartment> {
        /* Implementation Hidden */
    }

	findAgentsByBusinessHourId(_businessHourId: string): AggregationCursor<{ agentIds: string[] }> {
        /* Implementation Hidden */
    }
}

```