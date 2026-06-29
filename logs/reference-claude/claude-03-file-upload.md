# File upload storage workflow?

## Answer

File uploads in Rocket.Chat follow a two-step client-server flow: the client uploads the file to a temporary media endpoint, then confirms it to attach the file to a message. The server handles multipart parsing, validation, optional image processing, and storage backend abstraction.

On the client side, `uploadFiles()` in `apps/meteor/client/lib/chats/flows/uploadFiles.ts` is the entry point. It validates the number of files against `MAX_MULTIPLE_UPLOADED_FILES`, checks E2E encryption settings for encrypted rooms, and then processes each file. For encrypted rooms with `E2E_Enable_Encrypt_Files` enabled, it encrypts the file via `e2eRoom.encryptFile(file)` before upload. The actual upload is handled by `uploadsStore.send(file)` which uses XHR to POST the file as multipart form data to `POST /v1/rooms.media/:rid`.

On the server side, `apps/meteor/app/api/server/v1/rooms.ts` registers the `rooms.media` endpoint. The `MultipartUploadHandler` (or similar middleware) parses the multipart request, extracting the file data and metadata. `FileUploadClass` in `apps/meteor/app/file-upload/server/lib/FileUpload.ts` orchestrates server-side processing:
- File type and size validation against configured limits
- Image processing (thumbnail generation, rotation correction)
- Delegation to the configured storage backend

The storage backend abstraction is provided by the UFS (Upload File System) layer. Multiple backends are supported:
- **GridFS** (`apps/meteor/app/file-upload/server/config/GridFS.ts`) — stores files in MongoDB GridFS
- **Amazon S3** (`apps/meteor/app/file-upload/server/config/AmazonS3/server.ts`) — stores files in AWS S3
- **WebDAV** (`apps/meteor/app/file-upload/server/config/Webdav.ts`) — stores files on WebDAV servers
- **FileSystem** — stores files on local disk

Each backend implements a common interface for storing, retrieving, and deleting files.

After the initial upload, the file exists in temporary storage. The client then sends `POST /v1/rooms.mediaConfirm/:rid` to confirm the upload, which calls `parseFileIntoMessageAttachments()` (from `apps/meteor/server/services/upload/service.ts` or `apps/meteor/app/file-upload/server/methods/sendFileMessage.ts`). This function creates the message attachment object with file metadata (name, size, type, URL, image dimensions) and attaches it to a message in the room.

The upload service (`apps/meteor/server/services/upload/service.ts`) manages the higher-level workflow and integrates with `parseFileIntoMessageAttachments()` to transform uploaded files into proper message attachments with thumbnails, descriptions, and download URLs.

### Call Chain
```
Client:
uploadFiles() (client/lib/chats/flows/uploadFiles.ts)
→ e2eRoom.encryptFile(file) — optional E2E encryption
→ uploadsStore.send(file) — XHR multipart POST
→ POST /v1/rooms.media/:rid

Server (Upload):
rooms.media endpoint (api/server/v1/rooms.ts)
→ MultipartUploadHandler — parse multipart
→ FileUploadClass (file-upload/server/lib/FileUpload.ts)
  → validate file type/size
  → image processing (thumbnails)
  → UFS storage backend:
    → GridFS (config/GridFS.ts)
    → AmazonS3 (config/AmazonS3/server.ts)
    → WebDAV (config/Webdav.ts)

Server (Confirm):
POST /v1/rooms.mediaConfirm/:rid
→ parseFileIntoMessageAttachments()
→ create message with file attachment
→ sendMessage()
```

### Key Files
| File | Role |
|------|------|
| `apps/meteor/client/lib/chats/flows/uploadFiles.ts` | `uploadFiles()` — client entry, E2E encryption, validation |
| `apps/meteor/app/api/server/v1/rooms.ts` | `rooms.media` and `rooms.mediaConfirm` endpoints |
| `apps/meteor/app/file-upload/server/lib/FileUpload.ts` | `FileUploadClass` — server-side validation and processing |
| `apps/meteor/app/file-upload/server/config/GridFS.ts` | GridFS storage backend |
| `apps/meteor/app/file-upload/server/config/AmazonS3/server.ts` | Amazon S3 storage backend |
| `apps/meteor/app/file-upload/server/config/Webdav.ts` | WebDAV storage backend |
| `apps/meteor/server/services/upload/service.ts` | Upload service — `parseFileIntoMessageAttachments()` |
| `apps/meteor/app/file-upload/server/methods/sendFileMessage.ts` | `parseFileIntoMessageAttachments()` — creates message attachments |
| `apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts` | `encryptFile()` — E2E file encryption |

### Key Symbols
uploadFiles, FileUploadClass, MultipartUploadHandler, parseFileIntoMessageAttachments, encryptFile, uploadsStore, MAX_MULTIPLE_UPLOADED_FILES, E2E_Enable_Encrypt_Files, GridFS, AmazonS3, WebDAV, rooms.media, rooms.mediaConfirm, sendFileMessage
