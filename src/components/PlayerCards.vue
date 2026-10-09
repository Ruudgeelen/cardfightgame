```vue
<script setup>
import '../assets/style.css'

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

            <h2>Last Played Card</h2>

            <div
                :class="[
                    'card',
                    lastPlayerCard.type,
                    lastPlayerCard.effect
                        ? 'effect-' + lastPlayerCard.effect
                        : ''
                ]"
            >

                <h3>{{ lastPlayerCard.name }}</h3>

                <div class="line"></div>

                <p v-if="lastPlayerCard.type" class="type">
                    Type: {{ lastPlayerCard.type }}
                </p>

                <p v-if="lastPlayerCard.attack">
                    ⚔️ Attack: {{ lastPlayerCard.attack }}
                </p>

                <p v-if="lastPlayerCard.heal">
                    ❤️ Heal: {{ lastPlayerCard.heal }}
                </p>

                <p v-if="lastPlayerCard.freeze">
                    ❄️ Freeze
                </p>

                <p v-if="lastPlayerCard.burn">
                    🔥 Burn: {{ lastPlayerCard.burn }}
                    ({{ lastPlayerCard.burnTurns }} turns)
                </p>

                <p v-if="lastPlayerCard.healthbaradd">
                    💚 Healthbar yours: {{ lastPlayerCard.healthbaradd }}
                </p>

                <p v-if="lastPlayerCard.healthbarremove">
                    💔 Healthbar other: {{ lastPlayerCard.healthbarremove }}
                </p>

                <p v-if="lastPlayerCard.attackadd">
                    ⚔️ Attack Add: {{ lastPlayerCard.attackadd }}
                </p>

                <p v-if="lastPlayerCard.healadd">
                    ❤️ Heal Add: {{ lastPlayerCard.healadd }}
                </p>
                <p v-if="lastPlayerCard.removecardnummer">🗑️ Remove Card: {{ lastPlayerCard.removecardnummer }}</p>
                <p v-if="lastPlayerCard.morecards">🃏 More Cards: {{ lastPlayerCard.morecards }}</p>
                <p v-if="lastPlayerCard.stapel">🃏 Stapel: {{ lastPlayerCard.stapel }}</p>

                <p v-if="lastPlayerCard.effect">
                    ✨ Effect: {{ lastPlayerCard.effect }}
                </p>

                <p v-if="lastPlayerCard.effectturns">
                    ⏳ Effect Time: {{ lastPlayerCard.effectturns }}
                </p>

                <p v-if="lastPlayerCard.effectvalue">
                    💎 Effect Value: {{ lastPlayerCard.effectvalue }}
                </p>

            </div>

        </div>


        <!-- PLAYER CARDS -->
        <div class="cards">

            <div
                v-for="(card, index) in cards"
                :key="card.id"
                :class="[
                    'card',
                    card.type,
                    card.effect ? 'effect-' + card.effect : '',
                    aiTurn ? 'card-disabled' : ''
                ]"
                @click="!aiTurn && emit('useCard', card, index)"
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

</template>

<style scoped>
.player-card-area {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 40px;
    width: 100%;
    flex-wrap: wrap;
}

.last-player-wrapper {
    flex-shrink: 0;
    text-align: center;
}

.last-player-wrapper h2 {
    margin-top: 0;
    margin-bottom: 15px;
}

.last-player-wrapper .card {
    margin: 0 auto;
}

.cards {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    flex-wrap: wrap;
}

/* Kaarten kunnen niet gebruikt worden tijdens de AI beurt */
.card-disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
    transform: none !important;
    box-shadow: none !important;
}
</style>

