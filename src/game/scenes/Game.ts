import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    map: Phaser.Tilemaps.Tilemap;
    objectLayer: Phaser.Tilemaps.TilemapLayer;
    groundLayer: Phaser.Tilemaps.TilemapLayer;

    constructor() {
        super("Game");
    }

    create() {
        this.camera = this.cameras.main;

        this.map = this.make.tilemap({
            tileWidth: 32,
            tileHeight: 32,
            width: 40,
            height: 23,
        });

        const tilesPrimalPlateauGrass = this.map.addTilesetImage(
            "tiles-primal_plateau-grass"
        ) as Phaser.Tilemaps.Tileset;

        this.groundLayer = this.map.createBlankLayer(
            "Ground Layer",
            tilesPrimalPlateauGrass
        ) as Phaser.Tilemaps.TilemapLayer;

        this.groundLayer.fill(0, 0, 0, this.map.width, this.map.height);



        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
