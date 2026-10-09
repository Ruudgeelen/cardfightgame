```vue
<script setup>
import { computed } from 'vue'

const props = defineProps({
    health: {
        type: Number,
        required: true
    },
    maxHealth: {
        type: Number,
        required: true
    }
})

const healthPercentage = computed(() => {
    if (props.maxHealth <= 0) {
        return 0
    }

    const percentage = (props.health / props.maxHealth) * 100

    if (percentage < 0) {
        return 0
    }

    if (percentage > 100) {
        return 100
    }

    return percentage
})
</script>

<template>
    <div class="health-container">

        <div class="health-info">
            <span>❤️ HP</span>
            <span>{{ health }} / {{ maxHealth }}</span>
        </div>

        <div class="health">

            <div
                class="health-bar"
                :style="{
                    width: healthPercentage + '%'
                }"
            ></div>

        </div>

    </div>
</template>

<style scoped>
.health-container {
    width: 300px;
    max-width: 90%;
    margin: 15px auto;
}

.health-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-weight: bold;
    font-size: 16px;
}

.health {
    width: 100%;
    height: 25px;
    padding: 3px;
    box-sizing: border-box;

    background: #181818;

    border: 2px solid black;
    border-radius: 15px;

    overflow: hidden;

    box-shadow:
        inset 0 2px 5px rgba(0, 0, 0, 0.6),
        0 3px 8px rgba(0, 0, 0, 0.3);
}

.health-bar {
    height: 100%;
    min-width: 0;

    border-radius: 10px;

    background: linear-gradient(
        90deg,
        #00c853,
        #4ade80
    );

    box-shadow:
        0 0 8px rgba(74, 222, 128, 0.8);

    transition:
        width 0.4s ease,
        background 0.4s ease;

    position: relative;
}

.health-bar::after {
    content: "";

    position: absolute;

    top: 2px;
    left: 5px;
    right: 5px;

    height: 5px;

    border-radius: 10px;

    background: rgba(255, 255, 255, 0.35);
}
</style>