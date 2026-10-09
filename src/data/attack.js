export function PlayerAttack(Card, EnemyHealth, PlayerHealth, playerMaxHealth) {
    let enemyHealth = EnemyHealth
    let playerHealth = PlayerHealth

    enemyHealth -= Card.attack

    if (enemyHealth < 0) {
        enemyHealth = 0
    }

    playerHealth += Card.heal

    if (playerHealth > playerMaxHealth) {
        playerHealth = playerMaxHealth
    }

    return { playerHealth, enemyHealth }
}

export function EnemyAttack(Card, EnemyHealth, PlayerHealth, enemyMaxHealth) {
    let enemyHealth = EnemyHealth
    let playerHealth = PlayerHealth

    playerHealth -= Card.attack

    if (playerHealth < 0) {
        playerHealth = 0
    }

    enemyHealth += Card.heal

    if (enemyHealth > enemyMaxHealth) {
        enemyHealth = enemyMaxHealth
    }

    return { playerHealth, enemyHealth }
}

export function AttackAdd(Card, UserCards) {
    for (let i = 0; i < UserCards.value.length; i++) {
        UserCards.value[i].attack += Card.attackadd
    }

    return UserCards
}


// ================================
// MULTIPLAYER
// ================================

export function PlayerAttackMultiplayer(
    Card,
    EnemyHealth,
    PlayerHealth,
    playerMaxHealth
) {
    let enemyHealth = EnemyHealth
    let playerHealth = PlayerHealth

    enemyHealth -= Number(Card.attack) || 0

    if (enemyHealth < 0) {
        enemyHealth = 0
    }

    playerHealth += Number(Card.heal) || 0

    if (playerHealth > playerMaxHealth) {
        playerHealth = playerMaxHealth
    }

    return {
        playerHealth,
        enemyHealth
    }
}

export function EnemyAttackMultiplayer(
    Card,
    EnemyHealth,
    PlayerHealth,
    enemyMaxHealth
) {
    let enemyHealth = EnemyHealth
    let playerHealth = PlayerHealth

    playerHealth -= Number(Card.attack) || 0

    if (playerHealth < 0) {
        playerHealth = 0
    }

    enemyHealth += Number(Card.heal) || 0

    if (enemyHealth > enemyMaxHealth) {
        enemyHealth = enemyMaxHealth
    }

    return {
        playerHealth,
        enemyHealth
    }
}

export function AttackAddMultiplayer(Card, UserCards) {
    for (let i = 0; i < UserCards.length; i++) {
        UserCards[i].attack =
            (Number(UserCards[i].attack) || 0) +
            (Number(Card.attackadd) || 0)
    }

    return UserCards
}