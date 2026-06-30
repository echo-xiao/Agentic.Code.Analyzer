# How does 2FA work?

## Answer

Two-factor authentication in Rocket.Chat uses a decorator pattern (`twoFactorRequired()`) to wrap method handlers, dispatching verification to pluggable check implementations (TOTP, Email, Password fallback) via the `ICodeCheck` interface. The system supports "remember me" authorization and HTTP header-based code passing.

### 1. twoFactorRequired() Decorator

**`apps/meteor/app/2fa/server/twoFactorRequired.ts`, line 17:**
```ts
export const twoFactorRequired = <TFunction extends (this: any, ...args: any) => Promise<any>>(
    fn: ..., options?: ITwoFactorOptions,
) =>
    async function (this, ...args) {
        if (!this.userId) {
            throw new Meteor.Error('error-invalid-user', ...);
        }
        const twoFactor = args.pop();
        if (twoFactor) {
            if (twoFactor.twoFactorCode && twoFactor.twoFactorMethod) {
                await checkCodeForUser({
                    user: this.userId,
                    connection: this.connection || undefined,
                    code: twoFactor.twoFactorCode,
                    method: twoFactor.twoFactorMethod,
                    options,
                });
                this.twoFactorChecked = true;
            } else {
                args.push(twoFactor);  // not 2FA data, put it back
            }
        }
        if (!this.twoFactorChecked) {
            await checkCodeForUser({ user: this.userId, connection: this.connection, options });
        }
        return fn.apply(this, args);
    };
```

This higher-order function wraps Meteor method handlers. It:
1. Extracts 2FA credentials from the last argument (convention: `{ twoFactorCode, twoFactorMethod }`)
2. If 2FA data is present, calls `checkCodeForUser()` to validate
3. If not yet checked, calls `checkCodeForUser()` without a code (which will throw `totp-required` to request one)
4. Only after successful verification does it call the original function

The `AuthenticatedContext` type (line 6) defines the expected `this` context: `{ userId, token, connection, twoFactorChecked? }`.

### 2. checkCodeForUser() (Core Verification)

**`apps/meteor/app/2fa/server/code/index.ts`, line 167:**
```ts
export async function checkCodeForUser({ user, code, method, options = {}, connection }: ICheckCodeForUser): Promise<boolean> {
```

The verification flow:

1. **Test mode bypass** (line 168): In test mode with no `requireSecondFactor`, returns `true`.
2. **Global enable check** (line 172): If `Accounts_TwoFactorAuthentication_Enabled` is false, returns `true`.
3. **User lookup** (lines 176-185): If `user` is a string (userId), fetches user document.
4. **HTTP header check** (lines 190-193): If no `code`/`method` in args, checks `x-2fa-code` and `x-2fa-method` HTTP headers.
5. **Token authorization check** (line 195): `isAuthorizedForToken()` checks if the current login token has `bypassTwoFactor` or a valid `twoFactorAuthorizedUntil` (remember me).
6. **Method selection** (line 200): `getSecondFactorMethod(user, method, options)` picks the appropriate `ICodeCheck` implementation.
7. **No code provided** (lines 209-215): Throws `'totp-required'` with `method` name and `availableMethods` list, signaling the client to prompt for a code.
8. **Code verification** (line 217): `selectedMethod.verify(user, code, requireSecondFactor)` validates the code.
9. **Failed verification** (lines 218-232): Checks `maxFaildedAttemtpsReached()`, throws `'totp-max-attempts'` or `'totp-invalid'`.
10. **Remember authorization** (lines 235-237): If `disableRememberMe !== true`, calls `rememberAuthorization()` to store `twoFactorAuthorizedUntil` and `twoFactorAuthorizedHash` on the login token.

### 3. ICodeCheck Interface

**`apps/meteor/app/2fa/server/code/ICodeCheck.ts`:**
```ts
export interface ICodeCheck {
    name: string;
    isEnabled(user: IUser, force?: boolean): boolean;
    verify(user: IUser, code: string, force?: boolean): Promise<boolean>;
    processInvalidCode(user: IUser): Promise<IProcessInvalidCodeResult>;
    maxFaildedAttemtpsReached(user: IUser): Promise<boolean>;
}
```

### 4. TOTPCheck (Authenticator App)

