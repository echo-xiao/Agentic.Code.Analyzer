# What is the storage workflow for file uploads in Rocket.Chat?

## Gemini Answer

The storage workflow for file uploads in Rocket.Chat involves a two-step REST API process on the server-side and utilizes the `UploadFS` utility for managing file storage.

**Call Chain:**

1.  **Client-side:** The `uploadFiles()` function (e.g., in `apps/meteor/client/lib/chats/flows/uploadFiles.ts`) handles the initial file selection and UI aspects of the upload.
2.  **Server-side (Initial Upload):** A `POST` request to `rooms.media/:rid` uploads the file to the configured storage.
3.  **Server-side (Confirmation):** A subsequent `POST` request to `rooms.mediaConfirm/:rid/:fileId` confirms the upload and creates a message with the attachment.
4.  **`uploadFile`:** The `uploadFile` function in `apps/meteor/server/services/upload/service.ts` is a key entry point for handling file uploads on the server.
5.  **`ufsComplete`:** Within the upload process, `ufsComplete` (defined in `apps/meteor/server/ufs/ufs-methods.ts`) is responsible for finalizing the file storage.
    *   It retrieves the appropriate `UploadFS.Store` instance using `UploadFS.getStore(storeName)` (from `apps/meteor/server/ufs/ufs.ts`).
    *   It validates the file using `store.validate()`.
    *   It reads the temporary file from `UploadFS.getTempFilePath(fileId)`.
    *   It writes the file to the permanent storage using `store.write()`.
    *   Upon successful writing, it removes the temporary file.
    *   In case of errors, it removes the partially uploaded file from the store.
6.  **`UploadFS.Store`:** Rocket.Chat uses a pluggable storage backend system, with `UploadFS.Store` (defined in `apps/meteor/server/ufs/ufs.ts` and `apps/meteor/server/ufs/ufs-store.ts`) serving as the base class for different storage adapters. The default storage is GridFS, but it also supports S3, WebDAV, and FileSystem.
7.  **Metadata Storage:** File metadata is stored in the `Uploads` collection.
8.  **Message Creation:** Finally, `sendFileMessage()` creates the chat message with a reference to the uploaded attachment.

**Key Files:**

*   `apps/meteor/client/lib/chats/flows/uploadFiles.ts`: Client-side file upload initiation.
*   `apps/meteor/server/services/upload/service.ts`: Server-side service for handling file uploads.
*   `apps/meteor/app/file-upload/server/lib/FileUpload.ts`: Contains `FileUploadClass` which processes files.
*   `apps/meteor/server/ufs/ufs-methods.ts`: Contains `ufsComplete` for finalizing file storage.
*   `apps/meteor/server/ufs/ufs.ts`: Defines the `UploadFS` utility, including `getStore` and `getTempFilePath`.
*   `apps/meteor/server/ufs/ufs-store.ts`: Defines the `Store` class for pluggable storage backends.

## Tool Calls (8 calls, 59,833 tokens)

**Step 1:** `search({"query":"file upload","layer":"server"})` → 530 tokens
**Step 2:** `graph({"query":"FileUploadClass","file":"apps/meteor/app/file-upload/server/lib/FileUpload.ts","layer":"se)` → 163 tokens
**Step 3:** `search({"layer":"server","query":"uploadFile"})` → 411 tokens
**Step 4:** `graph({"file":"apps/meteor/server/services/upload/service.ts","query":"uploadFile","layer":"server","direc)` → 2615 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/file-upload/server/lib/FileUpload.ts","symbolName":"ufsComplete"})` → 490 tokens
**Step 6:** `search({"query":"UploadFS","layer":"server"})` → 309 tokens
**Step 7:** `implement({"filename":"apps/meteor/server/ufs/ufs.ts","symbolName":"UploadFS.getStore"})` → 42 tokens
**Step 8:** `implement({"filename":"apps/meteor/server/ufs/ufs.ts","symbolName":"UploadFS"})` → 198 tokens

## Files Seen In Tool Results (33)

- `apps/meteor/app/importer/server/classes/Importer.ts`
- `apps/meteor/server/lib/dataExport/copyFileUpload.ts`
- `apps/meteor/app/file-upload/server/lib/FileUpload.ts`
- `packages/livechat/src/routes/Chat/container.js`
- `apps/meteor/client/views/room/body/hooks/useFileUpload.ts`
- `apps/meteor/client/views/room/modals/FileUploadModal/FileUploadModal.tsx`
- `apps/meteor/app/file-upload/lib/FileUploadBase.ts`
- `packages/apps-engine/src/definition/uploads/IPreFileUpload.ts`
- `apps/meteor/app/utils/server/restrictions.ts`
- `apps/meteor/tests/data/uploads.helper.ts`
- `apps/meteor/server/services/upload/service.ts`
- `apps/meteor/app/smarsh-connector/server/functions/generateEml.ts`
- `apps/meteor/app/livechat/imports/server/rest/sms.ts`
- `apps/meteor/app/api/server/lib/MultipartUploadHandler.ts`
- `apps/meteor/app/api/server/lib/getUploadFormData.ts`
- `apps/meteor/server/services/omnichannel-integrations/providers/twilio.ts`
- `apps/meteor/server/services/authorization/canAccessRoomLivechat.ts`
- `apps/meteor/app/slackbridge/server/SlackAdapter.ts`
- `apps/meteor/app/webdav/server/methods/uploadFileToWebdav.ts`
- `apps/meteor/client/lib/chats/uploads.ts`
- `apps/meteor/client/lib/chats/flows/uploadFiles.ts`
- `packages/core-services/src/types/IUploadService.ts`
- `apps/meteor/tests/data/file.helper.ts`
- `apps/meteor/app/importer/server/methods/uploadImportFile.ts`
- `apps/meteor/app/webdav/server/lib/uploadFileToWebdav.ts`
- `apps/meteor/server/ufs/ufs-methods.ts`
- `apps/meteor/server/ufs/ufs.ts`
- `apps/meteor/server/ufs/index.ts`
- `packages/rest-typings/src/v1/import/UploadImportFileParamsPOST.ts`
- `apps/meteor/app/utils/lib/restrictions.ts`
- `apps/meteor/client/hooks/roomActions/useUploadedFilesListRoomAction.ts`
- `apps/meteor/server/ufs/ufs-store.ts`
- `packages/apps-engine/src/server/AppManager.ts`
