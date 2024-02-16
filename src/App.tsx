import { useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import { MainMenu } from "./game/scenes/MainMenu";

function App()
{
    const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
    const [canMoveLogo, setCanMoveLogo] = useState(true);

    // Phaser game instance
    const [scene, setScene] = useState<Phaser.Scene>();

    const phaser_ref = useRef<IRefPhaserGame | null>(null);

    // Update the current active scene
    const setCurrentActiveScene = (scene: Phaser.Scene) =>
    {
        setScene(scene);
        setCanMoveLogo(scene.scene.key !== 'MainMenu');
    }

    const changeScene = () =>
    {
        if (scene)
        {
            (scene as MainMenu).changeScene();
        }
    }

    const moveLogo = () =>
    {
        if (scene && scene.scene.key === 'MainMenu')
        {
            // The MainMenu
            (scene as MainMenu)
                .moveLogo((position) =>
                {
                    setLogoPosition({ x: position.x, y: position.y });
                });
        }
    }

    const addStars = () =>
    {
        if (scene)
        {
            // Add more stars
            const x = Phaser.Math.Between(100, scene.scale.width - 100);
            const y = Phaser.Math.Between(100, scene.scale.height - 100);

            scene.add.image(x, y, 'star');
        }
    }

    return (
        <div id="app">
            <PhaserGame ref={phaser_ref} currentActiveScene={setCurrentActiveScene} />
            <div>
                <div>
                    <button className="button-change-scene" onClick={changeScene}>Change Scene</button>
                </div>
                <div>
                    <button disabled={canMoveLogo} className="button-change-scene" onClick={moveLogo}>Move main Logo</button>
                </div>
                <div className="margin-left">
                    <span>Logo Position:</span>
                    <pre>{`{ x: ${logoPosition.x}, y: ${logoPosition.y} }`}</pre>
                </div>
                <div>
                    <button className="button-change-scene" onClick={addStars}>Add stars</button>
                </div>
            </div>
        </div>
    )
}

export default App
