## File: apps/meteor/client/lib/loginServices.ts

```typescript
import type { LoginServiceConfiguration } from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';
import { capitalize } from '@rocket.chat/string-helpers';
import type { LoginService } from '@rocket.chat/ui-contexts';

import { sdk } from '../../app/utils/client/lib/SDKClient';

type LoginServicesEvents = {
	changed: undefined;
	loaded: LoginServiceConfiguration[];
};

type LoadState = 'loaded' | 'loading' | 'error' | 'none';

const maxRetries = 3;
const timeout = 10000;

class LoginServices extends Emitter<LoginServicesEvents> {
	private retries = 0;

	private services: LoginServiceConfiguration[] = [];

	private serviceButtons: LoginService[] = [];

	private state: LoadState = 'none';

	private config: Record<string, Partial<LoginService>> = {
		'apple': { title: 'Apple', icon: 'apple' },
		'facebook': { title: 'Facebook', icon: 'facebook' },
		'twitter': { title: 'Twitter', icon: 'twitter' },
		'google': { title: 'Google', icon: 'google' },
		'github': { title: 'Github', icon: 'github' },
		'github_enterprise': { title: 'Github Enterprise', icon: 'github' },
		'gitlab': { title: 'Gitlab', icon: 'gitlab' },
		'dolphin': { title: 'Dolphin', icon: 'dophin' },
		'drupal': { title: 'Drupal', icon: 'drupal' },
		'nextcloud': { title: 'Nextcloud', icon: 'nextcloud' },
		'meteor-developer': { title: 'Meteor', icon: 'meteor' },
		'wordpress': { title: 'WordPress', icon: 'wordpress' },
		'linkedin': { title: 'Linkedin', icon: 'linkedin' },
	};

	private setServices(state: LoadState, services: LoginServiceConfiguration[]) {
        /* Implementation Hidden */
    }

	private generateServiceButtons(): void {
        /* Implementation Hidden */
    }

	public getLoginService<T extends Partial<LoginServiceConfiguration> = LoginServiceConfiguration>(serviceName: string): T | undefined {
        /* Implementation Hidden */
    }

	public async loadLoginService<T extends Partial<LoginServiceConfiguration> = LoginServiceConfiguration>(
		serviceName: string,
	): Promise<T | undefined> {
        /* Implementation Hidden */
    }

	public get ready() {
		return this.state === 'loaded';
	}

	public getLoginServiceButtons(): LoginService[] {
        /* Implementation Hidden */
    }

	public onLoad(callback: (services: LoginServiceConfiguration[]) => void): () => void {
        /* Implementation Hidden */
    }

	public async loadServices(): Promise<void> {
        /* Implementation Hidden */
    }
}

export const loginServices = new LoginServices();

```