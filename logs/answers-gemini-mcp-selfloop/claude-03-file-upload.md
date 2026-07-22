# What is the storage workflow for file uploads in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

The storage workflow for file uploads in Rocket.Chat involves several server-side components that handle validation, temporary storage, permanent storage, and optional post-processing.

Here's the detailed workflow:

1.  **Client-side Initiation**: The upload process begins on the client, which initiates the file transfer and potentially streams the file data to a temporary location on the server.
2.  **Server-side Upload Service**: The client (or another server component) invokes the `UploadService.uploadFile` method, located in `apps/meteor/server/services/upload/service.ts`. This method receives the file's buffer and metadata (`details`).
3.  **Storage Handler Retrieval**: Inside `UploadService.uploadFile`, `FileUpload.getStore('Uploads')` (defined in `apps/meteor/app/file-upload/server/lib/FileUpload.ts`) is called. This function determines the appropriate storage backend (e.g., local file system or GridFS) based on the `FileUpload_Storage_Type` setting and retrieves the corresponding `Store` instance from the `UploadFS` (Unified File Store) system.
4.  **File Validation**: Before the file is permanently stored, it undergoes rigorous validation. This involves:
    *   `FileUpload.validateFileUpload` (in `apps/meteor/app/file-upload/server/lib/FileUpload.ts`), which checks for room access, file upload permissions, file size limits, and content type validity.
    *   The `Store`'s `validate` method (part of the abstract `Store` class in `apps/meteor/server/ufs/ufs-store.ts`), which utilizes the `Filter` class (from `apps/meteor/server/ufs/ufs-filter.ts`) to enforce configured `contentTypes`, `extensions`, `minSize`, `maxSize`, and custom `onCheck` rules.
5.  **Metadata Insertion**: The `Store` instance's `create(file)` method (from `apps/meteor/server/ufs/ufs-store.ts`) inserts the file's metadata into the `Uploads` MongoDB collection.
6.  **File Writing to Permanent Storage**: The `Store.insert` method (called by `UploadService.uploadFile`) orchestrates the writing of the file data. It ultimately calls `Store.write(rs, fileId, callback)` (from `apps/meteor/server/ufs/ufs-store.ts`), which takes a readable stream of the file data and writes it to the configured storage backend.
7.  **Storage Backend Implementation**:
    *   **Local Storage**: If the `FileUpload_Storage_Type` setting is configured for 'Local', the `LocalStore` implementation (in `apps/meteor/server/ufs/ufs-local.ts`) is used. This store saves files directly to the server's local file system using Node.js `fs` module operations.
    *   **GridFS Storage**: If `FileUpload_Storage_Type` is 'GridFS', the `GridFSStore` implementation (in `apps/meteor/server/ufs/ufs-gridfs.ts`) is used. This store leverages MongoDB's GridFS to manage file chunks within the database.
8.  **Post-upload Processing (Optional)**: After the file is written, various lifecycle hooks and processing steps can occur:
    *   `Store.onFinishUpload` callbacks are triggered.
    *   For image uploads, `FileUpload` (in `apps/meteor/app/file-upload/server/lib/FileUpload.ts`) provides methods like `avatarsOnValidate`, `resizeImagePreview`, `createImageThumbnail`, and `uploadsOnValidate` that use the `sharp` library for image manipulation (e.g., resizing, thumbnail generation, EXIF data stripping, rotation).
9.  **Finalization (for temporary uploads)**: If the file was initially uploaded to a temporary location, the `ufsComplete` Meteor method (in `apps/meteor/server/ufs/ufs-methods.ts`) is invoked. This method reads the temporary file from `UploadFS.getTempFilePath(fileId)`, performs final validation, and then calls `store.write()` to move the file to its permanent location, finally removing the temporary file.

**Core Files and Their Roles:**

*   `apps/meteor/server/services/upload/service.ts`: Contains `UploadService.uploadFile`, a high-level API for initiating file uploads.
*   `apps/meteor/app/file-upload/server/lib/FileUpload.ts`: Provides the `FileUpload` object, which manages file upload configurations, validation, and retrieval of storage handlers via `getStore`. It also includes image processing utilities.
*   `apps/meteor/server/ufs/ufs-store.ts`: Defines the abstract `Store` class, which outlines the core methods and lifecycle hooks for file storage (e.g., `create`, `write`, `validate`).
*   `apps/meteor/server/ufs/ufs-filter.ts`: Contains the `Filter` class, responsible for validating file properties like content type, extension, and size.
*   `apps/meteor/server/ufs/ufs-local.ts`: Implements `LocalStore`, a concrete `Store` for saving files to the local file system.
*   `apps/meteor/server/ufs/ufs-gridfs.ts`: Implements `GridFSStore`, a concrete `Store` for saving files to MongoDB's GridFS.
*   `apps/meteor/server/ufs/ufs-methods.ts`: Contains the `ufsComplete` Meteor method, which finalizes uploads that were initially streamed to a temporary location.
*   `packages/models/src/models/Uploads.ts`: Defines the MongoDB collection for storing file metadata.

