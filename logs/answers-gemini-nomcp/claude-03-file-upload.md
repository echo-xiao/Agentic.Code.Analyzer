# What is the storage workflow for file uploads in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat employs a robust and flexible workflow for file uploads, designed to handle various storage backends and ensure efficient delivery. The core of this workflow involves client-side initiation, server-side processing and validation, interaction with a chosen storage adapter, and metadata persistence in MongoDB.

Here's a detailed breakdown of the storage workflow for file uploads:

### 1. User Initiates Upload (Client-side)

1.  **User Action:** A user clicks the attachment icon in the chat interface (web, desktop, or mobile app) and selects one or more files from their local device.
2.  **Client-side Processing:** The client application prepares the selected file(s) for upload. This might involve creating a preview, determining file size, and setting up the upload request.
    *   **Relevant client files:**
        *   `app/ui-file-upload/client/views/attachmentMenu.html`: The UI component for the attachment menu.
        *   `app/ui-file-upload/client/lib/fileUpload.js`: Client-side logic for handling file selection and initiating the upload process.

### 2. File Data Sent to Server

1.  **Request Transmission:** The client sends the file's binary data along with associated metadata (filename, MIME type, size, target room ID) to the Rocket.Chat server. This is often done via an HTTP POST request to a dedicated upload endpoint, or in some cases, via Meteor methods for smaller files.
    *   The `ostrio:files` package (or a similar internal implementation pattern) often handles the specifics of chunking and transmitting large files efficiently.

### 3. Server-side Processing & Validation

1.  **Request Reception:** The Rocket.Chat server receives the upload request.
2.  **Authentication & Authorization:** The server verifies the user's authentication and checks if they have the necessary permissions to upload files in the specified room.
3.  **File Validation:** A series of validations are performed based on server settings:
    *   **File Size:** Checks against `FileUpload_MaxFileSize` and `FileUpload_MaxVideoSize` / `FileUpload_MaxAudioSize`.
    *   **File Type:** Checks against `Block_Invalid_Mime_Type` settings to prevent disallowed file types.
    *   **Virus Scanning:** If configured (e.g., with ClamAV integration), the file might be sent for a virus scan before permanent storage.
    *   **Relevant server files:**
        *   `app/file-upload/server/lib/FileUpload.js`: The central server-side utility for handling file uploads.
        *   `app/file-upload/server/lib/fileUploadServices.js`: Manages the different storage adapters.
        *   `app/file-upload/server/methods/sendFileMessage.js`: The Meteor method that typically orchestrates the final stages of the upload and message creation.

### 4. Storage Adapter Selection & File Saving

1.  **Storage Adapter Dispatch:** Based on the `FileUpload_Storage_Type` setting (configured in `Administration > File Upload`), Rocket.Chat invokes the appropriate storage adapter.
2.  **File Storage:** The binary file data is then written to the chosen backend:
    *   **GridFS (MongoDB):** The file data is stored in the `fs.chunks` collection, and metadata in `fs.files` directly within the Rocket.Chat MongoDB database. This is often the default or a common choice for smaller deployments.
    *   **Amazon S3 (or S3-compatible storage):** The file is uploaded to the specified S3 bucket. The adapter returns the S3 object key and potentially a public URL. This is a common and recommended choice for production environments due to scalability and reliability.
    *   **Google Cloud Storage:** Similar to S3, the file is uploaded to a GCS bucket, and its URI/URL is returned.
    *   **Filesystem:** The file is saved to a configured directory on the Rocket.Chat server's local disk. This is generally used for development or very small, single-server instances.
    *   **Relevant server files (Storage Services):**
        *   `app/file-upload/server/lib/fileUploadServices/AmazonS3.js`
        *   `app/file-upload/server/lib/fileUploadServices/GoogleCloudStorage.js`
        *   `app/file-upload/server/lib/fileUploadServices/GridFS.js`
        *   `app/file-upload/server/lib/fileUploadServices/FileSystem.js`

### 5. Metadata Storage (MongoDB)

1.  **Uploads Collection:** Irrespective of where the actual file data is stored, a document containing comprehensive metadata about the uploaded file is created in the `rocketchat_uploads` MongoDB collection.
    *   This document includes fields such as:
        *   `_id`: Unique identifier for the upload.
        *   `name`: Original filename.
        *   `type`: MIME type.
        *   `size`: File size in bytes.
        *   `url`: The direct URL to access the file (e.g., S3 URL, or a Rocket.Chat internal URL for GridFS/Filesystem).
        *   `userId`: The ID of the user who uploaded the file.
        *   `roomId`: The ID of the room where the file was uploaded.
        *   `uploadedAt`: Timestamp of the upload.
        *   `complete`: A boolean indicating if the upload process finished successfully.
        *   `path` / `store`: Internal references to the file's location within the chosen storage backend.
    *   **Relevant server file:**
        *   `app/models/server/models/Uploads.js`: Defines the `RocketChat.models.Uploads` collection.

### 6. Message Creation & Association

1.  **Message Document:** Once the file is successfully stored and its metadata recorded, a new message document is created in the `rocketchat_message` collection.
2.  **Attachment Linkage:** This message document includes an `attachments` array, which contains an object referencing the `_id` of the newly created upload document from the `rocketchat_uploads` collection.
3.  **Real-time Broadcast:** The new message, now containing the attachment details, is broadcasted in real-time to all subscribed clients in the room via DDP (websockets).
    *   **Relevant server file:**
        *   `app/file-upload/server/methods/sendFileMessage.js`: This method finalizes the upload, creates the message, and publishes it.

### 7. File Retrieval (Client-side)

1.  **Attachment Rendering:** When a client loads a message with an attachment, it uses the `url` field from the `rocketchat_uploads` document (referenced by the message's `attachments`) to display the file.
2.  **Access Method:**
    *   **Cloud Storage (S3, GCS):** The `url` usually points directly to the file in the cloud storage bucket. Clients access these files directly, offloading bandwidth from the Rocket.Chat server.
    *   **GridFS / Filesystem:** The `url` typically points to a Rocket.Chat server endpoint (e.g., `/ufs/GridFS/file-id/filename.ext`). The Rocket.Chat server intercepts these requests and streams the file content directly from MongoDB's GridFS or the local filesystem to the client.

This modular design allows Rocket.Chat administrators to choose the most suitable storage solution for their deployment, ranging from simple local storage to highly scalable cloud-based options.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,858 |
| Model | gemini-2.5-flash |
| Tools | NONE |
