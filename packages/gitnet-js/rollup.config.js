import bucklescript from "rollup-plugin-bucklescript";

export default {
  input: "src/main.re",
  output: {
    file: "dist/main.bs.js",
    format: "cjs",
  },
  plugins: [bucklescript()],
};