import AppState from './AppState/AppState.js';

const calculateScore = (): string => {
    const zerosArr = ['0', '0', '0', '0', '0', '0'];
    const appScoreString: string = AppState.score.toString();

    const scoreToDisplay: string[] = zerosArr.slice(0, zerosArr.length - appScoreString.length);

    const score: string = scoreToDisplay.join('') + appScoreString;

    return score;
}

export default calculateScore;