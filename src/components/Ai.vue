<script setup>
import { onMounted } from 'vue'
import '../assets/style.css'
const props = defineProps({
    enemyCards: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['aiAttack'])

onMounted(() => {

    setTimeout(() => {

        if (props.enemyCards.length > 0) {
            emit('aiAttack')
        }

    }, 500)

})
</script>

<template>

    <div class="ai">

        <h2>AI Turn</h2>

        <p>AI is thinking...</p>

    </div>

</template>

<style scoped>
.ai {
    padding: 15px;
    margin-bottom: 20px;

    border: 2px solid black;
    border-radius: 10px;

    background: #f5f5f5;
}
</style>