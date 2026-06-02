# How does core-services proxify() work?

## Answer

`proxify()` creates a JavaScript `Proxy` that intercepts any method call and converts it into a service broker RPC call. This enables transparent remote procedure calls -- code calling `LDAP.loginRequest(user, pass)` actually invokes `api.call('ldap.loginRequest', [user, pass])` under the hood.

### 1. proxify() Implementation

**`packages/core-services/src/lib/proxify.ts`:**
```ts
import { api } from '../api';

type Promisify<T> = {
    [K in keyof T as T[K] extends (...params: any[]) => unknown ? K : never]:
        T[K] extends (...params: any[]) => Promise<any> ? T[K]
        : T[K] extends (...params: infer P) => infer R ? (...params: P) => Promise<R>
        : never;
};

function handler<T extends object>(namespace: string): ProxyHandler<T> {
    return {
        get: (_target: T, prop: string): any =>
            (...params: any): Promise<any> =>
                api.call(`${namespace}.${prop}`, params),
    };
}

export function proxify<T>(namespace: string): Promisify<T> {
    return new Proxy({}, handler(namespace)) as unknown as Promisify<T>;
}
```

Key mechanics:
1. Creates an empty `{}` target object
2. Wraps it in a `Proxy` with a custom `get` handler
3. The `get` handler intercepts **any property access** on the proxy
4. Returns a function that, when called, invokes `api.call('namespace.propertyName', params)`
5. The `Promisify<T>` type ensures all methods return `Promise` -- even originally sync methods become async

Example: `const LDAP = proxify<ILDAPService>('ldap')` creates a proxy where `LDAP.loginRequest(user, pass)` becomes `api.call('ldap.loginRequest', [user, pass])`.

### 2. LocalBroker: Service Registration

**`packages/core-services/src/LocalBroker.ts`, line 19:**
```ts
export class LocalBroker implements IBroker {
    private methods = new Map<string, (...params: any) => any>();
    private events = new EventEmitter();
    private services = new Map<string, ExtendedServiceClass>();
```

**`call()` method (line 32):**
```ts
async call(method: string, data: any, options?: CallingOptions): Promise<any> {
    return tracerActiveSpan(`action ${method}`, {}, () => {
        return asyncLocalStorage.run({
            id: 'ctx.id', nodeID: 'ctx.nodeID', requestID: 'ctx.requestID', broker: this,
        }, (): any => this.methods.get(method)?.(...data));
    }, injectCurrentContext());
}
```

The `call()` method:
1. Wraps execution in a tracer span for observability
2. Sets up async local storage context
3. Looks up the method by full name (e.g., `'ldap.loginRequest'`) in the `methods` Map
4. Invokes the method with the provided arguments (spread from array)

**Service registration (approx line 80+):**
When `createService()` is called with a `ServiceClass` instance:
1. Gets the service namespace via `instance.getName()` (returns `this.name`)
2. Iterates over all methods via `Object.getOwnPropertyNames(Object.getPrototypeOf(instance))`
3. For each method (excluding `constructor`), registers it as `'${namespace}.${method}'` in the `methods` Map
4. Registers event listeners from the service's event system
5. Calls lifecycle hooks: `created()`, then `started()` (with dependency management)

**`destroyService()` (line 55):**
Unregisters all methods and event listeners, calls `stopped()` lifecycle hook.

### 3. ServiceClass / ServiceClassInternal

**`packages/core-services/src/types/ServiceClass.ts`, line 55:**
```ts
export abstract class ServiceClass implements IServiceClass {
    protected abstract name: string;
    protected events = new EventEmitter();
    protected settings = new EventEmitter();
    protected internal = false;
    protected api?: IApiService;
```

Base class providing:
- `getName()` -- returns `this.name`
- `setApi(api)` -- receives the API reference
- `getEvents()` -- returns registered event listeners
- `onEvent(event, handler)` -- subscribes to service bus events
- `emit(event, ...args)` -- emits events to the service bus
- `onSettingChanged(settingId, cb)` -- reacts to setting changes
- **Lifecycle hooks**: `created()`, `started()`, `stopped()`

`ServiceClassInternal` is a variant where `internal = true`, meaning it runs in-process rather than as an external microservice.

### 4. IServiceClass Interface

**Same file, line 30:**
```ts
export interface IServiceClass {
    getName(): string;
    onNodeConnected?(...): void;
    onNodeDisconnected?(...): Promise<void>;
    getEvents(): { eventName, listeners }[];
    removeAllListeners(): void;
    setApi(api: IApiService): void;
    onEvent<T>(event: T, handler: EventSignatures[T]): void;
    emit<T>(event: T, ...args: Parameters<EventSignatures[T]>): void;
    onSettingChanged(settingId, cb, ignoreActions?): void;
    isInternal(): boolean;
    created(): Promise<void>;
    started(): Promise<void>;
    stopped(): Promise<void>;
}
```

### 5. Usage Pattern

Throughout the codebase, services are exported as proxified objects:

```ts
// packages/core-services/src/index.ts
export const LDAP = proxify<ILDAPService>('ldap');
export const Room = proxify<IRoomService>('room');
export const Message = proxify<IMessageService>('message');
export const Team = proxify<ITeamService>('team');
export const VideoConf = proxify<IVideoConfService>('video-conference');
// ... many more
```

And service implementations extend `ServiceClassInternal`:
```ts
// apps/meteor/server/services/ldap/service.ts
export class LDAPService extends ServiceClassInternal implements ILDAPService {
    protected name = 'ldap';
    async loginRequest(username, password) { ... }
}
```

The proxy ensures any call to `LDAP.loginRequest()` routes through the broker to `LDAPService.loginRequest()`.

### Key Files
| File | Role |
|------|------|
| `packages/core-services/src/lib/proxify.ts` | `proxify()` function creating Proxy-based service stubs |
| `packages/core-services/src/LocalBroker.ts` | `LocalBroker` class managing method registration and dispatch |
| `packages/core-services/src/types/ServiceClass.ts` | `ServiceClass` / `IServiceClass` base class with lifecycle hooks |
| `packages/core-services/src/index.ts` | Exports all proxified service instances |
| `packages/core-services/src/types/IBroker.ts` | `IBroker` interface defining `call()`, `createService()`, etc. |
| `packages/core-services/src/events/Events.ts` | `EventSignatures` type for service event system |
| `packages/core-services/src/lib/asyncLocalStorage.ts` | Async context propagation |

### Key Symbols
- `proxify<T>(namespace)` -- creates a Proxy that converts property access to `api.call()`
- `Promisify<T>` -- type-level utility making all methods return `Promise`
- `handler(namespace)` -- ProxyHandler with `get` trap
- `api.call(method, params)` -- broker RPC dispatch
- `LocalBroker` -- in-process broker with `methods` Map and `services` Map
- `LocalBroker.call(method, data)` -- looks up and invokes registered method
- `ServiceClass` -- abstract base class with `name`, lifecycle hooks, event system
- `ServiceClassInternal` -- variant with `internal = true` for in-process services
- `IServiceClass` -- interface defining service contract
