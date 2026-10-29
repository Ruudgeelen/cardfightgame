<script setup>
import { RouterLink } from 'vue-router'
import { cardTypes } from '../data/cardTypes.js'
import '../assets/style.css'

const cardTypeList = Object.values(cardTypes)
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
                            Every card has its own attack, healing power and
                            possible effects. The card type is shown with an
                            icon.
                        </p>
                    </div>
                </div>

                <div class="rule">
                    <span>🎴</span>
                    <div>
                        <h2>Card Types</h2>
                        <p>
                            Card types identify the theme of a card. They do
                            not automatically determine its strength; check
                            the attack, heal and effect values on each card.
                        </p>
                        <div class="card-type-list">
                            <span
                                v-for="cardType in cardTypeList"
                                :key="cardType.name"
                                class="card-type"
                            >
                                {{ cardType.icon }} {{ cardType.name }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="rule">
                    <span>⚔️</span>
                    <div>
                        <h2>Attack</h2>
                        <p>
                            When you use a card, its Attack damages the enemy.
                            Its Heal value restores your HP at the same time.
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
                            Burn makes the affected player's cards weaker.
                            Their Attack and Heal are reduced for a limited
                            number of turns.
                        </p>
                    </div>
                </div>

                <div class="rule">
                    <span>❄️</span>
                    <div>
                        <h2>Freeze</h2>
                        <p>
                            Freeze removes Burn when a card is already
                            burning. Otherwise, the affected cards stay
                            frozen and cannot be burned until the effect is
                            cleared.
                        </p>
                    </div>
                </div>

                <div class="rule">
                    <span>🔒</span>
                    <div>
                        <h2>Lock</h2>
                        <p>
                            Lock prevents the affected player from using
                            cards for a limited number of turns.
                        </p>
                    </div>
                </div>

                <div class="rule">
                    <span>👁️</span>
                    <div>
                        <h2>Blind</h2>
                        <p>
                            Blind hides the affected player's cards for a
                            limited number of turns. The player can still
                            use the cards, but cannot see their values.
                        </p>
                    </div>
                </div>

                <div class="rule">
                    <span>💡</span>
                    <div>
                        <h2>Light</h2>
                        <p>
                            Light reveals the affected player's cards for a
                            limited number of turns. The player can see the
                            cards, but cannot use them.
                        </p>
                    </div>
                </div>

                <div class="rule">
                    <span>🔄</span>
                    <div>
                        <h2>Flip</h2>
                        <p>
                            Flip reverses the affected player's cards for a
                            limited number of turns. The player can see the
                            cards, but their values are inverted.
                        </p>
                    </div>
                </div>

                <div class="rule">
                    <span>🎲</span>
                    <div>
                        <h2>Game Modes</h2>
                        <p>
                            Choose a game mode to play. Each mode has its own rules and effects. Some modes are more challenging than others, so choose wisely!
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
                    <span>🌐</span>
                    <div>
                        <h2>Multiplayer</h2>
                        <p>
                            Choose a game mode, create a room and share the
                            room code. The game starts when a second player
                            joins. On your turn, choose one of your cards;
                            the first player to reduce the opponent's HP to
                            0 wins.
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
                to="/play"
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

.card-type-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
}

.card-type {
    padding: 5px 9px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    color: #eeeeff;
    font-size: 13px;
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