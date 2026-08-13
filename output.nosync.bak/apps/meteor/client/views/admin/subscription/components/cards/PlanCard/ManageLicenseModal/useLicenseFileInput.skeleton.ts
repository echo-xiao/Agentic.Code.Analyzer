## File: apps/meteor/client/views/admin/subscription/components/cards/PlanCard/ManageLicenseModal/useLicenseFileInput.ts

```typescript
import type { ChangeEvent, DragEvent } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const isTxtFile = (file: File): boolean => file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt');

const readFileAsText = (file: File): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (event) => {
			const result = event.target?.result;
			if (typeof result === 'string') {
				resolve(result);
				return;
			}
			reject(new Error('Failed to read file'));
		};
		reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'));
		reader.readAsText(file);
	});

const isFileDrag = (event: DragEvent<HTMLElement>) => event.dataTransfer.types.includes('Files');

export const useLicenseFileInput = (enterpriseLicense: string) => {
    /* Implementation Hidden */
};

```