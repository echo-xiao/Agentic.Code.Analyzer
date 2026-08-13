## File: apps/meteor/client/views/admin/moderation/helpers/ModerationFilter.tsx

```typescript
import DateRangePicker from './DateRangePicker';
import FilterByText from '../../../../components/FilterByText';

export type ModerationFilterProps = {
	text: string;
	setText: (text: string) => void;
	setDateRange: (dateRange: { start: string; end: string }) => void;
};

const ModerationFilter = ({ text, setText, setDateRange }: ModerationFilterProps) => {
    /* Implementation Hidden */
};

export default ModerationFilter;

```