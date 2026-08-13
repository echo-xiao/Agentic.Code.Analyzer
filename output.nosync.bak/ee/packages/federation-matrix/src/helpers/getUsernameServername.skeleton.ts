## File: ee/packages/federation-matrix/src/helpers/getUsernameServername.ts

```typescript
import { extractDomainFromMatrixUserId } from './extractDomainFromMatrixUserId';

/**
 * Extract the username and the servername from a matrix user id
 * if the serverName is the same as the serverName in the mxid, return only the username (rocket.chat regular username)
 * otherwise, return the full mxid and the servername
 */

export const getUsernameServername = (mxid: string, serverName: string): [mxid: string, serverName: string, isLocal: boolean] => {
    /* Implementation Hidden */
};

```