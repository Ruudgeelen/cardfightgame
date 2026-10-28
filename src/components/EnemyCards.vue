<script setup>
import '../assets/style.css'
import Cardlayout from './Cardlayout.vue'
import { getCardType } from '../data/cardTypes.js'
import { cardTooltip, cardTooltiphide } from '../data/tooltips.js'
import { effectClasses, heeftlockeffect, heeftburneffect, heeftfreezeEffect, heeftgambleEffect } from '../data/effectClasses.js'
import { cardStatDescription } from '../data/tooltips.js'


defineProps({
    cards: {
        type: Array,
        required: true
    },
    settings: {
        type: Boolean,
        required: true
    },
    lastEnemyCard: {
        type: Object,
        required: false,
        default: () => ({})
    }
})

</script>

<template>
    <div class="card-area">

        <!-- LAST ENEMY CARD -->
        <div
            v-if="lastEnemyCard.name"
            class="last-enemy-wrapper"
        >

            <h2>Last Enemy Card</h2>

            <div
                :class="[
                    'card',
                    lastEnemyCard.type,
                    effectClasses(lastEnemyCard.effect),
                    'card-modern'
                ]"
                :data-tooltip="`${lastEnemyCard.name}\n${cardTooltip(lastEnemyCard)}`"
            >

                <Cardlayout :card="lastEnemyCard" />

            </div>

        </div>


        <!-- ENEMY CARDS -->
        <div class="cards">

            <div
                v-for="card, index in cards"
                :key="card.id"
                :class="[
                    'card',
                    card.faketype ? card.faketype : card.type, 
                    effectClasses(card.effect),
                    'card-modern'
                ]"
                :data-tooltip="`${card.name}\n${cardTooltip(card)}`"
            >

                <!-- SHOW CARDS -->
                <div v-if="settings">

                    <Cardlayout :card="card" />

                </div>


                <!-- HIDE CARDS -->
                <div v-else class="hidden-card">
                    <div class="card-tooltip" role="tooltip">
                        <span>{{ cardTooltiphide(card) }}</span>
                    </div>
                    <div v-if="card.faketype" class="hidden-icon">
                         {{ getCardType(card.faketype).icon }}
                    </div>
                    <div v-else class="hidden-icon">
                        {{ getCardType(card.type).icon }}
                    </div>
                    <div class="card-stats">
                        <p v-if="heeftgambleEffect(card.effect)" class="effect-stat" :title="cardStatDescription(card, 'effect')"><span>🎲</span><b>{{  }}</b></p>
                        <p v-if="heeftfreezeEffect(card.effect)" class="effect-stat" :title="cardStatDescription(card, 'effect')"><span>❄️</span><b>{{  }}</b></p>
                        <p v-if="heeftlockeffect(card.effect)" class="effect-stat" :title="cardStatDescription(card, 'effect')"><span>🔒</span><b>{{  }}</b></p>
                        <p v-if="heeftburneffect(card.effect)" class="effect-stat" :title="cardStatDescription(card, 'effect')"><span>🔥</span><b>{{ }}</b></p>
                    </div>
                 </div>

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
</style>
