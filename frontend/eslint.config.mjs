import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off", // Disable prop-types rule
      "no-console": "warn", // Warn when console statements are used
      "eqeqeq": ["error", "always"], // Enforce strict equality
      "indent": ["error", 2], // Enforce 2-space indentation
      "jsx-quotes": ["error", "prefer-double"], // Prefer double quotes for JSX attributes
    },
  }
];