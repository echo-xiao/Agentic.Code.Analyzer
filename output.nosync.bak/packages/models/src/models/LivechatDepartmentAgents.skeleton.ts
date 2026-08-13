## File: packages/models/src/models/LivechatDepartmentAgents.ts

```typescript
import type { AvailableAgentsAggregation, ILivechatDepartmentAgents, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { FindPaginated, ILivechatDepartmentAgentsModel } from '@rocket.chat/model-typings';
import type {
	Collection,
	FindCursor,
	Db,
	Filter,
	FindOptions,
	Document,
	UpdateResult,
	DeleteResult,
	IndexDescription,
	SortDirection,
	AggregationCursor,
} from 'mongodb';

import { Users } from '../index';
import { BaseRaw } from './BaseRaw';

export class LivechatDepartmentAgentsRaw extends BaseRaw<ILivechatDepartmentAgents> implements ILivechatDepartmentAgentsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ILivechatDepartmentAgents>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): Array<IndexDescription> {
        /* Implementation Hidden */
    }

	findUsersInQueue(usersList: string[]): FindCursor<ILivechatDepartmentAgents>;

	findUsersInQueue(usersList: string[], options: FindOptions<ILivechatDepartmentAgents>): FindCursor<ILivechatDepartmentAgents>;

	findUsersInQueue<P extends Document>(
		usersList: string[],
		options: FindOptions<P extends ILivechatDepartmentAgents ? ILivechatDepartmentAgents : P>,
	): FindCursor<P>;

	findUsersInQueue<P extends Document>(
		usersList: string[],
		options?:
			| undefined
			| FindOptions<ILivechatDepartmentAgents>
			| FindOptions<P extends ILivechatDepartmentAgents ? ILivechatDepartmentAgents : P>,
	): FindCursor<ILivechatDepartmentAgents> | FindCursor<P> {
        /* Implementation Hidden */
    }

	findByAgentIds(agentIds: string[], options?: FindOptions<ILivechatDepartmentAgents>): FindCursor<ILivechatDepartmentAgents> {
        /* Implementation Hidden */
    }

	findByAgentId(agentId: string, options?: FindOptions<ILivechatDepartmentAgents>): FindCursor<ILivechatDepartmentAgents> {
        /* Implementation Hidden */
    }

	findAgentsByDepartmentId(departmentId: string): FindPaginated<FindCursor<ILivechatDepartmentAgents>>;

	findAgentsByDepartmentId(
		departmentId: string,
		options: FindOptions<ILivechatDepartmentAgents>,
	): FindPaginated<FindCursor<ILivechatDepartmentAgents>>;

	findAgentsByDepartmentId<P extends Document>(
		departmentId: string,
		options: FindOptions<P extends ILivechatDepartmentAgents ? ILivechatDepartmentAgents : P>,
	): FindPaginated<FindCursor<P>>;

	findAgentsByDepartmentId(
		departmentId: string,
		options?: undefined | FindOptions<ILivechatDepartmentAgents>,
	): FindPaginated<FindCursor<ILivechatDepartmentAgents>> {
        /* Implementation Hidden */
    }

	findByDepartmentIds(departmentIds: string[], options = {}): FindCursor<ILivechatDepartmentAgents> {
        /* Implementation Hidden */
    }

	async findAgentsByAgentIdAndBusinessHourId(_agentId: string, _businessHourId: string): Promise<ILivechatDepartmentAgents[]> {
        /* Implementation Hidden */
    }

	setDepartmentEnabledByDepartmentId(departmentId: string, departmentEnabled: boolean): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	removeByDepartmentId(departmentId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	findByDepartmentId(departmentId: string, options?: FindOptions<ILivechatDepartmentAgents>): FindCursor<ILivechatDepartmentAgents> {
        /* Implementation Hidden */
    }

	findOneByAgentIdAndDepartmentId(
		agentId: string,
		departmentId: string,
		options?: FindOptions<ILivechatDepartmentAgents>,
	): Promise<ILivechatDepartmentAgents | null> {
        /* Implementation Hidden */
    }

	saveAgent(agent: {
		agentId: string;
		departmentId: string;
		username: string;
		departmentEnabled: boolean;
		count: number;
		order: number;
	}): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async removeByAgentId(agentId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	async removeByDepartmentIdAndAgentId(departmentId: string, agentId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async getNextAgentForDepartment(
		departmentId: ILivechatDepartmentAgents['departmentId'],
		isLivechatEnabledWhenAgentIdle?: boolean,
		ignoreAgentId?: ILivechatDepartmentAgents['agentId'],
		extraQuery?: Filter<AvailableAgentsAggregation>,
		acceptChatsWithNoAgents?: boolean,
	): Promise<Pick<ILivechatDepartmentAgents, '_id' | 'agentId' | 'departmentId' | 'username'> | null | undefined> {
        /* Implementation Hidden */
    }

	async getBotsForDepartment(departmentId: string): Promise<undefined | FindCursor<ILivechatDepartmentAgents>> {
        /* Implementation Hidden */
    }

	async countBotsForDepartment(departmentId: string): Promise<number> {
        /* Implementation Hidden */
    }

	async getNextBotForDepartment(
		departmentId: ILivechatDepartmentAgents['departmentId'],
		ignoreAgentId?: ILivechatDepartmentAgents['agentId'],
	): Promise<Pick<ILivechatDepartmentAgents, '_id' | 'agentId' | 'departmentId' | 'username'> | null | undefined> {
        /* Implementation Hidden */
    }

	replaceUsernameOfAgentByUserId(userId: string, username: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	countByDepartmentId(departmentId: string): Promise<number> {
        /* Implementation Hidden */
    }

	disableAgentsByDepartmentId(departmentId: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	enableAgentsByDepartmentId(departmentId: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	findAllAgentsConnectedToListOfDepartments(departmentIds: string[]): Promise<string[]> {
        /* Implementation Hidden */
    }

	findByAgentsAndDepartmentId(
		agentsIds: ILivechatDepartmentAgents['agentId'][],
		departmentId: ILivechatDepartmentAgents['departmentId'],
		options?: FindOptions<ILivechatDepartmentAgents>,
	): FindCursor<ILivechatDepartmentAgents> {
        /* Implementation Hidden */
    }

	findDepartmentsOfAgent(agentId: string, enabled = false): AggregationCursor<ILivechatDepartmentAgents & { departmentName: string }> {
        /* Implementation Hidden */
    }
}

const isStringValue = (value: any): value is string => typeof value === 'string';

```