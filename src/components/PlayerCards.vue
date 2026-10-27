
<script setup>
import '../assets/style.css'
import Cardlayout from './Cardlayout.vue'
import { cardTooltip } from '../data/tooltips.js'
import { effectClasses, heeftlockeffect } from '../data/effectClasses.js'

defineProps({
    cards: {
        type: Array,
        required: true
    },
    aiTurn: {
        type: Boolean,
        required: true
    },
    lastPlayerCard: {
        type: Object,
        required: false,
        default: () => ({})
    }
})

const emit = defineEmits(['useCard'])

</script>

<template>

    <div class="player-card-area">

        <!-- LAST PLAYED CARD -->
        <div
            v-if="lastPlayerCard.name"
            class="last-player-wrapper"
        >
            <h2>Last Player Card</h2>

            <div :class="['card', lastPlayerCard.type, effectClasses(lastPlayerCard.effect), 'card-modern' ]" :data-tooltip="`${lastPlayerCard.name}\n${cardTooltip(lastPlayerCard)}`" >
                <Cardlayout :card="lastPlayerCard" />
            </div>
        </div>


        <!-- PLAYER CARDS -->
        <div class="cards">
            <div
                v-for="card, index in cards" :key="card.id" :class="[ 'card', card.type, effectClasses(card.effect), 'card-modern', aiTurn ? 'card-disabled' : '' ]"
                :data-tooltip="`${card.name}\n${cardTooltip(card)}`"
                @click="!aiTurn && !heeftlockeffect(card.effect) && emit('useCard', card, index)"
            >
                    <Cardlayout :card="card" />

            </div>

        </div>

    </div>

</template>

<style scoped>
.card-area {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 40px;
    width: 100%;
    flex-wrap: wrap;
}

.last-enemy-wrapper {
    flex-shrink: 0;
    text-align: center;
}

.last-enemy-wrapper h2 {
    margin-top: 0;
    margin-bottom: 15px;
}

.last-enemy-wrapper .card {
    margin: 0 auto;
}

.cards {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    flex-wrap: wrap;
}

.hidden-card {
    text-align: center;
}

.hidden-icon {
    font-size: 45px;
    margin: 15px 0;
}

.hidden-card h3 {
    margin-bottom: 10px;
}

.card-disabled {
    filter: brightness(0.75);
}
</style>
