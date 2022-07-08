import { defineConfig, Plugin } from "rollup";
import { swc } from "rollup-plugin-swc3";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

import { writeFileSync } from "fs";

import Manifest from "./src/manifest.json";

const pluginName = Manifest.name;

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      file: `dist/${pluginName}.js`,
      format: "cjs",
      strict: false
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    swc({
      jsc: {
        minify: {
          compress: true
        },
        parser: {
          "syntax": "typescript",
          "tsx": true
        },
        target: 'es2022',
        baseUrl: './src/'
      }
    }),
    copyManifest(),
  ]
});

function copyManifest(options = {}): Plugin {
  return {
    name: 'plugin-manifest',
    writeBundle: (err) => {
      writeFileSync(`dist/${pluginName}.json`, JSON.stringify(Manifest, null, "\t"));
    }
  }
};