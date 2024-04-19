<template>
    <div :tabindex="0" @keydown="keyHandler" id="main">
        <h1 :class="AppState.gameOverState ? 'h1-blinking' : 'h1-none'">GAME OVER</br>!!!</h1>
        <h2 id="combo">Combo <span id="combo-n"></span>!</h2>

        <LeftNav />

        <div id="playground">
            <GridBox v-for="boxN in GRID_BOXES_SIZE" :key="boxN"
                :rgb="AppState.gridArray[rowIndex(boxN)][colIndex(boxN)]"
                :isOnArrowIndex="colIndex(boxN) === AppState.arrowIndex ? true : false"
                :isArrow="colIndex(boxN) === (AppState.arrowIndex) && boxN > LAST_ROW_N_START ? true : false"
                :coughtBox="AppState.coughtBox || null" :boxN="boxN"
                :isBlinking="AppState.blinkingBoxesN.includes(boxN) ? true : false"
                :isExploding="AppState.explodingBoxesN.includes(boxN) ? true : false" />
        </div>

        <RightNav @fall-on="fallOn(AppState)" @fall-off="fallOff(AppState)" />
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { GRID_BOXES_SIZE, LAST_ROW_N_START, KeyboardInputs } from './constants/constants.js';
import { generateInitialGrid } from './modules/gridArray';
import { colIndex, rowIndex } from './modules/findRowColIndex.js';
import moveArrow from './modules/playerMovement.js';
import moveDown from './modules/moveDown.js';
import catchBox from './modules/catchBox.js';
import throwBox from './modules/throwBox.js';
import { floodFill, fillEmptyGridSpaces } from './modules/floodFillFuncs.js';
import { fallOn, fallOff } from './modules/fallOptions.js';
// Components
import GridBox from './components/GridBox.vue';
import LeftNav from './components/LeftNav.vue';
import RightNav from './components/RightNav.vue';
import { AppStateInterface } from './types/types.js';

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
            // renderArrow(KeyboardInputs.ArrowLeft);
            break;
        case KeyboardInputs.ArrowRight:
            moveArrow(AppState, KeyboardInputs.ArrowRight);
            // renderArrow(KeyboardInputs.ArrowRight);
            break;
        case KeyboardInputs.Space:
            if (AppState.coughtBox) {
                throwBox(AppState);
                // rerenderThrowBox();


                floodFillChain(AppState.thrownBox!);
            } else {
                catchBox(AppState);
                // rerenderCatchBox();
            }
            break;
        default:
            if (AppState.fall) return;
            moveDown(AppState);
            // rerenderGrid();
            break;
    }
};

async function floodFillChain(position: { y: number, x: number }): Promise<void> {
    // Flood Fill changes the state instantaniously
    floodFill(AppState, position);

    clearPrevTimeouts();

    if (!AppState.explodedBoxes.length) return;

    // renderBlinking();
    // await explodeDelay(500);
    await fillEmptyGridSpacesDelay(500);
    // renderScore();

    AppState.checkBoxPositions.forEach((newPosition) => {
        floodFillChain(newPosition);
    });
}

function clearPrevTimeouts(): void {
    AppState.timeouts.explodeTimeout && clearTimeout(AppState.timeouts.explodeTimeout);
    AppState.timeouts.explodeTimeout = null;

    AppState.timeouts.rerenderTimeout && clearTimeout(AppState.timeouts.rerenderTimeout);
    AppState.timeouts.rerenderTimeout = null;
}

function fillEmptyGridSpacesDelay(time: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            const timeout = setTimeout(() => {
                fillEmptyGridSpaces(AppState);
                AppState.explodingBoxesN = AppState.blinkingBoxesN;
                AppState.blinkingBoxesN = [];

                console.log('Exploding boxes N: ', AppState.explodingBoxesN);

                resolve();
            }, time);

            AppState.timeouts.rerenderTimeout = timeout;
        } catch (err) {
            reject(console.error(err));
        }
    });
}

function explodeDelay(time: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            const timeout = setTimeout(() => {
                console.log('renderExplotions()');
                AppState.explodedBoxes.forEach((position) => {
                    // renderExplotions(position);
                });
                resolve();
            }, time);

            AppState.timeouts.explodeTimeout = timeout;
        } catch (err) {
            reject(console.error(err));
        }
    });
}

</script>

<style scoped>
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

#main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
}

.h1-blinking {
    background-color: none;
    display: block;
    animation: blink 1s linear infinite;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;

    font-size: 4em;
    text-align: center;
}

.h1-none {
    display: none;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>
