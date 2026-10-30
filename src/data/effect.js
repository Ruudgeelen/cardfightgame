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

export function addCardEffect(card, effect, value = "", turns = "") {
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

export function applyEffectToCards(cards, effect, value = "", turns = "") {
    for (const card of cards) {
        if (hasEffect(card, "shield") && effect !== "shield") {
            continue
        }
        addCardEffect(card, effect, value, turns)
    }

    return cards
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

function updateEffectTurns(card, effect) {
    if (!hasEffect(card, effect)) {
        return
    }

    const turns = Number(effectTurns(card, effect))
    if (!Number.isFinite(turns)) {
        return
    }

    if (turns <= 1) {
        removeEffect(card, effect)
        return
    }

    card.effectturnsmap = {
        ...(card.effectturnsmap || {}),
        [effect]: turns - 1
    }
    if (effectList(card).length === 1) {
        card.effectturns = turns - 1
    }
}

function updateEffectTurnsForCards(cards, effect) {
    for (const card of cards) {
        updateEffectTurns(card, effect)
    }

    return cards
}

function clearBurnAndFreeze(card) {
    removeEffect(card, "burn")
    removeEffect(card, "freeze")
}

function clearBlindAndLight(card) {
    removeEffect(card, "blind")
    removeEffect(card, "light")
}

function applyBurn(card, burnValue, burnTurns) {
    if (hasEffect(card, "shield")) {
        return
    }

    if (hasEffect(card, "freeze")) {
        clearBurnAndFreeze(card)
        return
    }

    addCardEffect(card, "burn", burnValue, burnTurns)
}

function applyLight(card, lightTurns) {
    if (hasEffect(card, "shield")) {
        return
    }

    if (hasEffect(card, "blind")) {
        clearBlindAndLight(card)
        return
    }

    addCardEffect(card, "light", "", lightTurns)
}

function applyBlind(card, blindTurns) {
    if (hasEffect(card, "shield")) {
        return
    }

    if (hasEffect(card, "light")) {
        clearBlindAndLight(card)
        return
    }

    addCardEffect(card, "blind", "", blindTurns)
}

function applyOpposingEffect(cards, effect, turns) {
    for (const card of cards) {
        if (effect === "light") {
            applyLight(card, turns)
        } else {
            applyBlind(card, turns)
        }
    }
}
function applyFreeze(card) {
    if (hasEffect(card, "shield")) {
        return
    }

    if (hasEffect(card, "burn")) {
        clearBurnAndFreeze(card)
        return
    }

    addCardEffect(card, "freeze", "", "Forever")
}

function applyGamble(card) {
    if (hasEffect(card, "shield")) {
        return
    }

    addCardEffect(card, "gamble", "", "Forever")
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
    if (hasEffect(card, "shield") || !hasEffect(card, "burn")) {
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

function updatePoisonDamage(card) {
    if (hasEffect(card, "shield") || !hasEffect(card, "poison")) {
        return
    }

    const turns = Number(effectTurns(card, "poison")) - 1
    const value = Number(effectValue(card, "poison")) || 0

    card.heal = (Number(card.heal) || 0) - value

    if (turns <= 0) {
        removeEffect(card, "poison")
    } else {
        card.effectturnsmap = {
            ...(card.effectturnsmap || {}),
            poison: turns
        }
        if (effectList(card).length === 1) {
            card.effectturns = turns
        }
    }
}

function updateWeakDamage(card) {
    if (hasEffect(card, "shield") || !hasEffect(card, "weak")) {
        return
    }

    const turns = Number(effectTurns(card, "weak")) - 1
    const value = Number(effectValue(card, "weak")) || 0

    card.attack = (Number(card.attack) || 0) - value

    if (turns <= 0) {
        removeEffect(card, "weak")
    } else {
        card.effectturnsmap = {
            ...(card.effectturnsmap || {}),
            weak: turns
        }
        if (effectList(card).length === 1) {
            card.effectturns = turns
        }
    }
}

// ================================
// SINGLEPLAYER
// ================================

export function applyblindEffect(card, userCards) {
    const amount = Math.min( Math.max(Number(card.blind) || 0, 0), userCards.value.length)
    const selectedCards = getRandomCards(userCards.value, amount)

    applyOpposingEffect(
        selectedCards,
        "blind",
        card.blindTurns ?? "Forever"
    )

    return userCards
}
export function applyLockEffect(card, userCards) {
    const amount = Math.min(
        Math.max(Number(card.lock) || 0, 0),
        userCards.value.length
    )
    const selectedCards = getRandomCards(userCards.value, amount)

    applyEffectToCards(
        selectedCards,
        "lock",
        "",
        card.lockTurns ?? "Forever"
    )

    return userCards
}

export function applyShieldEffect(card, userCards) {
    const amount = Math.min(
        Math.max(Number(card.shield) || 0, 0),
        userCards.value.length
    )
    const selectedCards = getRandomCards(userCards.value, amount)

    applyEffectToCards(
        selectedCards,
        "shield",
        "",
        'Forever'
    )

    return userCards
}
export function applyLightEffect(card, userCards) {
    const amount = Math.min(
        Math.max(Number(card.light) || 0, 0),
        userCards.value.length
    )
    const selectedCards = getRandomCards(userCards.value, amount)

    applyOpposingEffect(
        selectedCards,
        "light",
        card.lightTurns ?? "Forever"
    )

    return userCards
}

export function applyFlipEffect(card, userCards) {
    const amount = Math.min(
        Math.max(Number(card.flip) || 0, 0),
        userCards.value.length
    )
    const selectedCards = getRandomCards(userCards.value, amount)

    applyEffectToCards(
        selectedCards,
        "flip",
        "",
        card.flipTurns ?? "Forever"
    )

    return userCards
}

export function applyPoisonEffect(card, userCards) {
    const amount = Math.min(
        Math.max(Number(card.poison) || 0, 0),
        userCards.value.length
    )
    const selectedCards = getRandomCards(userCards.value, amount)

    applyEffectToCards(
        selectedCards,
        "poison",
        card.poisonDamage ?? '',
        card.poisonTurns ?? "Forever"
    )

    return userCards
}

export function applyWeakEffect(card, userCards) {
    const amount = Math.min(
        Math.max(Number(card.weak) || 0, 0),
        userCards.value.length
    )
    const selectedCards = getRandomCards(userCards.value, amount)

    applyEffectToCards(
        selectedCards,
        "weak",
        card.weakDamage ?? '',
        card.weakTurns ?? "Forever"
    )

    return userCards
}

export function PoisonDamage(userCards) {
    for (const userCard of userCards.value) {
        if (!hasEffect(userCard, "poison")) {
            continue
        }
        updatePoisonDamage(userCard)
    }
    return userCards
}

export function WeakDamage(userCards) {
    for (const userCard of userCards.value) {
        if (!hasEffect(userCard, "weak")) {
            continue
        }
        updateWeakDamage(userCard)
    }
    return userCards
}

export function updateLockTurns(userCards) {
    updateEffectTurnsForCards(userCards.value, "lock")
    return userCards
}

export function updateBlindTurns(userCards) {
    updateEffectTurnsForCards(userCards.value, "blind")
    return userCards
}

export function updateLightTurns(userCards) { 
    updateEffectTurnsForCards(userCards.value, "light")
    return userCards
}

export function updateFlipTurns(userCards) { 
    updateEffectTurnsForCards(userCards.value, "flip")
    return userCards
}

function getRandomCards(cards, amount) {
    const availableCards = [...cards]

    for (let i = availableCards.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const currentCard = availableCards[i]
        availableCards[i] = availableCards[randomIndex]
        availableCards[randomIndex] = currentCard
    }

    return availableCards.slice(0, amount)
}

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

export function applyFreezeAdd(userCards) {
    for (let i = 0; i < userCards.value.length; i++) {
        if (hasEffect(userCards.value[i], "shield")) {
            continue
        }
        userCards.value[i].freeze = true
    }
    return userCards
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

export function PoisonDamageMultiplayer(UserCards) {
    for (const userCard of UserCards) {
        updatePoisonDamage(userCard)
    }
    return UserCards
}

export function WeakDamageMultiplayer(UserCards) {
    for (const userCard of UserCards) {
        updateWeakDamage(userCard)
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

export function applyLockEffectMultiplayer(card, userCards) {
    const amount = Math.min(
        Math.max(Number(card.lock) || 0, 0),
        userCards.length
    )
    const selectedCards = getRandomCards(userCards, amount)

    applyEffectToCards(
        selectedCards,
        "lock",
        "",
        card.lockTurns ?? "Forever"
    )

    return userCards
}

export function applyShieldEffectMultiplayer(card, userCards) {
    const amount = Math.min(
        Math.max(Number(card.shield) || 0, 0),
        userCards.length
    )
    const selectedCards = getRandomCards(userCards, amount)

    applyEffectToCards(
        selectedCards,
        "shield",
        "",
        card.shieldTurns ?? "Forever"
    )

    return userCards
}

export function applyWeakEffectMultiplayer(card, userCards) {
    const amount = Math.min(
        Math.max(Number(card.weak) || 0, 0),
        userCards.length
    )
    const selectedCards = getRandomCards(userCards, amount)

    applyEffectToCards(
        selectedCards,
        "weak",
        card.weakDamage ?? '',
        card.weakTurns ?? "Forever"
    )

    return userCards
}

export function applyPoisonEffectMultiplayer(card, userCards) {
    const amount = Math.min(
        Math.max(Number(card.poison) || 0, 0),
        userCards.length
    )
    const selectedCards = getRandomCards(userCards, amount)

    applyEffectToCards(
        selectedCards,
        "poison",
        card.poisonDamage ?? '',
        card.poisonTurns ?? "Forever"
    )

    return userCards
}

export function applyblindEffectMultiplayer(card, userCards) {
    const amount = Math.min(
        Math.max(Number(card.blind) || 0, 0),
        userCards.length
    )
    const selectedCards = getRandomCards(userCards, amount)

    applyOpposingEffect(
        selectedCards,
        "blind",
        card.blindTurns ?? "Forever"
    )

    return userCards
}

export function applyLightEffectMultiplayer(card, userCards) {
    const amount = Math.min(
        Math.max(Number(card.light) || 0, 0),
        userCards.length
    )
    const selectedCards = getRandomCards(userCards, amount)

    applyOpposingEffect(
        selectedCards,
        "light",
        card.lightTurns ?? "Forever"
    )

    return userCards
}

export function applyFlipEffectMultiplayer(card, userCards) {
    const amount = Math.min(
        Math.max(Number(card.flip) || 0, 0),
        userCards.length
    )
    const selectedCards = getRandomCards(userCards, amount)

    applyEffectToCards(
        selectedCards,
        "flip",
        "",
        card.flipTurns ?? "Forever"
    )

    return userCards
}

export function updateLockTurnsMultiplayer(userCards) {
    updateEffectTurnsForCards(userCards, "lock")
    return userCards
}

export function updateBlindTurnsMultiplayer(userCards) {
    updateEffectTurnsForCards(userCards, "blind")
    return userCards
}

export function updateLightTurnsMultiplayer(userCards) {
    updateEffectTurnsForCards(userCards, "light")
    return userCards
}

export function updateFlipTurnsMultiplayer(userCards) {
    updateEffectTurnsForCards(userCards, "flip")
    return userCards
}

export function applyFreezeAddMultiplayer(userCards) {
    for (let i = 0; i < userCards.length; i++) {
        if (hasEffect(userCards[i], "shield")) {
            continue
        }
        userCards[i].freeze = true
    }
    return userCards
}