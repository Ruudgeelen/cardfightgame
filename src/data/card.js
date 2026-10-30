import { defineStore } from 'pinia'
import { ref } from 'vue'
import { cards } from '../data/cardslist.js'
import { getRandomCardType } from '../data/cardTypes.js'
import { GetGameModeCards, GetGameModeCardsMultplayer } from '../data/gamemodes.js'
const cardslist = ref(cards)
const deck = ref([])
const selectedCards = ref([])

export function getRandomCard() {
    const card = {}
    card.name = 'Random Card'
    card.attack = Math.floor(Math.random() * 21) - 3
    card.heal = Math.floor(Math.random() * 20) - 3
    if (Math.random() < 0.06) {
        card.attackadd = Math.floor(Math.random() * 3) - 1
    }
    if (Math.random() < 0.05) {
        card.healadd = Math.floor(Math.random() * 3) - 1
    }
    if (Math.random() < 0.005) {
        card.attackaddadd = 1
    }
    if (Math.random() < 0.005) {
        card.healaddadd = 1
    }
    if (Math.random() < 0.05) {
        card.healthbaradd = Math.floor(Math.random() * 6) - 2
    }
    if (Math.random() < 0.05) {
        card.healthbarremove = Math.floor(Math.random() * 6) - 2
    }
    if (Math.random() < 0.05) {
        card.freeze = true
    }
    if (Math.random() < 0.005) {
        card.freezeadd = true
    }
    if (Math.random() < 0.05) {
        card.burn = Math.floor(Math.random() * 3) + 1
        card.burnTurns = Math.floor(Math.random() * 2) + 1
    }
    if (Math.random() < 0.03) {
        card.flip = Math.floor(Math.random() * 3) + 1
        card.flipTurns = Math.floor(Math.random() * 3) + 1
    }
    if (Math.random() < 0.005) {
        card.gamble = true
        card.gambleCards = Math.floor(Math.random() * 3) + 1
    }
    if (Math.random() < 0.05) {
        card.lock = Math.floor(Math.random() * 3) + 1
        card.lockTurns = Math.floor(Math.random() * 3) + 1
    }
    if (Math.random() < 0.05) {
        card.blind = Math.floor(Math.random() * 3) + 1
        card.blindTurns = Math.floor(Math.random() * 3) + 1
    }
    if (Math.random() < 0.05) {
        card.light = Math.floor(Math.random() * 3) + 1
        card.lightTurns = Math.floor(Math.random() * 3) + 1
    }
    if (Math.random() < 0.04) {
        card.poison = Math.floor(Math.random() * 3) + 1
        card.poisonTurns = Math.floor(Math.random() * 2) + 1
        card.poisonDamage = Math.floor(Math.random() * 2) + 1
    }
    if (Math.random() < 0.05) {
        card.removecardnummer = Math.floor(Math.random() * 4) + 1
    }
    if (Math.random() < 0.04) {
        card.morecards = Math.floor(Math.random() * 3) + 1
    }
    if (Math.random() < 0.01) {
        card.faketype = getRandomCardType()
    }
    if (Math.random() < 0.03) {
        card.weak = Math.floor(Math.random() * 3) + 1
        card.weakTurns = Math.floor(Math.random() * 2) + 1
        card.weakDamage = Math.floor(Math.random() * 2) + 1
    }
    if (Math.random() < 0.005) {
        card.stapel = Math.random() < 0.5 ? 'shake' : Math.random() < 0.5 ? 'newdeckother' : 'newdeck'
    }
    if (Math.random() < 0.005) {
        card.steal = Math.floor(Math.random() * 3) + 1
    }
    card.type = 'random'
    return card
}




// ================================
// SINGLEPLAYER
// ================================

export function GetCards(GameMode) {
    for (let i = 0; i < cardslist.value.length; i++) {
        cardslist.value[i].id = i + 1
    }
    console.log('GameMode: ', GameMode.value)
    cardslist.value = GetGameModeCards(GameMode, cardslist)
    console.log('GetCards: ', cardslist.value)
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

export function StealCard(card, userCards, otheruserCards) {
    const stealid = Math.floor(Math.random() * otheruserCards.value.length)
    const stolenCard = otheruserCards.value[stealid]
    otheruserCards.value.splice(stealid, 1)
    userCards.value.push(stolenCard).value
    return userCards
}

// ================================
// MULTIPLAYER
// ================================

export function GetCardsMultiplayer(gameMode) {
    const multiplayerCards = cardslist.value.map(
        (card, index) => ({
            ...card,
            id: index + 1
        })
    )

    console.log('GameMode: ', gameMode)
    const gameModeCards = GetGameModeCardsMultplayer(
        gameMode,
        multiplayerCards
    )
    console.log('GetCards: ', cardslist)


    return gameModeCards
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
    enemyCards,
    gameMode
) {
    const allCards =
        GetCardsMultiplayer(gameMode)

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

export function StealCardMultiplayer(card, userCards, otheruserCards) {
    const stealid = Math.floor(Math.random() * otheruserCards.length)
    const stolenCard = otheruserCards.splice(stealid, 1)
    userCards.push(stolenCard)
    return userCards
}
