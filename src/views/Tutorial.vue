<script setup>
import { RouterLink } from 'vue-router'
import '../assets/style.css'
</script>

<template>
    <div class="tutorial">

        <div class="tutorial-box">

            <h1>📖 How to Play</h1>

            <p class="intro">
                Learn the basics of Card Fight before you start!
            </p>

            <div class="rules">

                <div class="rule">
                    <span>🃏</span>
                    <div>
                        <h2>Your Cards</h2>
                        <p>
                            You start with a hand of cards.
                            Every card has its own attack, heal and effects.
                        </p>
                    </div>
                </div>

                <div class="rule">
                    <span>⚔️</span>
                    <div>
                        <h2>Attack</h2>
                        <p>
                            When you use a card, its Attack damages the enemy.
                        </p>
                    </div>
                </div>

                <div class="rule">
                    <span>❤️</span>
                    <div>
                        <h2>Heal</h2>
                        <p>
                            Some cards heal your HP when you use them.
                        </p>
                    </div>
                </div>

                <div class="rule">
                    <span>🔥</span>
                    <div>
                        <h2>Burn</h2>
                        <p>
                            Burn makes the enemy's cards weaker by reducing
                            their Attack and Heal.
                        </p>
                    </div>
                </div>

                <div class="rule">
                    <span>❄️</span>
                    <div>
                        <h2>Freeze</h2>
                        <p>
                            Freeze removes Burn from the affected cards.
                        </p>
                    </div>
                </div>

                <div class="rule">
                    <span>🤖</span>
                    <div>
                        <h2>AI Turn</h2>
                        <p>
                            After you play a card, the AI gets its turn
                            and plays one of its cards.
                        </p>
                    </div>
                </div>

                <div class="rule">
                    <span>🔄</span>
                    <div>
                        <h2>New Cards</h2>
                        <p>
                            After a card is used, it is replaced by a new card.
                        </p>
                    </div>
                </div>

                <div class="rule">
                    <span>🏆</span>
                    <div>
                        <h2>Win</h2>
                        <p>
                            Reduce the enemy's HP to 0 before your own HP
                            reaches 0.
                        </p>
                    </div>
                </div>

            </div>

            <RouterLink
                class="start-button"
                to="/homepage"
            >
                ⚔️ Start Game
            </RouterLink>

        </div>

    </div>
</template>

<style scoped>
.tutorial {
    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 30px 20px;
    box-sizing: border-box;

    color: white;
}

.tutorial-box {
    width: 750px;
    max-width: 100%;

    padding: 40px;

    box-sizing: border-box;

    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.2);

    border-radius: 20px;

    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);

    backdrop-filter: blur(8px);
}

.tutorial-box h1 {
    margin: 0;
    text-align: center;

    font-size: 40px;
}

.intro {
    margin: 10px 0 30px;

    text-align: center;

    color: #ccccdd;
}

.rules {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.rule {
    display: flex;
    align-items: flex-start;
    gap: 15px;

    padding: 15px;

    background: rgba(255, 255, 255, 0.06);

    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
}

.rule > span {
    font-size: 28px;
    min-width: 40px;
}

.rule h2 {
    margin: 0 0 5px;

    font-size: 19px;
}

.rule p {
    margin: 0;

    color: #ccccdd;

    line-height: 1.5;
}

.start-button {
    display: block;

    width: 220px;

    margin: 30px auto 0;
    padding: 13px 20px;

    box-sizing: border-box;

    text-align: center;

    background: linear-gradient(135deg, #22c55e, #15803d);

    border-radius: 10px;

    color: white;

    font-size: 16px;
    font-weight: bold;

    text-decoration: none;

    transition: transform 0.2s, box-shadow 0.2s;
}

.start-button:hover {
    transform: translateY(-3px);

    box-shadow: 0 5px 15px rgba(34, 197, 94, 0.3);
}
</style>