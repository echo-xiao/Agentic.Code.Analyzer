import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Make .env the single source of truth for secrets, OVERRIDING any stale value exported in the
// shell profile (e.g. an old GEMINI_API_KEY in ~/.zshrc that silently shadows the file and gets
// rejected as API_KEY_INVALID). Dependency-free; import this for its side effect before reading
// process.env in any eval generator.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const envPath = path.join(root, '.env');
if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
        if (/^\s*#/.test(line)) continue;
        const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*?)\s*$/);
        if (m && m[2] !== '') process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
}
