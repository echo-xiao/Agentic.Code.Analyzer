# What is the storage workflow for file uploads in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat's file upload workflow is designed to be flexible, supporting various storage backends while ensuring metadata consistency. Here's a detailed breakdown:

### 1. Client-Side Initiation

1.  **User Action**: The user initiates a file upload through the Rocket.Chat client (web, desktop, or mobile app) by selecting a file from their device.
2.  **Temporary Client-Side Display**: The client often creates a temporary entry for the file in its local `FileUpload` collection to provide immediate visual feedback (e.g., a progress bar) while the upload is in progress.
3.  **API Call**: The client sends the file data to the Rocket.Chat server via a dedicated API endpoint. For the web client, this is typically a `POST` request to an endpoint like `/api/v1/rooms.upload/<roomId>`. The core client-side logic can be found around `app/file-upload/client/lib/fileUpload.ts` and UI components in `client/components/message/attachments/`.

### 2. Server-Side Reception and Processing

1.  **Endpoint Handling**: The Rocket.Chat server receives the file via its API handler (e.g., `app/file-upload/server/api/v1/files.ts` for REST endpoints or DDP methods).
2.  **Temporary Storage**: The incoming file stream is often first written to a temporary location on the server's filesystem for initial processing.
3.  **Validation**: The server performs several validations:
    *   **Permissions**: Checks if the user has permission to upload files to the target room/conversation.
    *   **File Type**: Validates against allowed file types configured in the workspace settings.
    *   **File Size**: Ensures the file doesn't exceed the maximum allowed size.
    *   **Virus Scanning (Optional)**: If configured (e.g., through a plugin or external service), the file might be scanned for malware before further processing.
4.  **Metadata Extraction**: Key metadata like original filename, MIME type, and size are extracted from the file.
5.  **Thumbnail/Preview Generation**: For image and video files, Rocket.Chat can generate smaller preview images or thumbnails. This often happens in-memory or from the temporary file. This is crucial for displaying rich attachments in messages.
6.  **Core Logic**: The central orchestration for server-side file handling resides in `app/file-upload/server/lib/fileUpload.ts`. This module decides which storage adapter to use and manages the lifecycle.

### 3. Storage Backend Selection and Storage

Rocket.Chat uses a pluggable storage system, allowing administrators to choose where files are ultimately stored. The decision is based on the workspace's file upload settings (`Administration > Workspace > Settings > File Upload`).

1.  **Storage Adapter Abstraction**: Rocket.Chat defines an interface for storage adapters (conceptually in `app/file-upload/server/lib/FileUploadAdapter.ts`), and different concrete implementations for various storage types.
2.  **Default/GridFS Storage**:
    *   **Mechanism**: If no external storage is configured, Rocket.Chat defaults to storing files directly within MongoDB using GridFS. GridFS breaks files into chunks and stores them in special collections within the MongoDB database (`fs.chunks` and `fs.files`).
    *   **Implementation**: The GridFS adapter is located at `app/file-upload/server/lib/stores/GridFS.ts`.
    *   **Access**: Files are typically served through a Rocket.Chat proxy URL (e.g., `/file-upload/gridfs/filename`).
3.  **External Storage (Recommended for Production)**:
    *   **Amazon S3 Compatible**: This is the most common and recommended external storage option. Rocket.Chat supports Amazon S3 and S3-compatible services like MinIO, DigitalOcean Spaces, Wasabi, etc.
    *   **Implementation**: The S3 adapter is located at `app/file-upload/server/lib/stores/AmazonS3.ts`.
    *   **Mechanism**: The file (and its generated thumbnails) are uploaded directly to the configured S3 bucket.
    *   **Access**: Files can be served directly from the S3 bucket's public URL, reducing the load on the Rocket.Chat server.
    *   **Local File System**: While less common for scalable production setups, there's also an adapter for storing files on the local file system (`app/file-upload/server/lib/stores/FileSystem.ts`), typically used for development or specific self-hosted scenarios.

### 4. Database Integration (MongoDB)

Regardless of the chosen storage backend, **metadata about the uploaded file is always stored in MongoDB**.

1.  **`rocketchat_uploads` Collection**:
    *   A new document is created in the `rocketchat_uploads` collection (defined by `app/models/server/raw/Uploads.ts`).
    *   This document stores essential information:
        *   `_id`: Unique identifier for the upload.
        *   `name`: Original file name.
        *   `type`: MIME type.
        *   `size`: File size in bytes.
        *   `userId`: The ID of the user who uploaded the file.
        *   `rid`: The room ID where the file was uploaded.
        *   `store`: Identifies which storage adapter was used (e.g., `rocketchat_uploads` for GridFS, `aws-s3` for S3).
        *   `path`: The path within GridFS or on the local filesystem.
        *   `url`: The URL to access the file (internal Rocket.Chat URL or direct S3 URL).
        *   `originalFilePath`, `originalFileId`: For managing original files vs. generated versions (like thumbnails).
        *   `complete`: A flag indicating if the upload process is finished.
        *   `_updatedAt`, `uploadedAt`: Timestamps.
    *   Thumbnails and other generated versions also have their own entries, often linked to the original file.

### 5. Linking to Messages and Real-time Updates

1.  **Message Creation**: Once the file is successfully stored and its metadata recorded in `rocketchat_uploads`, a new message entry is created in the `rocketchat_messages` collection (defined by `app/models/server/raw/Messages.ts`).
2.  **Attachment Reference**: This new message document will include an `attachments` array. Each attachment object within this array will contain a reference to the uploaded file's `_id` from the `rocketchat_uploads` collection. It will also include display-related information like `title`, `description`, `image_url` (for thumbnails), and the `file_id`.
3.  **Real-time Delivery**: The newly created message, complete with its attachment details, is then pushed to all relevant clients (those currently in the same room) using Rocket.Chat's real-time communication layer (DDP over WebSockets). This ensures that other users see the uploaded file appear in the chat instantly. The logic for creating and sending messages can be found around `app/lib/server/methods/sendMessage.ts`.

This workflow ensures robust, scalable, and configurable file handling within Rocket.Chat.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,125 |
| Model | gemini-2.5-flash |
| Tools | NONE |
