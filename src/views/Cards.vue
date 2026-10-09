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
                    :class="['card', card.type]"
                >

                    <h3>{{ card.name }}</h3>
                    <div class="line"></div>
                    <p v-if="card.type" class="type">Type: {{ card.type }}</p>
                    <p v-if="card.attack">⚔️ Attack: {{ card.attack }}</p>
                    <p v-if="card.heal">❤️ Heal: {{ card.heal }}</p>
                    <p v-if="card.freeze">❄️ Freeze </p>
                    <p v-if="card.burn">🔥 Burn: {{ card.burn }} (Burn Turns: {{ card.burnTurns }})</p>
                    <p v-if="card.healthbaradd">💚 Healthbar yours: {{ card.healthbaradd }}</p>
                    <p v-if="card.healthbarremove">💔 Healthbar other: {{ card.healthbarremove }}</p>
                    <p v-if="card.attackadd">⚔️ Attack Add: {{ card.attackadd }}</p>
                    <p v-if="card.healadd">❤️ Heal Add: {{ card.healadd }}</p>
                    <p v-if="card.removecardnummer">🗑️ Remove Card: {{ card.removecardnummer }}</p>
                    <p v-if="card.morecards">🃏 More Cards: {{ card.morecards }}</p>
                    <p v-if="card.stapel">🃏 Stapel: {{ card.stapel }}</p>
                    <p v-if="card.effect">✨ Effect: {{ card.effect }}</p>
                    <p v-if="card.effectturns">⏳ Effect Time: {{ card.effectturns }}</p>
                    <p v-if="card.effectvalue">💎 Effect Value: {{ card.effectvalue }}</p>

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