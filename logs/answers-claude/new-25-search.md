# How does message search work?

## Answer

Message search in Rocket.Chat uses a pluggable provider architecture. `SearchProviderService` coordinates provider lifecycle, the abstract `SearchProvider` defines the interface, and `DefaultProvider` implements MongoDB-based text search. External providers (e.g., Elasticsearch) can be plugged in.

### 1. SearchProviderService (Coordinator)

**`apps/meteor/app/search/server/service/SearchProviderService.ts`, line 6:**
```ts
export class SearchProviderService {
    public providers: Record<string, SearchProvider> = {};
    public activeProvider?: SearchProvider;
```

**`register(provider)` (line 54):**
```ts
register(provider: SearchProvider) {
    this.providers[provider.key] = provider;
}
```
Registers a search provider by its key.

**`use(id)` (line 15):**
```ts
async use(id: SearchProvider['key']) {
    if (!this.providers[id]) {
        throw new Error(`provider ${id} cannot be found`);
    }
    let reason: 'startup' | 'update' | 'switch';
    if (!this.activeProvider) { reason = 'startup'; }
    else if (this.activeProvider.key === this.providers[id].key) { reason = 'update'; }
    else { reason = 'switch'; }

    if (this.activeProvider) {
        await new Promise<void>((resolve) => provider.stop(resolve));
    }
    this.activeProvider = undefined;
    await this.providers[id].run(reason);
    this.activeProvider = this.providers[id];
}
```

Switches providers: stops the current one (if any), then starts the new one with the appropriate reason ('startup', 'update', or 'switch').

**`start()` (line 61):**
```ts
async start() {
    // Add settings for administration
    await settingsRegistry.addGroup('Search', async function () {
        await this.add('Search.Provider', 'defaultProvider', {
            type: 'select',
            values: Object.values(providers).map((provider) => ({
                key: provider.key,
                i18nLabel: provider.i18nLabel,
            })),
            public: true,
            i18nLabel: 'Search_Provider',
        });
        // Register per-provider settings
    });
    // Watch for provider changes
    settings.watch('Search.Provider', ...);
}
```

On startup:
1. Creates admin settings with a dropdown of all registered providers
2. Registers per-provider settings in the admin UI
3. Watches `'Search.Provider'` setting for changes to trigger provider switches

### 2. SearchProvider (Abstract Base)

**`apps/meteor/app/search/server/model/SearchProvider.ts`, line 8:**
```ts
export abstract class SearchProvider<TPayload = any> {
    private _key: string;
    protected _settings: Settings;

    constructor(key: string) {
        if (!key.match(/^[A-Za-z0-9]+$/)) {
            throw new Error(`cannot instantiate provider: ${key} does not match key-pattern`);
        }
        this._key = key;
        this._settings = new Settings(key);
    }
```

Key interface:

- **`key`** -- unique provider identifier (alphanumeric only)
- **`i18nLabel`** -- translation key for display name
- **`i18nDescription`** -- translation key for description
- **`settings`** -- provider-specific settings via `Settings` helper
- **`resultTemplate`** -- client-side template name for results (default: `'DefaultSearchResultTemplate'`)
- **`suggestionItemTemplate`** -- template for suggestions (default: `'DefaultSuggestionItemTemplate'`)

Abstract methods:
```ts
public abstract search(
    userId: string,
    text: string,
    context: { uid?: IUser['_id']; rid: IRoom['_id'] },
    payload?: TPayload,
    callback?: (error: Error | null, result: IRawSearchResult) => void,
): Promise<void>;
```

Optional overridable methods:
- `suggest(text, context)` -- returns search suggestions
- `run(reason)` -- called when provider is activated
- `stop(resolve)` -- called when provider is deactivated

### 3. DefaultProvider (MongoDB Search)

