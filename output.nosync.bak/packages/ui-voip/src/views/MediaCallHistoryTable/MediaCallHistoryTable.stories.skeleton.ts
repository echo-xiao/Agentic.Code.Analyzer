## File: packages/ui-voip/src/views/MediaCallHistoryTable/MediaCallHistoryTable.stories.tsx

```typescript
import { mockAppRoot } from '@rocket.chat/mock-providers';
import { GenericMenu, useSort } from '@rocket.chat/ui-client';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import type { CallHistoryTableRowProps } from './CallHistoryTableRow';
import CallHistoryTableRow from './CallHistoryTableRow';
import MediaCallHistoryTable from './MediaCallHistoryTable';
import type { CallHistoryContact, CallHistoryInternalContact } from '../../definitions';

const mockedContexts = mockAppRoot()
	.withTranslations('en', 'core', {
		Voice: 'Voice',
		Ended: 'Ended',
		Not_answered: 'Not answered',
		Failed: 'Failed',
		Transferred: 'Transferred',
		Contact: 'Contact',
		Type: 'Type',
		Status: 'Status',
		Time_slash_Date: 'Time / Date',
		Unknown: 'Unknown',
	})
	.withDefaultLanguage('pt-BR')
	.buildStoryDecorator();

export default {
	component: MediaCallHistoryTable,
	decorators: [mockedContexts],
} satisfies Meta<typeof MediaCallHistoryTable>;

const getStatus = (index: number) => {
    /* Implementation Hidden */
};

const getDate = (index: number) => {
    /* Implementation Hidden */
};

const getContact = (index: number): CallHistoryContact => {
    /* Implementation Hidden */
};

const results = Array.from({ length: 100 }).map(
	(_, index): CallHistoryTableRowProps<CallHistoryInternalContact> => ({
		_id: `call_${index}`,
		contact: getContact(index) as CallHistoryInternalContact,
		type: index % 2 ? 'outbound' : 'inbound',
		status: getStatus(index),
		duration: index % 2 ? 120 : 0,
		timestamp: getDate(index).toISOString(),
		onClick: action(`onClick call_${index}`),
		menu: <GenericMenu title='Menu' sections={[]} />,
	}),
);

export const MediaCallHistoryTableStory: StoryObj<typeof MediaCallHistoryTable> = {
	render: () => {
		const sort = useSort<'contact' | 'type' | 'status' | 'timestamp'>('contact');
		return (
			<MediaCallHistoryTable sort={sort}>
				{results.map((result) => (
					<CallHistoryTableRow key={result._id} {...result} />
				))}
			</MediaCallHistoryTable>
		);
	},
};

```