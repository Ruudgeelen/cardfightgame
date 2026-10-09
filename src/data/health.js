// ================================
// SINGLEPLAYER
// ================================

export function Playerdeath(health) {
    return health <= 0
}

export function Enemydeath(health) {
    return health <= 0
}

export function AddMaxHealth(card, maxHealth) {
    maxHealth += card.healthbaradd

    return maxHealth
}

export function RemoveMaxHealth(
    card,
    maxHealth,
    userHealth
) {
    maxHealth -= card.healthbarremove

    if (maxHealth < 1) {
        maxHealth = 1
    }

    if (userHealth > maxHealth) {
        userHealth = maxHealth
    }

    return maxHealth
}

export function HealAdd(Card, UserCards) {
    for (let i = 0; i < UserCards.value.length; i++) {
        UserCards.value[i].heal += Card.healadd
    }

    return UserCards
}


// ================================
// MULTIPLAYER
// ================================

export function PlayerdeathMultiplayer(health) {
    return health <= 0
}

export function EnemydeathMultiplayer(health) {
    return health <= 0
}

export function AddMaxHealthMultiplayer(
    card,
    maxHealth
) {
    maxHealth += Number(card.healthbaradd) || 0

    return maxHealth
}

export function RemoveMaxHealthMultiplayer(
    card,
    maxHealth,
    userHealth
) {
    maxHealth -= Number(card.healthbarremove) || 0

    if (maxHealth < 1) {
        maxHealth = 1
    }

    if (userHealth > maxHealth) {
        userHealth = maxHealth
    }

    return maxHealth
}

export function HealAddMultiplayer(
    Card,
    UserCards
) {
    for (let i = 0; i < UserCards.length; i++) {
        UserCards[i].heal =
            (Number(UserCards[i].heal) || 0) +
            (Number(Card.healadd) || 0)
    }

    return UserCards
}
