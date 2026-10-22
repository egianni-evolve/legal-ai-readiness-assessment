import js from "@eslint/js";
import tseslint from "typescript-eslint";

// The Next preset currently depends on unpatched braces (GHSA-vfj7-8cjw-p6xm).
// Use the ESLint and TypeScript recommended rules without that dependency chain.
export default tseslint.config(
  { ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
);
