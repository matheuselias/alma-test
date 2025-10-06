import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: [
      "coverage/**",
      ".next/**",
      "public/**",
      "next.config.js",
      "next-env.d.ts",
    ],
  },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, React: true },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...compat.config({
    extends: ["next"],
    settings: {
      next: {
        rootDir: ".",
      },
    },
  }),
  {
    files: ["**/*.{jsx,tsx,ts,js}"],
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-console": "warn",
    },
  },
];
export default config;
