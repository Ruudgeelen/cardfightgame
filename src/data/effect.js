function effectList(card) {
    if (Array.isArray(card.effect)) {
        return card.effect.filter(Boolean)
    }

    return card.effect ? [card.effect] : []
}

function setEffects(card, effects) {
    const uniqueEffects = [...new Set(effects.filter(Boolean))]
    card.effect = uniqueEffects.length > 1
        ? uniqueEffects
        : uniqueEffects[0] || ""
}

function addEffect(card, effect, value = "", turns = "") {
    const effects = effectList(card)
    if (!effects.includes(effect)) {
        effects.push(effect)
    }

    setEffects(card, effects)
    card.effectvalues = {
        ...(card.effectvalues || {}),
        [effect]: value
    }
    card.effectturnsmap = {
        ...(card.effectturnsmap || {}),
        [effect]: turns
    }

    // Keep the old fields available for existing cards and UI.
    card.effectvalue = value
    card.effectturns = turns
}

function removeEffect(card, effect) {
    const effects = effectList(card).filter((currentEffect) => currentEffect !== effect)
    setEffects(card, effects)

    if (card.effectvalues) {
        delete card.effectvalues[effect]
    }
    if (card.effectturnsmap) {
        delete card.effectturnsmap[effect]
    }

    const remainingEffect = effectList(card)[0]
    card.effectvalue = remainingEffect
        ? card.effectvalues?.[remainingEffect] || ""
        : ""
    card.effectturns = remainingEffect
        ? card.effectturnsmap?.[remainingEffect] || ""
        : ""
}

function hasEffect(card, effect) {
    return effectList(card).includes(effect)
}

export function hasCardEffect(card, effect) {
    return hasEffect(card, effect)
}

function effectTurns(card, effect) {
    return card.effectturnsmap?.[effect] ?? card.effectturns
}

function effectValue(card, effect) {
    return card.effectvalues?.[effect] ?? card.effectvalue
}

function clearBurnAndFreeze(card) {
    removeEffect(card, "burn")
    removeEffect(card, "freeze")
}

function applyBurn(card, burnValue, burnTurns) {
    if (hasEffect(card, "freeze")) {
        clearBurnAndFreeze(card)
        return
    }

    addEffect(card, "burn", burnValue, burnTurns)
}

function applyFreeze(card) {
    if (hasEffect(card, "burn")) {
        clearBurnAndFreeze(card)
        return
    }

    addEffect(card, "freeze", "", "Forever")
}

function applyGamble(card) {
    addEffect(card, "gamble", "", "Forever")
}

function applyGambleToCards(card, cards) {
    const amount = Math.min(
        Number(card.gambleCards) || 3,
        cards.length
    )
    const availableIndexes = cards.map((_, index) => index)

    for (let i = availableIndexes.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const index = availableIndexes[i]
        availableIndexes[i] = availableIndexes[randomIndex]
        availableIndexes[randomIndex] = index
    }

    for (let i = 0; i < amount; i++) {
        applyGamble(cards[availableIndexes[i]])
    }
}

function updateBurnDamage(card) {
    if (!hasEffect(card, "burn")) {
        return
    }

    const turns = Number(effectTurns(card, "burn")) - 1
    const value = Number(effectValue(card, "burn")) || 0

    card.heal = (Number(card.heal) || 0) - value
    card.attack = (Number(card.attack) || 0) - value

    if (turns <= 0) {
        removeEffect(card, "burn")
    } else {
        card.effectturnsmap = {
            ...(card.effectturnsmap || {}),
            burn: turns
        }
        if (effectList(card).length === 1) {
            card.effectturns = turns
        }
    }
}

// ================================
// SINGLEPLAYER
// ================================

export function BurnEffect(Card, UserCards) {
    for (const userCard of UserCards.value) {
        applyBurn(userCard, Card.burn, Card.burnTurns)
    }

    return UserCards
}

export function BurnDamage(UserCards) {
    for (const userCard of UserCards.value) {
        updateBurnDamage(userCard)
    }

    return UserCards
}

export function FreezeEffect(UserCards) {
    for (const userCard of UserCards.value) {
        applyFreeze(userCard)
    }

    return UserCards
}

export function GambleEffect(Card, UserCards) {
    applyGambleToCards(Card, UserCards.value)
    return UserCards
}

// ================================
// MULTIPLAYER
// ================================

export function BurnEffectMultiplayer(Card, UserCards) {
    for (const userCard of UserCards) {
        applyBurn(
            userCard,
            Number(Card.burn) || 0,
            Number(Card.burnTurns) || 0
        )
    }

    return UserCards
}

export function BurnDamageMultiplayer(UserCards) {
    for (const userCard of UserCards) {
        updateBurnDamage(userCard)
    }

    return UserCards
}

export function FreezeEffectMultiplayer(UserCards) {
    for (const userCard of UserCards) {
        applyFreeze(userCard)
    }

    return UserCards
}

export function GambleEffectMultiplayer(Card, UserCards) {
    applyGambleToCards(Card, UserCards)
    return UserCards
}
