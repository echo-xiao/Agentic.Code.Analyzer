## File: packages/ui-voip/src/definitions/callHistoryContacts.ts

```typescript
export type CallHistoryExternalContact = {
	number: string;
};

export type CallHistoryInternalContact = {
	_id: string;
	name?: string;
	username: string;
	displayName?: string;
	voiceCallExtension?: string;
	avatarUrl?: string;
};

export type CallHistoryUnknownContact = {
	unknown: true;
};

export type CallHistoryContact = CallHistoryInternalContact | CallHistoryExternalContact | CallHistoryUnknownContact;

export const isCallHistoryUnknownContact = (contact: CallHistoryContact): contact is CallHistoryUnknownContact => {
    /* Implementation Hidden */
};

export const isCallHistoryInternalContact = (contact: CallHistoryContact): contact is CallHistoryInternalContact => {
    /* Implementation Hidden */
};

export const isCallHistoryExternalContact = (contact: CallHistoryContact): contact is CallHistoryExternalContact => {
    /* Implementation Hidden */
};

```