<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import '../assets/style.css'

import { BurnEffect, BurnDamage, FreezeEffect } from '../data/effect.js'
import { PlayerAttack, EnemyAttack, AttackAdd } from '../data/attack.js'
import { Playerdeath, Enemydeath, AddMaxHealth, RemoveMaxHealth, HealAdd } from '../data/health.js'
import { GetCards, GetStapel, GetStartingCards, GetNewCard, GetNewStapel } from '../data/card.js'
import { chooseAiCard } from '../data/ai.js'
import { game } from '../data/game.js'

import Health from '../components/Health.vue'
import PlayerCards from '../components/PlayerCards.vue'
import EnemyCards from '../components/EnemyCards.vue'
import Ai from '../components/Ai.vue'
import Stapel from '@/components/Stapel.vue'

const route = useRoute()

const GameMode = ref(
    String(route.params.gamemode || '')
)

// Settings
const aantalcards = Number(localStorage.getItem('aantalcards')) || 5
const playerHealthSettings = Number(localStorage.getItem('playerHealth')) || 100
const enemyHealthSettings = Number(localStorage.getItem('enemyHealth')) || 100
const playerMaxHealthSettings = Number(localStorage.getItem('playerMaxHealth')) || 100
const enemyMaxHealthSettings = Number(localStorage.getItem('enemyMaxHealth')) || 100
const zieEnemyCards = localStorage.getItem('zieEnemyCards') === 'true'
const zieStapel = localStorage.getItem('zieStapel') === 'true'
const zieStapelCards = Number(localStorage.getItem('zieStapelCards')) || 5


// Refs
const playerHealth = ref(playerHealthSettings)
const enemyHealth = ref(enemyHealthSettings)
const playerMaxHealth = ref(playerMaxHealthSettings)
const enemyMaxHealth = ref(enemyMaxHealthSettings)

const allCards = ref(GetCards(GameMode))
const cardstapel = ref(GetStapel(allCards.value))

const enemyCards = ref([])
const playerCards = ref([])

const aiTurn = ref(false)
const turnsPlayed = ref(0)

const lastPlayerCard = ref([])
const lastEnemyCard = ref([])

// Start/reset game
onMounted(() => {
    startGame()
})

function resetGame() {
    playerHealth.value = playerHealthSettings
    enemyHealth.value = enemyHealthSettings

    playerMaxHealth.value = playerMaxHealthSettings
    enemyMaxHealth.value = enemyMaxHealthSettings

    enemyCards.value = []
    playerCards.value = []

    aiTurn.value = false
    turnsPlayed.value = 0

    lastPlayerCard.value = []
    lastEnemyCard.value = []

    location.reload()
}

function startGame() {
    playerCards.value = GetStartingCards(cardstapel.value, aantalcards)
    enemyCards.value = GetStartingCards(cardstapel.value, aantalcards)

    playerHealth.value = playerHealthSettings
    enemyHealth.value = enemyHealthSettings

    playerMaxHealth.value = playerMaxHealthSettings
    enemyMaxHealth.value = enemyMaxHealthSettings

    lastPlayerCard.value = []
    lastEnemyCard.value = []

    aiTurn.value = false
    turnsPlayed.value = 0
}

function useCard(card, index) {
    if (Playerdeath(playerHealth.value)) return
    if (Enemydeath(enemyHealth.value)) return
    if (aiTurn.value) return

    game(
        card,
        index,
        playerCards,
        enemyCards,
        cardstapel,
        playerHealth,
        enemyHealth,
        playerMaxHealth,
        enemyMaxHealth,
        lastPlayerCard,
        lastEnemyCard,
        aantalcards,
        GameMode.value
    )

    if (enemyHealth.value > 0) {
        aiTurn.value = true
    }
}


// AI attacks
function aiAttack() {
    if (enemyCards.value.length === 0) return
    if (Playerdeath(playerHealth.value)) return
    if (Enemydeath(enemyHealth.value)) return

    const randomIndex = chooseAiCard(
        enemyCards.value,
        playerCards.value,
        enemyHealth.value,
        playerHealth.value,
        enemyMaxHealth.value,
        playerMaxHealth.value
    )

    const card = enemyCards.value[randomIndex]

    game(
        card,
        randomIndex,
        enemyCards,
        playerCards,
        cardstapel,
        enemyHealth,
        playerHealth,
        enemyMaxHealth,
        playerMaxHealth,
        lastEnemyCard,
        lastPlayerCard,
        aantalcards,
        GameMode.value
    )

    turnsPlayed.value += 1

    aiTurn.value = false
}

