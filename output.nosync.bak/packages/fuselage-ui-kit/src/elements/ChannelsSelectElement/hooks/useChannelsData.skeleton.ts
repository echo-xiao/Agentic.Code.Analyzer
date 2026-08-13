## File: packages/fuselage-ui-kit/src/elements/ChannelsSelectElement/hooks/useChannelsData.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

type useChannelsDataProps = {
	filter: string;
};

const generateQuery = (
	term = '',
): {
	selector: string;
} => ({ selector: JSON.stringify({ name: term }) });

export const useChannelsData = ({ filter }: useChannelsDataProps) => {
    /* Implementation Hidden */
};

```