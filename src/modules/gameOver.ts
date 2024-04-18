import { AppStateInterface } from "../types/types";

const gameOver = (AppState: AppStateInterface): void => {
    AppState.gameOverState = true;
}

export default gameOver;