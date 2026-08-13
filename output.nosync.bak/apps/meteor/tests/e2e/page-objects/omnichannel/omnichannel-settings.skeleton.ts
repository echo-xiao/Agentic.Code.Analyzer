## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-settings.ts

```typescript
import type { Locator } from '@playwright/test';

import { OmnichannelAdmin } from './omnichannel-admin';

export class OmnichannelSettings extends OmnichannelAdmin {
	get labelLivechatLogo(): Locator {
		return this.page.locator('//label[@title="Assets_livechat_widget_logo"]');
	}

	get imgLivechatLogoPreview(): Locator {
		return this.page.locator('//label[@title="Assets_livechat_widget_logo"]/following-sibling::span >> role=img[name="Asset preview"]');
	}

	get inputLivechatLogo(): Locator {
		return this.page.locator('//label[@title="Assets_livechat_widget_logo"]/following-sibling::span >> input[type="file"]');
	}

	get btnDeleteLivechatLogo(): Locator {
		return this.page.locator('//label[@title="Assets_livechat_widget_logo"]/following-sibling::span >> role=button[name="Delete"]');
	}

	group(sectionName: string): Locator {
        /* Implementation Hidden */
    }

	get labelHideWatermark(): Locator {
		return this.page.locator('label').getByText('Hide "powered by Rocket.Chat"');
	}
}

```