**`apps/meteor/app/2fa/server/code/TOTPCheck.ts`, line 7:**
```ts
export class TOTPCheck implements ICodeCheck {
    public readonly name = 'totp';

    public isEnabled(user: IUser): boolean {
        if (!settings.get('Accounts_TwoFactorAuthentication_By_TOTP_Enabled')) { return false; }
        return user.services?.totp?.enabled === true;
    }

    public async verify(user: IUser, code: string): Promise<boolean> {
        if (!this.isEnabled(user)) { return false; }
        if (!user.services?.totp?.secret) { return false; }
        return TOTP.verify({
            secret: user.services?.totp?.secret,
            token: code,
            userId: user._id,
            backupTokens: user.services?.totp?.hashedBackup,
        });
    }
```

Uses the `TOTP` class (from `app/2fa/server/lib/totp.ts`) which implements RFC 6238 time-based one-time passwords. Supports backup recovery codes via `hashedBackup`.

### 5. EmailCheck (Email Codes)

**`apps/meteor/app/2fa/server/code/EmailCheck.ts`:**

Implements `ICodeCheck` with `name = 'email'`. When `processInvalidCode()` is called, generates a random code, stores it in `user.services.emailCode`, and sends an email to the user. `verify()` checks the submitted code against the stored one.

Enabled when `Accounts_TwoFactorAuthentication_By_Email_Enabled` is true and the user has a verified email.

### 6. PasswordCheckFallback

**`apps/meteor/app/2fa/server/code/PasswordCheckFallback.ts`:**

A fallback that accepts the user's password as a second factor. Enabled when `Accounts_TwoFactorAuthentication_Enforce_Password_Fallback` is true or when `requireSecondFactor` is set without other methods available.

### 7. Remember Me

**`isAuthorizedForToken()` (line 79 in index.ts):**
Checks the current login token for:
- `bypassTwoFactor: true` -- permanent bypass
- `twoFactorAuthorizedUntil` -- expiry timestamp
- `twoFactorAuthorizedHash` -- MD5 of user-agent + client address (fingerprint)

**`rememberAuthorization()` (line 121):**
Stores authorization on the login token using `Users.setTwoFactorAuthorizationHashAndUntilForUserIdAndToken()`. The duration is configured via `Accounts_TwoFactorAuthentication_RememberFor`.

**`getRememberDate()` (line 66):**
Computes expiry date from `Accounts_TwoFactorAuthentication_RememberFor` setting (in seconds).

### 8. Method Registration

Check methods are registered in a `Map<string, ICodeCheck>` (line 25):
```ts
const checkMethods = new Map<string, ICodeCheck>();
checkMethods.set(totpCheck.name, totpCheck);   // 'totp'
checkMethods.set(emailCheck.name, emailCheck);  // 'email'
```

`getMethodByNameOrFirstActiveForUser()` (line 30) finds either the requested method or the first enabled method for the user.

### Key Files
| File | Role |
|------|------|
| `apps/meteor/app/2fa/server/twoFactorRequired.ts` | Decorator wrapping method handlers with 2FA enforcement |
| `apps/meteor/app/2fa/server/code/index.ts` | `checkCodeForUser()` core verification, method selection, remember-me |
| `apps/meteor/app/2fa/server/code/ICodeCheck.ts` | `ICodeCheck` interface |
| `apps/meteor/app/2fa/server/code/TOTPCheck.ts` | TOTP authenticator app verification |
| `apps/meteor/app/2fa/server/code/EmailCheck.ts` | Email-based code verification |
| `apps/meteor/app/2fa/server/code/PasswordCheckFallback.ts` | Password-as-2FA fallback |
| `apps/meteor/app/2fa/server/lib/totp.ts` | TOTP algorithm implementation |
| `apps/meteor/app/2fa/server/loginHandler.ts` | 2FA during login flow |

### Key Symbols
- `twoFactorRequired(fn, options?)` -- decorator enforcing 2FA on method handlers
- `checkCodeForUser({ user, code, method, options, connection })` -- core verification function
- `ICodeCheck` -- interface: `isEnabled()`, `verify()`, `processInvalidCode()`, `maxFaildedAttemtpsReached()`
- `TOTPCheck` -- TOTP implementation, name = `'totp'`
- `EmailCheck` -- email code implementation, name = `'email'`
- `PasswordCheckFallback` -- password fallback implementation
- `ITwoFactorOptions` -- `{ disablePasswordFallback?, disableRememberMe?, requireSecondFactor? }`
- `isAuthorizedForToken()` -- checks remember-me authorization
- `rememberAuthorization()` -- stores 2FA authorization on login token
- `TOTP.verify()` -- RFC 6238 token verification with backup code support
