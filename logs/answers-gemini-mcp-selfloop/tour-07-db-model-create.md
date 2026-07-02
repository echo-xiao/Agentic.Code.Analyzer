# How do you create a new database model in Rocket.Chat?

## Gemini Answer

To create a new database model in Rocket.Chat, you typically define a schema using `z.object` from the `zod` library. This schema describes the structure and types of your data.

Here's a breakdown of the process based on the provided information:

1.  **Define the Schema:**
    *   You'll use `z.object` to define the shape of your data.
    *   Each field within the object will have a `zod` type (e.g., `z.string()`, `z.boolean()`, `z.array(z.string())`, `TimestampSchema`).
    *   You can also specify optional fields (`.optional()`) and other validations.

    **Example (from `packages/core-typings/src/IBanner.ts`):**

    
```typescript
    export const IBannerSchema = z.object({
        _id: z.string(),
        _updatedAt: TimestampSchema.optional(),
        platform: z.array(z.enum(BannerPlatform)),
        expireAt: TimestampSchema,
        startAt: TimestampSchema,
        roles: z.array(z.string()).optional().meta({ deprecated: true }),
        createdBy: z.union([
            z.object({
                _id: z.string(),
                username: z.string().optional(),
            }),
            z.enum(['cloud', 'system']),
        ]),
        createdAt: TimestampSchema,
        view: z.custom<UiKit.BannerView>(),
        active: z.boolean().optional(),
        inactivedAt: TimestampSchema.optional(),
        snapshot: z.string().optional(),
        dictionary: z.record(z.string(), z.record(z.string(), z.string())).optional(),
        surface: z.enum(['banner', 'modal']),
    });
    ```


2.  **Integrate with a Collection (Inferred):**
    While the direct creation of a `Mongo.Collection` was not explicitly found in the server layer, the presence of `MinimongoCollection.ts` and `LocalCollection.ts` in the client layer, which are described as "middle layer between the Mongo.Collection and Zustand" and "Forked from Meteor's Mongo.Collection," suggests that `Mongo.Collection` is still the underlying mechanism for database interaction.

    Therefore, after defining your schema, you would typically associate it with a `Mongo.Collection` instance to interact with the database. This would involve creating a new `Mongo.Collection` and then using your defined schema for validation and data manipulation.

**Key Files:**

*   `packages/core-typings/src/IBanner.ts`: This file provides a concrete example of how a schema (`IBannerSchema`) is defined using `zod`.
*   `apps/meteor/ee/server/api/abac/schemas.ts`: This file shows how schemas can be compiled for validation using `ajv.compile`.

**Flow:**

1.  **Schema Definition:** Define your data structure using `z.object` and `zod` types in a file like `packages/core-typings/src/IBanner.ts`.
2.  **Collection Association (Inferred):** Create a `Mongo.Collection` instance and associate your defined schema with it for database operations.

## Tool Calls (8 calls, 17,251 tokens)

**Step 1:** `plan({"question":"How do you create a new database model in Rocket.Chat?","intent":"pattern"})` → 80 tokens
**Step 2:** `search({"query":"model definition"})` → 26 tokens
**Step 3:** `search({"query":"schema"})` → 61 tokens
**Step 4:** `graph({"move":"expand","file":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/ee/server/api/abac/sc)` → 272 tokens
**Step 5:** `details({"symbolName":"IBannerSchema","filename":"packages/core-typings/src/IBanner.ts"})` → 267 tokens
**Step 6:** `details({"symbolName":"GenericErrorSchema","filename":"apps/meteor/ee/server/api/abac/schemas.ts"})` → 67 tokens
**Step 7:** `search({"query":"Mongo.Collection"})` → 182 tokens
**Step 8:** `search({"layer":"server","query":"new Mongo.Collection"})` → 27 tokens

## Files Seen In Tool Results (14)

- `apps/meteor/ee/server/api/abac/schemas.ts`
- `packages/core-typings/src/utils.ts`
- `packages/core-typings/src/IBanner.ts`
- `packages/core-typings/src/Ajv.ts`
- `packages/http-router/src/definition.ts`
- `packages/core-typings/src/cloud/Announcement.ts`
- `packages/rest-typings/src/v1/groups/BaseProps.ts`
- `apps/meteor/client/views/marketplace/lib/getManifestFromZippedApp.ts`
- `packages/core-typings/src/cloud/WorkspaceSyncPayload.ts`
- `packages/core-typings/src/cloud/NpsSurveyAnnouncement.ts`
- `packages/core-typings/src/cloud/WorkspaceLicensePayload.ts`
- `apps/meteor/client/meteor/minimongo/MinimongoCollection.ts`
- `apps/meteor/definition/externals/meteor/oauth.d.ts`
- `apps/meteor/client/meteor/minimongo/LocalCollection.ts`
