import { fixupConfigRules } from "@eslint/compat";

import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

const eslintConfig = [
	{
		ignores: [
			"**/dist",
			"**/vite.config.ts",
			"**/node_modules",
			"**/.next",
			"**/.DS_Store",
			"**/dist",
			"**/dist-ssr",
			"**/*.local",
			"**/.eslintcache",
			"**/*.spec.ts",
			"**/*.d.ts",
			"**/*.md",
			"**/*.less",
			"**/*.css",
			"**/*.json",
		],
	},
	...fixupConfigRules(
		compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended")
	),
	{
		plugins: {},

		languageOptions: {
			globals: {
				...globals.browser,
			},

			parser: tsParser,
			ecmaVersion: 5,
			sourceType: "script",

			parserOptions: {
				project: "./tsconfig.eslint.json",
			},
		},

		settings: {},

		rules: {
			eqeqeq: "error",
			"no-implicit-coercion": "error",
			"consistent-return": "error",
			semi: "error",
			quotes: ["error", "double"],

			indent: [
				"error",
				"tab",
				{
					SwitchCase: 1,
				},
			],
		},
	},
];

export default eslintConfig;
