<script setup>
import { GetCards } from '../data/card.js'
import { ref, onMounted } from 'vue'


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

function cardTooltip(card) {
    return [
        card.type && `Type: ${card.type}`,
        card.attack && `Attack on the enemy: ${card.attack}`,
        card.heal && `Heal your health: ${card.heal}`,
        card.freeze && 'Freeze your own cards',
        card.burn && `Burn the opponent cards: ${card.burn} (for ${card.burnTurns} turns)`,
        card.attackadd && `Attack add to all your cards: ${card.attackadd}`,
        card.healadd && `Heal add to all your cards: ${card.healadd}`,
        card.removecardnummer && `Remove cards of the opponent: ${card.removecardnummer}`,
        card.morecards && `Give more cards to yourself: ${card.morecards}`,
        card.stapel && `Stapel: ${card.stapel}`,
        card.effect && `Effect: ${card.effect}`,
        card.effectturns && `Effect duration: ${card.effectturns} turns`,
        card.effectvalue && `EffectPower: ${card.effectvalue}`
    ].filter(Boolean).join('\n')
}
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
                    v-for="card in allCards"
                    :key="card.id"
                    :class="['card', card.type, 'card-modern']"
                    :data-tooltip="`${card.name}\n${cardTooltip(card)}`"
                >

                    <h3>{{ card.name }}</h3>
                    <div class="line"></div>
                    <p v-if="card.type" class="type">Type: {{ card.type }}</p>
                    <div class="card-stats">
                        <p v-if="card.attack" class="card-stat"><span>⚔️</span><b>{{ card.attack }}</b></p>
                        <p v-if="card.heal" class="card-stat"><span>❤️</span><b>{{ card.heal }}</b></p>
                        <p v-if="card.freeze" class="card-stat"><span>❄️</span><b>Freeze</b></p>
                        <p v-if="card.burn" class="card-stat"><span>🔥</span><b>{{ card.burn }} <small>⏳ {{ card.burnTurns }}</small></b></p>
                        <p v-if="card.healthbaradd" class="card-stat"><span>💚</span><b>{{ card.healthbaradd }}</b></p>
                        <p v-if="card.healthbarremove" class="card-stat"><span>💔</span><b>{{ card.healthbarremove }}</b></p>
                        <p v-if="card.attackadd" class="card-stat"><span>⚔️</span><b>+{{ card.attackadd }}</b></p>
                        <p v-if="card.healadd" class="card-stat"><span>❤️</span><b>+{{ card.healadd }}</b></p>
                        <p v-if="card.removecardnummer" class="card-stat"><span>🗑️</span><b>{{ card.removecardnummer }}</b></p>
                        <p v-if="card.morecards" class="card-stat"><span>🃏</span><b>{{ card.morecards }}</b></p>
                        <p v-if="card.stapel" class="card-stat"><span>🃏</span><b>{{ card.stapel }}</b></p>
                        <p v-if="card.effect" class="card-stat"><span>✨</span><b>{{ card.effect }}</b></p>
                        <p v-if="card.effectturns" class="card-stat"><span>⏳</span><b>{{ card.effectturns }} beurten</b></p>
                        <p v-if="card.effectvalue" class="card-stat"><span>💎</span><b>{{ card.effectvalue }}</b></p>
                    </div>

                    <div class="card-tooltip" role="tooltip">
                        <strong>{{ card.name }}</strong>
                        <span>{{ cardTooltip(card) }}</span>
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