</script>


<template>
    <div class="game">
        <div class="top-info-box">
            <div class="game-header">
                <h1>⚔️ Card Fight</h1>
                <div class="room-info">
                    <span>Game Mode</span>
                    <strong>{{ GameMode }}</strong>
                </div>

                <div class="room-info">
                    <span>Turns</span>
                    <strong>{{ turnsPlayed }}</strong>
                </div>
            </div>

            <div class="players-header">
                <div class="player-title">
                    <h2>🤖 Speler 2</h2>
                    <span class="player-status">AI</span>
                </div>

                <div class="player-title">
                    <h2>🧑 Speler 1</h2>
                    <span class="player-number">Jij</span>
                </div>

                <div v-if="enemyHealth > 0 && playerHealth > 0" class="turn-info"
                    :class="{ 'your-turn': !aiTurn }">
                    <span class="turn-dot">●</span>
                    <strong v-if="!aiTurn">Jouw beurt</strong>
                    <strong v-else>Beurt van AI</strong>
                </div>
            </div>
        </div>

        <!-- AI turn -->
        <Ai v-if="aiTurn" :enemy-cards="enemyCards" @ai-attack="aiAttack" />


        <!-- Enemy -->
        <section class="battle-section enemy-section">
            <EnemyCards :cards="enemyCards" :last-enemy-card="{}" :settings="zieEnemyCards" />
            <Health :health="enemyHealth" :max-health="enemyMaxHealth" />

        </section>

        <!-- Game over -->
        <div class="game-result">
            <div class="played-cards-row">
                <div class="played-card-slot enemy-played-card">
                    <EnemyCards :cards="[]" :last-enemy-card="lastEnemyCard" :settings="true" />
                </div>

                <Stapel v-if="zieStapel" :cards="cardstapel" :settings="zieStapelCards" />

                <div class="played-card-slot player-played-card">
                    <PlayerCards :cards="[]" :ai-turn="false" :last-player-card="lastPlayerCard" />
                </div>
            </div>

            <h2 v-if="enemyHealth <= 0">
                🏆 You Win! <button @click="resetGame()">Play Again</button>
            </h2>

            <h2 v-if="playerHealth <= 0">
                💀 You Lose! <button @click="resetGame()">Play Again</button>
            </h2>

        </div>


        <!-- Player -->
        <section class="battle-section player-section">

            <Health :health="playerHealth" :max-health="playerMaxHealth" />
            <PlayerCards :cards="playerCards" :ai-turn="aiTurn" :last-player-card="{}"
                @use-card="useCard" />

        </section>
        <section class="battle-section player-section game-controls">
            <button @click="resetGame()">Reset Game</button>
        </section>

    </div>
</template>


<style scoped>
.game {
    width: min(100%, 1480px);
    margin: 0 auto;
    padding: 22px clamp(12px, 3vw, 30px) 34px;
    text-align: center;
}

.top-info-box {
    width: min(100%, 980px);
    margin: 0 auto 18px;
    padding: 14px 18px;
    border: 1px solid rgba(143, 210, 235, 0.2);
    border-radius: 16px;
    background: linear-gradient(145deg, rgba(19, 37, 66, 0.72), rgba(9, 17, 37, 0.68));
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
}

.game-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    min-height: 46px;
}

.game-header h1 {
    margin: 0;
    font-size: 30px;
}

.room-info {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid rgba(143, 210, 235, 0.18);
    border-radius: 999px;
    background: rgba(8, 16, 34, 0.58);
}

.room-info span {
    opacity: 0.7;
}

.players-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-wrap: nowrap;
    width: 100%;
    margin: 12px auto 0;
    padding: 12px 0 2px;
    border-top: 1px solid rgba(143, 210, 235, 0.16);
}

.player-title {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin: 0;
    min-width: 188px;
    min-height: 46px;
    padding: 7px 14px;
    box-sizing: border-box;
    border: 1px solid rgba(143, 210, 235, 0.14);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
}

.player-title h2 {
    margin: 0;
    font-size: 16px;
}

.player-status,
.player-number {
    padding: 3px 7px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.08);
    font-size: 12px;
}

.player-status {
    color: #4ade80;
}

