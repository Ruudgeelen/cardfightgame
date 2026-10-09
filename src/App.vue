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
    <RouterLink class="nav-brand" to="/welcome">
        <span>⚔️</span>
        <strong>Card Fight</strong>
    </RouterLink>

    <div class="nav-links">
        <RouterLink to="/welcome">Welcome</RouterLink>
        <RouterLink to="/cards">Cards</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
        <RouterLink to="/tutorial">Tutorial</RouterLink>
    </div>

    <div class="nav-actions">
        <RouterLink class="nav-button-start-game" @click="reloadpage()" to="/homepage">
            <span>▶</span> Start Game
        </RouterLink>
        <RouterLink class="nav-button-start-game multiplayer-link" @click="reloadpage()" to="/multiplayer">
            <span>🌐</span> Multiplayer
        </RouterLink>
    </div>
</nav>

    <RouterView/>
</template>

<style scoped>
nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 12px clamp(16px, 4vw, 52px);
    background: rgba(9, 14, 31, 0.88);
    border-bottom: 1px solid rgba(119, 224, 255, 0.18);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(16px);
}

.nav-brand {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    color: #f7d779;
    font-size: 20px;
    letter-spacing: 0.4px;
    text-decoration: none;
    white-space: nowrap;
}

.nav-brand span {
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border: 1px solid rgba(247, 215, 121, 0.5);
    border-radius: 10px;
    background: rgba(247, 215, 121, 0.12);
}

.nav-links,
.nav-actions {
    display: flex;
    align-items: center;
    gap: 6px;
}

nav a {
    display: inline-block;
    padding: 8px 12px;
    border: 1px solid transparent;
    border-radius: 8px;
    text-decoration: none;
    color: rgba(238, 244, 255, 0.72);
    font-size: 13px;
    font-weight: 700;
    transition: background 0.2s, color 0.2s, transform 0.2s;
}

nav a:hover {
    color: white;
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
}

nav a.router-link-active {
    color: #f7d779;
    border-color: rgba(247, 215, 121, 0.24);
    background: rgba(247, 215, 121, 0.1);
}

nav .nav-button-start-game {
    color: #07101b;
    background: linear-gradient(135deg, #7cf0c5, #28bd9a);
    border-color: rgba(174, 255, 224, 0.6);
    box-shadow: 0 5px 16px rgba(40, 189, 154, 0.2);
}

nav .nav-button-start-game:hover {
    color: #07101b;
    background: linear-gradient(135deg, #a4f8d7, #40d7b2);
}

nav .multiplayer-link {
    color: #07101b;
    background: linear-gradient(135deg, #f7d779, #df9f3b);
    border-color: rgba(255, 235, 160, 0.65);
}

nav .multiplayer-link:hover {
    color: #07101b;
    background: linear-gradient(135deg, #ffe9a2, #efb95a);
}

@media (max-width: 900px) {
    nav {
        flex-wrap: wrap;
        justify-content: center;
    }

    .nav-brand {
        width: 100%;
        justify-content: center;
    }
}

@media (max-width: 560px) {
    .nav-links,
    .nav-actions {
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
    }

    .nav-actions a {
        flex: 1;
        text-align: center;
    }
}
</style>