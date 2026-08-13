## File: apps/meteor/server/ufs/ufs-config.ts

```typescript
type ConfigOptions = {
	https?: boolean;
	simulateUploadSpeed?: number;
	storesPath?: string;
	tmpDir?: string;
	tmpDirPermissions?: string;
};

type RequiredConfigOptions = Required<ConfigOptions>;

export class Config {
	public https: RequiredConfigOptions['https'];

	public simulateUploadSpeed: RequiredConfigOptions['simulateUploadSpeed'];

	public storesPath: RequiredConfigOptions['storesPath'];

	public tmpDir: RequiredConfigOptions['tmpDir'];

	public tmpDirPermissions: RequiredConfigOptions['tmpDirPermissions'];

	constructor(options: ConfigOptions = {}) {
        /* Implementation Hidden */
    }
}

```