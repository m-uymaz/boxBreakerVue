import { GridLengths } from '../constants/constants.js';
import gameOver from "./gameOver.js";
import generateNewLine from "./generateNewLine.js";

import { newLineArray, AppStateInterface } from "../types/types.js";

const moveDown = (AppState: AppStateInterface): void => {
    if (AppState.gameOverState) return;

    if (AppState.checkBoxPositions.length) AppState.checkBoxPositions.forEach(position => position.y++);
    if (AppState.explodedBoxes.length) AppState.explodedBoxes.forEach(position => position.y++);

    const newArray: newLineArray = generateNewLine();
    AppState.gridArray.pop();
    AppState.gridArray.unshift(newArray);

    let lineBlank: boolean = AppState.gridArray[AppState.highestPositionY + 1].filter(box => box !== null).length ? true : false;

    if (lineBlank) AppState.highestPositionY++;
    if (AppState.highestPositionY + 1 === GridLengths.RowLength) gameOver(AppState);

    // console.clear();
    // console.table(gridArray);
}

export default moveDown;