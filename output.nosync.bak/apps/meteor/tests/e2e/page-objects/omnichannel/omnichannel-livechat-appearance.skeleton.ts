## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-livechat-appearance.ts

```typescript
import type { Locator } from '@playwright/test';

import { OmnichannelAdmin } from './omnichannel-admin';

export class OmnichannelLivechatAppearance extends OmnichannelAdmin {
	get inputHideSystemMessages(): Locator {
		return this.page.locator('label', { hasText: 'Hide system messages' });
	}

	get inputLivechatBackground(): Locator {
		return this.page.locator('[name="Livechat_background"]');
	}

	get inputLivechatTitle(): Locator {
		return this.page.locator('[name="Livechat_title"]');
	}

	get inputHideExpandChat(): Locator {
		return this.page.getByRole('checkbox', { name: 'Hide "Expand chat"' });
	}

	get labelHideExpandChat(): Locator {
		return this.page.locator('label', { has: this.inputHideExpandChat });
	}

	findHideSystemMessageOption(option: string): Locator {
        /* Implementation Hidden */
    }
}

```