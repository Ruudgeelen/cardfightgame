import {
    PlayerAttack,
    EnemyAttack,
    AttackAdd,
    AttackAddAdd,
    PlayerAttackMultiplayer,
    EnemyAttackMultiplayer,
    AttackAddMultiplayer,
    AttackAddAddMultiplayer,
} from '../data/attack.js'

import {
    BurnEffect,
    BurnDamage,
    FreezeEffect,
    applyFreezeAdd,
    applyFreezeAddMultiplayer,
    BurnEffectMultiplayer,
    BurnDamageMultiplayer,
    FreezeEffectMultiplayer,
    GambleEffect,
    GambleEffectMultiplayer,
    hasCardEffect,
    applyLockEffect,
    applyLockEffectMultiplayer,
    updateLockTurns,
    updateLockTurnsMultiplayer,
    applyblindEffect,
    applyblindEffectMultiplayer,
    updateBlindTurns,
    updateBlindTurnsMultiplayer,
    applyLightEffect,
    applyLightEffectMultiplayer,
    updateLightTurns,
    updateLightTurnsMultiplayer,
    applyFlipEffect,
    applyFlipEffectMultiplayer,
    updateFlipTurns,
    updateFlipTurnsMultiplayer,
    applyPoisonEffect,
    applyPoisonEffectMultiplayer,
    PoisonDamage,
    PoisonDamageMultiplayer,
    applyWeakEffect,
    applyWeakEffectMultiplayer,
    WeakDamage,
    WeakDamageMultiplayer
} from '../data/effect.js'

import {
    AddMaxHealth,
    RemoveMaxHealth,
    HealAdd,
    HealAddAdd,
    Playerdeath,
    Enemydeath,
    AddMaxHealthMultiplayer,
    RemoveMaxHealthMultiplayer,
    HealAddMultiplayer,
    HealAddAddMultiplayer,
    PlayerdeathMultiplayer,
    EnemydeathMultiplayer
} from '../data/health.js'

import {
    GetNewCard,
    GetNewStapel,
    GetNewCardMultiplayer,
    GetNewStapelMultiplayer,
    RemoveCard,
    RemoveCardMultiplayer
} from '../data/card.js'


// =========================================
// SINGLEPLAYER
// =========================================

