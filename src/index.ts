import { Plugin, registerPlugin } from "enmity/managers/plugins";
import Manifest from "./manifest.json";

const ExamplePlugin: Plugin = {
  ...Manifest,
  commands: [],
  patches: [],

  onStart() {

  },

  onStop() {

  }
}

registerPlugin(ExamplePlugin);