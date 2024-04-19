import { GridLengths } from '../constants/constants.js';
import gameOver from "./gameOver.js";
import generateNewLine from "./generateNewLine.js";

import { newLineArray, AppStateInterface } from "../types/types.js";

const moveDown = (AppState: AppStateInterface): void => {
    if (AppState.gameOverState) return;

    // THIS DOES NOT SEEM RIGHT!!!!
    if (AppState.checkBoxPositions.length) AppState.checkBoxPositions.map(position => position.y++);
    if (AppState.explodedBoxes.length) AppState.explodedBoxes.map(position => position.y++);
    if (AppState.blinkingBoxesN.length) AppState.blinkingBoxesN = AppState.blinkingBoxesN.map(boxN => boxN += 10);
    
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