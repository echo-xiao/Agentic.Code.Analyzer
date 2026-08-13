## File: packages/message-parser/loaders/pegtransform.js

```typescript
const pegjs = require('peggy');

module.exports = {
	process: (content) => ({
		code: pegjs.generate(content, {
			output: 'source',
			format: 'commonjs',
		}),
	}),
};

```