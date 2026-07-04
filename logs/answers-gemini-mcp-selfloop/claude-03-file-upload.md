# What is the storage workflow for file uploads in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

The file upload storage workflow in Rocket.Chat involves several stages, from client-side preparation to server-side storage and retrieval.

**Workflow:**

1.  **Client-side File Preparation and Encryption**:
    *   The process begins with the client-side `uploadFiles` function, which handles initial file processing.
    *   If the room is encrypted and file encryption is enabled, the file is encrypted using `e2eRoom.encryptFile(file)`.
    *   The encrypted file and its metadata are then prepared for transmission.

2.  **Server-side Upload Initiation and Validation**:
    *   The client sends the file to the server via the `rooms.media/:rid` API endpoint.
    *   The `MultipartUploadHandler` parses the incoming request, extracting file details such as name, size, type, room ID (`rid`), and user ID (`userId`).
    *   Before storage, `FileUpload.validateFileUpload` performs several checks:
        *   **Room Access**: Ensures the user has access to the room.
        *   **File Upload Enabled**: Verifies that file uploads are generally enabled and allowed in direct messages.
        *   **File Size Limit**: Checks against `FileUpload_MaxFileSize`.
        *   **E2E Encryption**: For encrypted files, ensures the type is `application/octet-stream`.
        *   **Content Type**: Validates against allowed types.

3.  **File Storage**:
    *   Once validated, the file is inserted into the appropriate storage using `fileStore.insert(details, file.tempFilePath)`.
    *   `FileUpload.getStore('Uploads')` retrieves the configured storage handler. Rocket.Chat supports various storage types, including GridFS, Amazon S3, Google Cloud Storage, WebDAV, and FileSystem.
    *   The `ufsComplete` function finalizes the upload, validating the temporary file with `store.validate(file)` and writing it to the permanent store using `store.write()`. The temporary file is then removed.
    *   For image files, `FileUpload.uploadsOnValidate` uses `sharp` to extract metadata, rotate images if `FileUpload_RotateImages` is enabled, and strip EXIF data if `Message_Attachments_Strip_Exif` is true.

4.  **File Confirmation and Message Creation**:
    *   After the physical file upload, the client calls the `rooms.mediaConfirm/:rid/:fileId` endpoint.
    *   This step updates the file's status to `complete` in the `Uploads` collection and creates a message with the file attachment in the chat room.

5.  **File Retrieval**:
    *   To retrieve a file, `FileUpload.getPath()` generates the URL.
    *   The `streamUploadedFile` method in the `UploadService` handles streaming the file, with optional image resizing using `sharp`.

**Key Files:**

*   `app/file-upload/server/lib/FileUpload.ts`: Central to managing file uploads, including configuration, validation, and retrieval.
*   `app/file-upload/server/lib/ufs.ts`: Contains the `ufsComplete` function for finalizing the upload process.
*   `app/e2e/client/index.ts`: Contains `e2eRoom.encryptFile(file)` for client-side encryption.
*   `app/api/server/v1/rooms.ts`: Defines the `rooms.media/:rid` and `rooms.mediaConfirm/:rid/:fileId` API endpoints.
*   `app/api/server/v1/uploads/uploads.ts`: Contains the `streamUploadedFile` method in the `UploadService`.

## Tool Calls (1 calls, 3,665 tokens)

**Step 1:** `wiki({"question":"file upload storage workflow"})` → 966 tokens

## Files Seen In Tool Results (0)

_(none)_
