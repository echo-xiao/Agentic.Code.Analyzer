# How do you create a new database model in Rocket.Chat?

## Gemini Answer

Of course. Creating a new database model in Rocket.Chat follows a consistent, multi-file pattern. All models are built upon a base class that provides standard MongoDB operations. Here is a step-by-step guide based on the `Users` model and the `BaseRaw` class it extends.

### The Call Chain and File Structure

The process involves defining the model's shape, implementing its logic, and registering it with the application.

`Entry (Define Interfaces) → Implement Class → Export and Register → Use in App`

### Step 1: Define Your Data Interfaces

First, you need to define the TypeScript interfaces for your database document and your model. This ensures type safety across the application.

1.  **Document Interface**: Define the structure of the document that will be stored in MongoDB.
    *   **File**: `packages/core-typings/src/YourModelName.ts`
    *   **Details**: Create an interface (e.g., `IYourModel`) that extends `IRocketChatRecord`. This base interface adds essential fields like `_id`, `_updatedAt`, and `ts`.

    
```typescript
    import { IRocketChatRecord } from './IRocketChatRecord';

    export interface IYourModel extends IRocketChatRecord {
      field1: string;
      field2: number;
    }
    ```


2.  **Model Interface**: Define the interface for the model class itself.
    *   **File**: `packages/model-typings/src/models/IYourModelModel.ts`
    *   **Details**: This interface extends `IBaseModel` and includes any custom methods your model will have.

    
```typescript
    import type { IYourModel } from '@rocket.chat/core-typings';
    import type { IBaseModel } from './IBaseModel';

    export interface IYourModelModel extends IBaseModel<IYourModel> {
      // Add custom method signatures here
      findByField1(field1: string): Promise<IYourModel | null>;
    }
    ```


### Step 2: Implement the Model Class

Next, create the class that interacts with the database. This class contains the core logic for all CRUD (Create, Read, Update, Delete) operations.

*   **File**: `packages/models/src/models/YourModelName.ts`
*   **Details**: The class must extend `BaseRaw<T>`, where `T` is your document interface (e.g., `IYourModel`). The `BaseRaw` class provides all standard database methods out of the box.

`BaseRaw` is defined in **`packages/models/src/models/BaseRaw.ts`**. It provides methods like `findOne`, `find`, `insertOne`, `updateOne`, `deleteOne`, etc., which your new model will automatically inherit.


```typescript
import type { IYourModel } from '@rocket.chat/core-typings';
import type { IYourModelModel } from '@rocket.chat/model-typings';
import type { Db, Collection } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class YourModelNameRaw extends BaseRaw<IYourModel> implements IYourModelModel {
  constructor(db: Db, trash?: Collection<IYourModel>) {
    // 'your_model_collection_name' is the name of the MongoDB collection
    super(db, 'your_model_collection_name', trash);
  }

  // Optional: If you need to define MongoDB indexes
  protected modelIndexes(): IndexDescription[] {
    return [
      { key: { field1: 1 } },
    ];
  }

  // Implement any custom methods defined in your model interface
  async findByField1(field1: string): Promise<IYourModel | null> {
    return this.findOne({ field1 });
  }
}
```


### Step 3: Export and Register Your Model

To make your model accessible to the rest of the application, you must export it through a centralized proxy system.

1.  **Export the Model**: Add your model to the main export file.
    *   **File**: `packages/models/src/index.ts`
    *   **Details**: Use the `proxify` function to export your model interface. The string `'IYourModelModel'` must match the interface name.

    
```typescript
    // ... other model exports
    import type { IYourModelModel } from '@rocket.chat/model-typings';

    export const YourModel = proxify<IYourModelModel>('IYourModelModel');
    ```


2.  **Register the Implementation**: In the server startup sequence, you must register the concrete class (`YourModelNameRaw`) so the proxy can resolve it. This typically happens in a service registration file where all models are instantiated. While the exact file can vary, the principle is to map the interface to the implementation.

## Tool Calls (7 calls, 27,866 tokens)

**Step 1:** `search({"query":"UsersModel"})` → 119 tokens
**Step 2:** `search({"query":"models/Users.ts"})` → 74 tokens
**Step 3:** `graph({"direction":"down","query":"Users"})` → 908 tokens
**Step 4:** `implement({"filename":"packages/models/src/models/Users.ts","symbolName":"Users"})` → 53 tokens
**Step 5:** `implement({"symbolName":"Users","filename":"packages/models/src/models/Users.ts"})` → 53 tokens
**Step 6:** `search({"query":"BaseRaw"})` → 211 tokens
**Step 7:** `implement({"filename":"packages/models/src/models/BaseRaw.ts","symbolName":"BaseRaw"})` → 1137 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 2/3 |
| Tool calls | 7 |
| Total tokens | 27,866 |
| Pass | NO |
