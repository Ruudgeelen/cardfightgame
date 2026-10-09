import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

import {
    BurnEffectMultiplayer,
    BurnDamageMultiplayer,
    FreezeEffectMultiplayer
} from '../src/data/effect.js'

import {
    PlayerAttackMultiplayer,
    EnemyAttackMultiplayer,
    AttackAddMultiplayer
} from '../src/data/attack.js'

import {
    PlayerdeathMultiplayer,
    EnemydeathMultiplayer,
    AddMaxHealthMultiplayer,
    RemoveMaxHealthMultiplayer,
    HealAddMultiplayer
} from '../src/data/health.js'

import {
    GetCardsMultiplayer,
    GetStapelMultiplayer,
    GetStartingCardsMultiplayer,
    GetNewCardMultiplayer,
    GetNewStapelMultiplayer
} from '../src/data/card.js'

import { gameMultiplayer } from '../src/data/game.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const distPath = path.resolve(__dirname, '../dist')

app.use(express.static(distPath))

app.get('/', (req, res) => {
    res.sendFile(path.join(distPath, 'App.vue'))
})

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

const rooms = {}


/* =========================================
   ROOM CODE
========================================= */

function generateRoomCode() {
    const characters =
        'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

    let code = ''

    for (let i = 0; i < 6; i++) {
        const randomIndex =
            Math.floor(
                Math.random() * characters.length
            )

        code += characters[randomIndex]
    }

    if (rooms[code]) {
        return generateRoomCode()
    }

    return code
}


/* =========================================
   GAME STARTEN
========================================= */

function createGame() {
    const allCards =
        GetCardsMultiplayer()

    const cardstapel =
        GetStapelMultiplayer(allCards)

    const player1Cards =
        GetStartingCardsMultiplayer(
            cardstapel,
            5
        )

    const player2Cards =
        GetStartingCardsMultiplayer(
            cardstapel,
            5
        )

    return {
        cardstapel: cardstapel,

        players: {
            1: {
                health: 100,
                maxHealth: 100,
                cards: player1Cards,
                lastCard: {}
            },

            2: {
                health: 100,
                maxHealth: 100,
                cards: player2Cards,
                lastCard: {}
            }
        },

        turn: 1,

        gameOver: false,

        winner: null
    }
}


/* =========================================
   SPELER NUMMER
========================================= */

function getPlayerNumber(room, socketId) {
    if (room.players[0] === socketId) {
        return 1
    }

    if (room.players[1] === socketId) {
        return 2
    }

    return 0
}


/* =========================================
   GAME STATE NAAR SPELERS
========================================= */

function sendGameState(roomCode) {
    const room = rooms[roomCode]

    if (!room) {
        return
    }

    if (!room.game) {
        return
    }

    for (let i = 0; i < room.players.length; i++) {
        const socketId =
            room.players[i]

        const playerNumber =
            getPlayerNumber(
                room,
                socketId
            )

        if (playerNumber === 0) {
            continue
        }

        const enemyNumber =
            playerNumber === 1
                ? 2
                : 1

        const player =
            room.game.players[playerNumber]

        const enemy =
            room.game.players[enemyNumber]
        console.log(
            'Stapel:',
            room.game.cardstapel
        )
        io.to(socketId).emit(
            'gameState',
            {
                playerHealth:
                    player.health,

                playerMaxHealth:
                    player.maxHealth,

                enemyHealth:
                    enemy.health,

                enemyMaxHealth:
                    enemy.maxHealth,

                playerCards:
                    player.cards,

                enemyCards:
                    enemy.cards,

                lastPlayerCard:
                    player.lastCard,

                lastEnemyCard:
                    enemy.lastCard,

                playerTurn:
                    room.game.turn ===
                    playerNumber,

                gameOver:
                    room.game.gameOver,

                winner:
                    room.game.winner,

                cardstapel: room.game.cardstapel

            }
        )
    }
}

/* =========================================
   PLAYER KAART SPELEN
========================================= */

