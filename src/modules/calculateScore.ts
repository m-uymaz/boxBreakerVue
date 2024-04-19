const calculateScore = (score: number): string => {
    const zerosArr = ['0', '0', '0', '0', '0', '0'];
    const appScoreString: string = score.toString();

    const scoreToDisplay: string[] = zerosArr.slice(0, zerosArr.length - appScoreString.length);

    const scoreString: string = scoreToDisplay.join('') + appScoreString;

    return scoreString;
}

export default calculateScore;