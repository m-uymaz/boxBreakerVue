<template>
    <div v-bind:class="`
        ${isArrow ? 'arrow' : ''}
        ${isOnArrowIndex ? 'box-selected' : 'box'}
        ${isBlinking ? 'soon-to-explode' : ''}
        ${isExploding ? 'box-explotion' : ''}
        `" v-bind:style="{
            backgroundColor:
                isArrow ? coughtBox || ALICEBLUE
                    :
                    rgb || ALICEBLUE
        }">
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { ALICEBLUE } from '../constants/constants';
const props = defineProps<{
    rgb: string | null
    isOnArrowIndex: boolean
    isArrow: boolean
    coughtBox: string | null
    boxN: number
    isBlinking: boolean
}>()

const isExploding: Ref<boolean> = ref(false);

</script>

<style scoped>
.box {
    border: 1px solid black;
    width: 50px;
    height: 50px;
}

.box-selected {
    border: 3px solid black;
    width: 46px;
    height: 46px;
}

.arrow {
    background-size: 90%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('arrow_up.png');

    animation: arrowAnimation 0.6s infinite;
}

@keyframes arrowAnimation {
    50% {
        background-position-y: 1%;
    }
}

.box-explotion {
    animation: explotion 0.2s linear;
}

@keyframes explotion {
    0% {
        background-image: url('/explotion.webp');
        background-size: contain;
    }

    100% {
        background-image: none;
    }
}

.soon-to-explode {
    animation: blinking-box 0.2s infinite;
}

@keyframes blinking-box {
    0% {
        opacity: 0.5;
    }

    33% {
        opacity: 1;
    }

    66% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}
</style>