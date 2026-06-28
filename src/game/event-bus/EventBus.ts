import { Events } from "phaser";

export enum GameEvents {
  CURRENT_SCENE_READY = "current-scene-ready",
}

// Used to emit events between components, HTML and Phaser scenes
export const EventBus = new Events.EventEmitter();
