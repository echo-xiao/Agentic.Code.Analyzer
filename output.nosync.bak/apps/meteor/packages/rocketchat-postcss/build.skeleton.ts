## File: apps/meteor/packages/rocketchat-postcss/build.js

```typescript
import { CssTools } from 'meteor/minifier-css';
import postcss from 'postcss';
import postcssrc from 'postcss-load-config';
import { SourceMapConsumer, SourceMapGenerator } from 'source-map';

let loaded = false;
let postcssConfigPlugins = [];
let postcssConfigParser = null;
let postcssConfigExcludedPackages = [];

const loadPostcssConfig = async () => {
    /* Implementation Hidden */
};

const isImportFile = ({ _source: { url } }) => /\.import\.css$/.test(url) || /(?:^|\/)imports\//.test(url);

const isInExcludedPackages = (pathInBundle) =>
	postcssConfigExcludedPackages.some((packageName) => pathInBundle.indexOf(`packages/${packageName.replace(':', '_')}/`) > -1);

const handleFileError = (file, error) => {
    /* Implementation Hidden */
};

const getAbstractSyntaxTree = async (file) => {
    /* Implementation Hidden */
};

const mergeCssFiles = async (files) => {
    /* Implementation Hidden */
};

const processFilesForBundle = async (files = [], { minifyMode }) => {
    /* Implementation Hidden */
};

Plugin.registerMinifier({ extensions: ['css'] }, () => ({
	processFilesForBundle,
}));

```