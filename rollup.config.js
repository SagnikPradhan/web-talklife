import commonjsPlugin from "@rollup/plugin-commonjs";
import { nodeResolve as resolvePlugin } from "@rollup/plugin-node-resolve";
import cssPlugin from "rollup-plugin-postcss";
import sucrasePlugin from "@rollup/plugin-sucrase";
import { terser as terserPlugin } from "rollup-plugin-terser";
import servePlugin from "rollup-plugin-serve";
import livereloadPlugin from "rollup-plugin-livereload";

const packageJSON = require("./package.json");
const dev = process.env.ROLLUP_WATCH;

const config = {
  input: packageJSON.main,

  output: {
    file: "public/build/bundle.js",
    format: "iife",
    sourcemap: true,
    globals: { react: "React", "react-dom": "ReactDOM" },
  },

  external: ["react", "react-dom"],

  context: "window",

  plugins: [
    cssPlugin({
      extract: "bundle.css",
      sourceMap: true,
    }),

    commonjsPlugin(),
    resolvePlugin({ extensions: [".mjs", ".js", ".json", ".node", ".jsx"] }),

    sucrasePlugin({
      transforms: ["jsx"],
    }),
  ],
};

if (dev)
  config.plugins.push(
    servePlugin({
      contentBase: "public",
      port: 5000,
    }),
    livereloadPlugin("public/build")
  );

if (!dev) config.plugins.push(terserPlugin());

export default config;
