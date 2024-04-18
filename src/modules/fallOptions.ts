import { AppStateInterface } from "../types/types";

import moveDown from "./moveDown";

const fallOn = (AppState: AppStateInterface) => {
    if (AppState.fall) return;
    AppState.fall = true;
    AppState.interval = setInterval(() => {
        if (
            !AppState.fall
            ||
            AppState.timeouts.explodeTimeout
            ||
            AppState.timeouts.rerenderTimeout
        ) return;

        if (AppState.gameOverState && AppState.interval) {
            clearInterval(AppState.interval);
            AppState.interval = null;
        }

        if (AppState.countMilliseconds === 2500) {
            moveDown(AppState);
            AppState.countMilliseconds = 0;
        }

        AppState.countMilliseconds += 100;
    }, 100);
}

const fallOff = (AppState: AppStateInterface) => {
    if (!AppState.fall) return;
    AppState.fall = false;
    if (AppState.interval) {
        clearInterval(AppState.interval);
        AppState.interval = null;
        AppState.countMilliseconds = 0;
    }
}

export {fallOn, fallOff}

