import { io } from 'socket.io-client'

export const socket = io(
    'https://cardfightgame.onrender.com',
    {
        autoConnect: true,
        reconnection: true
    }
)

socket.on('connect', () => {
    console.log('✅ Verbonden met multiplayer server')
    console.log('🆔 Mijn speler ID:', socket.id)
})

socket.on('connect_error', (error) => {
    console.log('❌ Kan niet verbinden met multiplayer server')
    console.log(error.message)
})

socket.on('disconnect', (reason) => {
    console.log('🔌 Verbinding met multiplayer server verbroken:', reason)
})
