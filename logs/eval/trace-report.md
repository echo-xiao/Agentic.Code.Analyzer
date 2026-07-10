# Trace report (M1)

## new-17-slash-commands (pattern)
**Q:** How do slash commands work in Rocket.Chat — from registration to execution?

**Top retrieved:** packages/apps-engine/README.md (0.8211), packages/apps-engine/src/definition/slashcommands/SlashCommandContext.ts (0.8031), packages/apps-engine/README.md (0.7979), packages/apps-engine/src/definition/accessors/ISlashCommandsExtend.ts (0.797), packages/apps-engine/src/definition/accessors/ISlashCommandsModify.ts (0.7964)

**Citations:** packages/apps-engine/README.md, packages/apps-engine/src/definition/slashcommands/SlashCommandContext.ts, packages/apps-engine/src/definition/accessors/ISlashCommandsExtend.ts, packages/apps-engine/src/definition/accessors/ISlashCommandsModify.ts, apps/meteor/app/utils/server/slashCommand.ts, packages/apps-engine/src/definition/accessors/IConfigurationModify.ts, packages/apps-engine/src/definition/slashcommands/ISlashCommand.ts, packages/apps-engine/typedoc.json, packages/apps-engine/src/definition/roles/index.ts, packages/apps-engine/src/definition/users/UserType.ts, packages/core-services/tsconfig.json, packages/models/tsconfig.json, packages/apps-engine/src/definition/app-schema.json, packages/core-services/src/types/IOmnichannelIntegrationService.ts, packages/core-services/src/types/IMeteor.ts, packages/apps-engine/src/definition/slashcommands/index.ts, packages/apps-engine/src/definition/users/IPostUserLoggedIn.ts, packages/apps-engine/src/definition/metadata/index.ts

**Answer:**

Slash commands in Rocket.Chat are registered and executed through the Apps-Engine, allowing apps to interact with the host system [1].

**Registration:**
1.  **App Registration**: Rocket.Chat Apps register new slash commands using the `ISlashCommandsExtend` accessor, which is provided during the App's initialization [4]. When registering, an App provides an `ISlashCommand` object [4, 9].
2.  **Slash Command Definition**: An `ISlashCommand` defines the command itself (`command`), examples for its parameters (`i18nParamsExample`), a description (`i18nDescription`), and optionally a required permission (`permission`) [9]. Apps that don't provide a valid uuid4 ID will be assigned one, but providing one is recommended [1, 15].
3.  **Execution Logic**: The `ISlashCommand` also defines the `executor` function, which is called when a user enters the command [9].

**Modification:**
*   Apps can modify existing slash commands using the `ISlashCommandsModify` accessor, which is available via the `IConfigurationModify` interface during an App's `onEnable` event [5, 8].
*   An App can modify its own commands or system commands but cannot modify another App's command [5].
*   Apps can also disable or enable existing slash commands [5].

**Execution:**
1.  **Context**: When a user executes a slash command, the `executor` function receives a `SlashCommandContext` object [9]. This context provides information such as the `sender` (the user who sent the command), the `room` where the command was sent, and the `arguments` passed into the command [2]. It can also include `threadId` and `triggerId` [2].
2.  **Core System Handling**: The Rocket.Chat server has a `slashCommands` utility that manages and runs these commands [7]. When a user sends a command, a Meteor method `slashCommand` is called [7]. This method validates the user and command, then delegates to `slashCommands.run` to execute the command's callback function [7].
3.  **Preview Functionality**: If an `ISlashCommand` specifies `providesPreview: true`, it can also define a `previewer` function [9]. This function is called when a user starts typing the command to provide a list of preview items [9]. If a user selects a preview item, the `executePreviewItem` function is called instead of the main `executor` [9]. The core system handles fetching and executing these previews through `slashCommands.getPreviews` and `slashCommands.executePreview`, respectively [7].

Key Files:
*   packages/apps-engine/README.md
*   packages/apps-engine/src/definition/slashcommands/SlashCommandContext.ts
*   packages/apps-engine/src/definition/accessors/ISlashCommandsExtend.ts
*   packages/apps-engine/src/definition/accessors/ISlashCommandsModify.ts
*   packages/apps-engine/src/definition/accessors/IConfigurationModify.ts
*   packages/apps-engine/src/definition/slashcommands/ISlashCommand.ts
*   packages/apps-engine/src/definition/app-schema.json
*   apps/meteor/app/utils/server/slashCommand.ts

---

## new-16-impact-streamer (impact)
**Q:** What is the blast radius of changing the Streamer module in Rocket.Chat?

**Top retrieved:** packages/apps-engine/README.md (0.7893), packages/apps-engine/README.md (0.7811), packages/apps-engine/src/definition/roles/index.ts (0.7739), packages/apps-engine/src/definition/accessors/IConfigurationModify.ts (0.7721), packages/apps-engine/src/definition/accessors/IUserUpdater.ts (0.7718)

**Citations:** packages/apps-engine/README.md, packages/apps-engine/src/definition/roles/index.ts, packages/apps-engine/src/definition/accessors/IConfigurationModify.ts, packages/apps-engine/src/definition/accessors/IUserUpdater.ts, packages/apps-engine/src/definition/accessors/IExperimentalRead.ts, packages/apps-engine/src/definition/app-schema.json, packages/core-services/src/types/IEnterpriseSettings.ts, packages/apps-engine/typedoc.json, packages/core-services/src/types/IMeteor.ts, packages/apps-engine/src/definition/accessors/IServerSettingsModify.ts, packages/apps-engine/src/definition/messages/MessageType.ts, packages/core-services/src/types/IAuthorizationLivechat.ts, packages/core-services/src/types/IOmnichannelService.ts, packages/apps-engine/src/definition/users/IPostUserStatusChanged.ts, packages/apps-engine/src/definition/users/UserType.ts, packages/apps-engine/src/definition/uikit/blocks/Objects.ts, packages/models/tsconfig.json, packages/core-services/tsconfig.json

