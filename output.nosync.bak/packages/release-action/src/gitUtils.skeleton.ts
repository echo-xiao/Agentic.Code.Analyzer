## File: packages/release-action/src/gitUtils.ts

```typescript
import { exec, getExecOutput } from '@actions/exec';

export async function setupGitUser() {
    /* Implementation Hidden */
}

export async function createBranch(newBranch: string) {
    /* Implementation Hidden */
}

export async function checkoutBranch(branchName: string) {
    /* Implementation Hidden */
}

export async function mergeBranch(branchName: string) {
    /* Implementation Hidden */
}

export async function commitChanges(commitMessage: string) {
    /* Implementation Hidden */
}

export async function createTag(version: string) {
    /* Implementation Hidden */
}

export async function getCurrentBranch() {
    /* Implementation Hidden */
}

export async function pushChanges() {
    /* Implementation Hidden */
}

export async function pushNewBranch(newBranch: string, force = false) {
    /* Implementation Hidden */
}

```