export function game(
    card,
    index,
    userCards,
    otheruserCards,
    cardstapel,
    userHealth,
    otheruserHealth,
    userMaxHealth,
    otheruserMaxHealth,
    lastuserCard,
    lastotheruserCard,
    aantalcards,
    gameMode
) {

    if (Playerdeath(userHealth.value)) {
        return
    }

    if (Enemydeath(otheruserHealth.value)) {
        return
    }

    updateLockTurns(userCards)
    updateBlindTurns(userCards)
    updateLightTurns(userCards)
    updateFlipTurns(userCards)

    lastuserCard.value = card

    const gambleReversed =
        hasCardEffect(card, 'gamble') &&
        Math.random() < 0.5

        if (card.healthbaradd) {
        gambleReversed
            ? otheruserMaxHealth.value = AddMaxHealth(card, otheruserMaxHealth.value)
            : userMaxHealth.value = AddMaxHealth(card, userMaxHealth.value)
    }

    if (card.healthbarremove) {
        gambleReversed
            ? userMaxHealth.value = RemoveMaxHealth(card, userMaxHealth.value, userHealth.value)
            : otheruserMaxHealth.value = RemoveMaxHealth(card, otheruserMaxHealth.value, otheruserHealth.value)
    }
    const attackResult = gambleReversed
        ? EnemyAttack(
            card,
            otheruserHealth.value,
            userHealth.value,
            otheruserMaxHealth.value
        )
        : PlayerAttack(
            card,
            otheruserHealth.value,
            userHealth.value,
            userMaxHealth.value
        )

    otheruserHealth.value = attackResult.enemyHealth
    userHealth.value = attackResult.playerHealth

    if (card.attackadd) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        targetCards.value = AttackAdd(card, targetCards).value
    }

    if (card.attackaddadd) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        targetCards.value = AttackAddAdd(card, targetCards).value
    }

    if (card.freezeadd) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        targetCards.value = applyFreezeAdd(targetCards).value
    }

    if (card.lock) {
        const targetCards = gambleReversed ? userCards : otheruserCards
        targetCards.value = applyLockEffect(card, targetCards).value
    }

    if (card.blind) {
        const targetCards = gambleReversed ? userCards : otheruserCards
        targetCards.value = applyblindEffect(card, targetCards).value
    }

    if (card.light) {
        const targetCards = gambleReversed ? userCards : otheruserCards
        targetCards.value = applyLightEffect(card, targetCards).value
    }

    if (card.flip) {
        const targetCards = gambleReversed ? userCards : otheruserCards
        targetCards.value = applyFlipEffect(card, targetCards).value
    }

    if (card.poison) {
        const targetCards = gambleReversed ? userCards : otheruserCards
        targetCards.value = applyPoisonEffect(card, targetCards).value
    }

    if (card.freeze) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        targetCards.value = FreezeEffect(targetCards).value
    }

    if (card.burn > 0) {
        const targetCards = gambleReversed ? userCards : otheruserCards
        targetCards.value = BurnEffect(card, targetCards).value
    }

    if (card.healadd) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        targetCards.value = HealAdd(card, targetCards).value
    }

    if (card.healaddadd) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        targetCards.value = HealAddAdd(card, targetCards).value
    }

    if (card.weak > 0) {
        const targetCards = gambleReversed ? userCards : otheruserCards
        targetCards.value = applyWeakEffect(card, targetCards).value
    }

    if (card.gambleCards) {
        const targetCards =
            Math.random() < 0.5
                ? otheruserCards
                : userCards

        GambleEffect(card, targetCards)

    }

    userCards.value = BurnDamage( userCards ).value
    userCards.value = PoisonDamage( userCards ).value
    userCards.value = WeakDamage( userCards ).value

    if ( cardstapel.value.length === 0 || card.stapel === 'shake') {
        cardstapel.value =
            GetNewStapel(
                userCards.value,
                otheruserCards.value
            )
    }
    if (card.stapel === 'newdeck') {
        for (let i = 0; i < userCards.value.length; i++) {
            if (cardstapel.value.length === 0) {
                cardstapel.value =
                    GetNewStapel(
                    userCards.value,
                    otheruserCards.value
                )
            }
            userCards.value[i] = GetNewCard(cardstapel.value)
        }
    }
    if (card.stapel === 'newdeckother') {
        for (let i = 0; i < otheruserCards.value.length; i++) {
            if (cardstapel.value.length === 0) {
                cardstapel.value =
                    GetNewStapel(
                    userCards.value,
                    otheruserCards.value
                )
            }
            otheruserCards.value[i] = GetNewCard(cardstapel.value)
        }
    }
    if (card.removecardnummer) {
        const targetCards = gambleReversed ? userCards : otheruserCards
        for (let i = 0; i < card.removecardnummer; i++) {
            targetCards.value = RemoveCard(targetCards.value)
            if (targetCards.value.length === 1) {
                break;
            }
        }
    }
    if (card.morecards) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        for (let i = 0; i < card.morecards; i++) {
            if (cardstapel.value.length === 0) {
            cardstapel.value =
                GetNewStapel(
                    userCards.value,
                    otheruserCards.value
                )
            }

            targetCards.value.push(GetNewCard(cardstapel.value))
        }
    }
                if (cardstapel.value.length === 0) {
            cardstapel.value =
                GetNewStapel(
                    userCards.value,
                    otheruserCards.value
                )
            }
    userCards.value[index] =
        GetNewCard(
            cardstapel.value
        )
    
if (userCards.value.length < aantalcards) {
        if (cardstapel.value.length === 0) {
            cardstapel.value =
                GetNewStapel(
                    userCards.value,
                    otheruserCards.value
                )
        }
    userCards.value.push(
        GetNewCard(cardstapel.value)
    )
}
    


    if (
        Playerdeath(userHealth.value) ||
        Enemydeath(otheruserHealth.value)
    ) {
        return
    }

    return {
        userCards,
        otheruserCards,
        cardstapel,
        userHealth,
        otheruserHealth,
        userMaxHealth,
        otheruserMaxHealth,
        lastuserCard,
        lastotheruserCard
    }
}


