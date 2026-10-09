// ================================
// SINGLEPLAYER
// ================================

export function BurnEffect(Card, UserCards) {
    for (let i = 0; i < UserCards.value.length; i++) {

        if (UserCards.value[i].effect === "freeze") {
            UserCards.value[i].effect = ""
            UserCards.value[i].effectvalue = ""
            UserCards.value[i].effectturns = ""
        }
        else {
            UserCards.value[i].effect = "burn"
            UserCards.value[i].effectvalue = Card.burn
            UserCards.value[i].effectturns = Card.burnTurns
        }
    }

    return UserCards
}

export function BurnDamage(UserCards) {
    for (let i = 0; i < UserCards.value.length; i++) {

        if (UserCards.value[i].effect === "burn") {

            UserCards.value[i].effectturns -= 1

            UserCards.value[i].heal -=
                UserCards.value[i].effectvalue

            UserCards.value[i].attack -=
                UserCards.value[i].effectvalue

            if (UserCards.value[i].effectturns <= 0) {
                UserCards.value[i].effect = ""
                UserCards.value[i].effectvalue = ""
                UserCards.value[i].effectturns = ""
            }
        }
    }

    return UserCards
}

export function FreezeEffect(UserCards) {
    for (let i = 0; i < UserCards.value.length; i++) {

        if (UserCards.value[i].effect === "burn") {
            UserCards.value[i].effect = ""
            UserCards.value[i].effectvalue = ""
            UserCards.value[i].effectturns = ""
        }
        else {
            UserCards.value[i].effect = "freeze"
            UserCards.value[i].effectvalue = ""
            UserCards.value[i].effectturns = "Forever"
        }
    }

    return UserCards
}


// ================================
// MULTIPLAYER
// ================================

export function BurnEffectMultiplayer(
    Card,
    UserCards
) {
    for (let i = 0; i < UserCards.length; i++) {

        if (UserCards[i].effect === "freeze") {
            UserCards[i].effect = ""
            UserCards[i].effectvalue = ""
            UserCards[i].effectturns = ""
        }
        else {
            UserCards[i].effect = "burn"
            UserCards[i].effectvalue =
                Number(Card.burn) || 0

            UserCards[i].effectturns =
                Number(Card.burnTurns) || 0
        }
    }

    return UserCards
}

export function BurnDamageMultiplayer(
    UserCards
) {
    for (let i = 0; i < UserCards.length; i++) {

        if (UserCards[i].effect === "burn") {

            UserCards[i].effectturns -= 1

            UserCards[i].heal =
                (Number(UserCards[i].heal) || 0) -
                (Number(UserCards[i].effectvalue) || 0)

            UserCards[i].attack =
                (Number(UserCards[i].attack) || 0) -
                (Number(UserCards[i].effectvalue) || 0)

            if (UserCards[i].effectturns <= 0) {
                UserCards[i].effect = ""
                UserCards[i].effectvalue = ""
                UserCards[i].effectturns = ""
            }
        }
    }

    return UserCards
}

export function FreezeEffectMultiplayer(
    UserCards
) {
    for (let i = 0; i < UserCards.length; i++) {

        if (UserCards[i].effect === "burn") {
            UserCards[i].effect = ""
            UserCards[i].effectvalue = ""
            UserCards[i].effectturns = ""
        }
        else {
            UserCards[i].effect = "freeze"
            UserCards[i].effectvalue = ""
            UserCards[i].effectturns = "Forever"
        }
    }

    return UserCards
}
