## File: packages/apps/src/server/compiler/AppPackageParser.ts

```typescript
import { randomUUID } from 'node:crypto';
import * as path from 'node:path';

import type { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata/IAppInfo';
import { version } from '@rocket.chat/apps-engine/package.json';
import AdmZip from 'adm-zip';
import * as semver from 'semver';

import { AppImplements } from '.';
import type { IParseAppPackageResult } from './IParseAppPackageResult';
import { RequiredApiVersionError } from '../errors';

export class AppPackageParser {
	public static uuid4Regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

	private allowedIconExts: Array<string> = ['.png', '.jpg', '.jpeg', '.gif'];

	private readonly appsEngineVersion: string;

	constructor() {
        /* Implementation Hidden */
    }

	public async unpackageApp(appPackage: Buffer): Promise<IParseAppPackageResult> {
        /* Implementation Hidden */
    }

	private getLanguageContent(zip: AdmZip): { [key: string]: object } {
        /* Implementation Hidden */
    }

	private getIconFile(zip: AdmZip, filePath: string): string {
        /* Implementation Hidden */
    }
}

```