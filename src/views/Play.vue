<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import '../assets/style.css'

function getRandomGameMode() {
    const gameModes = ['normal', 'gamble', 'mimic', 'burn', 'freeze', 'wind', 'earth', 'lock', 'light', 'blind', 'flip']
    const randomIndex = Math.floor(Math.random() * gameModes.length)
    return gameModes[randomIndex]
}
onMounted(() => {
        if (localStorage.getItem('Reload') === 'true') {
            localStorage.removeItem('Reload')
        }
        else {
            localStorage.setItem('Reload', 'true')
            location.reload()
        }
})
</script>

<template>
    <div class="welcome">

        <div class="welcome-box">

            <h1>⚔️ Card Fight</h1>

            <p class="subtitle">
                Game Modes
            </p>

            <p class="description">
                Choose a game mode to start playing.
            </p>
            <div class="gamemodes">
            <div class="gamemodesingleplayer">
                <h2>Single Player</h2>
            <RouterLink class="normal-button" @click="reloadpage()" :to="{ name: 'PlaySingleplayer', params: { gamemode: 'normal'}, }">
                🃏 Normal Game
            </RouterLink>

            <RouterLink class="random-button" @click="reloadpage()" :to="{ name: 'PlaySingleplayer', params: { gamemode: getRandomGameMode()}, }">
                🃏 Random Game
            </RouterLink>

            <br />

            <RouterLink class="gamble-button" @click="reloadpage()" :to="{ name: 'PlaySingleplayer', params: { gamemode: 'gamble'}, }">
                🃏 Gamble Game
            </RouterLink>

            <RouterLink class="mimic-button" @click="reloadpage()" :to="{ name: 'PlaySingleplayer', params: { gamemode: 'mimic'}, }">
                🃏 Mimic Game
            </RouterLink>

            <RouterLink class="burn-button" @click="reloadpage()" :to="{ name: 'PlaySingleplayer', params: { gamemode: 'burn'}, }">
                🃏 Burn Game
            </RouterLink>

            <RouterLink class="freeze-button" @click="reloadpage()" :to="{ name: 'PlaySingleplayer', params: { gamemode: 'freeze'}, }">
                🃏 Freeze Game
            </RouterLink>

            <RouterLink class="wind-button" @click="reloadpage()" :to="{ name: 'PlaySingleplayer', params: { gamemode: 'wind'}, }">
                🃏 Wind Game
            </RouterLink>

            <RouterLink class="earth-button" @click="reloadpage()" :to="{ name: 'PlaySingleplayer', params: { gamemode: 'earth'}, }">
                🃏 Earth Game
            </RouterLink> 

            <RouterLink class="lock-button" @click="reloadpage()" :to="{ name: 'PlaySingleplayer', params: { gamemode: 'lock'}, }">
                🃏 Lock Game
            </RouterLink> 

            <RouterLink class="light-button" @click="reloadpage()" :to="{ name: 'PlaySingleplayer', params: { gamemode: 'light'}, }">
                🃏 Light Game
            </RouterLink> 

            <RouterLink class="blind-button" @click="reloadpage()" :to="{ name: 'PlaySingleplayer', params: { gamemode: 'blind'}, }">
                🃏 Blind Game
            </RouterLink> 

            <RouterLink class="flip-button" @click="reloadpage()" :to="{ name: 'PlaySingleplayer', params: { gamemode: 'flip'}, }">
                🃏 Flip Game
            </RouterLink> 

            </div>

            <div class="gamemodemultiplayer">
                <h2>Multi Player</h2>
            <RouterLink class="normal-button" @click="reloadpage()" :to="{ name: 'Multiplayer', params: { gamemode: 'normal'}, }">
                🃏 Normal Game
            </RouterLink>

            <RouterLink class="random-button" @click="reloadpage()" :to="{ name: 'Multiplayer', params: { gamemode: getRandomGameMode()}, }">
                🃏 Random Game
            </RouterLink>

            <br />

            <RouterLink class="gamble-button" @click="reloadpage()" :to="{ name: 'Multiplayer', params: { gamemode: 'gamble'}, }">
                🃏 Gamble Game
            </RouterLink>

            <RouterLink class="mimic-button" @click="reloadpage()" :to="{ name: 'Multiplayer', params: { gamemode: 'mimic'}, }">
                🃏 Mimic Game
            </RouterLink>

            <RouterLink class="burn-button" @click="reloadpage()" :to="{ name: 'Multiplayer', params: { gamemode: 'burn'}, }">
                🃏 Burn Game
            </RouterLink>

            <RouterLink class="freeze-button" @click="reloadpage()" :to="{ name: 'Multiplayer', params: { gamemode: 'freeze'}, }">
                🃏 Freeze Game
            </RouterLink>

            <RouterLink class="wind-button" @click="reloadpage()" :to="{ name: 'Multiplayer', params: { gamemode: 'wind'}, }">
                🃏 Wind Game
            </RouterLink>

            <RouterLink class="earth-button" @click="reloadpage()" :to="{ name: 'Multiplayer', params: { gamemode: 'earth'}, }">
                🃏 Earth Game
            </RouterLink>

            <RouterLink class="lock-button" @click="reloadpage()" :to="{ name: 'Multiplayer', params: { gamemode: 'lock'}, }">
                🃏 Lock Game
            </RouterLink>

            <RouterLink class="light-button" @click="reloadpage()" :to="{ name: 'Multiplayer', params: { gamemode: 'light'}, }">
                🃏 Light Game
            </RouterLink>

            <RouterLink class="blind-button" @click="reloadpage()" :to="{ name: 'Multiplayer', params: { gamemode: 'blind'}, }">
                🃏 Blind Game
            </RouterLink>

            <RouterLink class="flip-button" @click="reloadpage()" :to="{ name: 'Multiplayer', params: { gamemode: 'flip'}, }">
                🃏 Flip Game
            </RouterLink>
            </div>
        </div>

        </div>

    </div>
