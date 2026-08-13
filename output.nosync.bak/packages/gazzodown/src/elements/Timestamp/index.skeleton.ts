## File: packages/gazzodown/src/elements/Timestamp/index.tsx

```typescript
import { Tag } from '@rocket.chat/fuselage';
import type * as MessageParser from '@rocket.chat/message-parser';
import { format, intlFormatDistance } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MarkupInteractionContext } from '../../MarkupInteractionContext';

type BoldSpanProps = {
	children: MessageParser.Timestamp;
};

export type TimestampProps = { format: 't' | 'T' | 'd' | 'D' | 'f' | 'F' | 'R'; value: Date };

const Timestamp = ({ format, value }: TimestampProps) => {
    /* Implementation Hidden */
};

// eslint-disable-next-line react/no-multi-comp
const TimestampWrapper = ({ children }: BoldSpanProps) => (
	<ErrorBoundary fallback={<>{new Date(parseInt(children.value.timestamp) * 1000).toUTCString()}</>}>
		<Timestamp format={children.value.format} value={new Date(parseInt(children.value.timestamp) * 1000)} />
	</ErrorBoundary>
);

export type ShortTimeProps = { value: Date };

// eslint-disable-next-line react/no-multi-comp
const ShortTime = ({ value }: ShortTimeProps) => <Time value={format(value, 'p')} dateTime={value.toISOString()} />;

export type LongTimeProps = { value: Date };

// eslint-disable-next-line react/no-multi-comp
const LongTime = ({ value }: LongTimeProps) => <Time value={format(value, 'pp')} dateTime={value.toISOString()} />;

export type ShortDateProps = { value: Date };

// eslint-disable-next-line react/no-multi-comp
const ShortDate = ({ value }: ShortDateProps) => <Time value={format(value, 'P')} dateTime={value.toISOString()} />;

export type LongDateProps = { value: Date };

// eslint-disable-next-line react/no-multi-comp
const LongDate = ({ value }: LongDateProps) => <Time value={format(value, 'Pp')} dateTime={value.toISOString()} />;

export type FullDateProps = { value: Date };

// eslint-disable-next-line react/no-multi-comp
const FullDate = ({ value }: FullDateProps) => <Time value={format(value, 'PPPP p')} dateTime={value.toISOString()} />;

export type FullDateLongProps = { value: Date };

// eslint-disable-next-line react/no-multi-comp
const FullDateLong = ({ value }: FullDateLongProps) => <Time value={format(value, 'PPPP pp')} dateTime={value.toISOString()} />;

export type TimeProps = { value: string; dateTime: string };

// eslint-disable-next-line react/no-multi-comp
const Time = ({ value, dateTime }: TimeProps) => (
	<time
		title={new Date(dateTime).toLocaleString()}
		dateTime={dateTime}
		style={{
			display: 'inline-block',
		}}
	>
		<Tag>{value}</Tag>
	</time>
);

export type RelativeTimeProps = { value: Date };

// eslint-disable-next-line react/no-multi-comp
const RelativeTime = ({ value }: RelativeTimeProps) => {
    /* Implementation Hidden */
};

const getTimeToRefresh = (time: number): number => {
    /* Implementation Hidden */
};

export default TimestampWrapper;

```