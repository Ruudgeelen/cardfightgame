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
                        : '',
                    'card-compact'
                ]"
                :data-tooltip="`${lastPlayerCard.name}\n${cardTooltip(lastPlayerCard)}`"
            >

                <h3>{{ lastPlayerCard.name }}</h3>

                <div class="line"></div>

                <p v-if="lastPlayerCard.type" class="type">
                    Type: {{ lastPlayerCard.type }}
                </p>

                <div class="card-stats">
                    <p v-if="lastPlayerCard.attack" class="card-stat"><span>⚔️</span><b>{{ lastPlayerCard.attack }}</b></p>
                    <p v-if="lastPlayerCard.heal" class="card-stat"><span>❤️</span><b>{{ lastPlayerCard.heal }}</b></p>
                    <p v-if="lastPlayerCard.freeze" class="card-stat"><span>❄️</span><b>Freeze</b></p>
                    <p v-if="lastPlayerCard.burn" class="card-stat"><span>🔥</span><b>{{ lastPlayerCard.burn }} <small>⏳ {{ lastPlayerCard.burnTurns }}</small></b></p>
                    <p v-if="lastPlayerCard.healthbaradd" class="card-stat"><span>💚</span><b>{{ lastPlayerCard.healthbaradd }}</b></p>
                    <p v-if="lastPlayerCard.healthbarremove" class="card-stat"><span>💔</span><b>{{ lastPlayerCard.healthbarremove }}</b></p>
                    <p v-if="lastPlayerCard.attackadd" class="card-stat"><span>⚔️</span><b>+{{ lastPlayerCard.attackadd }}</b></p>
                    <p v-if="lastPlayerCard.healadd" class="card-stat"><span>❤️</span><b>+{{ lastPlayerCard.healadd }}</b></p>
                    <p v-if="lastPlayerCard.removecardnummer" class="card-stat"><span>🗑️</span><b>{{ lastPlayerCard.removecardnummer }}</b></p>
                    <p v-if="lastPlayerCard.morecards" class="card-stat"><span>🃏</span><b>{{ lastPlayerCard.morecards }}</b></p>
                    <p v-if="lastPlayerCard.stapel" class="card-stat"><span>🃏</span><b>{{ lastPlayerCard.stapel }}</b></p>
                </div>

                <div class="card-tooltip" role="tooltip">
                    <strong>{{ lastPlayerCard.name }}</strong>
                    <span>{{ cardTooltip(lastPlayerCard) }}</span>
                </div>

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
                    'card-compact',
                    aiTurn ? 'card-disabled' : ''
                ]"
                :data-tooltip="`${card.name}\n${cardTooltip(card)}`"
                @click="!aiTurn && emit('useCard', card, index)"
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
                      </div>

                    <div class="card-tooltip" role="tooltip">
                        <strong>{{ card.name }}</strong>
                        <span>{{ cardTooltip(card) }}</span>
                    </div>

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

.card-compact {
    position: relative;
    width: 175px;
    min-height: 220px;
    padding: 12px;
    overflow: visible;
}

.card-compact h3 {
    font-size: 17px;
}

.card-tooltip {
    position: absolute;
    z-index: 5;
    left: 50%;
    bottom: calc(100% + 14px);
    width: 235px;
    padding: 14px 16px;
    border: 1px solid rgba(255, 214, 102, 0.55);
    border-radius: 12px;
    background: linear-gradient(145deg, rgba(34, 35, 53, 0.98), rgba(12, 13, 23, 0.98));
    color: white;
    text-align: left;
    opacity: 0;
    pointer-events: none;
    transform: translate(-50%, 8px) scale(0.96);
    transform-origin: bottom center;
    transition: opacity 0.2s ease, transform 0.2s ease;
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
}

.card-tooltip::after {
    position: absolute;
    left: 50%;
    bottom: -7px;
    width: 13px;
    height: 13px;
    border-right: 1px solid rgba(255, 214, 102, 0.55);
    border-bottom: 1px solid rgba(255, 214, 102, 0.55);
    background: #161724;
    content: '';
    transform: translateX(-50%) rotate(45deg);
}

.card-tooltip strong,
.card-tooltip span {
    display: block;
}

.card-tooltip strong {
    position: relative;
    z-index: 1;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 214, 102, 0.3);
    color: #ffd666;
    font-size: 14px;
}

.card-tooltip span {
    position: relative;
    z-index: 1;
    color: rgba(255, 255, 255, 0.86);
    font-size: 12px;
    line-height: 1.55;
    white-space: pre-line;
}

.card-compact:hover .card-tooltip,
.card-compact:focus-visible .card-tooltip {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
}

.card-stat {
    display: flex;
    min-width: 0;
    min-height: 40px;
    margin: 0;
    padding: 4px 3px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    border: 1px solid rgba(255, 255, 255, 0.24);
    border-radius: 7px;
    background: rgba(255, 255, 255, 0.28);
    font-size: 13px;
    line-height: 1.1;
    text-align: center;
}

.card-stat span {
    width: auto;
    font-size: 17px;
    text-align: center;
}

.card-stat b {
    min-width: 0;
    max-width: 100%;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card-stat small {
    margin-left: 2px;
    font-size: 9px;
    opacity: 0.85;
    white-space: nowrap;
}

.card-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 5px;
    margin-top: 6px;
}

/* Kaarten kunnen niet gebruikt worden tijdens de AI beurt */
.card-disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
    transform: none !important;
    box-shadow: none !important;
}
</style>

