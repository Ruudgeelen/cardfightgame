<script setup>
import { RouterLink } from 'vue-router'
import '../assets/style.css'
</script>

<template>
    <div class="welcome">

        <div class="welcome-box">

            <h1>⚔️ Card Fight</h1>

            <p class="subtitle">
                Welcome to Card Fight!
            </p>

            <p class="description">
                Build your deck, use powerful effects and
                defeat the AI in an epic card battle.
            </p>

            <RouterLink class="start-button" to="/homepage">
                ▶ Start Game
            </RouterLink>

            <RouterLink class="tutorial-button" to="/tutorial">
                📚 Tutorial
            </RouterLink>

            <RouterLink class="settings-button" to="/settings">
                ⚙️ Settings
            </RouterLink>

            <RouterLink class="cards-button" to="/cards">
                🃏 View Cards
            </RouterLink>

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

.welcome-box {
    width: 500px;
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

.start-button,
.cards-button,
.tutorial-button,
.settings-button {
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

.start-button {
    background: linear-gradient(135deg, #22c55e, #15803d);
    box-shadow: 0 5px 15px rgba(34, 197, 94, 0.3);
}

.cards-button {
    background: linear-gradient(135deg, #6366f1, #4338ca);
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
}
.tutorial-button {
    background: linear-gradient(135deg, #facc15, #b45309);
    box-shadow: 0 5px 15px rgba(250, 204, 21, 0.3);
}
.settings-button {
    background: linear-gradient(135deg, #f87171, #b91c1c);
    box-shadow: 0 5px 15px rgba(248, 113, 113, 0.3);
}
.start-button:hover,
.cards-button:hover,
.tutorial-button:hover,
.settings-button:hover {
    transform: translateY(-3px);
}

.start-button:active,
.cards-button:active,
.tutorial-button:active,
.settings-button:active {
    transform: translateY(0);
}
</style>