# What is the storage workflow for file uploads in Rocket.Chat?

## Gemini Answer

The file upload storage workflow in Rocket.Chat involves a client-server interaction and a pluggable storage backend system.

**Call Chain:**

1.  **Client-side:** `uploadFiles()` (Client layer) handles the initial file selection and UI interaction for uploading files.
2.  **Server-side (REST API):**
    *   `POST rooms.media/:rid` (Server layer) - This is the initial endpoint for uploading the file content to the designated storage.
    *   `POST rooms.mediaConfirm/:rid/:fileId` (Server layer) - After the file is uploaded, this endpoint confirms the upload and is responsible for creating a message in the chat with the attachment reference.
3.  **File Processing and Storage:**
    *   `FileUploadClass` (defined in `apps/meteor/app/file-upload/server/lib/FileUpload.ts`) is the core class on the server that processes the uploaded files.
        *   Its `insert` and `_doInsert` methods handle the actual insertion of file data into the chosen storage.
        *   The constructor of `FileUploadClass` is configured with a `store`, allowing for various storage backends.
    *   **Pluggable Storage Backends:** Rocket.Chat supports different storage solutions, which are configured via the `store` option in `FileUploadClass`. These include:
        *   GridFS (default)
        *   S3
        *   WebDAV
        *   FileSystem
    *   **Metadata Storage:** The metadata for the uploaded files is stored in the `Uploads` collection.
4.  **Message Creation:**
    *   `sendFileMessage()` (Server layer) is ultimately called to create the chat message, which includes a reference to the newly uploaded and stored file as an attachment.

**Key Files and Symbols:**

*   `apps/meteor/app/file-upload/server/lib/FileUpload.ts`: Contains `FileUploadClass`, which is central to processing and managing file uploads.
*   `Uploads` collection: Stores the metadata for uploaded files.

## Tool Calls (3 calls, 10,263 tokens)

**Step 1:** `search({"query":"file upload","layer":"server"})` → 447 tokens
**Step 2:** `graph({"direction":"down","query":"FileUpload","layer":"server"})` → 485 tokens
**Step 3:** `implement({"symbolName":"FileUploadClass","filename":"apps/meteor/app/file-upload/server/lib/FileUpload.ts"})` → 419 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 3/6 |
| Tool calls | 3 |
| Total tokens | 10,263 |
| Pass | NO |
