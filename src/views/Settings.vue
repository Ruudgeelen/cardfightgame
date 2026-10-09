<script setup>
import { ref } from 'vue'

const aantalcards = ref(localStorage.getItem('aantalcards') || 5)
const zieStapel = ref(localStorage.getItem('zieStapel') || 'true')
const zieStapelCards = ref(localStorage.getItem('zieStapelCards') || 5)
const playerHealth = ref(localStorage.getItem('playerHealth') || 100)
const enemyHealth = ref(localStorage.getItem('enemyHealth') || 100)
const playerMaxHealth = ref(localStorage.getItem('playerMaxHealth') || 100)
const enemyMaxHealth = ref(localStorage.getItem('enemyMaxHealth') || 100)
const zieEnemyCards = ref(localStorage.getItem('zieEnemyCards') || 'false')

function SaveSettings() {
    localStorage.setItem('aantalcards', aantalcards.value)
    localStorage.setItem('playerHealth', playerHealth.value)
    localStorage.setItem('enemyHealth', enemyHealth.value)
    localStorage.setItem('playerMaxHealth', playerMaxHealth.value)
    localStorage.setItem('enemyMaxHealth', enemyMaxHealth.value)
    localStorage.setItem('zieStapel', zieStapel.value)
    localStorage.setItem('zieStapelCards', zieStapelCards.value)
    localStorage.setItem('zieEnemyCards', zieEnemyCards.value)
}

function CancelSettings() {
    location.reload()
}

function ResetSettings() {
    localStorage.removeItem('aantalcards')
    localStorage.removeItem('playerHealth')
    localStorage.removeItem('enemyHealth')
    localStorage.removeItem('playerMaxHealth')
    localStorage.removeItem('enemyMaxHealth')
    localStorage.removeItem('zieStapel')
    localStorage.removeItem('zieStapelCards')
    localStorage.removeItem('zieEnemyCards')

    location.reload()
}
</script>

<template>
    <div class="settings-page">

        <div class="settings-box">

            <h1>⚙️ Settings</h1>

            <p class="settings-subtitle">
                Adjust the settings for your Card Fight game.
            </p>

            <div class="settings-list">

                <div class="setting">
                    <label for="aantalcards">
                        🃏 Number of Cards
                    </label>

                    <input type="number" id="aantalcards" v-model="aantalcards" min="1" max="10">
                </div>

                <div class="setting">
                    <label for="playerHealth">
                        ❤️ Player Health
                    </label>

                    <input type="number" id="playerHealth" v-model="playerHealth" min="1" max="1000">
                </div>

                <div class="setting">
                    <label for="enemyHealth">
                        💀 Enemy Health
                    </label>

                    <input type="number" id="enemyHealth" v-model="enemyHealth" min="1" max="1000">
                </div>

                <div class="setting">
                    <label for="playerMaxHealth">
                        💚 Player Max Health
                    </label>

                    <input type="number" id="playerMaxHealth" v-model="playerMaxHealth" min="1" max="1000">
                </div>

                <div class="setting">
                    <label for="enemyMaxHealth">
                        💚 Enemy Max Health
                    </label>

                    <input type="number" id="enemyMaxHealth" v-model="enemyMaxHealth" min="1" max="1000">
                </div>

                <div class="setting checkbox-setting">
                    <label for="zieEnemyCards">
                        👀 Show Enemy Cards
                    </label>

                    <input type="checkbox" id="zieEnemyCards" v-model="zieEnemyCards">
                </div>
                <div class="setting checkbox-setting">
                    <label for="zieStapel">
                        👀 Show Deck
                    </label>

                    <input type="checkbox" id="zieStapel" v-model="zieStapel">
                </div>
                <div class="setting">
                    <label for="zieStapelCards">
                        🃏 Number of Deck Cards to Show
                    </label>

                    <input type="number" id="zieStapelCards" v-model="zieStapelCards" min="1" max="">
                </div>

            </div>

            <div class="settings-buttons">

                <button class="save-button" @click="SaveSettings">
                    💾 Save
                </button>

                <button class="cancel-button" @click="CancelSettings">
                    ✖ Cancel
                </button>

                <button class="reset-button" @click="ResetSettings">
                    🔄 Reset
                </button>

            </div>

        </div>

    </div>
</template>

<style scoped>
.settings-page {
    min-height: calc(100vh - 65px);

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 30px 20px;

    color: white;
}

.settings-box {
    width: 500px;
    max-width: 100%;

    padding: 35px;

    background: rgba(255, 255, 255, 0.07);

    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 18px;

    box-shadow:
        0 15px 40px rgba(0, 0, 0, 0.45);

    backdrop-filter: blur(8px);
}

.settings-box h1 {
    margin: 0;

    text-align: center;

    font-size: 36px;
}

.settings-subtitle {
    margin: 10px 0 30px;

    text-align: center;

    color: #ccccdd;

    font-size: 14px;
}


/* =========================
   SETTINGS
   ========================= */

.settings-list {
    display: flex;
    flex-direction: column;

    gap: 14px;
}

.setting {
    display: flex;

    justify-content: space-between;
    align-items: center;

    gap: 20px;

    padding: 12px 15px;

    background: rgba(0, 0, 0, 0.2);

    border: 1px solid rgba(255, 255, 255, 0.1);

    border-radius: 8px;
}

.setting label {
    font-size: 14px;
    font-weight: bold;
}

.setting input[type="number"] {
    width: 100px;

    padding: 7px 10px;

    background: #252532;

    border: 1px solid #666;
    border-radius: 6px;

    color: white;

    font-size: 14px;

    text-align: center;
}

.setting input[type="number"]:focus {
    outline: none;

    border-color: #888;

    box-shadow:
        0 0 5px rgba(255, 255, 255, 0.2);
}


/* =========================
   CHECKBOX
   ========================= */

.checkbox-setting input[type="checkbox"] {
    width: 20px;
    height: 20px;

    cursor: pointer;
}


/* =========================
   BUTTONS
   ========================= */

.settings-buttons {
    display: flex;

    justify-content: center;

    gap: 10px;

    margin-top: 25px;

    flex-wrap: wrap;
}

.settings-buttons button {
    padding: 10px 18px;

    border: none;
    border-radius: 8px;

    color: white;

    font-size: 14px;
    font-weight: bold;

    transition: 0.2s;
}

.settings-buttons button:hover {
    transform: translateY(-2px);
}

.save-button {
    background: #22a447;

    box-shadow:
        0 4px 10px rgba(34, 164, 71, 0.3);
}

.cancel-button {
    background: #555;

    box-shadow:
        0 4px 10px rgba(0, 0, 0, 0.3);
}

.reset-button {
    background: #c0392b;

    box-shadow:
        0 4px 10px rgba(192, 57, 43, 0.3);
}
</style>