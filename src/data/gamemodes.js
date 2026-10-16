import { getRandomCardType } from './cardTypes.js'

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
            cardslist.value[i].effect = "burn"
            cardslist.value[i].effectvalue = 1
            cardslist.value[i].effectturns = "Forever"
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
            cardslist[i].effect = "burn"
            cardslist[i].effectvalue = 1
            cardslist[i].effectturns = "Forever"
        }
    }
    return cardslist
}