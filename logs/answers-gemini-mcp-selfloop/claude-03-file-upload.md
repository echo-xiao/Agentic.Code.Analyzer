# What is the storage workflow for file uploads in Rocket.Chat?

## Gemini Answer

The file upload storage workflow in Rocket.Chat involves a two-step REST API process on the server, handled by the `FileUpload` class in `apps/meteor/app/file-upload/server/lib/FileUpload.ts`.

Here's the breakdown of the workflow:

1.  **Client-side upload:** The client initiates the file upload through the `uploadFiles()` function, which manages the file selection and UI aspects.
2.  **Server-side REST API:**
    *   **Step 1: Upload to storage:** A `POST` request is sent to `rooms.media/:rid`. This endpoint handles the actual file upload to the configured storage backend.
    *   **Step 2: Confirm upload and create message:** After the file is uploaded, a `POST` request to `rooms.mediaConfirm/:rid/:fileId` is made. This confirms the upload and creates a chat message with the uploaded file as an attachment.
3.  **File Processing and Storage:**
    *   The `FileUploadClass` (defined in `apps/meteor/app/file-upload/server/lib/FileUpload.ts`) is responsible for processing the uploaded files.
    *   Rocket.Chat supports pluggable storage backends, including:
        *   GridFS (default)
        *   Amazon S3
        *   WebDAV
        *   Local FileSystem
    *   File metadata is stored in the `Uploads` collection.
    *   Finally, the `sendFileMessage()` function creates the chat message and includes a reference to the stored attachment.

**Call Chain:**

Entry (Client) → `uploadFiles()` → `POST rooms.media/:rid` → `FileUploadClass.insert()` (in `apps/meteor/app/file-upload/server/lib/FileUpload.ts`) → Configured Storage Backend (GridFS, S3, etc.) → `POST rooms.mediaConfirm/:rid/:fileId` → `sendFileMessage()` → Final Message with Attachment.

## Tool Calls (8 calls, 30,868 tokens)

**Step 1:** `search({"query":"file upload","layer":"server"})` → 447 tokens
**Step 2:** `graph({"file":"apps/meteor/app/file-upload/server/lib/FileUpload.ts","query":"FileUpload","layer":"server")` → 461 tokens
**Step 3:** `search({"query":"rooms.media","layer":"server"})` → 65 tokens
**Step 4:** `graph({"direction":"down","file":"apps/meteor/app/api/server/v1/rooms.ts","layer":"server","query":"rooms.)` → 13 tokens
**Step 5:** `implement({"symbolName":"rooms.ts","filename":"apps/meteor/app/api/server/v1/rooms.ts"})` → 44 tokens
**Step 6:** `search({"query":"'rooms.media/:rid'","layer":"server"})` → 70 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/file-upload/server/lib/FileUpload.ts","symbolName":"FileUploadClass"})` → 419 tokens
**Step 8:** `graph({"direction":"down","file":"apps/meteor/app/file-upload/server/lib/FileUpload.ts","layer":"server",")` → 15 tokens