function playPlayerCard(
    roomCode,
    socket,
    cardId,
    cardIndex
) {
    const room =
        rooms[roomCode]

    if (!room) {
        return
    }

    if (!room.game) {
        return
    }

    const playerNumber =
        getPlayerNumber(
            room,
            socket.id
        )

    if (playerNumber === 0) {
        return
    }

    if (room.game.gameOver) {
        return
    }

    if (
        room.game.turn !==
        playerNumber
    ) {
        return
    }

    const enemyNumber =
        playerNumber === 1
            ? 2
            : 1

    const player =
        room.game.players[playerNumber]

    const enemy =
        room.game.players[enemyNumber]

    const index =
        Number(cardIndex)

    if (
        index < 0 ||
        index >= player.cards.length
    ) {
        return
    }

    const card =
        player.cards[index]

    if (!card) {
        return
    }

    if (
        Number(card.id) !==
        Number(cardId)
    ) {
        return
    }


    /* ==============================
       DEATH CHECK
    ============================== */

    if (
        PlayerdeathMultiplayer(
            player.health
        )
    ) {
        return
    }

    if (
        EnemydeathMultiplayer(
            enemy.health
        )
    ) {
        return
    }


    /* ==============================
       LAST PLAYER CARD
    ============================== */

    player.lastCard = {
        ...card
    }

const result = gameMultiplayer(
    card,
    cardIndex,

    player.cards,
    enemy.cards,

    room.game.cardstapel,

    player.health,
    enemy.health,

    player.maxHealth,
    enemy.maxHealth,

    player.lastCard,
    enemy.lastCard,
    5
)

player.cards = result.userCards
enemy.cards = result.otheruserCards

player.health = result.userHealth
enemy.health = result.otheruserHealth

player.maxHealth = result.userMaxHealth
enemy.maxHealth = result.otheruserMaxHealth

player.lastCard = result.lastuserCard
enemy.lastCard = result.lastotheruserCard

room.game.cardstapel = result.cardstapel
    
    /* ==============================
       WINST
    ============================== */

    if (
        EnemydeathMultiplayer(
            enemy.health
        )
    ) {
        room.game.gameOver =
            true

        room.game.winner =
            playerNumber
    }


    /* ==============================
       VERLIES
    ============================== */

    else if (
        PlayerdeathMultiplayer(
            player.health
        )
    ) {
        room.game.gameOver =
            true

        room.game.winner =
            enemyNumber
    }


    /* ==============================
       VOLGENDE BEURT
    ============================== */

    else {
        room.game.turn =
            enemyNumber
    }


    /* ==============================
       STATE VERSTUREN
    ============================== */

    sendGameState(roomCode)
}


/* =========================================
   SOCKET.IO
========================================= */

io.on('connection', (socket) => {
    console.log(
        'Speler verbonden:',
        socket.id
    )


    /* =====================================
       GAME MAKEN
    ===================================== */

    socket.on(
        'createGame',
        () => {
            const roomCode =
                generateRoomCode()

            rooms[roomCode] = {
                players: [
                    socket.id
                ],

                game: null
            }

            socket.join(roomCode)

            console.log(
                '🎮 Game gemaakt:',
                roomCode
            )

            socket.emit(
                'gameCreated',
                roomCode
            )
        }
    )


    /* =====================================
       GAME JOINEN
    ===================================== */

    socket.on(
        'joinGame',
        (roomCode) => {
            if (!roomCode) {
                return
            }

            const code =
                String(roomCode)
                    .toUpperCase()
                    .trim()

            if (!rooms[code]) {
                socket.emit(
                    'gameError',
                    'Deze game bestaat niet.'
                )

                return
            }

            if (
                rooms[code].players.length >= 2
            ) {
                socket.emit(
                    'gameError',
                    'Deze game zit al vol.'
                )

                return
            }

            rooms[code].players.push(
                socket.id
            )

            socket.join(code)

            console.log(
                '👤 Speler joined:',
                socket.id
            )

            socket.emit(
                'gameJoined',
                {
                    roomCode: code
                }
            )

            socket.to(code).emit(
                'playerJoined'
            )


            /* =============================
               TWEE SPELERS
            ============================= */

            if (
                rooms[code].players.length === 2
            ) {
                console.log(
                    '🎮 Beide spelers aanwezig:',
                    code
                )

                rooms[code].game =
                    createGame()

                console.log(
                    '🃏 Multiplayer game gestart:',
                    code
                )

                io.to(code).emit(
                    'gameReady'
                )

                sendGameState(code)
            }
        }
    )


    /* =====================================
       GAME STATE
    ===================================== */

    socket.on(
        'getGameState',
        (roomCode) => {
            if (!roomCode) {
                return
            }

            const code =
                String(roomCode)
                    .toUpperCase()
                    .trim()

            const room =
                rooms[code]

            if (!room) {
                return
            }

            if (!room.game) {
                return
            }

            socket.join(code)

            sendGameState(code)
        }
    )


    /* =====================================
       KAART SPELEN
    ===================================== */

    socket.on(
        'playCard',
        (data) => {
            if (!data) {
                return
            }

            const roomCode =
                String(
                    data.roomCode || ''
                )
                    .toUpperCase()
                    .trim()

            playPlayerCard(
                roomCode,
                socket,
                data.cardId,
                data.cardIndex
            )
        }
    )


    /* =====================================
       DISCONNECT
    ===================================== */

    socket.on(
        'disconnect',
        () => {
            console.log(
                '🔌 Speler weg:',
                socket.id
            )

            const roomCodes =
                Object.keys(rooms)

            for (
                let i = 0;
                i < roomCodes.length;
                i++
            ) {
                const roomCode =
                    roomCodes[i]

                const room =
                    rooms[roomCode]

                for (
                    let j = 0;
                    j < room.players.length;
                    j++
                ) {
                    if (
                        room.players[j] ===
                        socket.id
                    ) {
                        room.players.splice(
                            j,
                            1
                        )

                        j--
                    }
                }

                if (
                    room.players.length === 1
                ) {
                    io.to(
                        room.players[0]
                    ).emit(
                        'opponentLeft'
                    )
                }

                if (
                    room.players.length === 0
                ) {
                    delete rooms[roomCode]
                }
            }
        }
    )
})


/* =========================================
   SERVER START
========================================= */

const PORT = process.env.PORT || 3000

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Multiplayer server gestart op poort ${PORT}`)
})
