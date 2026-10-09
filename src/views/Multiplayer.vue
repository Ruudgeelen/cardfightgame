<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import '../assets/style.css'

import { socket } from '../data/socket.js'

const roomCode = ref('')
const enteredCode = ref('')
const playerNumber = ref(0)
const connected = ref(false)
const isGameReady = ref(false)
const message = ref('')

function createGame() {
    message.value = 'Game wordt aangemaakt...'
    socket.emit('createGame')
}

function joinGame() {
    if (!enteredCode.value) {
        message.value = 'Vul eerst een game code in.'
        return
    }

    message.value = 'Game wordt gezocht...'

    socket.emit('joinGame', enteredCode.value.toUpperCase())
}

function gameCreated(code) {
    roomCode.value = code
    playerNumber.value = 1
    connected.value = true
    message.value = 'Wacht op speler 2...'

    console.log('Game aangemaakt:', code)
}

function gameJoined(data) {
    roomCode.value = data.roomCode
    playerNumber.value = 2
    connected.value = true
    message.value = 'Je bent verbonden met de game!'

    console.log('Game gejoined:', data.roomCode)
}

function playerJoined() {
    message.value = 'Speler 2 is verbonden!'
}

function gameReady() {
    isGameReady.value = true
    message.value = 'Beide spelers zijn verbonden!'

}

function gameError(errorMessage) {
    message.value = errorMessage
}

onMounted(() => {
    socket.on('gameCreated', gameCreated)
    socket.on('gameJoined', gameJoined)
    socket.on('playerJoined', playerJoined)
    socket.on('gameReady', gameReady)
    socket.on('gameError', gameError)
})

onUnmounted(() => {
    socket.off('gameCreated', gameCreated)
    socket.off('gameJoined', gameJoined)
    socket.off('playerJoined', playerJoined)
    socket.off('gameReady', gameReady)
    socket.off('gameError', gameError)
})
</script>

<template>
    <div class="multiplayer">

        <h1>🌐 Multiplayer</h1>

        <div v-if="!connected" class="multiplayer-box">

            <h2>Nieuwe game</h2>

            <button @click="createGame">
                Create Game
            </button>

            <div class="divider">
                <span>OF</span>
            </div>

            <h2>Join game</h2>

            <input
                v-model="enteredCode"
                type="text"
                placeholder="Game code"
                maxlength="6"
            >

            <button @click="joinGame">
                Join Game
            </button>

            <p v-if="message">
                {{ message }}
            </p>

        </div>

        <div v-else class="multiplayer-box">

            <h2>Game gevonden!</h2>

            <p>
                Jij bent speler {{ playerNumber }}
            </p>

            <div class="room-code">
                {{ roomCode }}
            </div>

            <p>
                {{ message }}
            </p>

            <div v-if="isGameReady">
                <h2>⚔️ Game Ready!</h2>
                <p>Beide spelers zijn verbonden.</p>
<RouterLink
    class="start-button"
    :to="{
        name: 'PlayMultiplayer',
        params: {
            roomCode: roomCode
        },
        query: {
            player: playerNumber
        }
    }"
>
    Start Game
</RouterLink>

            </div>

            <div v-else class="waiting">
                🎮
            </div>

        </div>

    </div>
</template>

<style scoped>
.multiplayer {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 20px;
    text-align: center;
}

.multiplayer h1 {
    margin-bottom: 30px;
}

.multiplayer-box {
    padding: 30px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
}

.multiplayer-box h2 {
    margin-top: 10px;
}

.multiplayer-box button {
    margin: 10px;
    padding: 10px 20px;
    border: 1px solid black;
    border-radius: 8px;
    background: #3f3f4f;
    color: white;
    cursor: pointer;
    font-weight: bold;
}

.multiplayer-box button:hover {
    background: #5a5a6d;
}

.multiplayer-box input {
    width: 200px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #777;
    border-radius: 8px;
    text-align: center;
    font-size: 16px;
    text-transform: uppercase;
}

.divider {
    margin: 25px 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

.divider::before,
.divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
}

.room-code {
    margin: 20px auto;
    padding: 15px;
    width: 180px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.3);
    border: 2px solid #6366f1;
    border-radius: 10px;
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 5px;
}

.waiting {
    margin-top: 20px;
    font-size: 50px;
}
</style>