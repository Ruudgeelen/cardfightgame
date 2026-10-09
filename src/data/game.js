import {
    PlayerAttack,
    AttackAdd,
    PlayerAttackMultiplayer,
    AttackAddMultiplayer
} from '../data/attack.js'

import {
    BurnEffect,
    BurnDamage,
    FreezeEffect,
    BurnEffectMultiplayer,
    BurnDamageMultiplayer,
    FreezeEffectMultiplayer
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

    const result = PlayerAttack(
        card,
        otheruserHealth.value,
        userHealth.value,
        userMaxHealth.value
    )

    otheruserHealth.value = result.enemyHealth
    userHealth.value = result.playerHealth

    if (card.attackadd) {
        userCards.value =
            AttackAdd(
                card,
                userCards
            ).value
    }

    if (card.healadd) {
        userCards.value =
            HealAdd(
                card,
                userCards
            ).value
    }

    if (card.freeze) {
        userCards.value =
            FreezeEffect(
                userCards
            ).value
    }

    if (card.burn > 0) {
        otheruserCards.value =
            BurnEffect(
                card,
                otheruserCards
            ).value
    }

    if (card.healthbaradd) {
        userMaxHealth.value =
            AddMaxHealth(
                card,
                userMaxHealth.value
            )
    }

    if (card.healthbarremove) {
        otheruserMaxHealth.value =
            RemoveMaxHealth(
                card,
                otheruserMaxHealth.value,
                otheruserHealth.value
            )
    }

    if (
        cardstapel.value.length === 0 ||
        card.stapel === 'shake'
    ) {
        cardstapel.value =
            GetNewStapel(
                userCards.value,
                otheruserCards.value
            )
    }
    if (card.removecardnummer) {
        for (let i = 0; i < card.removecardnummer; i++) {
            otheruserCards.value = RemoveCard(otheruserCards.value)
            if (otheruserCards.value.length === 1) {
                break;
            }
        }
    }
    if (card.morecards) {
        for (let i = 0; i < card.morecards; i++) {
            if (cardstapel.value.length === 0) {
            cardstapel.value =
                GetNewStapel(
                    userCards.value,
                    otheruserCards.value
                )
            }
            userCards.value.push(GetNewCard(cardstapel.value))
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


    // =================================
    // ATTACK / HEAL
    // =================================

    const result = PlayerAttackMultiplayer(
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
        userCards =
            AttackAddMultiplayer(
                card,
                userCards
            )
    }


    // =================================
    // HEAL ADD
    // =================================

    if (card.healadd) {
        userCards =
            HealAddMultiplayer(
                card,
                userCards
            )
    }


    // =================================
    // FREEZE
    // =================================

    if (card.freeze) {
        userCards =
            FreezeEffectMultiplayer(
                userCards
            )
    }


    // =================================
    // BURN
    // =================================

    if (card.burn > 0) {
        otheruserCards =
            BurnEffectMultiplayer(
                card,
                otheruserCards
            )
    }


    // =================================
    // MAX HEALTH ADD
    // =================================

    if (card.healthbaradd) {
        userMaxHealth =
            AddMaxHealthMultiplayer(
                card,
                userMaxHealth
            )
    }


    // =================================
    // MAX HEALTH REMOVE
    // =================================

    if (card.healthbarremove) {
        otheruserMaxHealth =
            RemoveMaxHealthMultiplayer(
                card,
                otheruserMaxHealth,
                otheruserHealth
            )
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

    if (card.removecardnummer) {
        for (let i = 0; i < card.removecardnummer; i++) {
            otheruserCards = RemoveCardMultiplayer(otheruserCards)
            if (otheruserCards.length === 1) {
                break;
            }
        }
    }
    if (card.morecards) {
        for (let i = 0; i < card.morecards; i++) {
            if (cardstapel.length === 0) {
            cardstapel =
                GetNewStapelMultiplayer(
                    userCards,
                    otheruserCards
                )
            }
            userCards.push(GetNewCard(cardstapel)
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
