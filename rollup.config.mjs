import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";

export default {
  input: "src/car-info-card.js",
  output: {
    file: "dist/car-info-card.js",
    format: "es",
    inlineDynamicImports: true,
  },
  plugins: [resolve(), json(), terser({ format: { comments: false } })],
};
