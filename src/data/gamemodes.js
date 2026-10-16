import { getRandomCardType } from './cardTypes.js'

function addStartingBurnEffect(card) {
    card.effect = 'burn'
    card.effectvalue = 1
    card.effectturns = 100
    card.effectvalues = {
        ...(card.effectvalues || {}),
        burn: 1
    }
    card.effectturnsmap = {
        ...(card.effectturnsmap || {}),
        burn: 100
    }
}

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
    return cardslist
}