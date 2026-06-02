# How do you create a new database model in Rocket.Chat?

## Gemini Answer

To create a new database model in Rocket.Chat, you will follow a pattern of defining an interface for your data and then creating a class that extends `BaseRaw` (the base class for all database models). This class will interact with your MongoDB collection.

Here's a breakdown of the steps:

**Call Chain:** You won't find a direct call chain for "creating" a model, as it's a structural definition. However, the `MessagesRaw` model serves as an excellent example.

1.  **Define Your Model's Interface:**
    *   First, define a TypeScript interface for your new data model. This interface should extend `IRocketChatRecord` (found in `packages/models/src/IRocketChatRecord.ts`) to include common fields like `_id` and `_updatedAt`.
    *   **Example:**
        
```typescript
        // packages/models/src/your-new-model/IYourNewModel.ts
        import { IRocketChatRecord } from '../IRocketChatRecord';

        export interface IYourNewModel extends IRocketChatRecord {
          name: string;
          description: string;
          createdAt: Date;
          // Add other fields specific to your model
        }
        ```


2.  **Create Your Model Class:**
    *   Create a new class for your model that extends `BaseRaw<YourNewModelInterface>`.
    *   The `BaseRaw` class (located in `packages/models/src/BaseRaw.ts`) provides fundamental database operations (find, insert, update, delete).
    *   In the constructor of your new class, call `super(db, 'your-collection-name', trash)`.
        *   `db`: The MongoDB `Db` instance.
        *   `'your-collection-name'`: The name of the MongoDB collection for this model.
        *   `trash`: An optional `Collection<RocketChatRecordDeleted<YourNewModelInterface>>` for soft-deleting documents (e.g., if you need a trash collection for your model).
    *   **Example:**
        
```typescript
        // packages/models/src/your-new-model/YourNewModel.ts
        import { Db, Collection, IndexDescription } from 'mongodb';
        import { BaseRaw } from '../BaseRaw'; // Path to BaseRaw.ts
        import { IYourNewModel } from './IYourNewModel';
        import { RocketChatRecordDeleted } from '../IRocketChatRecord';

        export class YourNewModelRaw extends BaseRaw<IYourNewModel> {
          constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IYourNewModel>>) {
            super(db, 'your-new-collection-name', trash);
          }

          // Optional: Define MongoDB indexes
          protected override modelIndexes(): IndexDescription[] {
            return [
              { key: { name: 1 }, unique: true }, // Example index
            ];
          }

          // Add custom methods for querying or manipulating YourNewModel documents
          async findByName(name: string): Promise<IYourNewModel | null> {
            return this.findOne({ name });
          }

          async createYourNewDocument(name: string, description: string): Promise<IYourNewModel> {
            const newDoc: Omit<IYourNewModel, '_id' | '_updatedAt'> = {
              name,
              description,
              createdAt: new Date(),
            };
            const result = await this.insertOne(newDoc);
            return { _id: result.insertedId.toHexString(), _updatedAt: new Date(), ...newDoc };
          }
        }
        ```


**Key Files Involved:**

*   `packages/models/src/IRocketChatRecord.ts`: Defines the base interface for all Rocket.Chat records.
*   `packages/models/src/BaseRaw.ts`: The abstract base class that provides common database operations for models.
*   `packages/models/src/models/Messages.ts`: (Example) Shows a concrete implementation of a database model, `MessagesRaw`, extending `BaseRaw`.

By following this structure, you can define new database models that integrate seamlessly with Rocket.Chat's data layer.

## Tool Calls (4 calls, 38,172 tokens)

**Step 1:** `search({"layer":"packages","query":"BaseDbModel"})` → 14 tokens
**Step 2:** `search({"layer":"packages","query":"Collection"})` → 168 tokens
**Step 3:** `search({"query":"MessagesRaw","layer":"packages"})` → 27 tokens
**Step 4:** `implement({"symbolName":"MessagesRaw","filename":"packages/models/src/models/Messages.ts"})` → 10066 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 2/3 |
| Tool calls | 4 |
| Total tokens | 38,172 |
