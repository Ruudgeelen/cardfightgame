<script setup>
import { GetCards } from '../data/card.js'
import { ref, onMounted } from 'vue'
import { getCardType } from '../data/cardTypes.js'
import { cardTooltip } from '../data/tooltips.js'
import Cardlayout from '../components/Cardlayout.vue'

onMounted(() => {
        if (localStorage.getItem('Reload') === 'true') {
            localStorage.removeItem('Reload')
        }
        else {
            localStorage.setItem('Reload', 'true')
            // location.reload()
        }
})
const allCards = GetCards()

</script>

<template>
    <div class="cards-page">

        <div class="cards-header">
            <h1>🃏 All Cards (Total: {{ allCards.length }})</h1>

            <p>
                View all cards available in Card Fight.
            </p>
        </div>

        <div class="cards-box">

            <div class="cardgrid">

               <div
                v-for="card, index in allCards"
                :key="card.id"
                :class="[
                    'card',
                    card.type,
                    card.effect ? 'effect-' + card.effect : '',
                    'card-modern'
                ]"
                :data-tooltip="`${card.name}\n${cardTooltip(card)}`"
            >

                <!-- SHOW CARDS -->
                <div>
                    <Cardlayout :card="card" />
                </div>

                </div>

            </div>

        </div>

    </div>
</template>

<style scoped>
.cards-page {
    min-height: calc(100vh - 65px);

    padding: 35px 25px;

    color: white;
}


/* =========================
   TITEL
   ========================= */

.cards-header {
    text-align: center;

    margin-bottom: 25px;
}

.cards-header h1 {
    margin: 0 0 8px;

    font-size: 36px;

    text-shadow:
        0 3px 8px rgba(0, 0, 0, 0.6);
}

.cards-header p {
    margin: 0;

    color: #ccccdd;

    font-size: 15px;
}


/* =========================
   KAARTEN CONTAINER
   ========================= */

.cards-box {
    width: 100%;
    max-width: 1250px;

    margin: 0 auto;

    padding: 25px;

    background: rgba(20, 20, 30, 0.55);

    border: 1px solid rgba(255, 255, 255, 0.15);

    border-radius: 18px;

    box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.4);

    backdrop-filter: blur(5px);
}


/* =========================
   KAART GRID
   ========================= */

.cardgrid {
    display: grid;

    grid-template-columns:
        repeat(auto-fill, minmax(170px, 1fr));

    justify-items: center;

    gap: 25px;
}


</style>