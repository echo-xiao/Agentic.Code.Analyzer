# What is the storage workflow for file uploads in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat's file upload workflow is designed to be flexible, allowing administrators to choose different storage backends. The process involves client-side initiation, server-side processing, storage via adapters, and metadata management in MongoDB.

Here's a detailed breakdown of the storage workflow for file uploads:

1.  **Client-Side Initiation:**
    *   A user drags and drops a file into the message box or clicks the attachment icon and selects a file.
    *   The client-side JavaScript (primarily in `app/file-upload/client/lib/fileUpload.js` and related UI components like `app/ui-message/client/components/messageBox/messageBox.js`) captures the file data.
    *   A temporary client-side preview might be displayed.
    *   The client then initiates an HTTP `POST` request to the Rocket.Chat server, typically to the `/api/v1/files.upload` endpoint, sending the file data.

2.  **Server-Side Reception and Initial Processing:**
    *   The Rocket.Chat server receives the HTTP request at the `app/api/server/v1/misc/upload.js` endpoint.
    *   This endpoint delegates the actual file handling to the core `FileUpload` service.
    *   The `FileUpload.uploadFile` method (defined in `app/file-upload/server/lib/fileUpload.js`) is invoked. This method is the central orchestrator for server-side file uploads.

3.  **Metadata Generation and Storage Adapter Selection:**
    *   Inside `FileUpload.uploadFile`, a unique ID for the file is generated.
    *   Essential metadata about the file (e.g., original name, MIME type, size, uploader's user ID, target room ID) is extracted and prepared.
    *   Rocket.Chat determines which storage adapter to use based on the `FileUpload_Storage_Type` server setting (configured via the admin panel). The available options are typically:
        *   `GridFS` (default, stores files directly in MongoDB)
        *   `AmazonS3` (stores files in an S3-compatible bucket)
        *   `FileSystem` (stores files on the local server's disk)

4.  **File Storage via Adapters:**
    *   The `FileUpload.uploadFile` method then calls the `storeFile` method of the selected storage adapter:
        *   **GridFS (`app/file-upload/server/lib/storage/gridfs.js`):** If GridFS is chosen, the file is broken into chunks and stored directly within the MongoDB database across the `fs.files` and `fs.chunks` collections. This is the default and requires no external storage configuration.
        *   **Amazon S3 (`app/file-upload/server/lib/storage/s3.js`):** If S3 is chosen, the file is uploaded to the configured Amazon S3 bucket (or a compatible object storage service) using the AWS SDK. The adapter handles authentication and the actual PUT operation to the bucket.
        *   **FileSystem (`app/file-upload/server/lib/storage/filesystem.js`):** If FileSystem is chosen, the file is saved to a specified directory on the Rocket.Chat server's local filesystem. The path is configured via server settings.

5.  **Database Updates (Metadata):**
    *   Once the file is successfully stored by the chosen adapter, its comprehensive metadata (including the file ID, original name, type, size, a URL for access, and potentially adapter-specific details like S3 ETag or GridFS file ID) is saved into the `uploads` collection in MongoDB.
    *   This collection is managed by `RocketChat.models.Uploads` (defined in `app/models/server/raw-files.js`). This entry serves as the primary record for the uploaded file within Rocket.Chat.

6.  **Optional File Processing:**
    *   For certain file types (e.g., images), Rocket.Chat might perform additional background processing, such as generating thumbnails or different image sizes. These derived files might also be stored using the same storage adapter or a dedicated one, and their metadata linked to the original upload.

7.  **Message Creation and Linking:**
    *   After the file is stored and its metadata is in the `uploads` collection, a new message object is created in the `rocketchat_message` collection (managed by `RocketChat.models.Messages` in `app/models/server/raw-messages.js`).
    *   This message object includes an `attachments` array, which contains a reference to the uploaded file's metadata (specifically, its ID and the URL generated for accessing it).
    *   This message is then broadcast to the relevant chat room, making the file visible to participants.

8.  **File Access and Serving:**
    *   When a client requests to view or download an uploaded file:
        *   **GridFS or FileSystem:** Rocket.Chat acts as a proxy. The client requests the file via a Rocket.Chat URL (e.g., `/file-upload/ID/filename`). The `app/file-upload/server/lib/fileUpload.js` module intercepts this request, retrieves the file data from MongoDB (GridFS) or the local filesystem (FileSystem), and streams it back to the client.
        *   **Amazon S3:** The URL stored in the `uploads` collection is typically a direct URL to the file in the S3 bucket (or a pre-signed URL for private buckets). The client's browser will fetch the file directly from S3, bypassing the Rocket.Chat server for the actual file transfer.

This modular approach allows Rocket.Chat to efficiently handle file uploads and provides flexibility for administrators to choose the most suitable storage solution for their environment.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,102 |
| Model | gemini-2.5-flash |
| Tools | NONE |