.turn-info {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 138px;
    min-height: 46px;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid rgba(248, 113, 113, 0.45);
    border-radius: 8px;
    background: rgba(220, 38, 38, 0.25);
    color: #fecaca;
    font-size: 13px;
    white-space: nowrap;
}

.turn-info.your-turn {
    border-color: rgba(74, 222, 128, 0.45);
    background: rgba(22, 163, 74, 0.25);
    color: #86efac;
}

.turn-dot {
    font-size: 11px;
}

button {
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgb(4, 4, 4);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}
.game h1 {
    margin-bottom: 30px;
    font-size: 36px;
}

.battle-section {
    width: min(100%, 1320px);
    margin: 18px auto;
    padding: 18px clamp(12px, 2vw, 24px) 24px;
    border-radius: 18px;
    box-shadow: 0 14px 35px rgba(0, 0, 0, 0.2);
}

.enemy-section {
    background: linear-gradient(145deg, rgba(94, 35, 58, 0.28), rgba(12, 20, 42, 0.68));
    border: 1px solid rgba(255, 122, 145, 0.24);
}

.player-section {
    background: linear-gradient(145deg, rgba(24, 79, 91, 0.34), rgba(12, 20, 42, 0.68));
    border: 1px solid rgba(99, 230, 193, 0.24);
}

.battle-section > h2 {
    display: inline-flex;
    align-items: center;
    margin: 0 0 8px;
    padding: 6px 14px;
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 999px;
    background: rgba(5, 12, 28, 0.34);
    color: #f4f7ff;
    font-size: 19px;
}

.game-controls {
    width: fit-content;
    min-width: 180px;
    padding: 10px 14px;
    background: rgba(8, 16, 34, 0.64);
    border-color: rgba(143, 210, 235, 0.13);
}

.game-controls button {
    padding: 8px 16px;
}

hr {
    margin: 30px auto;
    max-width: 1000px;
    border: 0;
    border-top: 2px solid rgba(255, 255, 255, 0.2);
}

.game-result {
    width: min(100%, 980px);
    margin: 18px auto;
}

.played-cards-row {
    display: grid;
    grid-template-columns: 145px minmax(220px, 1fr) 145px;
    align-items: center;
    gap: 12px;
    width: 100%;
}

.played-card-slot {
    min-width: 0;
}

.played-card-slot .card-area,
.played-card-slot .player-card-area {
    width: 100%;
    gap: 0;
}

.played-card-slot .last-enemy-wrapper,
.played-card-slot .last-player-wrapper {
    width: 100%;
}

.played-card-slot :deep(.last-enemy-wrapper h2),
.played-card-slot :deep(.last-player-wrapper h2) {
    margin-bottom: 8px;
    font-size: 14px;
    white-space: nowrap;
}

.played-cards-row :deep(.deck-section) {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
}

.played-card-slot :deep(.card) {
    width: 60px;
    min-height: 84px;
    padding: 5px;
    border-width: 2px;
    margin: 0 auto;
}

.played-card-slot :deep(.card h3) {
    max-width: 48px;
    overflow: hidden;
    font-size: 9px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.played-card-slot :deep(.card .line) {
    margin: 3px 0;
}

.played-card-slot :deep(.card .type) {
    margin-bottom: 3px;
    padding: 2px;
    overflow: hidden;
    font-size: 7px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.played-card-slot :deep(.card-stats) {
    gap: 2px;
    margin-top: 2px;
}

.played-card-slot :deep(.card-stat) {
    min-height: 21px;
    padding: 1px;
    font-size: 7px;
}

.played-card-slot :deep(.card-stat > span) {
    font-size: 10px;
}

.played-card-slot :deep(.card-stat small) {
    font-size: 6px;
}

.game-result h2 {
    margin: 14px 0;
    font-size: 26px;
}

@media (max-width: 950px) {
    .played-cards-row {
        grid-template-columns: 1fr 1fr;
    }

    .played-cards-row :deep(.deck-section) {
        grid-column: 1 / -1;
        grid-row: 1;
    }

    .enemy-played-card {
        grid-column: 1;
        grid-row: 2;
    }

    .player-played-card {
        grid-column: 2;
        grid-row: 2;
    }
}

@media (max-width: 560px) {
    .played-cards-row {
        display: flex;
        flex-direction: column;
    }

    .played-card-slot,
    .played-cards-row :deep(.deck-section) {
        width: 100%;
    }
}

</style>
