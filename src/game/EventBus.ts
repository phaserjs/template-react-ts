import { Events } from 'phaser';

// Used to emit events between components, HTML and Phaser scenes
export const EventBus = new Events.EventEmitter();