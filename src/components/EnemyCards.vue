```vue
<script setup>
import '../assets/style.css'

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
                    lastEnemyCard.effect ? 'effect-' + lastEnemyCard.effect : '',
                    'card-modern'
                ]"
                :data-tooltip="`${lastEnemyCard.name}\n${cardTooltip(lastEnemyCard)}`"
            >

                <h3>{{ lastEnemyCard.name }}</h3>

                <div class="line"></div>

                <p v-if="lastEnemyCard.type" class="type">
                    Type: {{ lastEnemyCard.type }}
                </p>

                <div class="card-stats">
                    <p v-if="lastEnemyCard.attack" class="card-stat"><span>⚔️</span><b>{{ lastEnemyCard.attack }}</b></p>
                    <p v-if="lastEnemyCard.heal" class="card-stat"><span>❤️</span><b>{{ lastEnemyCard.heal }}</b></p>
                    <p v-if="lastEnemyCard.freeze" class="card-stat"><span>❄️</span><b>Freeze</b></p>
                    <p v-if="lastEnemyCard.burn" class="card-stat"><span>🔥</span><b>{{ lastEnemyCard.burn }} <small>⏳ {{ lastEnemyCard.burnTurns }}</small></b></p>
                    <p v-if="lastEnemyCard.healthbaradd" class="card-stat"><span>💚</span><b>{{ lastEnemyCard.healthbaradd }}</b></p>
                    <p v-if="lastEnemyCard.healthbarremove" class="card-stat"><span>💔</span><b>{{ lastEnemyCard.healthbarremove }}</b></p>
                    <p v-if="lastEnemyCard.attackadd" class="card-stat"><span>⚔️</span><b>+{{ lastEnemyCard.attackadd }}</b></p>
                    <p v-if="lastEnemyCard.healadd" class="card-stat"><span>❤️</span><b>+{{ lastEnemyCard.healadd }}</b></p>
                    <p v-if="lastEnemyCard.removecardnummer" class="card-stat"><span>🗑️</span><b>{{ lastEnemyCard.removecardnummer }}</b></p>
                    <p v-if="lastEnemyCard.morecards" class="card-stat"><span>🃏</span><b>{{ lastEnemyCard.morecards }}</b></p>
                    <p v-if="lastEnemyCard.stapel" class="card-stat"><span>🃏</span><b>{{ lastEnemyCard.stapel }}</b></p>
                </div>

                <div class="card-tooltip" role="tooltip">
                    <strong>{{ lastEnemyCard.name }}</strong>
                    <span>{{ cardTooltip(lastEnemyCard) }}</span>
                </div>

            </div>

        </div>


        <!-- ENEMY CARDS -->
        <div class="cards">

            <div
                v-for="card in cards"
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
                <div v-if="settings">

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
                     </div>

                    <div class="card-tooltip" role="tooltip">
                        <strong>{{ card.name }}</strong>
                        <span>{{ cardTooltip(card) }}</span>
                    </div>

                </div>


                <!-- HIDE CARDS -->
                <div v-else class="hidden-card">

                    <div class="hidden-icon">
                         ❓
                    </div>

                    <h3>Enemy Card</h3>

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
