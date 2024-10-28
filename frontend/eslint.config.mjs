import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'no-restricted-syntax': [
        'error',
        {
            selector: "CallExpression[callee.object.name='test'][callee.property.name='only']",
            message: "Использование 'test.only' запрещено."
        },
        {
            selector: "CallExpression[callee.object.name='it'][callee.property.name='only']",
            message: "Использование 'it.only' запрещено."
        },
        {
            selector: "CallExpression[callee.object.name='describe'][callee.property.name='only']",
            message: "Использование 'describe.only' запрещено."
        }
      ],
    },
  },
];
