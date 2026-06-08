# What is the storage workflow for file uploads in Rocket.Chat?

## Gemini Answer

The storage workflow for file uploads in Rocket.Chat involves the `FileUploadClass` located in `apps/meteor/app/file-upload/server/lib/FileUpload.ts`. This class handles the core logic for file operations on the server side.

Based on the initial search and graph traversal, here's a high-level overview:

1.  **Client-side:** The client handles file selection and the UI for uploads.
2.  **Server-side API:** There is a two-step REST API flow for file uploads:
    *   `POST rooms.media/:rid`: This endpoint is responsible for uploading the file to the chosen storage backend.
    *   `POST rooms.mediaConfirm/:rid/:fileId`: This endpoint confirms the upload and is used to create a message in the chat with a reference to the uploaded file as an attachment.
3.  **`FileUploadClass` (`apps/meteor/app/file-upload/server/lib/FileUpload.ts`):** This class is central to processing files. It has methods like `insert`, `delete`, `getStore`, etc., for managing files.
    *   **Pluggable Storage:** Rocket.Chat supports various storage backends, including GridFS (the default), Amazon S3, WebDAV, and the local FileSystem. The `FileUploadClass` interacts with these different stores.
    *   **Metadata Storage:** File metadata, such as file ID, name, size, and type, is stored in the `Uploads` collection.
4.  **Message Creation:** After a successful upload, `sendFileMessage()` is likely called to create the actual chat message with the attachment reference.

**Call Chain:**

*   Entry (client-side upload initiation)
*   `POST rooms.media/:rid` (API endpoint in `apps/meteor/app/api/server/v1/rooms.ts`)
*   `FileUploadClass.insert` (in `apps/meteor/app/file-upload/server/lib/FileUpload.ts`) interacts with the configured storage backend.
*   `POST rooms.mediaConfirm/:rid/:fileId` (API endpoint in `apps/meteor/app/api/server/v1/rooms.ts`)
*   `sendFileMessage()` (not explicitly found in the graph, but implied for message creation).

## Tool Calls (8 calls, 26,857 tokens)

**Step 1:** `search({"query":"file upload","layer":"server"})` → 447 tokens
**Step 2:** `graph({"direction":"down","layer":"server","query":"FileUploadClass"})` → 163 tokens
**Step 3:** `search({"query":"rooms.media","layer":"server"})` → 65 tokens
**Step 4:** `graph({"layer":"server","query":"rooms.media","direction":"down","depth":3})` → 13 tokens
**Step 5:** `implement({"symbolName":"rooms.media","filename":"apps/meteor/app/api/server/v1/rooms.ts"})` → 45 tokens
**Step 6:** `search({"layer":"server","query":"POST rooms.media"})` → 15 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/file-upload/server/lib/FileUpload.ts","symbolName":"FileUploadClass"})` → 419 tokens
**Step 8:** `search({"query":"API.v1.addRoute media","layer":"server"})` → 16 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 3/6 |
| Tool calls | 8 |
| Total tokens | 26,857 |
| Pass | NO |
