import { AUTO, Game } from "phaser";

import { Boot } from "#/game/scenes/Boot";
import { Game as MainGame } from "#/game/scenes/Game";
import { GameOver } from "#/game/scenes/GameOver";
import { MainMenu } from "#/game/scenes/MainMenu";
import { Preloader } from "#/game/scenes/Preloader";

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#028af8",
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
};

const StartGame = (parent: string) => new Game({ ...config, parent });

export default StartGame;
