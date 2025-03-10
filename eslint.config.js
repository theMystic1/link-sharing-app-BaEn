import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    env: {
      browser: false,
      node: true,
      es2021: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      project: "./tsconfig.json",
    },
    plugins: ["@typescript-eslint"],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    rules: {
      "no-console": "warn",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
];
