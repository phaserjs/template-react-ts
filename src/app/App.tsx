import { Math as PhaserMath } from "phaser";
import { useRef, useState } from "react";

import classNames from "#/app/App.module.css";
import { MainMenu } from "#/game/scenes/MainMenu";
import { IRefPhaserGame, PhaserGame } from "#/phaser-game/PhaserGame";

const App = () => {
  // The sprite can only be moved in the MainMenu Scene
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  // References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

  const changeScene = () => {
    if (!phaserRef.current) {
      return;
    }

    const scene = phaserRef.current.scene as MainMenu;
    scene.changeScene();
  };

  const moveSprite = () => {
    if (!phaserRef.current) {
      return;
    }

    const scene = phaserRef.current.scene as MainMenu;

    if (scene.scene.key !== "MainMenu") {
      return;
    }

    // Get the updated logo position
    scene.moveLogo(({ x, y }) => {
      setSpritePosition({ x, y });
    });
  };

  const addSprite = () => {
    if (!phaserRef.current) {
      return;
    }

    const scene = phaserRef.current.scene;

    if (!scene) {
      return;
    }

    // Add more stars
    const x = PhaserMath.Between(64, scene.scale.width - 64);
    const y = PhaserMath.Between(64, scene.scale.height - 64);

    // `add.sprite` is a Phaser GameObjectFactory method and it returns a
    // Sprite Game Object instance
    const star = scene.add.sprite(x, y, "star");

    // ... which you can then act upon. Here we create a Phaser Tween to
    // fade the star sprite in and out.
    // You could, of course, do this from within the Phaser Scene code, but
    // this is just an example showing that Phaser objects and systems can
    // be acted upon from outside of Phaser itself.
    scene.add.tween({
      targets: star,
      duration: 500 + Math.random() * 1000,
      alpha: 0,
      yoyo: true,
      repeat: -1,
    });
  };

  // Event emitted from the PhaserGame component
  const currentScene = (scene: Phaser.Scene) => {
    setCanMoveSprite(scene.scene.key !== "MainMenu");
  };

  return (
    <div className={classNames.app}>
      <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
      <div>
        <div>
          <button className={classNames.button} onClick={changeScene}>
            Change Scene
          </button>
        </div>
        <div>
          <button
            disabled={canMoveSprite}
            className={classNames.button}
            onClick={moveSprite}
          >
            Toggle Movement
          </button>
        </div>
        <div className={classNames.spritePosition}>
          Sprite Position:
          <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
        </div>
        <div>
          <button className={classNames.button} onClick={addSprite}>
            Add New Sprite
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
