## File: apps/meteor/server/oauth2-server/model.ts

```typescript
import type {
	AuthorizationCode,
	AuthorizationCodeModel,
	Client,
	Falsey,
	RefreshToken,
	RefreshTokenModel,
	Token,
	User,
} from '@node-oauth/oauth2-server';
import { OAuthApps, OAuthAuthCodes, OAuthAccessTokens, OAuthRefreshTokens, Users } from '@rocket.chat/models';

export type ModelConfig = {
	debug?: boolean;
};

export class Model implements AuthorizationCodeModel, RefreshTokenModel {
	private debug: boolean;

	private grants = ['authorization_code', 'refresh_token'];

	constructor(config: ModelConfig = {}) {
        /* Implementation Hidden */
    }

	async verifyScope(token: Token, scope: string | string[]): Promise<boolean> {
        /* Implementation Hidden */
    }

	async getAccessToken(accessToken: string): Promise<Token | Falsey> {
        /* Implementation Hidden */
    }

	async getClient(clientId: string, clientSecret?: string): Promise<Client | Falsey> {
        /* Implementation Hidden */
    }

	async getAuthorizationCode(authorizationCode: string): Promise<AuthorizationCode | Falsey> {
        /* Implementation Hidden */
    }

	async saveAuthorizationCode(
		code: Pick<AuthorizationCode, 'authorizationCode' | 'expiresAt' | 'redirectUri' | 'scope'>,
		client: Client,
		user: User,
	): Promise<AuthorizationCode | Falsey> {
        /* Implementation Hidden */
    }

	async saveToken(token: Token, client: Client, user: User): Promise<Token | Falsey> {
        /* Implementation Hidden */
    }

	async getRefreshToken(refreshToken: string): Promise<RefreshToken | Falsey> {
        /* Implementation Hidden */
    }

	async revokeToken(token: RefreshToken | Token): Promise<boolean> {
        /* Implementation Hidden */
    }

	async revokeAuthorizationCode(code: AuthorizationCode): Promise<boolean> {
        /* Implementation Hidden */
    }
}

```