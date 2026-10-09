<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

import '../assets/style.css'

import Health from '../components/Health.vue'
import PlayerCards from '../components/PlayerCards.vue'
import EnemyCards from '../components/EnemyCards.vue'
import Stapel from '../components/Stapel.vue'

import { socket } from '../data/socket.js'

const route = useRoute()

const roomCode = ref(
    String(route.params.roomCode || '')
)

const playerNumber = ref(
    Number(route.query.player) || 1
)

const playerHealth = ref(100)
const enemyHealth = ref(100)

const playerMaxHealth = ref(100)
const enemyMaxHealth = ref(100)

const playerCards = ref([])
const enemyCards = ref([])

const lastPlayerCard = ref({})
const lastEnemyCard = ref({})

const playerTurn = ref(false)

const opponentConnected = ref(true)

const gameStarted = ref(false)

const gameOver = ref(false)

const winner = ref(null)

const cardstapel = ref([])

function opponentLeft() {
    console.log('⚠️ Tegenstander heeft de game verlaten')

    opponentConnected.value = false
}

function gameReady() {
    console.log('🎮 Game is ready')

    gameStarted.value = true
}

function updateGameState(state) {
    console.log(
        '📡 GAME STATE ONTVANGEN:',
        state
    )

    /*
     * Als we een gameState ontvangen,
     * bestaat de game.
     */
    gameStarted.value = true

    playerHealth.value =
        Number(state.playerHealth) || 0

    playerMaxHealth.value =
        Number(state.playerMaxHealth) || 100

    enemyHealth.value =
        Number(state.enemyHealth) || 0

    enemyMaxHealth.value =
        Number(state.enemyMaxHealth) || 100

    playerCards.value =
        state.playerCards || []

    enemyCards.value =
        state.enemyCards || []

    lastPlayerCard.value =
        state.lastPlayerCard || {}

    lastEnemyCard.value =
        state.lastEnemyCard || {}

    playerTurn.value =
        Boolean(state.playerTurn)

    gameOver.value =
        Boolean(state.gameOver)

    winner.value =
        state.winner

    cardstapel.value =
        state.cardstapel || []
}

function useCard(card, index) {
    if (!playerTurn.value) {
        return
    }

    if (gameOver.value) {
        return
    }

    socket.emit(
        'playCard',
        {
            roomCode: roomCode.value,
            cardId: card.id,
            cardIndex: index
        }
    )
}

onMounted(() => {
    console.log(
        '🎮 Multiplayer geladen'
    )

    console.log(
        '🏠 Room:',
        roomCode.value
    )

    console.log(
        '👤 Speler:',
        playerNumber.value
    )

    /*
     * Luister eerst naar events.
     */
    socket.on(
        'gameReady',
        gameReady
    )

    socket.on(
        'gameState',
        updateGameState
    )

    socket.on(
        'opponentLeft',
        opponentLeft
    )

    /*
     * Vraag daarna de huidige game op.
     *
     * Hierdoor maakt het niet uit of
     * de game al gestart was voordat
     * deze pagina geladen werd.
     */
    socket.emit(
        'getGameState',
        roomCode.value
    )
})

onUnmounted(() => {
    socket.off(
        'gameReady',
        gameReady
    )

    socket.off(
        'gameState',
        updateGameState
    )

    socket.off(
        'opponentLeft',
        opponentLeft
    )
})
</script>

<template>
    <div class="game">

        <!-- HEADER -->

        <div class="game-header">

            <h1>
                ⚔️ Card Fight
            </h1>

            <div class="room-info">

                <span>
                    Room
                </span>

                <strong>
                    {{ roomCode }}
                </strong>

            </div>

            <div class="room-info">

                <span>
                    Speler
                </span>

                <strong>
                    {{ playerNumber }}
                </strong>

            </div>

        </div>


        <!-- TEGENSTANDER WEG -->

        <div v-if="!opponentConnected" class="game-message">

            <h2>
                ⚠️ Speler heeft de game verlaten
            </h2>

        </div>


        <!-- GAME -->

        <template v-else-if="gameStarted">

            <!-- ENEMY -->

            <section class="battle-section enemy-section">

                <div class="player-title">

                    <h2>
                        🧑 Speler
                        {{
                            playerNumber === 1
                                ? 2
                                : 1
                        }}
                    </h2>

                    <span class="player-status">
                        ● Online
                    </span>

                </div>

                <Health :health="enemyHealth" :max-health="enemyMaxHealth" />

                <EnemyCards :cards="enemyCards" :last-enemy-card="lastEnemyCard" :settings="false" />

            </section>


            <!-- MIDDEN -->

            <div class="battle-middle">
                <Stapel :cards="cardstapel" :settings="5" />
                <div v-if="gameOver" class="game-over">

                    <h2 v-if="
                        winner === playerNumber
                    ">
                        🏆 Jij hebt gewonnen!
                    </h2>

                    <h2 v-else>
                        💀 Je hebt verloren!
                    </h2>

                </div>


                <div v-else class="turn-indicator">

                    <span v-if="playerTurn">
                        🟢 Jouw beurt
                    </span>

                    <span v-else>
                        🔴 Wachten op tegenstander
                    </span>

                </div>


            </div>


            <!-- PLAYER -->

            <section class="battle-section player-section">

                <div class="player-title">

                    <h2>
                        🧑 Jij
                    </h2>

                    <span class="player-number">
                        Speler {{ playerNumber }}
                    </span>

                </div>

                <Health :health="playerHealth" :max-health="playerMaxHealth" />

                <PlayerCards :cards="playerCards" :ai-turn="!playerTurn" :last-player-card="lastPlayerCard"
                    @use-card="useCard" />

            </section>

        </template>


        <!-- GAME LADEN -->

        <div v-else class="game-message">

            <h2>
                🎮 Game wordt geladen...
            </h2>

            <p>
                Room:
                <strong>
                    {{ roomCode }}
                </strong>
            </p>

            <p>
                Speler {{ playerNumber }}
            </p>

        </div>

    </div>
</template>

<style scoped>
.game {
    max-width: 2500px;
    margin: 0 auto;
    padding: 25px;
    text-align: center;
}

.game-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    flex-wrap: wrap;
    margin-bottom: 30px;
}

.game h1 {
    margin: 0;
    font-size: 36px;
}

.room-info {
    padding: 10px 20px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
}

.room-info span {
    margin-right: 10px;
    opacity: 0.7;
}

.room-info strong {
    letter-spacing: 3px;
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

.player-title {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
}

.player-title h2 {
    margin: 0;
}

.player-status,
.player-number {
    padding: 5px 10px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.08);
    font-size: 13px;
}

.player-status {
    color: #4ade80;
}

.battle-middle {
    margin: 20px auto;
}

.turn-indicator {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
}

.room-display {
    opacity: 0.6;
    font-size: 13px;
}

.game-message {
    margin: 60px auto;
    padding: 30px;
    max-width: 500px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
}

.game-message h2 {
    margin: 0 0 10px 0;
}

.game-over {
    padding: 20px;
}

.game-over h2 {
    margin: 0;
}
</style>
