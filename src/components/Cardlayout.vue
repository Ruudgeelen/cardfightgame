<script setup>
import '../assets/style.css'
import { getCardType } from '../data/cardTypes.js'
import { cardStatDescription, cardTooltip } from '../data/tooltips.js'
import { effectClasses, heeftlockeffect, heeftburneffect, heeftfreezeEffect, heeftgambleEffect } from '../data/effectClasses.js'

defineProps({
    card: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="card-layout">
        <h3>{{ card.name }}</h3>
        <div class="line"></div>

        <p v-if="card.type" class="type">
            {{ getCardType(card.type).icon }}
            Type: {{ getCardType(card.type).name }}
            {{ getCardType(card.type).icon }}
        </p>
        <p v-if="card.faketype" class="type">
            {{ getCardType(card.faketype).icon }}
            Fake Type: {{ getCardType(card.faketype).name }}
            {{ getCardType(card.faketype).icon }}
        </p>
        <div class="card-stats">
            <p v-if="heeftgambleEffect(card.effect)" class="effect-stat" :title="cardStatDescription(card, 'effect')"><span>🎲</span><b>{{  }}</b></p>
            <p v-if="heeftfreezeEffect(card.effect)" class="effect-stat" :title="cardStatDescription(card, 'effect')"><span>❄️</span><b>{{  }}</b></p>
            <p v-if="heeftlockeffect(card.effect)" class="effect-stat" :title="cardStatDescription(card, 'effect')"><span>🔒</span><b>{{  }}</b></p>
            <p v-if="heeftburneffect(card.effect)" class="effect-stat" :title="cardStatDescription(card, 'effect')"><span>🔥</span><b>{{ }}</b></p>
            <p v-if="card.attack" class="card-stat" :title="cardStatDescription(card, 'attack')"><span>⚔️</span><b>{{ card.attack }}</b></p>
            <p v-if="card.heal" class="card-stat" :title="cardStatDescription(card, 'heal')"><span>❤️</span><b>{{ card.heal }}</b></p>
            <p v-if="card.freeze" class="card-stat"><span>❄️</span></p>
            <p v-if="card.freezeadd" class="card-stat"><span>🧊</span><b></b></p>
            <p v-if="card.burn" class="card-stat"><span>🔥</span><b>{{ card.burn }} <small>⏳ {{ card.burnTurns }}</small></b></p>
            <p v-if="card.lock" class="card-stat"><span>🔒</span><b>{{ card.lock }} <small>⏳ {{ card.lockTurns }}</small></b></p>
            <p v-if="card.healthbaradd" class="card-stat" :title="cardStatDescription(card, 'healthbaradd')"><span>💚</span><b>{{ card.healthbaradd }}</b></p>
            <p v-if="card.healthbarremove" class="card-stat" :title="cardStatDescription(card, 'healthbarremove')"><span>💔</span><b>{{ card.healthbarremove }}</b></p>
            <p v-if="card.attackadd" class="card-stat" :title="cardStatDescription(card, 'attackadd')"><span>🔪</span><b>{{ card.attackadd > 0 ? '+' : '' }}{{ card.attackadd }}</b></p>
            <p v-if="card.healadd" class="card-stat" :title="cardStatDescription(card, 'healadd')"><span>💖</span><b>{{ card.healadd > 0 ? '+' : '' }}{{ card.healadd }}</b></p>
            <p v-if="card.attackaddadd" class="card-stat" :title="cardStatDescription(card, 'attackaddadd')"><span>🔪</span><b>{{ card.attackaddadd > 0 ? '++' : '' }}{{ card.attackaddadd }}</b></p>
            <p v-if="card.healaddadd" class="card-stat" :title="cardStatDescription(card, 'healaddadd')"><span>💖</span><b>{{ card.healaddadd > 0 ? '++' : '' }}{{ card.healaddadd }}</b></p>
            <p v-if="card.removecardnummer" class="card-stat"><span>🗑️</span><b>{{ card.removecardnummer }}</b></p>
            <p v-if="card.morecards" class="card-stat"><span>🃏</span><b>{{ card.morecards }}</b></p>
            <p v-if="card.stapel" class="card-stat"><span>🎴</span><b>{{ card.stapel }}</b></p>
            <p v-if="card.gambleCards" class="card-stat"><span>🎲</span><b>{{ card.gambleCards }}</b></p>
     </div>

        <div class="card-tooltip" role="tooltip">
            <strong>{{ card.name }}</strong>
            <span>{{ cardTooltip(card) }}</span>
        </div>
    </div>
</template>

<style scoped>
.card-layout {
    width: 100%;
    min-width: 0;
}

.card-layout h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card-layout .type {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card-layout .card-stats {
    width: 100%;
}
</style>
