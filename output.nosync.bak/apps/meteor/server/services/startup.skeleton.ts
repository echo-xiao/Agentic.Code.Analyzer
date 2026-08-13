## File: apps/meteor/server/services/startup.ts

```typescript
import { api } from '@rocket.chat/core-services';
import { Logger } from '@rocket.chat/logger';
import { OmnichannelTranscript, QueueWorker } from '@rocket.chat/omnichannel-services';
import { MongoInternals } from 'meteor/mongo';

import { AuthorizationLivechat } from '../../app/livechat/server/roomAccessValidator.internalService';
import { isRunningMs } from '../lib/isRunningMs';
import { AnalyticsService } from './analytics/service';
import { AppsEngineService } from './apps-engine/service';
import { BannerService } from './banner/service';
import { CalendarService } from './calendar/service';
import { CallHistoryService } from './call-history/service';
import { DeviceManagementService } from './device-management/service';
import { MediaService } from './image/service';
import { ImportService } from './import/service';
import { LDAPService } from './ldap/service';
import { MediaCallService } from './media-call/service';
import { MessageService } from './messages/service';
import { MeteorService } from './meteor/service';
import { NPSService } from './nps/service';
import { OmnichannelService } from './omnichannel/service';
import { OmnichannelAnalyticsService } from './omnichannel-analytics/service';
import { OmnichannelIntegrationService } from './omnichannel-integrations/service';
import { PushService } from './push/service';
import { RoomService } from './room/service';
import { SAUMonitorService } from './sauMonitor/service';
import { SettingsService } from './settings/service';
import { TeamService } from './team/service';
import { UiKitCoreAppService } from './uikit-core-app/service';
import { UploadService } from './upload/service';
import { UserService } from './user/service';
import { VideoConfService } from './video-conference/service';
import { i18n } from '../lib/i18n';

export const registerServices = async (): Promise<void> => {
    /* Implementation Hidden */
};

```