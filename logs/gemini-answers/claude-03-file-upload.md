# What is the storage workflow for file uploads in Rocket.Chat?

## Gemini Answer

The file upload process in Rocket.Chat starts with a client-side action that hits a REST API endpoint on the server. The server then uses a configurable storage system to save the file and associate it with a message in a room.

The storage workflow can be broken down into the following steps:

**Entry → REST API → Upload Handler → Storage → Message Creation**

1.  **Entry Point: REST API**
    The process begins when a file is uploaded to the `rooms.media/:rid` REST endpoint. This route is defined in the following file:
    *   **File:** `apps/meteor/app/api/server/v1/rooms.ts`
    This file configures the API endpoint that receives the initial file data from the client.

2.  **File Processing: `FileUpload`**
    The request is handled by a dedicated upload handler which utilizes the `FileUpload` library. The core logic for handling file uploads, including validation and storage, is centralized here. The main class responsible is `FileUploadClass`.
    *   **File:** `apps/meteor/app/file-upload/server/lib/FileUpload.ts`
    This class orchestrates the process of receiving the file stream and passing it to the configured storage backend.

3.  **Pluggable Storage Backends**
    Rocket.Chat supports multiple storage providers. The system checks the configuration and directs the file to the appropriate storage engine (e.g., GridFS for MongoDB, Amazon S3, Google Cloud Storage, WebDAV, or the local filesystem).
    *   **S3 Config:** `apps/meteor/app/file-upload/server/config/AmazonS3.ts`
    *   **Google Storage Config:** `apps/meteor/app/file-upload/server/config/GoogleStorage.ts`
    *   **WebDAV Config:** `apps/meteor/app/file-upload/server/config/Webdav.ts`

4.  **Message Creation**
    After the file is successfully uploaded to the chosen storage backend, a confirmation step occurs. A separate method is called to create the actual message in the chat room, which includes the file attachment details.
    *   **File:** `apps/meteor/app/file-upload/server/methods/sendFileMessage.ts`
    The `sendFileMessage` Meteor method is invoked to create a message in the `rocketchat_messages` collection, linking to the uploaded file's metadata stored in the `rocketchat_uploads` collection.

## Tool Calls (8 calls, 33,696 tokens)

**Step 1:** `search({"query":"upload","layer":"server"})` → 539 tokens
**Step 2:** `search({"query":"rooms.media","layer":"server"})` → 65 tokens
**Step 3:** `graph({"query":"apps/meteor/app/api/server/v1/rooms.ts","direction":"down"})` → 19 tokens
**Step 4:** `search({"query":"rooms.ts"})` → 377 tokens
**Step 5:** `graph({"query":"FileUploadClass","direction":"down"})` → 163 tokens
**Step 6:** `graph({"query":"FileUploadClass","direction":"up"})` → 991 tokens
**Step 7:** `search({"query":"apps/meteor/app/api/server/v1/rooms.ts"})` → 66 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/api/server/v1/rooms.ts","symbolName":"API.v1.addRoute"})` → 43 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/6 |
| Symbols hit | 2/6 |
| Tool calls | 8 |
| Total tokens | 33,696 |
| Pass | NO |
