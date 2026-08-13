## File: apps/meteor/ee/server/api/lib/canned-responses.js

```typescript
import { CannedResponse } from '@rocket.chat/models';
import { escapeRegExp } from '@rocket.chat/string-helpers';

import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { getDepartmentsWhichUserCanAccess } from '../v1/omnichannel/lib/departments';

export async function findAllCannedResponses({ userId }) {
    /* Implementation Hidden */
}

/**
 * @param {Object} param0
 * @param {String} param0.userId
 * @param {String} [param0.shortcut]
 * @param {String} [param0.text]
 * @param {String} [param0.departmentId]
 * @param {String} [param0.scope]
 * @param {String} [param0.createdBy]
 * @param {String[]} [param0.tags]
 * @param {Object} param0.options
 * @param {Number} param0.options.offset
 * @param {Number} param0.options.count
 * @param {Object} param0.options.sort
 * @param {Object} param0.options.fields
 */
export async function findAllCannedResponsesFilter({ userId, shortcut, text, departmentId, scope, createdBy, tags = [], options = {} }) {
    /* Implementation Hidden */
}

export async function findOneCannedResponse({ userId, _id }) {
    /* Implementation Hidden */
}

```