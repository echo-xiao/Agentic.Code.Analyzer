## File: packages/release-action/src/setupOctokit.ts

```typescript
import * as core from '@actions/core';
import { GitHub, getOctokitOptions } from '@actions/github/lib/utils';
import { throttling } from '@octokit/plugin-throttling';

export const setupOctokit = (githubToken: string) => {
    /* Implementation Hidden */
};

```