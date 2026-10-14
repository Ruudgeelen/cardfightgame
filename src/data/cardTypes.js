export const cardTypes = {
    fire: { name: 'Fire', icon: '🔥' },
    lava: { name: 'Lava', icon: '🌋' },
    water: { name: 'Water', icon: '💧' },
    earth: { name: 'Earth', icon: '🌍' },
    wind: { name: 'Wind', icon: '🌪️' },
    normal: { name: 'Normal', icon: '⚔️' },
    dragon: { name: 'Dragon', icon: '🐉' },
    undead: { name: 'Undead', icon: '💀' },
    light: { name: 'Light', icon: '✨' },
    space: { name: 'Space', icon: '🚀' },
    dark: { name: 'Dark', icon: '🌑' },
    freeze: { name: 'Freeze', icon: '❄️' },
    ice: { name: 'Ice', icon: '🧊' },
    lifesteal: { name: 'Lifesteal', icon: '🩸' },
    heal: { name: 'Heal', icon: '💚' },
    rare: { name: 'Rare', icon: '💎' },
    unique: { name: 'Unique', icon: '⭐' },
    troll: { name: 'Troll', icon: '👹' },
    special: { name: 'Special', icon: '🎯' },
    gamble: { name: 'Gamble', icon: '🎲' },
    lucky: { name: 'Lucky', icon: '🍀' },
    rainbow: { name: 'Rainbow', icon: '🌈' }
}

export function getCardType(type) {
    return cardTypes[type] || { name: type || 'Unknown', icon: '🃏' }
}
