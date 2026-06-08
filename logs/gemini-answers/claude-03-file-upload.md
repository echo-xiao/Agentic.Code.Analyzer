# What is the storage workflow for file uploads in Rocket.Chat?

## Gemini Answer

The storage workflow for file uploads in Rocket.Chat follows a two-step REST flow, managed on the server-side.

**Call Chain:**

1.  **Client-side:** `uploadFiles()` (client-side) initiates the file selection and upload UI.
2.  **Server-side (Step 1 - Upload to Storage):** A `POST` request to `rooms.media/:rid` handles the initial file upload to the designated storage backend.
3.  **Server-side (Step 2 - Confirm and Create Message):** A subsequent `POST` request to `rooms.mediaConfirm/:rid/:fileId` confirms the successful upload and proceeds to create a chat message with the file as an attachment.

**Key Components and Files:**

*   **`apps/meteor/server/services/upload/service.ts`**: This file likely contains the `uploadFile` service, which orchestrates the file upload process.
*   **`apps/meteor/app/file-upload/server/lib/FileUpload.ts`**: The `FileUploadClass` is responsible for processing files and interacting with the various storage backends. This class includes methods like `insert` for handling file data and metadata.
*   **Storage Backends**: Rocket.Chat supports pluggable storage backends, including:
    *   GridFS (default)
    *   S3
    *   WebDAV (methods like `uploadFileToWebdav` in `apps/meteor/app/webdav/server/methods/uploadFileToWebdav.ts` and `apps/meteor/app/webdav/server/lib/uploadFileToWebdav.ts` are relevant here)
    *   FileSystem
*   **`Uploads` collection**: File metadata, such as file ID, type, and size, is stored in the `Uploads` MongoDB collection.
*   **`sendFileMessage()`**: After successful storage and confirmation, this function creates the final chat message with a reference to the uploaded attachment.

## Tool Calls (8 calls, 42,262 tokens)

**Step 1:** `search({"query":"uploadFile","layer":"server"})` → 232 tokens
**Step 2:** `graph({"direction":"down","layer":"server","query":"uploadFile"})` → 1306 tokens
**Step 3:** `search({"layer":"server","query":"Storage"})` → 389 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/file-upload/server/config/_configUploadStorage.ts","symbolName":"_confi)` → 18 tokens
**Step 5:** `search({"query":"FileUploadClass","layer":"server"})` → 185 tokens
**Step 6:** `graph({"direction":"down","layer":"server","query":"FileUploadClass"})` → 163 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/file-upload/server/lib/FileUpload.ts","symbolName":"FileUploadClass"})` → 419 tokens
**Step 8:** `graph({"layer":"server","query":"FileUploadClass.insert","direction":"down"})` → 15 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 2/6 |
| Tool calls | 8 |
| Total tokens | 42,262 |
| Pass | NO |
