import { createRouter, createWebHistory } from 'vue-router'

import PlaySingleplayer from '../views/PlaySingleplayer.vue'
import Play from '../views/Play.vue'
import Cards from '../views/Cards.vue'
import Settings from '../views/Settings.vue'
import Tutorial from '../views/Tutorial.vue'
import Welcome from '../views/Welcome.vue'
import Multiplayer from '../views/Multiplayer.vue'
import PlayMultiplayer from '../views/PlayMultiplayer.vue'

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            redirect: '/welcome'
        },
        {
            path: '/play',
            component: Play
        },
        {
            path: '/cards',
            component: Cards
        },
        {
            path: '/settings',
            component: Settings
        },
        {
            path: '/tutorial',
            component: Tutorial
        },
        {
            path: '/welcome',
            component: Welcome
        },
        {
            path: '/playsingleplayer',
            component: PlaySingleplayer
        },
        {
            path: '/playsingleplayer/:gamemode',
            name: 'PlaySingleplayer',
            component: PlaySingleplayer
        },
        {
            path: '/multiplayer/:gamemode',
            name: 'Multiplayer',
            component: Multiplayer
        },
        {
            path: '/play-multiplayer/:roomCode',
            name: 'PlayMultiplayer',
            component: PlayMultiplayer
        }
    ]
})

export default router