## Tool Calls (8 calls, 71,691 tokens)

**Step 1:** `plan({"intent":"architecture","question":"What is the storage workflow for file uploads in Rocket.Chat?"})` → 3994 tokens
**Step 2:** `search({"query":"UploadFS","layer":"server"})` → 82 tokens
**Step 3:** `graph({"move":"expand","query":"UploadFS","file":"index.ts","depth":2})` → 248 tokens
**Step 4:** `details({"filename":"service.ts","symbolName":"uploadFileFromStream"})` → 58 tokens
**Step 5:** `details({"symbolName":"UploadService.uploadFile","filename":"service.ts"})` → 91 tokens
**Step 6:** `search({"query":"FileUpload","layer":"server"})` → 123 tokens
**Step 7:** `details({"symbolName":"FileUpload.getStore","filename":"FileUpload.ts"})` → 54 tokens
**Step 8:** `details({"filename":"FileUpload.ts","symbolName":"FileUpload"})` → 4371 tokens

## Files Seen In Tool Results (42)

- `apps/meteor/server/ufs/ufs-store.ts`
- `apps/meteor/server/ufs/ufs-local.ts`
- `apps/meteor/server/ufs/ufs-gridfs.ts`
- `apps/meteor/server/ufs/ufs-methods.ts`
- `apps/meteor/server/ufs/ufs-filter.ts`
- `apps/meteor/server/services/upload/service.ts`
- `packages/models/src/models/Uploads.ts`
- `packages/livechat/src/components/Messages/FileAttachment/index.tsx`
- `apps/meteor/server/ufs/index.ts`
- `apps/meteor/server/ufs/ufs.ts`
- `apps/meteor/client/components/message/content/attachments/FileAttachment.tsx`
- `apps/meteor/server/features/EmailInbox/EmailInbox_Incoming.ts`
- `packages/core-typings/src/IMessage/MessageAttachment/Files/ImageAttachmentProps.ts`
- `apps/meteor/client/components/message/content/attachments/file/GenericFileAttachment.tsx`
- `packages/core-typings/src/IMessage/MessageAttachment/Files/FileAttachmentProps.ts`
- `apps/meteor/client/components/message/content/attachments/file/AudioAttachment.tsx`
- `packages/livechat/src/components/Messages/FileAttachment/stories.tsx`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterDeleteRoom.ts`
- `apps/meteor/client/components/message/content/attachments/file/VideoAttachment.tsx`
- `packages/core-typings/src/IMessage/MessageAttachment/Files/VideoAttachmentProps.ts`
- `apps/meteor/client/components/message/content/attachments/file/ImageAttachment.tsx`
- `packages/livechat/src/components/FilesDropTarget/stories.tsx`
- `apps/meteor/client/views/omnichannel/cannedResponses/modals/CreateCannedResponse/CreateCannedResponseModal.stories.tsx`
- `packages/livechat/src/components/Messages/FileAttachmentIcon/index.tsx`
- `packages/core-typings/src/IMessage/MessageAttachment/Files/AudioAttachmentProps.ts`
- `packages/livechat/src/components/Messages/AudioAttachment/index.tsx`
- `packages/livechat/src/routes/Register/stories.tsx`
- `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.stories.tsx`
- `apps/meteor/client/views/room/contextualBar/RoomFiles/RoomFiles.stories.tsx`
- `packages/livechat/src/components/Messages/MessageBubble/stories.tsx`
- `apps/meteor/client/views/room/contextualBar/PruneMessages/PruneMessages.stories.tsx`
- `apps/meteor/client/views/room/contextualBar/RoomFiles/components/FileItemIcon.stories.tsx`
- `apps/meteor/client/views/room/body/hooks/useFileUpload.ts`
- `apps/meteor/client/lib/chats/flows/uploadFiles.ts`
- `apps/meteor/client/views/room/body/hooks/useFileUploadDropTarget.ts`
- `packages/core-services/src/types/IUploadService.ts`
- `apps/meteor/client/lib/chats/uploads.ts`
- `apps/meteor/app/slackbridge/server/SlackAdapter.ts`
- `apps/meteor/client/lib/cachedStores/CachedStore.ts`
- `apps/meteor/app/file-upload/server/lib/FileUpload.ts`
- `apps/meteor/server/lib/dataExport/copyFileUpload.ts`
- `apps/meteor/app/utils/server/functions/normalizeMessageFileUpload.ts`
