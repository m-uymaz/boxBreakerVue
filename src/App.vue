<template>
    <!--:tabindex="0" @keydown="keyHandler"-->
    <div id="main">
        <GameOverBanner :isGameOver="AppState.gameOverState" />
        <ComboBanner />

        <LeftNav :score="AppState.score" />

        <div id="playground">
            <GridBox v-for="boxN in GRID_BOXES_SIZE" :key="boxN" :boxN="boxN"
                :rgb="AppState.gridArray[rowIndex(boxN)][colIndex(boxN)]"
                :isOnArrowIndex="colIndex(boxN) === AppState.arrowIndex ? true : false"
                :isArrow="colIndex(boxN) === (AppState.arrowIndex) && boxN > LAST_ROW_N_START ? true : false"
                :coughtBoxColor="AppState.coughtBox || null"
                :isBlinking="AppState.blinkingBoxesN.includes(boxN) ? true : false"
                :isExploding="AppState.explodingBoxesN.includes(boxN) ? true : false" />
        </div>

        <RightNav @fall-on="fallOn(AppState)" @fall-off="fallOff(AppState)" />
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { GRID_BOXES_SIZE, LAST_ROW_N_START, KeyboardInputs } from './constants/constants.js';
import { AppStateInterface } from './types/types.js';
// Modules
import { generateInitialGrid } from './modules/gridArray';
import { colIndex, rowIndex } from './modules/findRowColIndex.js';
import moveArrow from './modules/playerMovement.js';
import moveDown from './modules/moveDown.js';
import catchBox from './modules/catchBox.js';
import throwBox from './modules/throwBox.js';
import { floodFill } from './modules/floodFillFuncs.js';
import { fillEmptyGridSpacesDelay, explodeDelay, clearPrevTimeouts } from './modules/timeouts.js';
import { fallOn, fallOff } from './modules/fallOptions.js';
// Components
import GridBox from './components/GridBox.vue';
import LeftNav from './components/LeftNav.vue';
import RightNav from './components/RightNav.vue';
import GameOverBanner from './components/GameOverBanner.vue';
import ComboBanner from './components/ComboBanner.vue';

onMounted(() => {
    window.addEventListener('keydown', keyHandler)
})

const AppState: AppStateInterface = reactive({
    gridArray: generateInitialGrid(),
    timeouts: {
        explodeTimeout: null,
        rerenderTimeout: null,
    },
    checkBoxPositions: [],
    explodedBoxes: [],
    blinkingBoxesN: [],
    explodingBoxesN: [],
    highestPositionY: 1,
    arrowIndex: 5,
    coughtBox: null,
    coughtBoxFrom: null,
    thrownBox: null,
    gameOverState: false,
    fall: false,
    interval: null,
    countMilliseconds: 0,
    score: 0,
})

const keyHandler = (e: KeyboardEvent) => {
    if (AppState.gameOverState) return;
    switch (e.code) {
        case KeyboardInputs.ArrowLeft:
            moveArrow(AppState, KeyboardInputs.ArrowLeft);
            break;
        case KeyboardInputs.ArrowRight:
            moveArrow(AppState, KeyboardInputs.ArrowRight);
            break;
        case KeyboardInputs.Space:
            if (AppState.coughtBox) {
                throwBox(AppState);

                floodFillChain(AppState.thrownBox!);
            } else {
                catchBox(AppState);
            }
            break;
        default:
            if (AppState.fall) return;

            moveDown(AppState);
            break;
    }
};

async function floodFillChain(position: { y: number, x: number }): Promise<void> {
    // Flood Fill changes the state instantaniously
    floodFill(AppState, position)

    clearPrevTimeouts(AppState)

    if (!AppState.explodedBoxes.length) return

    await explodeDelay(AppState, 500)
    await fillEmptyGridSpacesDelay(AppState, 300)

    AppState.checkBoxPositions.forEach((newPosition) => {
        floodFillChain(newPosition)
    })
}
</script>

<style scoped>
#main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
}

#playground {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    position: relative;

    max-width: 520px;
    max-height: 1040px;
    border: 1px solid black;
    background-color: aliceblue;
}

@media (min-width: 576px) and (max-width: 991px) {
    #playground {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        position: relative;

        max-width: 420px;
        max-height: 840px;
        border: 1px solid black;
        background-color: aliceblue;
    }
}

#combo {
    display: none;
    color: white;
    font-family: cursive;
    font-style: italic;
    font-size: 2em;

    text-align: center;

    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
}
</style>
