## File: apps/meteor/ee/server/apps/communication/rest.ts

```typescript
import type { AppManager } from '@rocket.chat/apps/dist/server/AppManager';
import type { IMarketplaceInfo } from '@rocket.chat/apps/dist/server/marketplace/IMarketplaceInfo';
import { AppStatus, AppStatusUtils } from '@rocket.chat/apps-engine/definition/AppStatus';
import type { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import type { AppStatusReport } from '@rocket.chat/core-services';
import type { IMessage, IUser } from '@rocket.chat/core-typings';
import { License } from '@rocket.chat/license';
import { Logger } from '@rocket.chat/logger';
import { Settings, Users } from '@rocket.chat/models';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import * as z from 'zod';

import { registerActionButtonsHandler } from './endpoints/actionButtonsHandler';
import { registerAppGeneralLogsHandler } from './endpoints/appGeneralLogsHandler';
import { registerAppLogsDistinctInstanceHandler } from './endpoints/appLogsDistinctInstanceHandler';
import { registerAppLogsExportHandler } from './endpoints/appLogsExportHandler';
import { registerAppLogsHandler } from './endpoints/appLogsHandler';
import { registerAppsCountHandler } from './endpoints/appsCountHandler';
import { getWorkspaceAccessToken, getWorkspaceAccessTokenWithScope } from '../../../../app/cloud/server';
import { metrics } from '../../../../app/metrics/server';
import { settings } from '../../../../app/settings/server';
import { Info } from '../../../../app/utils/rocketchat.info';
import { API } from '../../../../server/api';
import type { APIClass } from '../../../../server/api/ApiClass';
import { getUploadFormData } from '../../../../server/api/lib/getUploadFormData';
import { loggerMiddleware } from '../../../../server/api/v1/middlewares/logger';
import { metricsMiddleware } from '../../../../server/api/v1/middlewares/metrics';
import { tracerSpanMiddleware } from '../../../../server/api/v1/middlewares/tracer';
import { i18n } from '../../../../server/lib/i18n';
import { sendMessagesToAdmins } from '../../../../server/lib/sendMessagesToAdmins';
import { AppsEngineNoNodesFoundError } from '../../../../server/services/apps-engine/service';
import { canEnableApp } from '../../../app/license/server/canEnableApp';
import { fetchAppsStatusFromCluster } from '../../../lib/misc/fetchAppsStatusFromCluster';
import { formatAppInstanceForRest } from '../../../lib/misc/formatAppInstanceForRest';
import { notifyMarketplace } from '../marketplace/appInstall';
import { fetchMarketplaceApps } from '../marketplace/fetchMarketplaceApps';
import { fetchMarketplaceCategories } from '../marketplace/fetchMarketplaceCategories';
import { MarketplaceAppsError, MarketplaceConnectionError, MarketplaceUnsupportedVersionError } from '../marketplace/marketplaceErrors';
import type { AppServerOrchestrator } from '../orchestrator';
import { Apps } from '../orchestrator';

const rocketChatVersion = Info.version;
const appsEngineVersionForMarketplace = Info.marketplaceApiVersion.replace(/-.*/g, '');
const getDefaultHeaders = (): Record<string, any> => ({
	'X-Apps-Engine-Version': appsEngineVersionForMarketplace,
});

const purchaseTypes = new Set(['buy', 'subscription']);

export class AppsRestApi {
	public api: APIClass<'/apps'>;

	public _orch: AppServerOrchestrator;

	public _manager: AppManager;

	constructor(orch: AppServerOrchestrator, manager: AppManager) {
        /* Implementation Hidden */
    }

	async loadAPI() {
        /* Implementation Hidden */
    }

	addManagementRoutes() {
        /* Implementation Hidden */
    }
}

```