## File: packages/apps-engine/src/definition/oauth2/OAuth2Client.ts

```typescript
import { URL } from 'node:url';

import type { App } from '../App';
import type { IConfigurationExtend, IHttp, IModify, IPersistence, IRead } from '../accessors';
import { HttpStatusCode } from '../accessors';
import type { IApiEndpointInfo, IApiRequest, IApiResponse } from '../api';
import { ApiSecurity, ApiVisibility } from '../api';
import { RocketChatAssociationModel, RocketChatAssociationRecord } from '../metadata';
import type { IAuthData, IOAuth2Client, IOAuth2ClientOptions } from './IOAuth2';
import { SettingType } from '../settings';
import type { IUser } from '../users';

export enum GrantType {
	RefreshToken = 'refresh_token',
	AuthorizationCode = 'authorization_code',
}

export class OAuth2Client implements IOAuth2Client {
	private defaultContents = {
		success: `<div style="display: flex;align-items: center;justify-content: center; height: 100%;">\
                        <h1 style="text-align: center; font-family: Helvetica Neue;">\
                            Authorization went successfully<br>\
                            You can close this tab now<br>\
                        </h1>\
                    </div>`,
		failed: `<div style="display: flex;align-items: center;justify-content: center; height: 100%;">\
                    <h1 style="text-align: center; font-family: Helvetica Neue;">\
                        Oops, something went wrong, please try again or in case it still does not work, contact the administrator.\
                    </h1>\
                </div>`,
	};

	constructor(
		private readonly app: App,
		private readonly config: IOAuth2ClientOptions,
	) {
        /* Implementation Hidden */
    }

	public async setup(configuration: IConfigurationExtend): Promise<void> {
        /* Implementation Hidden */
    }

	public async getUserAuthorizationUrl(user: IUser, scopes?: Array<string>): Promise<URL> {
        /* Implementation Hidden */
    }

	public async getAccessTokenForUser(user: IUser): Promise<IAuthData | undefined> {
        /* Implementation Hidden */
    }

	public async refreshUserAccessToken(user: IUser, persis: IPersistence): Promise<IAuthData | undefined> {
        /* Implementation Hidden */
    }

	public async revokeUserAccessToken(user: IUser, persis: IPersistence): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async getBaseURLWithoutTrailingSlash(): Promise<string> {
        /* Implementation Hidden */
    }

	private async handleOAuthCallback(
		request: IApiRequest,
		endpoint: IApiEndpointInfo,
		read: IRead,
		modify: IModify,
		http: IHttp,
		persis: IPersistence,
	): Promise<IApiResponse> {
        /* Implementation Hidden */
    }

	private async saveToken(authData: IAuthData, userId: string, persis: IPersistence): Promise<string> {
        /* Implementation Hidden */
    }

	private async removeToken({ userId, persis }: { userId: string; persis: IPersistence }): Promise<IAuthData> {
        /* Implementation Hidden */
    }
}

```