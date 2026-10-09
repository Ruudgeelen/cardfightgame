import { createRouter, createWebHistory } from 'vue-router'

import Homepage from '../views/Homepage.vue'
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
            redirect: '/homepage'
        },
        {
            path: '/homepage',
            component: Homepage
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
            path: '/multiplayer',
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
