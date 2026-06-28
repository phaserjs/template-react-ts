import { useEffect, useEffectEvent, useLayoutEffect, useRef } from "react";

import { EventBus, GameEvents } from "#/game/event-bus/EventBus";
import StartGame from "#/game/main";

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

interface Props {
  currentActiveScene?: (sceneInstance: Phaser.Scene) => void;
  ref?: React.Ref<IRefPhaserGame>;
}

export const PhaserGame = ({ currentActiveScene, ref }: Props) => {
  const game = useRef<Phaser.Game | null>(null);

  useLayoutEffect(() => {
    if (!game.current) {
      game.current = StartGame("game-container");

      if (typeof ref === "function") {
        ref({ game: game.current, scene: null });
      } else if (ref) {
        ref.current = { game: game.current, scene: null };
      }
    }
  }, [ref]);

  const onSceneReady = useEffectEvent((sceneInstance: Phaser.Scene) => {
    if (typeof currentActiveScene === "function") {
      currentActiveScene(sceneInstance);
    }

    if (typeof ref === "function") {
      ref({ game: game.current, scene: sceneInstance });
    } else if (ref) {
      ref.current = { game: game.current, scene: sceneInstance };
    }
  });

  useEffect(() => {
    EventBus.on(GameEvents.CURRENT_SCENE_READY, onSceneReady);
    return () => {
      EventBus.removeListener(GameEvents.CURRENT_SCENE_READY, onSceneReady);
    };
  }, []);

  return <div id="game-container" />;
};
