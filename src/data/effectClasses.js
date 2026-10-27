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

export function heeftlockeffect(effect) {
    const effects = Array.isArray(effect) ? effect : [effect]
    const activeEffects = effects.filter(
        (value) => typeof value === 'string' && value.trim()
    )
    return activeEffects.some((value) => value === 'lock')
}