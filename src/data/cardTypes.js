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
    random: { name: 'Random', icon: '🔀' },
    space: { name: 'Space', icon: '🚀' },
    dark: { name: 'Dark', icon: '🌑' },
    weather: { name: 'Weather', icon: '⛅' },
    freeze: { name: 'Freeze', icon: '❄️' },
    ice: { name: 'Ice', icon: '🧊' },
    lifesteal: { name: 'Lifesteal', icon: '🩸' },
    tnt: { name: 'TNT', icon: '💣' },
    blur: { name: 'Blur', icon: '🌫️' },
    heal: { name: 'Heal', icon: '💚' },
    rare: { name: 'Rare', icon: '💎' },
    unique: { name: 'Unique', icon: '⭐' },
    magic: { name: 'Magic', icon: '🪄' },
    shield: { name: 'Shield', icon: '🛡️' },
    lock: { name: 'Lock', icon: '🔒' },
    poison: { name: 'Poison', icon: '☠️' },
    lightning: { name: 'Lightning', icon: '⚡' },
    ghost: { name: 'Ghost', icon: '👻' },
    soft: { name: 'Soft', icon: '🧸' },
    hole: { name: 'Hole', icon: '🕳️' },
    legendary: { name: 'Legendary', icon: '🏆' },
    animal: { name: 'Animal', icon: '🐾' },
    plant: { name: 'Plant', icon: '🌱' },
    troll: { name: 'Troll', icon: '👹' },
    batsie: { name: 'Batsie', icon: '🦇' },
    frikandelcat: { name: 'Frikandelcat', icon: '🐱' },
    hell: { name: 'Hell', icon: '🐦‍🔥' },
    megaheal: { name: 'Megaheal', icon: '💖' },
    heaven: { name: 'Heaven', icon: '👼' },
    ocean: { name: 'Ocean', icon: '🪸' },
    storm: { name: 'Storm', icon: '🌩️' },
    world: { name: 'World', icon: '🌎' },
    megaice: { name: 'Mega Ice', icon: '☃️' },
    eye: { name: 'Eye', icon: '👁️' },
    closed: { name: 'Closed', icon: '🔐' },
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