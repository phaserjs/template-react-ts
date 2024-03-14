import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    map: Phaser.Tilemaps.Tilemap;
    objectLayer: Phaser.Tilemaps.TilemapLayer;
    groundLayer: Phaser.Tilemaps.TilemapLayer;
    controls: Phaser.Cameras.Controls.FixedKeyControl;
    preDrawTileIndex: number;

    constructor() {
        super("Game");
    }

    onClick() {
        console.log(1);
        // console.log(pointer);
        // const worldPoint = this.input.activePointer.positionToCamera(
        //     this.cameras.main
        // );
        // const tileX = this.groundLayer.worldToTileX(worldPoint.x);
        // const tileY = this.groundLayer.worldToTileY(worldPoint.y);
    }
    onListener() {
        EventBus.on("draw-tile", (index: number) => {
            console.log("draw-tile", index);
            this.preDrawTileIndex = index;
        });
    }

    create() {
        this.onListener();

        this.camera = this.cameras.main;
        // this.controls = new Phaser.Cameras.Controls.FixedKeyControl()

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

    update(time: number, delta: number): void {
        // this.controls.update(delta);

        const worldPoint = this.input.activePointer.positionToCamera(
            this.cameras.main
        ) as Phaser.Math.Vector2;

        const pointerTileXY = this.map.worldToTileXY(
            worldPoint.x,
            worldPoint.y
        );

        // this.marker.x = this.map.tileToWorldX(pointerTileX);
        // this.marker.y = this.map.tileToWorldY(pointerTileY);

        if (this.input.manager.activePointer.isDown && pointerTileXY != null) {
            // this.onClick();
            this.map.fill(
                this.preDrawTileIndex,
                pointerTileXY.x,
                pointerTileXY.y,
                1,
                1
            );
        }
    }
}
