<script setup>
import '../assets/style.css'

defineProps({
    cards: {
        type: Array,
        required: true
    },
    settings: {
        type: Number,
        required: true
    }
})
</script>

<template>
    <div class="deck-section">
        <h2>🃏 Volgende kaarten: {{ cards.length }}</h2>

        <div class="deck">
            <div
                v-for="(card, index) in cards.slice(0, settings)"
                :key="card.id"
                class="deck-card"
            >
                <div :class="[
                    'card',
                    'deck-card-face',
                    card.type]">
                </div>
            </div>
        </div>

        <p v-if="cards.length === 0">
            Geen kaarten meer in de stapel.
        </p>
    </div>
</template>

<style scoped>
.deck-section {
    margin: 16px auto;
    padding: 14px 16px 16px;
    max-width: 700px;
    text-align: center;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 15px;
}

.deck-section h2 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 18px;
}

.deck {
    display: flex;
    justify-content: center;
    min-height: 86px;
    gap: 0;
    flex-wrap: wrap;
}

.deck-card {
    position: relative;
    width: 60px;
    height: 84px;
    margin-left: -20px;
    transform: rotate(var(--deck-rotation, 0deg));
    transition: transform 0.2s ease, z-index 0.2s ease;
}

.deck-card:first-child {
    margin-left: 0;
}

.deck-card:hover {
    z-index: 2;
    transform: translateY(-8px) rotate(0deg);
}

.deck-card-face {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 0;
    padding: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-width: 2px;
    border-radius: 8px;
    color: white;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.65);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.35);
}

.deck-symbol {
    margin-bottom: 3px;
    font-size: 18px;
}

.deck-card-face strong {
    max-width: 48px;
    overflow: hidden;
    font-size: 9px;
    text-overflow: ellipsis;
    text-transform: capitalize;
    white-space: nowrap;
}


.deck-card p {
    margin: 5px 0 0;
    font-size: 11px;
    font-weight: bold;
}
</style>
