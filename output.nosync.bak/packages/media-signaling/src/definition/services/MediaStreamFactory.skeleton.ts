## File: packages/media-signaling/src/definition/services/MediaStreamFactory.ts

```typescript
export type MediaStreamFactory = (constraints: MediaStreamConstraints) => Promise<MediaStream>;

```