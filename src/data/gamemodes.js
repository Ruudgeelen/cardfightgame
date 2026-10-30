import { getRandomCardType } from './cardTypes.js'
import { addCardEffect } from './effect.js'

export function GetGameModeCards(GameMode, cardslist) {
    if (GameMode.value === "normal") {
        return cardslist.value
    }
    else if (GameMode.value === "gamble") {
        for (let i = 0; i < cardslist.value.length; i++) {
            cardslist.value[i].effect = "gamble"
        }
    }
    else if (GameMode.value === "mimic") {
        for (let i = 0; i < cardslist.value.length; i++) {
            cardslist.value[i].faketype = getRandomCardType()
        }
    }
    else if (GameMode.value === "burn") {
        for (let i = 0; i < cardslist.value.length; i++) {
            addStartingBurnEffect(cardslist.value[i])
        }
    }
    else if (GameMode.value === "freeze") {
        for (let i = 0; i < cardslist.value.length; i++) {
            addStartingFreezeEffect(cardslist.value[i])
        }
    }
    else if (GameMode.value === "lock") {
        for (let i = 0; i < cardslist.value.length; i++) {
            cardslist.value[i].effectturnsmap = Math.floor(Math.random() * 3) -1
            if (cardslist.value[i].effectturnsmap > 0) {
                cardslist.value[i].effect = "lock"
            }
        }
    }
    else if (GameMode.value === "light") {
        for (let i = 0; i < cardslist.value.length; i++) {
            addCardEffect(cardslist.value[i], "light", "", 100)
        }
    }
    else if (GameMode.value === "blind") {
        for (let i = 0; i < cardslist.value.length; i++) {
            addCardEffect(cardslist.value[i], "blind", "", 100)
        }
    }
    else if (GameMode.value === "flip") {
        for (let i = 0; i < cardslist.value.length; i++) {
            addCardEffect(cardslist.value[i], "flip", "", 100)
        }
    }
    else if (GameMode.value === "wind") {
        for (let i = 0; i < cardslist.value.length; i++) {
            if (cardslist.value[i].removecardnummer) {
                cardslist.value[i].removecardnummer += 1
            } else {
                cardslist.value[i].removecardnummer = 1
            }
        }
    }
    else if (GameMode.value === "earth") {
        for (let i = 0; i < cardslist.value.length; i++) {
            if (cardslist.value[i].morecards) {
                cardslist.value[i].morecards += 1
            } else {
                cardslist.value[i].morecards = 1
            }
        }
    }
    return cardslist.value
}
export function GetGameModeCardsMultplayer(GameMode, cardslist) {
    if (GameMode === "normal") {
        return cardslist
    }
    else if (GameMode === "gamble") {
        for (let i = 0; i < cardslist.length; i++) {
            cardslist[i].effect = "gamble"
        }
    }
    else if (GameMode === "mimic") {
        for (let i = 0; i < cardslist.length; i++) {
            cardslist[i].faketype = getRandomCardType()
        }
    }
    else if (GameMode === "burn") {
        for (let i = 0; i < cardslist.length; i++) {
            addStartingBurnEffect(cardslist[i])
        }
    }
    else if (GameMode === "freeze") {
        for (let i = 0; i < cardslist.length; i++) {
            addStartingFreezeEffect(cardslist[i])
        }
    }
    else if (GameMode === "lock") {
        for (let i = 0; i < cardslist.length; i++) {
            cardslist[i].effectTurns = Math.floor(Math.random() * 3) -1
            if (cardslist[i].effectTurns > 0) {
                cardslist[i].effect = "lock"
            }
        }
    }
    else if (GameMode === "light") {
        for (let i = 0; i < cardslist.length; i++) {
            addCardEffect(cardslist[i], "light", "", 100)
        }
    }
    else if (GameMode === "blind") {
        for (let i = 0; i < cardslist.length; i++) {
            addCardEffect(cardslist[i], "blind", "", 100)
        }
    }
    else if (GameMode === "flip") {
        for (let i = 0; i < cardslist.length; i++) {
            addCardEffect(cardslist[i], "flip", "", 100)
        }
    }
    else if (GameMode === "wind") {
        for (let i = 0; i < cardslist.length; i++) {
            if (cardslist[i].removecardnummer) {
                cardslist[i].removecardnummer += 1
            } else {
                cardslist[i].removecardnummer = 1
            }
        }
    }
    else if (GameMode === "earth") {
        for (let i = 0; i < cardslist.length; i++) {
            if (cardslist[i].morecards) {
                cardslist[i].morecards += 1
            } else {
                cardslist[i].morecards = 1
            }
        }
    }
    return cardslist
}

// ================================

function addStartingBurnEffect(card) {
    addCardEffect(card, "burn", 1, 100)
}
function addStartingFreezeEffect(card) {
    addCardEffect(card, "freeze", 1, "forever")
}
