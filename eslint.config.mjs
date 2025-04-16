import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends("next/core-web-vitals"),
  {
    plugins: {
      prettier,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "prettier/prettier": "warn",
      "@next/next/no-sync-scripts": "off",
      "react/no-find-dom-node": "off",
    },
  },
  {
    ignores: [
      "**/temp.js",
      ".next",
      "node_modules",
      "dist",
      "build",
      "coverage",
    ],
  },
];