**`apps/meteor/app/search/server/provider/DefaultProvider.ts`, line 10:**
```ts
export class DefaultProvider extends SearchProvider<{ searchAll?: boolean; limit?: number }> {
    constructor() {
        super('defaultProvider');
        this._settings.add('GlobalSearchEnabled', 'boolean', false, {
            i18nLabel: 'Global_Search',
            alert: 'This feature is currently in beta and could decrease the application performance',
        });
        this._settings.add('PageSize', 'int', 10, {
            i18nLabel: 'Search_Page_Size',
        });
    }

    get i18nLabel() { return 'Default_provider' as const; }
    get i18nDescription() { return 'You_can_search_using_RegExp_eg' as const; }
```

**`search()` method (line 36):**
```ts
async search(
    userId: string, text: string,
    context: { uid?: IUser['_id']; rid: IRoom['_id'] },
    payload: { searchAll?: boolean; limit?: number } = {},
    callback?: (error: Error | null, result: IRawSearchResult) => void,
): Promise<void> {
    const _rid = payload.searchAll ? undefined : context.rid;
    const _limit = payload.limit || this._settings.get<number>('PageSize');
    const result = await messageSearch(userId, text, _rid, _limit);
    if (callback && result !== false) {
        return callback(null, result);
    }
}
```

Delegates to `messageSearch()` (from `apps/meteor/server/methods/messageSearch.ts`) which:
1. Uses MongoDB text search (`$text: { $search: text }`) or regex-based search
2. Filters by room ID (if not global search)
3. Checks user access to rooms
4. Returns paginated results in the format `{ messages: { docs: [...], numFound: N } }`

Settings:
- `GlobalSearchEnabled` -- allows searching across all rooms (default: false, beta feature)
- `PageSize` -- results per page (default: 10)

### 4. Search Result Format

**`apps/meteor/app/search/server/model/ISearchResult.ts`:**

Results follow the structure:
```ts
interface IRawSearchResult {
    messages?: {
        docs: IMessage[];
        numFound: number;
    };
    users?: { ... };
    rooms?: { ... };
}
```

### 5. Pluggable Architecture

External search engines can be integrated by:
1. Creating a class extending `SearchProvider`
2. Implementing `search()`, `run()`, and `stop()` methods
3. Registering via `searchProviderService.register(new MyProvider())`
4. Adding provider-specific settings via `this._settings.add()`

The admin UI automatically shows all registered providers in the `Search.Provider` dropdown.

### Key Files
| File | Role |
|------|------|
| `apps/meteor/app/search/server/service/SearchProviderService.ts` | Provider lifecycle management, settings registration |
| `apps/meteor/app/search/server/model/SearchProvider.ts` | Abstract `SearchProvider` base class |
| `apps/meteor/app/search/server/provider/DefaultProvider.ts` | MongoDB-based default search provider |
| `apps/meteor/app/search/server/model/ISearchResult.ts` | Search result type definitions |
| `apps/meteor/app/search/server/model/Settings.ts` | Provider-specific settings helper |
| `apps/meteor/app/search/server/service/index.ts` | Service initialization and exports |
| `apps/meteor/app/search/server/logger/logger.ts` | Search-specific logging |
| `apps/meteor/server/methods/messageSearch.ts` | MongoDB text search implementation |

### Key Symbols
- `SearchProviderService` -- coordinates provider lifecycle (register, use, start)
- `SearchProviderService.providers` -- `Record<string, SearchProvider>` registry
- `SearchProviderService.activeProvider` -- currently active provider
- `SearchProviderService.use(id)` -- switches active provider
- `SearchProvider` -- abstract base with `search()`, `key`, `settings`
- `DefaultProvider` -- MongoDB-based search, key = `'defaultProvider'`
- `DefaultProvider.search()` -- delegates to `messageSearch()` for MongoDB text search
- `messageSearch(userId, text, rid, limit)` -- server method for MongoDB search
- `IRawSearchResult` -- result format with messages/users/rooms sections
- `Settings` -- per-provider settings helper class
