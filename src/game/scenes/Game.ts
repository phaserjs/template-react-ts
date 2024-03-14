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

    onListener() {
        EventBus.on("draw-tile", (index: number) => {
            this.preDrawTileIndex = index;
        });
    }

    create() {
        this.onListener();

        // this.camera = this.cameras.main;
        // this.controls = new Phaser.Cameras.Controls.FixedKeyControl()

        this.map = this.make.tilemap({
            tileWidth: 32,
            tileHeight: 32,
            width: 40,
            height: 23,
        });

        // Load tilemap
        const tilesPrimalPlateauGrass = this.map.addTilesetImage(
            "tiles-primal_plateau-grass"
        ) as Phaser.Tilemaps.Tileset;

        const tilesPrimalPlateauProps = this.map.addTilesetImage(
            "tiles-primal_plateau-props"
        ) as Phaser.Tilemaps.Tileset;

        this.groundLayer = this.map.createBlankLayer("Ground Layer", [
            tilesPrimalPlateauGrass,
        ]) as Phaser.Tilemaps.TilemapLayer;

        this.objectLayer = this.map.createBlankLayer(
            "Object Layer",
            tilesPrimalPlateauProps
        ) as Phaser.Tilemaps.TilemapLayer;

        // Init ground
        this.groundLayer.fill(0, 0, 0, this.map.width, this.map.height);

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("GameOver");
    }

    update(): void {
        // Update cursor position (e.g. tile selected box)
        const worldPoint = this.input.activePointer.positionToCamera(
            this.cameras.main
        ) as Phaser.Math.Vector2;

        const pointerTileXY = this.map.worldToTileXY(
            worldPoint.x,
            worldPoint.y
        );

        // User input
        if (this.input.manager.activePointer.primaryDown)
            this.onPrimaryDown(pointerTileXY);
    }

    onPrimaryDown(pointerTileXY: Phaser.Math.Vector2 | null) {
        // Create Action: Draw Tile
        if (pointerTileXY != null) {
            // Tile index transform & Draw tile
            const tilesetColumns = this.groundLayer.tileset[0].columns;
            const tilesetRows = this.groundLayer.tileset[0].rows;
            const tileColumn = this.preDrawTileIndex % 16;
            const tileRow = Math.floor(this.preDrawTileIndex / 16);
            const finDrawTileIndex = tileRow * tilesetColumns + tileColumn;
            if (
                tileColumn < tilesetColumns &&
                finDrawTileIndex < tilesetColumns * tilesetRows
            ) {
                this.groundLayer.fill(
                    finDrawTileIndex,
                    pointerTileXY.x,
                    pointerTileXY.y,
                    1,
                    1
                );
            }
        }
    }
}
