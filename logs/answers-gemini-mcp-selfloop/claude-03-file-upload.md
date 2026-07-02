# What is the storage workflow for file uploads in Rocket.Chat?

## Gemini Answer

The file upload workflow in Rocket.Chat involves both client-side and server-side operations, with a two-step REST API process for handling the actual file transfer and message creation.

**Workflow:**

1.  **Client-side Upload:** The client initiates the file upload through the `uploadFiles()` function, which manages the file selection and user interface for the upload.
2.  **Server-side Upload (Step 1 - `rooms.media`):** The client sends a POST request to the `/v1/rooms.media/:rid` endpoint. This endpoint handles the initial file upload to the configured storage backend. The `MultipartUploadHandler` (located at `apps/meteor/app/api/server/lib/MultipartUploadHandler.ts`) is responsible for parsing the incoming multipart request, extracting the file data, and potentially performing transformations like stripping EXIF data.
3.  **Server-side Confirmation (Step 2 - `rooms.mediaConfirm`):** After the file is uploaded to storage, the client sends a second POST request to `/v1/rooms.mediaConfirm/:rid/:fileId`. This confirms the upload and triggers the creation of a chat message with the uploaded file as an attachment.
4.  **File Processing and Storage:** The `FileUploadClass` is responsible for processing the uploaded files. Rocket.Chat supports various pluggable storage backends, including:
    *   GridFS (default)
    *   S3
    *   WebDAV
    *   FileSystem
5.  **Metadata Storage:** File metadata, such as file ID, name, type, and size, is stored in the `Uploads` collection.
6.  **Message Creation:** Finally, the `sendFileMessage()` function creates the chat message, referencing the uploaded file's metadata as an attachment.

**Key Files and Their Roles:**

*   `apps/meteor/app/api/server/lib/MultipartUploadHandler.ts`: This file contains the `MultipartUploadHandler` class, which is crucial for parsing incoming file upload requests on the server.
*   `apps/meteor/app/api/server/v1/rooms.ts`: This file likely defines the REST API endpoints for `rooms.media` and `rooms.mediaConfirm`, handling the server-side logic for file uploads and confirmations.
*   `apps/meteor/client/lib/chats/uploads.ts`: This file likely contains client-side logic related to file uploads, including the `uploadFiles()` function.
*   `apps/meteor/client/lib/chats/flows/processMessageUploads.ts`: This file probably orchestrates the client-side flow for processing message uploads, including calling the `rooms.mediaConfirm` endpoint.
*   `packages/rest-typings/src/v1/rooms.ts`: This file defines the TypeScript types for the `rooms.media` and `rooms.mediaConfirm` REST API endpoints.

## Tool Calls (8 calls, 20,597 tokens)

**Step 1:** `plan({"question":"What is the storage workflow for file uploads in Rocket.Chat?","intent":"architecture"})` → 85 tokens
**Step 2:** `search({"query":"file upload"})` → 446 tokens
**Step 3:** `graph({"depth":2,"file":"apps/meteor/app/api/server/lib/MultipartUploadHandler.ts","query":"MultipartUploa)` → 198 tokens
**Step 4:** `details({"filename":"apps/meteor/app/api/server/lib/MultipartUploadHandler.ts","symbolName":"MultipartUpload)` → 211 tokens
**Step 5:** `graph({"query":"MultipartUploadHandler.parseRequest","file":"apps/meteor/app/api/server/lib/MultipartUploa)` → 19 tokens
**Step 6:** `search({"query":"rooms.media"})` → 282 tokens
**Step 7:** `details({"filename":"apps/meteor/app/api/server/v1/rooms.ts","symbolName":"rooms.media"})` → 44 tokens
**Step 8:** `details({"filename":"apps/meteor/app/api/server/v1/rooms.ts","symbolName":"rooms.media"})` → 44 tokens

## Files Seen In Tool Results (16)

- `apps/meteor/tests/end-to-end/api/livechat/00-rooms.ts`
- `apps/meteor/tests/end-to-end/api/rooms.ts`
- `packages/apps-engine/src/definition/exceptions/FileUploadNotAllowedException.ts`
- `apps/meteor/app/smarsh-connector/server/functions/generateEml.ts`
- `apps/meteor/app/livechat/imports/server/rest/sms.ts`
- `apps/meteor/app/api/server/lib/MultipartUploadHandler.ts`
- `apps/meteor/app/api/server/lib/getUploadFormData.ts`
- `apps/meteor/tests/end-to-end/apps/apps-hooks-file-upload.ts`
- `apps/meteor/server/services/omnichannel-integrations/providers/twilio.ts`
- `apps/meteor/server/services/authorization/canAccessRoomLivechat.ts`
- `apps/meteor/tests/data/uploads.helper.ts`
- `apps/meteor/tests/data/file.helper.ts`
- `packages/rest-typings/src/v1/rooms.ts`
- `apps/meteor/app/api/server/v1/rooms.ts`
- `apps/meteor/client/lib/chats/uploads.ts`
- `apps/meteor/client/lib/chats/flows/processMessageUploads.ts`
