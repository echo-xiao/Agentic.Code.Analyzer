# How do slash commands work?

## Answer

Slash commands in Rocket.Chat flow from client-side message parsing, through a DDP method call, to server-side command execution. Commands are registered via a global `slashCommands` object with `add()` and executed via `run()`.

### 1. Command Registration: `slashCommands.add()`

**`apps/meteor/app/utils/server/slashCommand.ts`, line 25:**
```ts
export const slashCommands = {
    commands: {} as Record<string, SlashCommand>,
    add<T extends string>({
        command, callback, options = {}, result, providesPreview = false,
        previewer, previewCallback, appId, description = '',
    }: ISlashCommandAddParams<T>): void {
        if (this.commands[command]) { return; }
        this.commands[command] = {
            command, callback,
            params: options.params,
            description: options.description || description,
            permission: options.permission,
            clientOnly: options.clientOnly || false,
            result, providesPreview: Boolean(providesPreview),
            previewer, previewCallback, appId,
        } as SlashCommand;
    },
```

Each command registration includes:
- `command` -- the slash command name (without `/`)
- `callback` -- server-side handler function `(params) => void`
- `options.params` -- parameter description string
- `options.description` -- i18n description key
- `options.permission` -- required permissions array
- `options.clientOnly` -- if true, runs only on client
- `providesPreview` / `previewer` / `previewCallback` -- for preview-enabled commands
- `appId` -- if registered by an App

### 2. Command Execution: `slashCommands.run()`

**Same file, line 55:**
```ts
async run({ command, message, params, triggerId, userId }): Promise<unknown> {
    const cmd = this.commands[command];
    if (typeof cmd?.callback !== 'function') { return; }
    if (!message?.rid) {
        throw new MeteorError('invalid-command-usage', '...');
    }
    return cmd.callback({ command, params, message, triggerId, userId });
},
```

Simply looks up the command by name and invokes its callback with the parsed parameters.

### 3. Meteor Method: `slashCommand`

**Same file, line 140:**
```ts
Meteor.methods<ServerMethods>({
    async slashCommand(command) {
        const userId = Meteor.userId();
        if (!userId) { throw ... }
        if (!command?.cmd || !slashCommands.commands[command.cmd]) {
            throw new Meteor.Error('error-invalid-command', ...);
        }
        return slashCommands.run({
            command: command.cmd,
            params: command.params,
            message: command.msg,
            triggerId: command.triggerId,
            userId,
        });
    },
});
```

The DDP method validates the user, checks command existence, then delegates to `slashCommands.run()`.

### 4. Client-Side: Message Processing

**`apps/meteor/client/lib/chats/flows/processSlashCommand.ts`, line 12:**
```ts
const parse = (msg: string): { command: string; params: string } | { command: SlashCommand; params: string } | undefined => {
    const match = msg.match(/^\/([^\s]+)(.*)/);
    if (!match) { return undefined; }
    const [, cmd, params] = match;
    const command = slashCommands.commands[cmd];
    if (!command) { return { command: cmd, params }; }
    return { command, params };
};
```

The parse function uses regex `/^\/([^\s]+)(.*)/` to extract the command name and parameters from a message starting with `/`.

**`processSlashCommand()` function (line 46):**
```ts
export const processSlashCommand = async (chat: ChatAPI, message: IMessage): Promise<boolean> => {
```

Flow:
1. Parses the message via `parse(message.msg)` (line 47)
2. If command is unrecognized (string, not SlashCommand object):
   - If `Message_AllowUnrecognizedSlashCommand` is false, shows error (line 56-58)
   - Otherwise returns `false` to send as regular message
3. Checks permission via `hasAtLeastOnePermission(permission, message.rid)` (line 66)
4. If `clientOnly`, executes `handleOnClient()` directly (lines 71-73)
5. Otherwise, sends telemetry and calls `sdk.call('slashCommand', { cmd, params, msg, triggerId })` (line 95)
6. Handles result via `handleResult()` callback

### 5. Preview System

**`slashCommands.getPreviews()` (line 79):**
For commands with `providesPreview: true`, the `previewer()` function is called to generate preview items (limited to 10 results). The `executePreview()` method (line 107) handles when a user selects a preview item.

### 6. Example Registration

A typical slash command registration (e.g., `/invite`):
```ts
// apps/meteor/app/slashcommands-invite/server/server.ts
slashCommands.add({
    command: 'invite',
    callback: async ({ params, message, userId }) => { ... },
    options: {
        description: 'Invite_user_to_join_channel',
        params: '@username',
        permission: 'add-user-to-joined-room',
    },
});
```

### Key Files
| File | Role |
|------|------|
| `apps/meteor/app/utils/server/slashCommand.ts` | `slashCommands` object with `add()`, `run()`, `getPreviews()`, `executePreview()`, and Meteor method |
| `apps/meteor/client/lib/chats/flows/processSlashCommand.ts` | Client-side parsing and dispatch |
| `apps/meteor/client/lib/chats/flows/sendMessage.ts` | Calls `processSlashCommand()` before sending messages |
| `apps/meteor/app/slashcommands-invite/server/server.ts` | Example: `/invite` command |
| `apps/meteor/app/slashcommands-kick/server/server.ts` | Example: `/kick` command |
| `apps/meteor/app/slashcommands-join/server/server.ts` | Example: `/join` command |

### Key Symbols
- `slashCommands` -- global object holding command registry and execution methods
- `slashCommands.add({ command, callback, options })` -- registers a new slash command
- `slashCommands.run({ command, params, message, userId })` -- executes a registered command
- `slashCommands.commands` -- `Record<string, SlashCommand>` map of all registered commands
- `processSlashCommand(chat, message)` -- client-side entry point for slash command detection
- `parse(msg)` -- regex-based `/command params` parser
- `Meteor.methods.slashCommand` -- DDP method bridging client to server execution
- `SlashCommand` -- type with callback, params, permission, clientOnly, previewer, etc.
