import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { minify  } from "terser";

export default {
  input: "src/wheel/embed/wheelee.js",
  output: {
    file: "dist/wheelee.js",
    format: "iife",
    name: "WheeleeWidget",
    sourcemap: false,
  },
  plugins: [
    resolve(),
    commonjs(),
    minify(),
  ],
};
