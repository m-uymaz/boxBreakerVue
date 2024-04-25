<template>
    <div id="left-nav">
        <fieldset>
            <h2>Score: <span id="score-span">{{ score }}</span></h2>
        </fieldset>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import calculateScore from '../modules/calculateScore';
const props = defineProps<{ score: number }>()

const score = computed(() => {
    if (props.score > 0) {
        return calculateScore(props.score)
    } else {
        return '000000'
    }
})
</script>

<style scoped>
#left-nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    height: max-content;
    font-size: 1.5em;
    color: white;
}

@media (max-height: 900px) {
    #left-nav {
        font-size: 1.3em;
    }
}
</style>