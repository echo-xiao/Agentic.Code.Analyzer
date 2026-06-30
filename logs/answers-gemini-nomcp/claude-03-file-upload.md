# What is the storage workflow for file uploads in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat's file upload workflow is designed to be flexible, supporting various storage backends while maintaining a consistent API for clients. Here's a detailed breakdown of the process:

### 1. Client-Side Initiation

1.  **User Action**: A user initiates a file upload by dragging and dropping a file into the chat input, or by clicking the attachment icon and selecting a file from their local system.
2.  **File Preparation**: The client-side (React frontend) reads the file, potentially generates a preview (e.g., for images), and prepares it for transmission.
3.  **HTTP Request**: An HTTP `POST` request is sent to the Rocket.Chat server, typically using `multipart/form-data` to include the file data and other metadata (like the target room ID).

### 2. Server-Side Endpoint Handling

1.  **API Endpoint**: The request is received by the `/api/v1/files.upload` endpoint.
    *   **File Path**: `app/api/server/v1/misc.ts`
2.  **Request Processing**: This endpoint extracts the file stream and other form fields from the incoming request. It then delegates the core file handling logic to the `FileUpload` service.

### 3. Core File Upload Service

1.  **`FileUpload` Service**: The central server-side logic for managing file uploads resides in the `FileUpload` class.
    *   **File Path**: `app/file-upload/server/lib/FileUpload.ts`
2.  **Metadata Extraction**: The `FileUpload` service reads the incoming file stream to extract essential metadata such as:
    *   File name
    *   File type (MIME type)
    *   File size
    *   Checksum (e.g., MD5)
    *   Dimensions (for images/videos)
3.  **Temporary Metadata Storage**: An initial entry for the file is created in the `rocketchat_uploads` MongoDB collection. This entry contains the extracted metadata and a unique `_id` for the file.
    *   **File Path**: `app/models/server/raw/Uploads.ts` (for interacting with the `rocketchat_uploads` collection)

### 4. Storage Provider Selection

1.  **Configurable Storage**: Rocket.Chat uses a pluggable storage adapter system. The `FileUpload` service determines which storage adapter to use based on the `FileUpload_Storage_Type` setting configured in the administration panel.
2.  **Adapter Instantiation**: The appropriate storage adapter is instantiated. Rocket.Chat supports several out-of-the-box:
    *   **GridFS (Default)**: Stores files directly within MongoDB.
        *   **File Path**: `app/file-upload/server/lib/storage/GridFS.ts`
    *   **Amazon S3**: Stores files in an Amazon S3 bucket.
        *   **File Path**: `app/file-upload/server/lib/storage/AmazonS3.ts`
    *   **Google Cloud Storage**: Stores files in a Google Cloud Storage bucket.
        *   **File Path**: `app/file-upload/server/lib/storage/GoogleCloudStorage.ts`
    *   **WebDAV**: Stores files on a WebDAV server.
        *   **File Path**: `app/file-upload/server/lib/storage/WebDAV.ts`
    *   **File System**: Stores files on the local server's file system (often used for development or specific on-premise setups).
        *   **File Path**: `app/file-upload/server/lib/storage/FileSystem.ts`

### 5. File Content Storage

1.  **Adapter `write` Method**: The selected storage adapter's `write` method is invoked. This method takes the file stream and the file metadata as input.
2.  **Content Transfer**: The adapter then streams the file content to its respective storage backend:
    *   For **GridFS**, it writes the file chunks into MongoDB's `fs.files` and `fs.chunks` collections.
    *   For **S3** or **GCS**, it uploads the file to the configured bucket.
    *   For **WebDAV**, it performs an HTTP PUT request to the WebDAV server.
    *   For **File System**, it writes the file to a specified local directory.

### 6. Metadata Update and Message Creation

1.  **Final Metadata Update**: Once the file content is successfully stored by the adapter, the `rocketchat_uploads` document for that file is updated with the final storage details (e.g., S3 ETag, GCS selfLink, GridFS file ID, local file path). This ensures the database record accurately reflects where the file content resides.
2.  **Message Creation**: After the file is fully uploaded and its metadata is finalized, the server calls the `sendFileMessage` method.
    *   **File Path**: `app/file-upload/server/methods/sendFileMessage.ts`
    *   This method creates a new message document in the `rocketchat_message` collection.
    *   The message document includes an `attachments` array, which contains details about the uploaded file, crucially referencing the `_id` of the entry in `rocketchat_uploads`.
    *   **File Path**: `app/models/server/raw/Messages.ts` (for interacting with the `rocketchat_message` collection)
3.  **Message Broadcast**: The newly created message (with the file attachment) is then broadcasted to the relevant chat room, making the file visible and accessible to all participants.

### 7. File Access (Download/View)

1.  **Request for File**: When a user requests to view or download an uploaded file, Rocket.Chat uses the `_id` from the message attachment to look up the file's metadata in the `rocketchat_uploads` collection.
2.  **Retrieval by Adapter**: Based on the storage details in the metadata, the appropriate storage adapter's `get` or `getFileStream` method is used to retrieve the file content from its backend.
3.  **Stream to Client**: The file content is then streamed back to the client, allowing the user to view or download it.

This comprehensive workflow ensures robust, scalable, and flexible file handling within Rocket.Chat.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,263 |
| Model | gemini-2.5-flash |
| Tools | NONE |
