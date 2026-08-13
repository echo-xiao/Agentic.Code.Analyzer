## File: apps/meteor/client/views/admin/subscription/components/UsagePieGraph.tsx

```typescript
import type { DatumId } from '@nivo/pie';
import { Pie } from '@nivo/pie';
import { Box, Palette } from '@rocket.chat/fuselage';
import type { CSSProperties, ReactNode } from 'react';
import { useMemo, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useLocalePercentage } from '../../../../hooks/useLocalePercentage';

type GraphColorsReturn = { [key: string]: string };

const graphColors = (color: CSSProperties['color']): GraphColorsReturn => ({
	used: color || Palette.statusColor['status-font-on-success'].toString(),
	free: Palette.stroke['stroke-extra-light'].toString(),
});

export type UsagePieGraphProps = {
	used: number;
	total: number;
	label?: ReactNode;
	color?: string;
	size?: number;
};

type GraphData = Array<{
	id: string;
	label: string;
	value: number;
}>;

const UsagePieGraph = ({ used = 0, total = 0, label, color, size = 140 }: UsagePieGraphProps) => {
    /* Implementation Hidden */
};

export default memo(UsagePieGraph);

```