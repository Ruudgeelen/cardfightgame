export function effectClasses(effect) {
    const effects = Array.isArray(effect) ? effect : [effect]
    const activeEffects = effects.filter(
        (value) => typeof value === 'string' && value.trim()
    )

    return [
        ...activeEffects.map((value) => `effect-${value.trim()}`),
        activeEffects.length > 1 ? 'effect-multiple' : ''
    ]
}

export function heeftlockEffect(effect) {
    const effects = Array.isArray(effect) ? effect : [effect]
    const activeEffects = effects.filter(
        (value) => typeof value === 'string' && value.trim()
    )
    return activeEffects.some((value) => value === 'lock')
}

export function heeftburnEffect(effect) {
    const effects = Array.isArray(effect) ? effect : [effect]
    const activeEffects = effects.filter(
        (value) => typeof value === 'string' && value.trim()
    )
    return activeEffects.some((value) => value === 'burn')
}

export function heeftfreezeEffect(effect) {
    const effects = Array.isArray(effect) ? effect : [effect]
    const activeEffects = effects.filter(
        (value) => typeof value === 'string' && value.trim()
    )
    return activeEffects.some((value) => value === 'freeze')
}

export function heeftgambleEffect(effect) {
    const effects = Array.isArray(effect) ? effect : [effect]
    const activeEffects = effects.filter(
        (value) => typeof value === 'string' && value.trim()
    )
    return activeEffects.some((value) => value === 'gamble')
}

export function heeftblindEffect(effect) {
    const effects = Array.isArray(effect) ? effect : [effect]
    const activeEffects = effects.filter(
        (value) => typeof value === 'string' && value.trim()
    )
    return activeEffects.some((value) => value === 'blind')
}

export function heeftlightEffect(effect) {
    const effects = Array.isArray(effect) ? effect : [effect]
    const activeEffects = effects.filter(
        (value) => typeof value === 'string' && value.trim()
    )
    return activeEffects.some((value) => value === 'light')
}

export function heeftflipEffect(effect) {
    const effects = Array.isArray(effect) ? effect : [effect]
    const activeEffects = effects.filter(
        (value) => typeof value === 'string' && value.trim()
    )
    return activeEffects.some((value) => value === 'flip')
}

export function heeftpoisonEffect(effect) {
    const effects = Array.isArray(effect) ? effect : [effect]
    const activeEffects = effects.filter(
        (value) => typeof value === 'string' && value.trim()
    )
    return activeEffects.some((value) => value === 'poison')
}