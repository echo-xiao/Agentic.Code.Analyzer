## File: packages/ui-client/src/hooks/useFeaturePreviewList.ts

```typescript
import type { TranslationKey } from '@rocket.chat/ui-contexts';

export type FeaturesAvailable = 'secondarySidebar' | 'sidebarDrafts';

export type FeaturePreviewProps = {
	name: FeaturesAvailable;
	i18n: TranslationKey;
	description: TranslationKey;
	group: 'Message' | 'Navigation';
	imageUrl?: string;
	value: boolean;
	enabled: boolean;
	disabled?: boolean;
	enableQuery?: {
		name: FeaturesAvailable;
		value: boolean;
	};
};

// TODO: Move the features preview array to another directory to be accessed from both BE and FE.
export const defaultFeaturesPreview: FeaturePreviewProps[] = [
	{
		name: 'secondarySidebar',
		i18n: 'Filters_and_secondary_sidebar',
		description: 'Filters_and_secondary_sidebar_description',
		group: 'Navigation',
		imageUrl: 'images/featurePreview/secondary-sidebar.png',
		value: false,
		enabled: true,
	},
	{
		name: 'sidebarDrafts',
		i18n: 'Drafts_in_sidebar',
		description: 'Drafts_in_sidebar_description',
		group: 'Navigation',
		imageUrl: 'images/featurePreview/sidebar-drafts.png',
		value: false,
		enabled: true,
	},
];

export const enabledDefaultFeatures = defaultFeaturesPreview.filter((feature) => feature.enabled);

// TODO: Remove this logic after we have a way to store object settings.
export const parseSetting = (setting?: FeaturePreviewProps[] | string) => {
    /* Implementation Hidden */
};

export const useFeaturePreviewList = (featuresList: FeaturePreviewProps[]) => {
    /* Implementation Hidden */
};

```