**Answer:**

The provided context does not contain information about the "Streamer module" or the blast radius of changing it.

---

## new-10-apps-engine (architecture)
**Q:** How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

**Top retrieved:** packages/apps-engine/README.md (0.8525), packages/apps-engine/src/definition/users/IPostUserLoggedIn.ts (0.8276), packages/apps-engine/README.md (0.823), packages/apps-engine/README.md (0.8207), packages/apps-engine/src/definition/users/IPostUserStatusChanged.ts (0.8196)

**Citations:** packages/apps-engine/README.md, packages/apps-engine/src/definition/users/IPostUserLoggedIn.ts, packages/apps-engine/src/definition/users/IPostUserStatusChanged.ts, packages/apps-engine/src/definition/users/IPostUserLoggedOut.ts, packages/apps-engine/src/definition/users/IPostUserUpdated.ts, packages/apps-engine/src/definition/users/IPostUserCreated.ts, packages/apps-engine/src/definition/uploads/IPreFileUpload.ts, packages/core-services/src/types/IAppsEngineService.ts, packages/apps-engine/src/definition/users/IPostUserDeleted.ts, packages/apps-engine/src/definition/messages/IPostMessageUpdated.ts, packages/apps-engine/src/definition/messages/IPostMessageSent.ts, packages/apps-engine/src/definition/messages/IPostMessageSentToBot.ts, packages/apps-engine/src/definition/messages/IPostMessageReacted.ts, packages/apps-engine/src/definition/accessors/IConfigurationModify.ts, packages/apps-engine/src/definition/App.ts, packages/apps-engine/src/definition/metadata/AppInterface.ts, packages/apps-engine/src/definition/example-app.json, packages/apps-engine/src/definition/messages/IPostSystemMessageSent.ts

**Answer:**

A Rocket.Chat App hooks into events by implementing specific handler interfaces provided by the Apps-Engine [3]. The Apps-Engine is Rocket.Chat's plugin framework, enabling Apps to interact with the host system through various APIs [1].

For events like "after a message is saved," an App would typically implement "post" handlers. Post handlers are executed after an event is finalized and are generally used for listening without modifying the event's data [3].

Specifically, an App can hook into message events such as:
*   **After a message is sent:** By implementing the `IPostMessageSent` interface and defining the `executePostMessageSent` method [1, 13, 18].
*   **After a message is updated:** By implementing the `IPostMessageUpdated` interface and defining the `executePostMessageUpdated` method [1, 12, 18].
*   **After a system message is sent:** By implementing the `IPostSystemMessageSent` interface and defining the `executePostSystemMessageSent` method [18, 20].
*   **After a message is reacted to:** By implementing the `IPostMessageReacted` interface and defining the `executePostMessageReacted` method [15, 18].
*   **After a message is deleted:** By implementing the `IPostMessageDeleted` interface [1, 18].

Other "post" events for users and rooms that an App can listen to include:
*   `IPostUserCreated` (after a user is saved to the database) [8, 18].
*   `IPostUserUpdated` (after a user has been saved to the database) [7, 18].
*   `IPostUserDeleted` (after a user has been removed from the database) [11, 18].
*   `IPostUserLoggedIn` (after a user logs into Rocket.Chat) [2, 18].
*   `IPostUserLoggedOut` (after a user logs out from Rocket.Chat) [6, 18].
*   `IPostUserStatusChanged` (after a user changes their status) [5, 18].
*   `IPostRoomCreate` (after a room is created) [18].
*   `IPostRoomDeleted` (after a room is deleted) [18].
*   `IPostRoomUserJoined` (after a user joins a room) [18].
*   `IPostRoomUserLeave` (after a user leaves a room) [18].

There are also "pre" handlers that happen before an event is finalized, which allow for modification or prevention of the event [3]. For example, `IPreFileUpload` is triggered prior to an upload being saved to the database [9, 18].

Key Files:
*   packages/apps-engine/README.md
*   packages/apps-engine/src/definition/App.ts
*   packages/apps-engine/src/definition/metadata/AppInterface.ts
*   packages/apps-engine/src/definition/messages/IPostMessageReacted.ts
*   packages/apps-engine/src/definition/messages/IPostMessageSent.ts
*   packages/apps-engine/src/definition/messages/IPostMessageSentToBot.ts
*   packages/apps-engine/src/definition/messages/IPostMessageUpdated.ts
*   packages/apps-engine/src/definition/messages/IPostSystemMessageSent.ts
*   packages/apps-engine/src/definition/uploads/IPreFileUpload.ts
*   packages/apps-engine/src/definition/users/IPostUserCreated.ts
*   packages/apps-engine/src/definition/users/IPostUserDeleted.ts
*   packages/apps-engine/src/definition/users/IPostUserLoggedIn.ts
*   packages/apps-engine/src/definition/users/IPostUserLoggedOut.ts
*   packages/apps-engine/src/definition/users/IPostUserStatusChanged.ts
*   packages/apps-engine/src/definition/users/IPostUserUpdated.ts

---

