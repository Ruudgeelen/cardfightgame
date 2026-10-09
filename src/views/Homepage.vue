<script setup>
import { ref, onMounted } from 'vue'
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

const allCards = ref(GetCards())
console.log('AllCards: ', allCards.value)
const cardstapel = ref(GetStapel(allCards.value))

const enemyCards = ref([])
const playerCards = ref([])

const aiTurn = ref(false)

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
        aantalcards
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
        aantalcards
    )

    aiTurn.value = false
}

</script>


<template>
    <div class="game">
        <!-- AI turn -->
        <Ai v-if="aiTurn" :enemy-cards="enemyCards" @ai-attack="aiAttack" />


        <!-- Enemy -->
        <section class="battle-section enemy-section">
            <h2>🤖 AI</h2>
            <EnemyCards :cards="enemyCards" :last-enemy-card="lastEnemyCard" :settings="zieEnemyCards" />
            <Health :health="enemyHealth" :max-health="enemyMaxHealth" />

        </section>

        <!-- Game over -->
        <div class="game-result">
            <Stapel v-if="zieStapel" :cards="cardstapel" :settings="zieStapelCards" />
            <h2 v-if="enemyHealth <= 0">
                🏆 You Win! <button @click="resetGame()">Play Again</button>
            </h2>

            <h2 v-if="playerHealth <= 0">
                💀 You Lose! <button @click="resetGame()">Play Again</button>
            </h2>

        </div>


        <!-- Player -->
        <section class="battle-section player-section">

            <h2>🧑 Player</h2>
            <Health :health="playerHealth" :max-health="playerMaxHealth" />
            <PlayerCards :cards="playerCards" :ai-turn="aiTurn" :last-player-card="lastPlayerCard"
                @use-card="useCard" />

        </section>
        <section class="battle-section player-section">
            <button @click="resetGame()">Reset Game</button>
        </section>

    </div>
</template>


<style scoped>
.game {
    max-width: 2500px;
    margin: 0 auto;
    padding: 25px;
    text-align: center;
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
    margin: 25px 0;
    padding: 20px;
    border-radius: 15px;
}

.enemy-section {
    background: rgba(255, 70, 70, 0.08);
    border: 1px solid rgba(255, 70, 70, 0.2);
}

.player-section {
    background: rgba(70, 120, 255, 0.08);
    border: 1px solid rgba(70, 120, 255, 0.2);
}

hr {
    margin: 30px auto;
    max-width: 1000px;
    border: 0;
    border-top: 2px solid rgba(255, 255, 255, 0.2);
}

.game-result {
    margin-top: 30px;
}

.game-result h2 {
    font-size: 30px;
}

</style>
