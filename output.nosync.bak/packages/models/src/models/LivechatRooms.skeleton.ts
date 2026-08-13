## File: packages/models/src/models/LivechatRooms.ts

```typescript
import type {
	IOmnichannelRoom,
	RocketChatRecordDeleted,
	IOmnichannelRoomClosingInfo,
	DeepWritable,
	IMessage,
	ILivechatPriority,
	IOmnichannelServiceLevelAgreements,
	ReportResult,
	MACStats,
	ILivechatContactVisitorAssociation,
	ILivechatContact,
	AtLeast,
} from '@rocket.chat/core-typings';
import { UserStatus } from '@rocket.chat/core-typings';
import type { FindPaginated, ILivechatRoomsModel } from '@rocket.chat/model-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type {
	Db,
	Collection,
	IndexDescription,
	Document,
	Filter,
	FindOptions,
	UpdateFilter,
	SortDirection,
	FindCursor,
	UpdateResult,
	AggregationCursor,
	UpdateOptions,
} from 'mongodb';

import type { Updater } from '../updater';
import { BaseRaw } from './BaseRaw';
import { readSecondaryPreferred } from '../readSecondaryPreferred';

export class LivechatRoomsRaw extends BaseRaw<IOmnichannelRoom> implements ILivechatRoomsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IOmnichannelRoom>>) {
        /* Implementation Hidden */
    }

	// move indexes from constructor to here using IndexDescription as type
	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	override async findOneById(_id: IOmnichannelRoom['_id'], options?: FindOptions<IOmnichannelRoom>): Promise<IOmnichannelRoom | null>;

	override async findOneById<P extends Document = IOmnichannelRoom>(
		_id: IOmnichannelRoom['_id'],
		options?: FindOptions<P>,
	): Promise<P | null>;

	override async findOneById(_id: IOmnichannelRoom['_id'], options?: any): Promise<IOmnichannelRoom | null> {
        /* Implementation Hidden */
    }

	getQueueMetrics({
		departmentId,
		agentId,
		includeOfflineAgents,
		options = {},
	}: {
		departmentId?: string;
		agentId?: string;
		includeOfflineAgents?: boolean;
		options?: { offset?: number; count?: number; sort?: { [k: string]: number } };
	}) {
        /* Implementation Hidden */
    }

	async findAllNumberOfAbandonedRooms({
		start,
		end,
		departmentId,
		inactivityTimeout,
		onlyCount = false,
		options = {},
	}: {
		start: Date;
		end: Date;
		inactivityTimeout: number;
		departmentId?: string;
		onlyCount?: boolean;
		options?: { offset?: number; count?: number; sort?: { [k: string]: number } };
	}) {
        /* Implementation Hidden */
    }

	async findPercentageOfAbandonedRooms({
		start,
		end,
		inactivityTimeout,
		departmentId,
		onlyCount = false,
		options = {},
	}: {
		start: Date;
		end: Date;
		inactivityTimeout: number;
		departmentId?: string;
		onlyCount?: boolean;
		options?: { offset?: number; count?: number; sort?: { [k: string]: number } };
	}) {
        /* Implementation Hidden */
    }

	findAllAverageOfChatDurationTime({
		start,
		end,
		departmentId,
		onlyCount = false,
		options = {},
	}: {
		start: Date;
		end: Date;
		departmentId?: string;
		onlyCount?: boolean;
		options?: { offset?: number; count?: number; sort?: { [k: string]: number } };
	}) {
        /* Implementation Hidden */
    }

	findAllAverageWaitingTime({
		start,
		end,
		departmentId,
		onlyCount = false,
		options = {},
	}: {
		start: Date;
		end: Date;
		departmentId?: string;
		onlyCount?: boolean;
		options?: { offset?: number; count?: number; sort?: { [k: string]: number } };
	}) {
        /* Implementation Hidden */
    }

	findAllRooms({
		start,
		end,
		answered,
		departmentId,
		onlyCount = false,
		options = {},
	}: {
		start: Date;
		end: Date;
		answered?: boolean;
		departmentId?: string;
		onlyCount?: boolean;
		options?: { offset?: number; count?: number; sort?: { [k: string]: number } };
	}) {
        /* Implementation Hidden */
    }

	findAllServiceTime({
		start,
		end,
		departmentId,
		onlyCount = false,
		options = {},
	}: {
		start: Date;
		end: Date;
		departmentId?: string;
		onlyCount?: boolean;
		options?: { offset?: number; count?: number; sort?: { [k: string]: number } };
	}) {
        /* Implementation Hidden */
    }

	findAllNumberOfTransferredRooms({
		start,
		end,
		departmentId,
		options = {},
	}: {
		start: Date;
		end: Date;
		departmentId?: string;
		options?: { offset?: number; count?: number; sort?: { [k: string]: number } };
	}) {
        /* Implementation Hidden */
    }

	countAllOpenChatsBetweenDate({ start, end, departmentId }: { start: Date; end: Date; departmentId?: string }) {
        /* Implementation Hidden */
    }

	countAllClosedChatsBetweenDate({ start, end, departmentId }: { start: Date; end: Date; departmentId?: string }) {
        /* Implementation Hidden */
    }

	countAllQueuedChatsBetweenDate({ start, end, departmentId }: { start: Date; end: Date; departmentId?: string }) {
        /* Implementation Hidden */
    }

	countAllOpenChatsByAgentBetweenDate({ start, end, departmentId }: { start: Date; end: Date; departmentId?: string }) {
        /* Implementation Hidden */
    }

	countAllOnHoldChatsByAgentBetweenDate({ start, end, departmentId }: { start: Date; end: Date; departmentId?: string }) {
        /* Implementation Hidden */
    }

	countAllClosedChatsByAgentBetweenDate({ start, end, departmentId }: { start: Date; end: Date; departmentId?: string }) {
        /* Implementation Hidden */
    }

	countAllOpenChatsByDepartmentBetweenDate({ start, end, departmentId }: { start: Date; end: Date; departmentId?: string }) {
        /* Implementation Hidden */
    }

	countAllClosedChatsByDepartmentBetweenDate({ start, end, departmentId }: { start: Date; end: Date; departmentId?: string }) {
        /* Implementation Hidden */
    }

	calculateResponseTimingsBetweenDates({ start, end, departmentId }: { start: Date; end: Date; departmentId?: string }) {
        /* Implementation Hidden */
    }

	calculateReactionTimingsBetweenDates({ start, end, departmentId }: { start: Date; end: Date; departmentId?: string }) {
        /* Implementation Hidden */
    }

	calculateDurationTimingsBetweenDates({ start, end, departmentId }: { start: Date; end: Date; departmentId?: string }) {
        /* Implementation Hidden */
    }

	findAllAverageOfServiceTime({
		start,
		end,
		departmentId,
		onlyCount = false,
		options = {},
	}: {
		start: Date;
		end: Date;
		departmentId?: string;
		onlyCount?: boolean;
		options?: { offset?: number; count?: number; sort?: { [k: string]: number } };
	}) {
        /* Implementation Hidden */
    }

	findByVisitorId(visitorId: string, options: FindOptions<IOmnichannelRoom>, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	findPaginatedByVisitorId(visitorId: string, options: FindOptions<IOmnichannelRoom>, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	findRoomsByVisitorIdAndMessageWithCriteria({
		visitorId,
		searchText,
		open,
		served,
		onlyCount = false,
		source,
		options = {},
	}: {
		visitorId: string;
		searchText?: string;
		open?: boolean;
		served?: boolean;
		onlyCount?: boolean;
		source?: string;
		options?: { sort?: { [k: string]: number }; skip?: number; limit?: number };
	}) {
        /* Implementation Hidden */
    }

	findClosedRoomsByContactPaginated({
		contactId,
		options = {},
	}: {
		contactId: string;
		options?: FindOptions;
	}): FindPaginated<FindCursor<IOmnichannelRoom>> {
        /* Implementation Hidden */
    }

	findRoomsWithCriteria({
		agents,
		roomName,
		departmentId,
		open,
		served,
		createdAt,
		closedAt,
		tags,
		customFields,
		visitorId,
		roomIds,
		onhold,
		queued,
		options = {},
		extraQuery = {},
	}: {
		agents?: string[];
		roomName?: string;
		departmentId?: string | string[];
		open?: boolean;
		served?: boolean;
		createdAt?: { start?: Date; end?: Date };
		closedAt?: { start?: Date; end?: Date };
		tags?: string[];
		customFields?: Record<string, string>;
		visitorId?: string;
		roomIds?: string[];
		onhold?: boolean;
		queued?: boolean;
		options?: { offset?: number; count?: number; sort?: { [k: string]: SortDirection } };
		extraQuery?: Filter<IOmnichannelRoom>;
	}) {
        /* Implementation Hidden */
    }

	getOnHoldConversationsBetweenDate(from: Date, to: Date, departmentId?: string) {
        /* Implementation Hidden */
    }

	findAllServiceTimeByAgent({
		start,
		end,
		onlyCount = false,
		options = {},
	}: {
		start: Date;
		end: Date;
		onlyCount?: boolean;
		options?: { sort?: { [key: string]: number }; offset?: number; count?: number };
	}) {
        /* Implementation Hidden */
    }

	findAllAverageServiceTimeByAgents({
		start,
		end,
		onlyCount = false,
		options = {},
	}: {
		start: Date;
		end: Date;
		onlyCount?: boolean;
		options?: { sort?: { [key: string]: number }; offset?: number; count?: number };
	}) {
        /* Implementation Hidden */
    }

	setDepartmentByRoomId(roomId: string, departmentId: string) {
        /* Implementation Hidden */
    }

	findOpen(extraQuery = {}) {
        /* Implementation Hidden */
    }

	setAutoTransferOngoingById(roomId: string) {
        /* Implementation Hidden */
    }

	unsetAutoTransferOngoingById(roomId: string) {
        /* Implementation Hidden */
    }

	setAutoTransferredAtById(roomId: string) {
        /* Implementation Hidden */
    }

	findAvailableSources() {
        /* Implementation Hidden */
    }

	setPdfTranscriptFileIdById(rid: string, fileId: string) {
        /* Implementation Hidden */
    }

	setEmailTranscriptRequestedByRoomId(roomId: string, transcriptInfo: NonNullable<IOmnichannelRoom['transcriptRequest']>) {
        /* Implementation Hidden */
    }

	unsetEmailTranscriptRequestedByRoomId(roomId: string) {
        /* Implementation Hidden */
    }

	closeRoomById(roomId: string, closeInfo: IOmnichannelRoomClosingInfo, options?: UpdateOptions) {
        /* Implementation Hidden */
    }

	bulkRemoveDepartmentAndUnitsFromRooms(departmentId: string) {
        /* Implementation Hidden */
    }

	findOneByIdOrName(_idOrName: string, options: FindOptions<IOmnichannelRoom>) {
        /* Implementation Hidden */
    }

	updateSurveyFeedbackById(_id: string, surveyFeedback: string) {
        /* Implementation Hidden */
    }

	async updateDataByToken(token: string, key: string, value: any, overwrite = true) {
        /* Implementation Hidden */
    }

	async saveRoomById({
		_id,
		topic,
		tags,
		livechatData,
		...extra
	}: {
		_id: string;
		topic?: string;
		tags?: string[];
		livechatData?: Record<string, any>;
	} & Record<string, any>) {
        /* Implementation Hidden */
    }

	findById(_id: string, fields: FindOptions<IOmnichannelRoom>['projection']) {
        /* Implementation Hidden */
    }

	findByIds(ids: string[], fields: FindOptions<IOmnichannelRoom>['projection'], extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	findOneByIdAndVisitorToken(_id: string, visitorToken: string, fields: FindOptions<IOmnichannelRoom>['projection']) {
        /* Implementation Hidden */
    }

	findOneByVisitorTokenAndEmailThread(visitorToken: string, emailThread: string[], options: FindOptions<IOmnichannelRoom>) {
        /* Implementation Hidden */
    }

	findOneByVisitorTokenAndEmailThreadAndDepartment(
		visitorToken: string,
		emailThread: string[],
		departmentId: string,
		options: FindOptions<IOmnichannelRoom>,
	) {
        /* Implementation Hidden */
    }

	findOneOpenByVisitorTokenAndEmailThread(visitorToken: string, emailThread: string[], options: FindOptions<IOmnichannelRoom>) {
        /* Implementation Hidden */
    }

	updateEmailThreadByRoomId(roomId: string, threadIds: string[]) {
        /* Implementation Hidden */
    }

	findOneLastServedAndClosedByVisitorToken(visitorToken: string, options: FindOptions<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	findOneByVisitorToken(visitorToken: string, fields: FindOptions<IOmnichannelRoom>['projection']) {
        /* Implementation Hidden */
    }

	findOpenByVisitorToken(visitorToken: string, options: FindOptions<IOmnichannelRoom> = {}, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	findOneOpenByContactChannelVisitor(
		association: ILivechatContactVisitorAssociation,
		options: FindOptions<IOmnichannelRoom> = {},
	): Promise<IOmnichannelRoom | null> {
        /* Implementation Hidden */
    }

	findOneOpenByVisitorToken(visitorToken: string, options: FindOptions<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	findOneOpenByVisitorTokenAndDepartmentIdAndSource(
		visitorToken: string,
		departmentId?: string,
		source?: string,
		options: FindOptions<IOmnichannelRoom> = {},
	) {
        /* Implementation Hidden */
    }

	findOpenByVisitorTokenAndDepartmentId(
		visitorToken: string,
		departmentId: string,
		options: FindOptions<IOmnichannelRoom> = {},
		extraQuery: Filter<IOmnichannelRoom> = {},
	) {
        /* Implementation Hidden */
    }

	findByVisitorToken(visitorToken: string, extraQuery: Filter<IOmnichannelRoom> = {}, options?: FindOptions<IOmnichannelRoom>) {
        /* Implementation Hidden */
    }

	findByVisitorIdAndAgentId(
		visitorId?: string,
		agentId?: string,
		options: FindOptions<IOmnichannelRoom> = {},
		extraQuery: Filter<IOmnichannelRoom> = {},
	) {
        /* Implementation Hidden */
    }

	async findNewestByContactVisitorAssociation<T extends Document = IOmnichannelRoom>(
		association: ILivechatContactVisitorAssociation,
		options: Omit<FindOptions<IOmnichannelRoom>, 'sort' | 'limit'> = {},
	): Promise<T | null> {
        /* Implementation Hidden */
    }

	findOneOpenByRoomIdAndVisitorToken(roomId: string, visitorToken: string, options: FindOptions<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	findClosedRooms(departmentIds?: string[], options: FindOptions<IOmnichannelRoom> = {}, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	getResponseByRoomIdUpdateQuery(responseBy: IOmnichannelRoom['responseBy'], updater: Updater<IOmnichannelRoom> = this.getUpdater()) {
        /* Implementation Hidden */
    }

	getNotResponseByRoomIdUpdateQuery(updater: Updater<IOmnichannelRoom> = this.getUpdater()) {
        /* Implementation Hidden */
    }

	getAgentLastMessageTsUpdateQuery(updater: Updater<IOmnichannelRoom> = this.getUpdater()) {
        /* Implementation Hidden */
    }

	private getAnalyticsUpdateQuery(
		analyticsData: Record<string, string | number | Date> | undefined,
		updater: Updater<IOmnichannelRoom> = this.getUpdater(),
	) {
        /* Implementation Hidden */
    }

	getAnalyticsUpdateQueryBySentByAgent(
		room: IOmnichannelRoom,
		message: IMessage,
		analyticsData: Record<string, string | number | Date> | undefined,
		updater: Updater<IOmnichannelRoom> = this.getUpdater(),
	) {
        /* Implementation Hidden */
    }

	getAnalyticsUpdateQueryBySentByVisitor(
		room: IOmnichannelRoom,
		message: IMessage,
		updater: Updater<IOmnichannelRoom> = this.getUpdater(),
	) {
        /* Implementation Hidden */
    }

	getTotalConversationsBetweenDate(t: 'l', date: { gte: Date; lte: Date }, { departmentId }: { departmentId?: string } = {}) {
        /* Implementation Hidden */
    }

	getAnalyticsMetricsBetweenDate(
		t: 'l',
		date: { gte: Date; lte: Date },
		{ departmentId }: { departmentId?: string } = {},
		extraQuery: Document = {},
	) {
        /* Implementation Hidden */
    }

	getAnalyticsMetricsBetweenDateWithMessages(
		t: string,
		date: { gte: Date; lte: Date },
		{ departmentId }: { departmentId?: string } = {},
		extraQuery: Document = {},
		extraMatchers: Document = {},
	) {
        /* Implementation Hidden */
    }

	getAnalyticsBetweenDate(date: { gte: Date; lte: Date }, { departmentId }: { departmentId?: string } = {}) {
        /* Implementation Hidden */
    }

	countOpenByAgent(userId: string, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	findOpenByAgent(userId: string, extraQuery: Filter<IOmnichannelRoom> = {}, options: FindOptions<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	changeAgentByRoomId(roomId: string, newAgent: { agentId: string; username: string; ts?: Date }) {
        /* Implementation Hidden */
    }

	changeDepartmentIdByRoomId(roomId: string, departmentId: string) {
        /* Implementation Hidden */
    }

	saveCRMDataByRoomId(roomId: string, crmData: unknown) {
        /* Implementation Hidden */
    }

	updateVisitorStatus(token: string, status: UserStatus) {
        /* Implementation Hidden */
    }

	removeAgentByRoomId(roomId: string) {
        /* Implementation Hidden */
    }

	removeByVisitorToken(token: string) {
        /* Implementation Hidden */
    }

	removeByVisitorId(_id: string) {
        /* Implementation Hidden */
    }

	override removeById(_id: string) {
        /* Implementation Hidden */
    }

	getVisitorLastMessageTsUpdateQueryByRoomId(lastMessageTs: Date, updater: Updater<IOmnichannelRoom> = this.getUpdater()) {
        /* Implementation Hidden */
    }

	setVisitorInactivityInSecondsById(roomId: string, visitorInactivity: number) {
        /* Implementation Hidden */
    }

	changeVisitorByRoomId(roomId: string, { _id, username, token }: { _id: string; username: string; token: string }) {
        /* Implementation Hidden */
    }

	unarchiveOneById(roomId: string) {
        /* Implementation Hidden */
    }

	getVisitorActiveForPeriodUpdateQuery(period: string, updater: Updater<IOmnichannelRoom> = this.getUpdater()): Updater<IOmnichannelRoom> {
        /* Implementation Hidden */
    }

	async getMACStatisticsForPeriod(period: string): Promise<MACStats[]> {
        /* Implementation Hidden */
    }

	async getMACStatisticsBetweenDates(start: Date, end: Date): Promise<MACStats[]> {
        /* Implementation Hidden */
    }

	countLivechatRoomsWithDepartment(): Promise<number> {
        /* Implementation Hidden */
    }

	async unsetAllPredictedVisitorAbandonment(): Promise<void> {
        /* Implementation Hidden */
    }

	setOnHoldByRoomId(_roomId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	unsetOnHoldByRoomId(_roomId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	unsetOnHoldAndPredictedVisitorAbandonmentByRoomId(_roomId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setSlaForRoomById(
		_roomId: string,
		_sla: Pick<IOmnichannelServiceLevelAgreements, '_id' | 'dueTimeInMinutes'>,
	): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	removeSlaFromRoomById(_roomId: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	bulkRemoveSlaFromRoomsById(_slaId: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	findOpenBySlaId(_slaId: string, _options: FindOptions<IOmnichannelRoom>): FindCursor<IOmnichannelRoom> {
        /* Implementation Hidden */
    }

	async setPriorityByRoomId(_roomId: string, _priority: Pick<ILivechatPriority, '_id' | 'sortItem'>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async unsetPriorityByRoomId(_roomId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	findOpenRoomsByPriorityId(_priorityId: string): FindCursor<IOmnichannelRoom> {
        /* Implementation Hidden */
    }

	getPredictedVisitorAbandonmentByRoomIdUpdateQuery(
		_willBeAbandonedAt: Date,
		_updater: Updater<IOmnichannelRoom>,
	): Updater<IOmnichannelRoom> {
        /* Implementation Hidden */
    }

	setPredictedVisitorAbandonmentByRoomId(_rid: string, _willBeAbandonedAt: Date): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	findAbandonedOpenRooms(_date: Date): FindCursor<IOmnichannelRoom> {
        /* Implementation Hidden */
    }

	async unsetPredictedVisitorAbandonmentByRoomId(_roomId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async associateRoomsWithDepartmentToUnit(_departments: string[], _unitId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async removeUnitAssociationFromRooms(_unitId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async updateDepartmentAncestorsById(_rid: string, _departmentAncestors?: string[]): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	countPrioritizedRooms(): Promise<number> {
        /* Implementation Hidden */
    }

	countRoomsWithSla(): Promise<number> {
        /* Implementation Hidden */
    }

	countRoomsWithTranscriptSent(): Promise<number> {
        /* Implementation Hidden */
    }

	getConversationsBySource(_start: Date, _end: Date, _extraQuery: Filter<IOmnichannelRoom>): AggregationCursor<ReportResult> {
        /* Implementation Hidden */
    }

	getConversationsByStatus(_start: Date, _end: Date, _extraQuery: Filter<IOmnichannelRoom>): AggregationCursor<ReportResult> {
        /* Implementation Hidden */
    }

	getConversationsByDepartment(
		_start: Date,
		_end: Date,
		_sort: Record<string, 1 | -1>,
		_extraQuery: Filter<IOmnichannelRoom>,
	): AggregationCursor<ReportResult> {
        /* Implementation Hidden */
    }

	getConversationsByTags(
		_start: Date,
		_end: Date,
		_sort: Record<string, 1 | -1>,
		_extraQuery: Filter<IOmnichannelRoom>,
	): AggregationCursor<ReportResult> {
        /* Implementation Hidden */
    }

	getConversationsByAgents(
		_start: Date,
		_end: Date,
		_sort: Record<string, 1 | -1>,
		_extraQuery: Filter<IOmnichannelRoom>,
	): AggregationCursor<ReportResult> {
        /* Implementation Hidden */
    }

	getConversationsWithoutTagsBetweenDate(_start: Date, _end: Date, _extraQuery: Filter<IOmnichannelRoom>): Promise<number> {
        /* Implementation Hidden */
    }

	getTotalConversationsWithoutAgentsBetweenDate(_start: Date, _end: Date, _extraQuery: Filter<IOmnichannelRoom>): Promise<number> {
        /* Implementation Hidden */
    }

	getTotalConversationsWithoutDepartmentBetweenDates(_start: Date, _end: Date, _extraQuery: Filter<IOmnichannelRoom>): Promise<number> {
        /* Implementation Hidden */
    }

	setContactByVisitorAssociation(
		association: ILivechatContactVisitorAssociation,
		contact: Pick<AtLeast<ILivechatContact, '_id'>, '_id' | 'name'>,
	): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	updateContactDataByContactId(
		oldContactId: ILivechatContact['_id'],
		contact: Partial<Pick<ILivechatContact, '_id' | 'name'>>,
	): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	updateMergedContactIds(
		_contactIdsThatWereMerged: ILivechatContact['_id'][],
		_newContactId: ILivechatContact['_id'],
		_options?: UpdateOptions,
	): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	findClosedRoomsByContactAndSourcePaginated(_params: {
		contactId: string;
		source?: string;
		options?: FindOptions;
	}): FindPaginated<FindCursor<IOmnichannelRoom>> {
        /* Implementation Hidden */
    }

	findOpenByContactId(contactId: ILivechatContact['_id'], options?: FindOptions<IOmnichannelRoom>): FindCursor<IOmnichannelRoom> {
        /* Implementation Hidden */
    }

	checkContactOpenRooms(contactId: ILivechatContact['_id']): Promise<IOmnichannelRoom | null> {
        /* Implementation Hidden */
    }
}

```