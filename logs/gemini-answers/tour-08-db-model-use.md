# How do you use a database model to query data in Rocket.Chat?

## Gemini Answer

**Example - Querying Users by Role:**

The `findUsersInRoles` method (defined in `packages/models/src/models/Users.ts`) is a specialized query that internally calls the generic `find` method from `BaseRaw`.


```typescript
// packages/models/src/models/Users.ts
class UsersRaw extends BaseRaw<IUser, DefaultFields<IUser>> implements IUsersModel {
  // ... other methods
  findUsersInRoles: IUsersModel['findUsersInRoles'] = (roles: IRole['_id'][] | IRole['_id'], _scope?: null, options?: any) => {
		roles = ([] as string[]).concat(roles);

		const query = {
			roles: { $in: roles },
		};

		return this.find(query, options); // <--- Delegation to BaseRaw.find()
	};
  // ... other methods
}
```


In this example:
1.  `UsersRaw` is the database model for users.
2.  `findUsersInRoles` is a method that takes roles and optional query options.
3.  It constructs a MongoDB query (`{ roles: { $in: roles } }`).
4.  It then calls `this.find(query, options)`, which is the `find` method inherited from `BaseRaw`, to execute the database query and return a cursor to the matching user documents.

**Summary:**

To query data using a database model in Rocket.Chat:
1.  Identify the relevant model class (e.g., `UsersRaw`) in `packages/models/src/models/Users.ts`.
2.  Utilize the provided high-level query methods on the model instance (e.g., `Users.findOneByUsername`, `Users.findUsersInRoles`).
3.  These methods, in turn, leverage the `find` and `findOne` operations inherited from `BaseRaw` to interact with the MongoDB collection.

## Tool Calls (8 calls, 42,977 tokens)

**Step 1:** `search({"query":"Users model"})` → 203 tokens
**Step 2:** `graph({"query":"IUsersModel","direction":"down"})` → 38 tokens
**Step 3:** `search({"query":"Users","layer":"packages"})` → 569 tokens
**Step 4:** `graph({"filename":"packages/models/src/index.ts","direction":"down","depth":2,"query":"Users"})` → 295 tokens
**Step 5:** `implement({"symbolName":"Users","filename":"packages/models/src/index.ts"})` → 53 tokens
**Step 6:** `search({"layer":"packages","query":"UsersRaw"})` → 212 tokens
**Step 7:** `implement({"symbolName":"UsersRaw","filename":"packages/models/src/models/Users.ts"})` → 6775 tokens
**Step 8:** `implement({"filename":"packages/models/src/models/Users.ts","symbolName":"UsersRaw.findUsersInRoles"})` → 47 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 0/6 |
| Symbols hit | 0/2 |
| Tool calls | 8 |
| Total tokens | 42,977 |
| Pass | NO |
