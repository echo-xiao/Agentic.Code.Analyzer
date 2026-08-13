## File: packages/web-ui-registration/src/index.ts

```typescript
import CMSPage from './CMSPage';
import RegistrationPageRouter from './RegistrationPageRouter';
import ResetPasswordPage from './ResetPassword/ResetPasswordPage';

export type { LoginRoutes } from './hooks/useLoginRouter';
export { CMSPage, ResetPasswordPage };

export default RegistrationPageRouter;

```