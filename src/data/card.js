import { defineStore } from 'pinia'
import { ref } from 'vue'
import { cards } from '../data/cardslist.js'

const cardslist = ref(cards)
const deck = ref([])
const selectedCards = ref([])


// ================================
// SINGLEPLAYER
// ================================

export function GetCards() {
    for (let i = 0; i < cardslist.value.length; i++) {
        cardslist.value[i].id = i + 1
    }

    localStorage.setItem(
        'AllCards',
        JSON.stringify(cardslist.value)
    )

    return cardslist.value
}

export function GetStapel(cardlist) {
    const stapel = [...cardlist].sort(
        () => Math.random() - 0.5
    )

    return stapel
}

export function GetStartingCards(cardstapel, aantalcards) {
    const usercards = cardstapel.splice(
        0,
        aantalcards
    )

    return usercards
}

export function GetNewCard(cardstapel) {
    const newCard = cardstapel.splice(0,1)[0]

    return newCard
}

export function GetNewStapel(playerCards, enemyCards) {
    const allcards =
        localStorage.getItem('AllCards')
            ? JSON.parse(
                localStorage.getItem('AllCards')
            )
            : []

    const cardlist = [...allcards].sort(
        () => Math.random() - 0.5
    )

    console.log('schudden')

    for (let i = 0; i < cardlist.length; i++) {

        let inGebruik = false

        for (let j = 0; j < playerCards.length; j++) {
            if (
                cardlist[i].id ===
                playerCards[j].id
            ) {
                inGebruik = true
            }
        }

        for (let j = 0; j < enemyCards.length; j++) {
            if (
                cardlist[i].id ===
                enemyCards[j].id
            ) {
                inGebruik = true
            }
        }

        if (inGebruik) {
            cardlist.splice(i, 1)
            i--
        }
    }

    const newStapel = [...cardlist].sort(
        () => Math.random() - 0.5
    )

    return newStapel
}

export function RemoveCard(cardlist) {
    if (cardlist.length === 0) {
        return cardlist
    }
    const randomIndex = Math.floor(
        Math.random() * cardlist.length
    )

    cardlist.splice(randomIndex, 1)

    return cardlist
}

// ================================
// MULTIPLAYER
// ================================

export function GetCardsMultiplayer() {
    const multiplayerCards = []

    for (let i = 0; i < cardslist.value.length; i++) {
        multiplayerCards.push({
            ...cardslist.value[i],
            id: i + 1
        })
    }

    return multiplayerCards
}

export function GetStapelMultiplayer(cardlist) {
    const stapel = [...cardlist]

    for (let i = stapel.length - 1; i > 0; i--) {
        const randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            )

        const temp = stapel[i]

        stapel[i] =
            stapel[randomIndex]

        stapel[randomIndex] =
            temp
    }

    return stapel
}

export function GetStartingCardsMultiplayer(
    cardstapel,
    aantalcards
) {
    return cardstapel.splice(
        0,
        aantalcards
    )
}

export function GetNewCardMultiplayer(
    cardstapel
) {
    return cardstapel.splice(
        0,
        1
    )[0]
}

export function GetNewStapelMultiplayer(
    playerCards,
    enemyCards
) {
    const allCards =
        GetCardsMultiplayer()

    const cardlist = [...allCards]

    for (let i = 0; i < cardlist.length; i++) {

        let inGebruik = false

        for (let j = 0; j < playerCards.length; j++) {
            if (
                cardlist[i].id ===
                playerCards[j].id
            ) {
                inGebruik = true
            }
        }

        for (let j = 0; j < enemyCards.length; j++) {
            if (
                cardlist[i].id ===
                enemyCards[j].id
            ) {
                inGebruik = true
            }
        }

        if (inGebruik) {
            cardlist.splice(i, 1)
            i--
        }
    }

    return GetStapelMultiplayer(cardlist)
}

export function RemoveCardMultiplayer(cardlist) {
    if (cardlist.length === 0) {
        return cardlist
    }

    const randomIndex = Math.floor(
        Math.random() * cardlist.length
    )
    cardlist.splice(randomIndex, 1)

    return cardlist
}
