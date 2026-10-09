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
                <div  :class="[
                    'card',
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
    margin: 25px auto;
    padding: 20px;
    max-width: 900px;
    text-align: center;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 15px;
}

.deck-section h2 {
    margin-top: 0;
    margin-bottom: 15px;
}

.deck {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
}

.card {
    position: relative;
    width: 30px;
    min-height: 50px;
    padding: 8px;
    box-sizing: border-box;

}

.deck-number {
    position: absolute;
    top: 5px;
    left: 7px;
    font-size: 11px;
    color: #aaa;
}



.deck-card p {
    margin: 5px 0 0;
    font-size: 11px;
    font-weight: bold;
}
</style>
