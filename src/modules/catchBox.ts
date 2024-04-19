import { GridRowIndeces } from '../constants/constants.js';
import { AppStateInterface } from '../types/types.js';

// Catch the first available box
const catchBox = (AppState: AppStateInterface): void => {
    for (let y = GridRowIndeces.NextToLast; 0 <= y; y--) {
        if (AppState.explodedBoxes.filter(obj => obj.y === y && obj.x === AppState.arrowIndex).length) break;

        if (AppState.gridArray[y][AppState.arrowIndex] === null) {
            continue;
        } else {
            AppState.coughtBox = AppState.gridArray[y][AppState.arrowIndex];
            AppState.gridArray[y][AppState.arrowIndex] = null;
            AppState.coughtBoxFrom = { y: y, x: AppState.arrowIndex }
            break;
        }
    }
    // console.clear();
    // console.table(gridArray);
}

export default catchBox;