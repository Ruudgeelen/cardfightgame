<script setup>
import { GetCards } from '../data/card.js'
import { ref, computed, onMounted } from 'vue'
import { cardTypes } from '../data/cardTypes.js'
import { cardTooltip } from '../data/tooltips.js'
import Cardlayout from '../components/Cardlayout.vue'
import { effectClasses } from '../data/effectClasses.js'

onMounted(() => {
        if (localStorage.getItem('Reload') === 'true') {
            localStorage.removeItem('Reload')
        }
        else {
            localStorage.setItem('Reload', 'true')
            // location.reload()
        }
})
const allCards = GetCards('Normal')
const searchQuery = ref('')
const selectedType = ref('')
const selectedEffect = ref('')

const effectFilters = [
    { value: 'burn', label: 'Burn' },
    { value: 'freeze', label: 'Freeze' },
    { value: 'gamble', label: 'Gamble' },
    { value: 'attackadd', label: 'Attack boost' },
    { value: 'healadd', label: 'Heal boost' },
    { value: 'healthbaradd', label: 'Health increase' },
    { value: 'healthbarremove', label: 'Health reduction' },
    { value: 'morecards', label: 'More cards' },
    { value: 'removecardnummer', label: 'Remove cards' },
    { value: 'stapel', label: 'Deck effect' }
]

const filteredCards = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()

    return allCards.filter((card) => {
        const matchesName =
            !query || card.name.toLowerCase().includes(query)
        const matchesType =
            !selectedType.value || card.type === selectedType.value
        const matchesEffect =
            !selectedEffect.value || Boolean(card[selectedEffect.value])

        return matchesName && matchesType && matchesEffect
    })
})

</script>

<template>
    <div class="cards-page">

        <div class="cards-header">
            <h1>🃏 All Cards ({{ filteredCards.length }} / {{ allCards.length }})</h1>

            <p>
                View all cards available in Card Fight.
            </p>
        </div>

        <div class="cards-box">

            <div class="card-filters">
                <input
                    v-model="searchQuery"
                    type="search"
                    placeholder="Search cards..."
                    aria-label="Search cards"
                >

                <select v-model="selectedType" aria-label="Filter by card type">
                    <option value="">All types</option>
                    <option
                        v-for="(type, value) in cardTypes"
                        :key="value"
                        :value="value"
                    >
                        {{ type.icon }} {{ type.name }}
                    </option>
                </select>

                <select v-model="selectedEffect" aria-label="Filter by card effect">
                    <option value="">All effects</option>
                    <option
                        v-for="effect in effectFilters"
                        :key="effect.value"
                        :value="effect.value"
                    >
                        {{ effect.label }}
                    </option>
                </select>
            </div>

            <div class="cardgrid">

               <div
                v-for="card in filteredCards"
                :key="card.id"
                :class="[
                    'card',
                    card.type,
                    effectClasses(card.effect),
                    'card-modern'
                ]"
                :data-tooltip="`${card.name}\n${cardTooltip(card)}`"
            >

                <!-- SHOW CARDS -->
                <div>
                    <Cardlayout :card="card" />
                </div>

                </div>

            </div>

            <p v-if="filteredCards.length === 0" class="no-cards">
                No cards match these filters.
            </p>

        </div>

    </div>
</template>

<style scoped>
.cards-page {
    min-height: calc(100vh - 65px);

    padding: 35px 25px;

    color: white;
}


/* =========================
   TITEL
   ========================= */

.cards-header {
    text-align: center;

    margin-bottom: 25px;
}

.cards-header h1 {
    margin: 0 0 8px;

    font-size: 36px;

    text-shadow:
        0 3px 8px rgba(0, 0, 0, 0.6);
}

.cards-header p {
    margin: 0;

    color: #ccccdd;

    font-size: 15px;
}


/* =========================
   KAARTEN CONTAINER
   ========================= */

.cards-box {
    width: 100%;
    max-width: 1250px;

    margin: 0 auto;

    padding: 25px;

    background: rgba(20, 20, 30, 0.55);

    border: 1px solid rgba(255, 255, 255, 0.15);

    border-radius: 18px;

    box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.4);

    backdrop-filter: blur(5px);
}


/* =========================
   KAART GRID
   ========================= */

.cardgrid {
    display: grid;

    grid-template-columns:
        repeat(auto-fill, minmax(170px, 1fr));

    justify-items: center;

    gap: 25px;
}

.card-filters {
    display: flex;
    gap: 12px;
    margin-bottom: 25px;
    flex-wrap: wrap;
}

.card-filters input,
.card-filters select {
    min-width: 170px;
    flex: 1;
    padding: 10px 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    background: rgba(10, 10, 18, 0.8);
    color: white;
    font: inherit;
}

.card-filters input::placeholder {
    color: rgba(255, 255, 255, 0.6);
}

.no-cards {
    margin: 30px 0 5px;
    color: #ccccdd;
    text-align: center;
}


</style>