</template>

<style scoped>
.welcome {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    color: white;
}

.gamemodes {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.gamemodesingleplayer
{
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(12, 255, 45, 0.2);
    border-radius: 20px;
    padding: 20px;
}
.gamemodemultiplayer
{
    background: rgba(5, 209, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 20px;
}
.welcome-box {
    width: 650px;
    max-width: 100%;
    padding: 50px 35px;
    box-sizing: border-box;

    text-align: center;

    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;

    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);

    backdrop-filter: blur(8px);
}

.welcome-box h1 {
    margin: 0;
    font-size: 48px;
    font-weight: 800;
}

.subtitle {
    margin: 15px 0 10px;
    font-size: 24px;
    font-weight: bold;
}

.description {
    margin: 0 auto 30px;
    max-width: 400px;
    line-height: 1.6;
    color: #ccccdd;
}

.normal-button,
.gamble-button,
.mimic-button,
.burn-button,
.freeze-button,
.wind-button,
.earth-button,
.lock-button,
.blind-button,
.flip-button,
.light-button,
.random-button {
    display: block;
    width: 220px;
    margin: 12px auto;
    padding: 13px 20px;

    box-sizing: border-box;

    border-radius: 10px;

    text-decoration: none;
    color: white;

    font-size: 16px;
    font-weight: bold;

    transition: transform 0.2s, box-shadow 0.2s;
}

.normal-button {
    background: linear-gradient(135deg, #22c55e, #15803d);
    box-shadow: 0 5px 15px rgba(34, 197, 94, 0.3);
}

.gamble-button {
    background: linear-gradient(135deg, #f59e0b, #d97706);
    box-shadow: 0 5px 15px rgba(245, 158, 11, 0.3);
}

.mimic-button {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
}

.burn-button {
    background: linear-gradient(135deg, #ef4444, #b91c1c);
    box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
}

.random-button {
    background: linear-gradient(135deg, #ec4899, #db2777);
    box-shadow: 0 5px 15px rgba(236, 72, 153, 0.3);
}

.freeze-button {
    background: linear-gradient(135deg, #3bf6f0, #1eafa5);
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.wind-button {
    background: linear-gradient(135deg, #eefcff, #919191);
    box-shadow: 0 5px 15px rgba(89, 89, 89, 0.3);
}

.earth-button {
    background: linear-gradient(135deg, #a3e635, #4d7c0f);
    box-shadow: 0 5px 15px rgba(163, 230, 53, 0.3);
}
.lock-button {
    background: linear-gradient(135deg, #9b9b9b, #4a4a4a);
    box-shadow: 0 5px 15px rgba(102, 102, 102, 0.3);
}
.blind-button {
    background: linear-gradient(135deg, #f43f5e, #9d174d);
    box-shadow: 0 5px 15px rgba(244, 63, 94, 0.3);
}
.flip-button {
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
}
.light-button {
    background: linear-gradient(135deg, #fef08a, #b45309);
    box-shadow: 0 5px 15px rgba(254, 224, 130, 0.3);
}
.normal-button:hover,
.gamble-button:hover,
.mimic-button:hover,
.burn-button:hover,
.freeze-button:hover,
.wind-button:hover,
.earth-button:hover,
.lock-button:hover,
.blind-button:hover,
.flip-button:hover,
.light-button:hover,
.random-button:hover {
    transform: translateY(-3px);
}

.normal-button:active,
.gamble-button:active,
.mimic-button:active,
.burn-button:active,
.freeze-button:active,
.wind-button:active,
.earth-button:active,
.lock-button:active,
.blind-button:active,
.flip-button:active,
.light-button:active,
.random-button:active {
    transform: translateY(0);
}
</style>