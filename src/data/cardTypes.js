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
    tnt: { name: 'TNT', icon: '💣' },
    heal: { name: 'Heal', icon: '💚' },
    rare: { name: 'Rare', icon: '💎' },
    unique: { name: 'Unique', icon: '⭐' },
    poison: { name: 'Poison', icon: '☠️' },
    lightning: { name: 'Lightning', icon: '⚡' },
    ghost: { name: 'Ghost', icon: '👻' },
    soft: { name: 'Soft', icon: '🧸' },
    hole: { name: 'Hole', icon: '🕳️' },
    legendary: { name: 'Legendary', icon: '🏆' },
    animal: { name: 'Animal', icon: '🐾' },
    plant: { name: 'Plant', icon: '🌱' },
    troll: { name: 'Troll', icon: '👹' },
    hell: { name: 'Hell', icon: '🔥' },
    megaheal: { name: 'Megaheal', icon: '💖' },
    heaven: { name: 'Heaven', icon: '👼' },
    storm: { name: 'Storm', icon: '🌩️' },
    megaice: { name: 'Mega Ice', icon: '☃️' },
    mimic: { name: 'Mimic', icon: '🎭' },
    kaart: { name: 'Kaart', icon: '🎴' },
    gamble: { name: 'Gamble', icon: '🎲' },
    lucky: { name: 'Lucky', icon: '🍀' },
    boss: { name: 'Boss', icon: '👺' },
    bonus: { name: 'Bonus', icon: '🎁' },
    rainbow: { name: 'Rainbow', icon: '🌈' }
}

export function getCardType(type) {
    return cardTypes[type] || { name: type || 'Unknown', icon: '🃏' }
}

export function getRandomCardType() {
    const types = Object.keys(cardTypes)
    const randomIndex = Math.floor(Math.random() * types.length)
    return types[randomIndex]
}