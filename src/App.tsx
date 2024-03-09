import { useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import { MainMenu } from "./game/scenes/MainMenu";
import { Game } from "./game/scenes/Game";

function App() {
    // The sprite can only be moved in the MainMenu Scene
    const [canMoveSprite, setCanMoveSprite] = useState(true);

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

    const [cursorX, setCursorX] = useState(0);
    const [cursorY, setCursorY] = useState(0);

    const changeScene = () => {
        if (phaserRef.current) {
            const scene = phaserRef.current.scene as Game;

            if (scene) {
                scene.changeScene();
            }
        }
    };

    const moveSprite = () => {
        if (phaserRef.current) {
            const scene = phaserRef.current.scene as MainMenu;

            if (scene && scene.scene.key === "MainMenu") {
                // Get the update logo position
                scene.moveLogo(({ x, y }) => {
                    setSpritePosition({ x, y });
                });
            }
        }
    };

    const showCursor = (e: any) => {
        console.log(e);
        setCursorX(e.clientX);
        setCursorY(e.clientY);
    };

    const addSprite = () => {
        if (phaserRef.current) {
            const scene = phaserRef.current.scene;

            if (scene) {
                // Add more stars
                const x = Phaser.Math.Between(64, scene.scale.width - 64);
                const y = Phaser.Math.Between(64, scene.scale.height - 64);

                //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
                const star = scene.add.sprite(x, y, "star");

                //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
                //  You could, of course, do this from within the Phaser Scene code, but this is just an example
                //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
                scene.add.tween({
                    targets: star,
                    duration: 500 + Math.random() * 1000,
                    alpha: 0,
                    yoyo: true,
                    repeat: -1,
                });
            }
        }
    };

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {
        setCanMoveSprite(scene.scene.key !== "MainMenu");
    };

    return (
        <div id="app">
            <div className="topBar"></div>
            <div className="mainContent">
                <div className="gameArea">
                    <PhaserGame
                        ref={phaserRef}
                        currentActiveScene={currentScene}
                    />
                </div>
                <div>
                    <div className="tilePalette">
                        {/* <span>格子列表</span> */}
                        <div onClick={showCursor}>
                            <img src="./assets/tilemaps/primal_plateau/grass.png" />
                        </div>
                        <img
                            className="cursorImg"
                            src="./assets/cursor.png"
                            style={{ left: cursorX, top: cursorY }}
                        ></img>
                    </div>
                </div>

                {/* <div>
                    <div>
                        <button className="button" onClick={changeScene}>
                            Change Scene
                        </button>
                    </div>
                    <div>
                        <button
                            disabled={canMoveSprite}
                            className="button"
                            onClick={moveSprite}
                        >
                            Toggle Movement
                        </button>
                    </div>
                    <div className="spritePosition">
                        Sprite Position:
                        <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
                    </div>
                    <div>
                        <button className="button" onClick={addSprite}>
                            Add New Sprite
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default App;
