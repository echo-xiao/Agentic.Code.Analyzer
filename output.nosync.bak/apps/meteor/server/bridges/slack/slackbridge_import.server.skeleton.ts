## File: apps/meteor/server/bridges/slack/slackbridge_import.server.ts

```typescript
// This is a JS File that was renamed to TS so it won't lose its git history when converted to TS
// TODO: Remove the following lint/ts instructions when the file gets properly converted
/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Rooms, Users } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import { Match } from 'meteor/check';

import { SlackBridge } from './slackbridge';
import { msgStream } from '../../../app/lib/server';
import { slashCommands } from '../../../app/utils/server/slashCommand';
import { i18n } from '../../lib/i18n';

async function SlackBridgeImport({ command, params, message, userId }) {
    /* Implementation Hidden */
}

slashCommands.add({ command: 'slackbridge-import', callback: SlackBridgeImport });

```