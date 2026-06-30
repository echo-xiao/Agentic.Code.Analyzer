# What is the storage workflow for file uploads in Rocket.Chat?

## Gemini Answer

The file upload workflow in Rocket.Chat, specifically on the server-side, follows these steps:

**Call Chain:**

1.  **Client-side upload initiation:** The client-side handles the selection and initial upload UI, likely involving a function like `useFileUpload` in `apps/meteor/client/views/room/body/hooks/useFileUpload.ts` or `FileUploadModal` in `apps/meteor/client/views/room/modals/FileUploadModal/FileUploadModal.tsx`.
2.  **REST API Endpoints:** The server-side receives the file via a two-step REST flow:
    *   `POST rooms.media/:rid`: This endpoint is responsible for uploading the file to storage.
    *   `POST rooms.mediaConfirm/:rid/:fileId`: This endpoint confirms the upload and creates a message with the attachment.
3.  **`uploadFile` function:** The `uploadFile` function, located in `apps/meteor/server/services/upload/service.ts`, is a key entry point for handling file uploads on the server.
4.  **`FileUploadClass.insert`:** When a file is uploaded, the `insert` method of the `FileUploadClass` (defined in `apps/meteor/app/file-upload/server/lib/FileUpload.ts`) is called. This method first calls `_validateFile` to ensure the file meets the defined criteria.
5.  **`FileUploadClass._doInsert`:** After validation, `insert` calls `_doInsert` in the same class (`apps/meteor/app/file-upload/server/lib/FileUpload.ts`).
    *   `_doInsert` first calls `this.store.create` to create an entry for the file in the underlying storage system (e.g., GridFS, S3, WebDAV, or FileSystem).
    *   It then obtains a temporary file path using `UploadFS.getTempFilePath(fileId)`.
    *   The file content (which can be a string, Buffer, or Readable stream) is written to this temporary file using Node.js `fs.promises.rename`, `fs.promises.writeFile`, or `content.pipe(fs.createWriteStream(tmpFile))`.
    *   Finally, it calls `ufsComplete(fileId, this.name)` to finalize the upload process.

**Key Files and their Roles:**

*   `apps/meteor/client/views/room/body/hooks/useFileUpload.ts`: Handles client-side file upload logic.
*   `apps/meteor/client/views/room/modals/FileUploadModal/FileUploadModal.tsx`: Provides the UI for file uploads.
*   `apps/meteor/server/services/upload/service.ts`: Contains the `uploadFile` function, a server-side entry point for file uploads.
*   `apps/meteor/app/file-upload/server/lib/FileUpload.ts`: Defines the `FileUploadClass`, which is central to the server-side file processing, including `insert` and `_doInsert` methods. It also orchestrates interaction with the configured storage backend.
*   `packages/livechat/src/routes/Chat/container.js`: Contains `doFileUpload`, likely for Livechat specific file uploads.
*   `apps/meteor/app/smarsh-connector/server/functions/generateEml.ts`: May handle attachments that are not direct file uploads.
*   `apps/meteor/app/api/server/lib/MultipartUploadHandler.ts`: Handles multipart form data uploads.
*   `apps/meteor/app/api/server/lib/getUploadFormData.ts`: Retrieves upload form data.
*   `apps/meteor/app/utils/server/restrictions.ts`: Contains functions like `fileUploadIsValidContentType` for validating file types.
*   `apps/meteor/app/importer/server/classes/Importer.ts`: Contains `startFileUpload`, likely for handling file uploads during data import.
*   `apps/meteor/server/lib/dataExport/copyFileUpload.ts`: Handles copying file uploads for data export.
*   `packages/apps-engine/src/definition/uploads/IPreFileUpload.ts`: Defines an interface for pre-file upload hooks.
*   `apps/meteor/server/services/upload/service.ts`: Contains `uploadFile` and interacts with the storage mechanisms.

**Storage:**

Rocket.Chat supports pluggable storage backends, with **GridFS** being the default. Other supported options include **S3, WebDAV, and FileSystem**. File metadata is stored in the **Uploads collection**.

After a successful upload, `sendFileMessage()` is responsible for creating the chat message that includes a reference to the uploaded attachment.

## Tool Calls (8 calls, 57,750 tokens)

**Step 1:** `search({"query":"file upload","layer":"server"})` → 530 tokens
**Step 2:** `graph({"query":"FileUploadClass","direction":"down","layer":"server","file":"apps/meteor/app/file-upload/s)` → 163 tokens
**Step 3:** `graph({"file":"apps/meteor/server/services/upload/service.ts","direction":"down","query":"uploadFile","lay)` → 2615 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/file-upload/server/lib/FileUpload.ts","symbolName":"FileUpload.server.l)` → 54 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/file-upload/server/lib/FileUpload.ts","symbolName":"_doInsert"})` → 58 tokens
**Step 6:** `implement({"filename":"apps/meteor/app/file-upload/server/lib/FileUpload.ts","symbolName":"FileUploadClass"})` → 419 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/file-upload/server/lib/FileUpload.ts","symbolName":"FileUploadClass.ins)` → 124 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/file-upload/server/lib/FileUpload.ts","symbolName":"FileUploadClass._do)` → 249 tokens
