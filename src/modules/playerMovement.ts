import { ARROW, KeyboardInputs, GridRowIndeces, GridColumsIndeces } from '../constants/constants.js';
import { AppStateInterface } from '../types/types.js';

const moveArrow = (AppState: AppStateInterface, direction: string): void => {
        if (
        direction === KeyboardInputs.ArrowLeft && AppState.arrowIndex === GridColumsIndeces.First
        ||
        direction === KeyboardInputs.ArrowRight && AppState.arrowIndex === GridColumsIndeces.Last
    ) return;

    AppState.gridArray[GridRowIndeces.Last][AppState.arrowIndex] = null;

    direction === KeyboardInputs.ArrowRight ? AppState.arrowIndex++ : AppState.arrowIndex--;
    AppState.gridArray[GridRowIndeces.Last][AppState.arrowIndex] = ARROW;
    
    // console.clear()
    // console.table(AppState.gridArray);
}

export default moveArrow;