// =========================================
// MULTIPLAYER
// =========================================

export function gameMultiplayer(
    card,
    index,
    userCards,
    otheruserCards,
    cardstapel,
    userHealth,
    otheruserHealth,
    userMaxHealth,
    otheruserMaxHealth,
    lastuserCard,
    lastotheruserCard,
    aantalcards,
    gameMode
) {
     aantalcards = 5

    // =================================
    // CONTROLE
    // =================================

    if (PlayerdeathMultiplayer(userHealth)) {
        return {
            userCards,
            otheruserCards,
            cardstapel,
            userHealth,
            otheruserHealth,
            userMaxHealth,
            otheruserMaxHealth,
            lastuserCard,
            lastotheruserCard,
            gameOver: true,
            winner: 'enemy'
        }
    }

    if (EnemydeathMultiplayer(otheruserHealth)) {
        return {
            userCards,
            otheruserCards,
            cardstapel,
            userHealth,
            otheruserHealth,
            userMaxHealth,
            otheruserMaxHealth,
            lastuserCard,
            lastotheruserCard,
            gameOver: true,
            winner: 'player'
        }
    }

    updateLockTurnsMultiplayer(userCards)
    updateBlindTurnsMultiplayer(userCards)
    updateLightTurnsMultiplayer(userCards)
    updateFlipTurnsMultiplayer(userCards)

    // =================================
    // GESPEELDE KAART
    // =================================

    lastuserCard = {
        ...card
    }

    const gambleReversed =
        hasCardEffect(card, 'gamble') &&
        Math.random() < 0.5


    // =================================
    // ATTACK / HEAL
    // =================================

    // =================================
    // MAX HEALTH ADD
    // =================================

    if (card.healthbaradd) {
        gambleReversed
            ? otheruserMaxHealth = AddMaxHealthMultiplayer(card, otheruserMaxHealth)
            : userMaxHealth = AddMaxHealthMultiplayer(card, userMaxHealth)
    }


    // =================================
    // MAX HEALTH REMOVE
    // =================================

    if (card.healthbarremove) {
        gambleReversed
            ? userMaxHealth = RemoveMaxHealthMultiplayer(card, userMaxHealth, userHealth)
            : otheruserMaxHealth = RemoveMaxHealthMultiplayer(card, otheruserMaxHealth, otheruserHealth)
    }

    const result = gambleReversed
        ? EnemyAttackMultiplayer(
            card,
            otheruserHealth,
            userHealth,
            otheruserMaxHealth
        )
        : PlayerAttackMultiplayer(
            card,
            otheruserHealth,
            userHealth,
            userMaxHealth
        )

    otheruserHealth = result.enemyHealth
    userHealth = result.playerHealth


    // =================================
    // ATTACK ADD
    // =================================

    if (card.attackadd) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        AttackAddMultiplayer(card, targetCards)
    }

    if (card.attackaddadd) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        AttackAddAddMultiplayer(card, targetCards)
    }


    if (card.healadd) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        HealAddMultiplayer(card, targetCards)
    }

    if (card.healaddadd) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        HealAddAddMultiplayer(card, targetCards)
    }

    // =================================
    // FREEZE
    // =================================

    if (card.freezeadd) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        applyFreezeAddMultiplayer(targetCards)
    }

    if (card.freeze) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        FreezeEffectMultiplayer(targetCards)
    }

    if (card.lock) {
        const targetCards = gambleReversed ? userCards : otheruserCards
        applyLockEffectMultiplayer(card, targetCards)
    }

    if (card.blind) {
        const targetCards = gambleReversed ? userCards : otheruserCards
        applyblindEffectMultiplayer(card, targetCards)
    }

    if (card.light) {
        const targetCards = gambleReversed ? userCards : otheruserCards
        applyLightEffectMultiplayer(card, targetCards)
    } 

    if (card.flip) {
        const targetCards = gambleReversed ? userCards : otheruserCards
        applyFlipEffectMultiplayer(card, targetCards)
    }

    if (card.poison) {
        const targetCards = gambleReversed ? userCards : otheruserCards
        applyPoisonEffectMultiplayer(card, targetCards)
    }

    if (card.weak > 0) {
        const targetCards = gambleReversed ? userCards : otheruserCards
        applyWeakEffectMultiplayer(card, targetCards)
    }


    // =================================
    // BURN
    // =================================

    if (card.burn > 0) {
        const targetCards = gambleReversed ? userCards : otheruserCards
        BurnEffectMultiplayer(card, targetCards)
    }


    if (card.gambleCards) {
        const targetCards =
            Math.random() < 0.5
                ? otheruserCards
                : userCards

        GambleEffectMultiplayer(card, targetCards)
    }

    // =================================
    // BURN DAMAGE
    // =================================

    userCards = BurnDamageMultiplayer(userCards)
    userCards = PoisonDamageMultiplayer(userCards)
    userCards = WeakDamageMultiplayer(userCards)


    // =================================
    // NIEUWE STAPEL
    // =================================

    if ( cardstapel.length === 0 || card.stapel === 'shake') {
        cardstapel =
            GetNewStapelMultiplayer(
                userCards,
                otheruserCards,
                gameMode
            )
    }
    if (card.stapel === 'newdeck') {
        for (let i = 0; i < userCards.length; i++) {
            if (cardstapel.length === 0) {
                cardstapel =
                    GetNewStapelMultiplayer(
                    userCards,
                    otheruserCards,
                    gameMode
                )
            }
            userCards[i] = GetNewCard(cardstapel)
        }
    }
    if (card.stapel === 'newdeckother') {
        for (let i = 0; i < otheruserCards.length; i++) {
            if (cardstapel.length === 0) {
                cardstapel =
                    GetNewStapelMultiplayer(
                    userCards,
                    otheruserCards,
                    gameMode
                )
            }
            otheruserCards[i] = GetNewCard(cardstapel)
        }
    }

    if (card.removecardnummer) {
        let targetCards = gambleReversed ? userCards : otheruserCards
        for (let i = 0; i < card.removecardnummer; i++) {
            targetCards = RemoveCardMultiplayer(targetCards)
            if (targetCards.length === 1) {
                break;
            }
        }
        if (gambleReversed) {
            userCards = targetCards
        } else {
            otheruserCards = targetCards
        }
    }
    if (card.morecards) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        for (let i = 0; i < card.morecards; i++) {
            if (cardstapel.length === 0) {
            cardstapel =
                GetNewStapelMultiplayer(
                    userCards,
                    otheruserCards,
                    gameMode
                )
            }
            targetCards.push(GetNewCard(cardstapel)
        )}
    }

            

    // =================================
    // NIEUWE KAART
    // =================================

    if (cardstapel.length === 0) {
        cardstapel =
            GetNewStapelMultiplayer(
                userCards,
                otheruserCards,
                gameMode
            )
    }
    userCards[index] =
        GetNewCardMultiplayer(
            cardstapel
        )
    if (userCards.length < aantalcards) {
        if (cardstapel.length === 0) {
            cardstapel =
                GetNewStapelMultiplayer(
                    userCards,
                    otheruserCards,
                    gameMode
                )
        }
        userCards.push(
            GetNewCard(cardstapel)
        )
    }




    // =================================
    // DOOD
    // =================================

    if (
        PlayerdeathMultiplayer(userHealth) ||
        EnemydeathMultiplayer(otheruserHealth)
    ) {

        let winner = null

        if (userHealth <= 0) {
            winner = 'enemy'
        }
        else if (otheruserHealth <= 0) {
            winner = 'player'
        }

        return {
            userCards,
            otheruserCards,
            cardstapel,
            userHealth,
            otheruserHealth,
            userMaxHealth,
            otheruserMaxHealth,
            lastuserCard,
            lastotheruserCard,
            gameOver: true,
            winner
        }
    }


    // =================================
    // RESULTAAT
    // =================================

    return {
        userCards,
        otheruserCards,
        cardstapel,
        userHealth,
        otheruserHealth,
        userMaxHealth,
        otheruserMaxHealth,
        lastuserCard,
        lastotheruserCard,
        gameOver: false,
        winner: null
    }
}
