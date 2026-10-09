<script setup>
import '../assets/style.css'
defineProps({
    attack: Number
})

const emit = defineEmits(['attack'])

function attackEnemy() {
    emit('attack')
}
</script>

<template>
    <button @click="attackEnemy">
        Attack {{ attack }}
    </button>
</template>

<style scoped>
button {
    padding: 10px 20px;
    cursor: pointer;
}
</style>