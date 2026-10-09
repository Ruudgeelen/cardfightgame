<script setup>
import { ref } from 'vue'

function reloadpage() {
    localStorage.setItem('Reload', 'false')
}
</script>

<template>
    <head>
        <title>Card Fight</title>
    </head>

<nav>
    <h1>⚔️ Card Fight</h1>
    <RouterLink to="/welcome">Welcome</RouterLink>
    <RouterLink @click="" to="/cards">Cards</RouterLink>
    <RouterLink to="/settings">Settings</RouterLink>
    <RouterLink to="/tutorial">Tutorial</RouterLink>

    <span class="nav-button-start-game">
        <RouterLink @click="reloadpage()" to="/homepage">
            Start Game
        </RouterLink>
    </span>
        <span class="nav-button-start-game">
        <RouterLink @click="reloadpage()" to="/multiplayer">
            Start Game Multiplayer
        </RouterLink>
    </span>
    <h1>⚔️ Card Fight</h1>
</nav>

    <RouterView/>
</template>

<style scoped>
nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px 20px;
    background: rgba(20, 20, 30, 0.9);
    border-bottom: 2px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

nav a {
    display: inline-block;
    padding: 10px 18px;
    border-radius: 8px;
    text-decoration: none;
    color: white;
    background: #3f3f4f;
    border: 1px solid #666;
    font-size: 15px;
    font-weight: bold;
    transition: 0.2s;
}

nav a:hover {
    background: #5a5a6d;
    transform: translateY(-2px);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.4);
}

nav a.router-link-active {
    background: #6366f1;
    border-color: #818cf8;
}

/* Start Game */
nav .nav-button-start-game a {
    background: linear-gradient(135deg, #22c55e, #15803d);
    border-color: #4ade80;
}

nav .nav-button-start-game a:hover {
    background: linear-gradient(135deg, #34d399, #16a34a);
}
</style>