import {
    PlayerAttack,
    EnemyAttack,
    AttackAdd,
    PlayerAttackMultiplayer,
    EnemyAttackMultiplayer,
    AttackAddMultiplayer
} from '../data/attack.js'

import {
    BurnEffect,
    BurnDamage,
    FreezeEffect,
    BurnEffectMultiplayer,
    BurnDamageMultiplayer,
    FreezeEffectMultiplayer,
    GambleEffect,
    GambleEffectMultiplayer,
    hasCardEffect
} from '../data/effect.js'

import {
    AddMaxHealth,
    RemoveMaxHealth,
    HealAdd,
    Playerdeath,
    Enemydeath,
    AddMaxHealthMultiplayer,
    RemoveMaxHealthMultiplayer,
    HealAddMultiplayer,
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
    aantalcards
) {

    if (Playerdeath(userHealth.value)) {
        return
    }

    if (Enemydeath(otheruserHealth.value)) {
        return
    }

    lastuserCard.value = card

    const gambleReversed =
        hasCardEffect(card, 'gamble') &&
        Math.random() < 0.5

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

    if (card.healadd) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        targetCards.value = HealAdd(card, targetCards).value
    }

    if (card.freeze) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        targetCards.value = FreezeEffect(targetCards).value
    }

    if (card.burn > 0) {
        const targetCards = gambleReversed ? userCards : otheruserCards
        targetCards.value = BurnEffect(card, targetCards).value
    }

    if (card.healthbaradd) {
        let targetMaxHealth = gambleReversed
            ? otheruserMaxHealth
            : userMaxHealth
        targetMaxHealth.value = AddMaxHealth(card, targetMaxHealth.value)
    }

    if (card.healthbarremove) {
        let targetMaxHealth = gambleReversed
            ? userMaxHealth
            : otheruserMaxHealth
        const targetHealth = gambleReversed
            ? userHealth
            : otheruserHealth
        targetMaxHealth.value = RemoveMaxHealth(
            card,
            targetMaxHealth.value,
            targetHealth.value
        )
    }

    if (card.gambleCards) {
        const targetCards =
            Math.random() < 0.5
                ? otheruserCards
                : userCards

        GambleEffect(card, targetCards)

    }


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
    

    userCards.value =
        BurnDamage(
            userCards
        ).value

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
    aantalcards
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


    // =================================
    // HEAL ADD
    // =================================

    if (card.healadd) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        HealAddMultiplayer(card, targetCards)
    }


    // =================================
    // FREEZE
    // =================================

    if (card.freeze) {
        const targetCards = gambleReversed ? otheruserCards : userCards
        FreezeEffectMultiplayer(targetCards)
    }


    // =================================
    // BURN
    // =================================

    if (card.burn > 0) {
        const targetCards = gambleReversed ? userCards : otheruserCards
        BurnEffectMultiplayer(card, targetCards)
    }


    // =================================
    // MAX HEALTH ADD
    // =================================

    if (card.healthbaradd) {
        let targetMaxHealth = gambleReversed
            ? otheruserMaxHealth
            : userMaxHealth
        targetMaxHealth = AddMaxHealthMultiplayer(card, targetMaxHealth)
    }


    // =================================
    // MAX HEALTH REMOVE
    // =================================

    if (card.healthbarremove) {
        let targetMaxHealth = gambleReversed
            ? userMaxHealth
            : otheruserMaxHealth
        const targetHealth = gambleReversed
            ? userHealth
            : otheruserHealth
        targetMaxHealth = RemoveMaxHealthMultiplayer(
            card,
            targetMaxHealth,
            targetHealth
        )
    }

    if (card.gambleCards) {
        const targetCards =
            Math.random() < 0.5
                ? otheruserCards
                : userCards

        GambleEffectMultiplayer(card, targetCards)
    }


    // =================================
    // NIEUWE STAPEL
    // =================================

    if (
        cardstapel.length === 0 ||
        card.stapel === 'shake'
    ) {
        cardstapel =
            GetNewStapelMultiplayer(
                userCards,
                otheruserCards
            )
    }
    if (card.stapel === 'newdeck') {
        for (let i = 0; i < userCards.length; i++) {
            if (cardstapel.length === 0) {
                cardstapel =
                    GetNewStapelMultiplayer(
                    userCards,
                    otheruserCards
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
                    otheruserCards
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
                    otheruserCards
                )
            }
            targetCards.push(GetNewCard(cardstapel)
        )}
    }

            

    // =================================
    // NIEUWE KAART
    // =================================

    userCards[index] =
        GetNewCardMultiplayer(
            cardstapel
        )
    if (userCards.length < aantalcards) {
        if (cardstapel.length === 0) {
            cardstapel =
                GetNewStapelMultiplayer(
                    userCards,
                    otheruserCards
                )
        }
        userCards.push(
            GetNewCard(cardstapel)
        )
    }

    // =================================
    // BURN DAMAGE
    // =================================

    userCards =
        BurnDamageMultiplayer(
            userCards
        )


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
