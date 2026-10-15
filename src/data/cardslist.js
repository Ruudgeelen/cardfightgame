export const cards = [
    // FIRE
    {
        name: 'Fire Card',
        attack: 8,
        heal: 3,
        type: 'fire',
        burn: 2,
        burnTurns: 1
    },
    {
        name: 'Fireball',
        attack: 10,
        heal: 4,
        type: 'fire',
        burn: 1,
        burnTurns: 3
    },
    {
        name: 'Inferno',
        attack: 12,
        heal: 2,
        type: 'fire',
        burn: 1,
        burnTurns: 3
    },

    // LAVA 
    {
        name: 'Lava Golem',
        attack: 14,
        heal: 1,
        burn: 3,
        burnTurns: 1,
        type: 'lava'
    },
    {
        name: 'Lava Beast',
        attack: 15,
        heal: 0,
        burn: 2,
        burnTurns: 2,
        type: 'lava'
    },


    // WATER
    {
        name: 'Water Card',
        attack: 5,
        heal: 8,
        healthbaradd: 1,
        type: 'water'
    },
    {
        name: 'Water Mage',
        attack: 9,
        heal: 6,
        freeze: true,
        type: 'water'
    },
    {
        name: 'Water Elemental',
        attack: 7,
        heal: 7,
        healthbaradd: 2,
        type: 'water'
    },

    // EARTH
    {
        name: 'Rock Golem',
        attack: 13,
        heal: 3,
        morecards: 1,
        type: 'earth'
    },
    {
        name: 'Earthquake',
        attack: 11,
        heal: 0,
        morecards: 2,
        type: 'earth'
    },
    {
        name: 'Stone Guardian',
        attack: 10,
        heal: 5,
        morecards: 1,
        type: 'earth'
    },
    {
        name: 'Earthbound',
        attack: 12,
        heal: 3,
        morecards: 2,
        type: 'earth'
    },
    {
        name: 'Mountain King',
        attack: 15,
        heal: 0,
        morecards: 3,
        type: 'earth'
    },

    // WIND
    {
        name: 'Wind Rider',
        attack: 9,
        heal: 2,
        removecardnummer: 1,
        type: 'wind'
    },
    {
        name: 'Tornado',
        attack: 13,
        heal: 2,
        removecardnummer: 2,
        type: 'wind'
    },
    {
        name: 'Hurricane',
        attack: 15,
        heal: 0,
        removecardnummer: 1,
        type: 'wind'
    },
    {
        name: 'Stormcaller',
        attack: 13,
        heal: 12,
        removecardnummer: 2,
        type: 'wind'
    },
    {
        name: 'Cyclone',
        attack: 14,
        heal: 1,
        removecardnummer: 3,
        type: 'wind'
    },

    // NORMAL
    {
        name: 'Warrior',
        attack: 7,
        heal: 7,
        type: 'normal'
    },
    {
        name: 'Knight',
        attack: 5,
        heal: 10,
        type: 'normal'
    },
    {
        name: 'Battle Medic',
        attack: 4,
        heal: 6,
        type: 'normal'
    },
    {
        name: 'Archer',
        attack: 6,
        heal: 5,
        type: 'normal'
    },
    {
        name: 'Mage',
        attack: 8,
        heal: 4,
        type: 'normal'
    },
    {
        name: 'Healer',
        attack: 3,
        heal: 12,
        type: 'normal'
    },

    // DRAGON
    {
        name: 'Fire Dragon',
        attack: 12,
        burn: 1,
        burnTurns: 1,
        heal: 4,
        type: 'dragon'
    },
    {
        name: 'Ice Dragon',
        attack: 15,
        freeze: true,
        heal: 0,
        type: 'dragon'
    },
    {
        name: 'Storm Dragon',
        attack: 15,
        heal: 0,
        removecardnummer: 1,
        type: 'dragon'
    },
    {
        name: 'Earth Dragon',
        attack: 15,
        heal: 0,
        morecards: 1,
        type: 'dragon'
    },

    // UNDEAD
    {
        name: 'Skeleton',
        attack: 21,
        heal: -6,
        attackadd: 1,
        type: 'undead'
    },
    {
        name: 'Zombie',
        attack: 20,
        heal: -5,
        attackadd: 2,
        type: 'undead'
    },
    {
        name: 'Creeper',
        attack: 25,
        heal: -10,
        attackadd: 3,
        type: 'undead'
    },
    {
        name: 'Flesh Eater',
        attack: 23,
        heal: -7,
        attackadd: 2,
        type: 'undead'
    },

    // LIGHT
    {
        name: 'Light Spirit',
        attack: 3,
        heal: 12,
        healadd: 1,
        healthbaradd: 3,
        type: 'light'
    },
    {
        name: 'Hollow Knight',
        attack: 7,
        heal: 10,
        healadd: 2,
        healthbaradd: 2,
        type: 'light'
    },
    {
        name: 'Divine Healer',
        attack: 4,
        heal: 15,   
        healadd: 3,
        healthbaradd: 1,
        type: 'light'
    },

    // SPACE
    {
        name: 'Sun',
        attack: 10,
        heal: 10,
        burn: 1,
        burnTurns: 1,
        healthbarremove: -1,
        type: 'space'
    },
    {
        name: 'Earth',
        attack: 12,
        heal: 0,
        healthbaradd: 5,   
        healthbarremove: -1,
        type: 'space' 
    },
    {
        name: 'Moon',
        attack: 8,
        heal: 12,
        healthbaradd: -1,
        healthbarremove: -1,
        type: 'space'
    },
    {
        name: 'Mars',
        attack: 20,
        heal: 0,
        healthbaradd: 1,
        healthbarremove: -1,
        type: 'space'
    },
    {
        name: 'Jupiter',
        attack: 15,
        heal: 5,
        removecardnummer: 1,
        healthbarremove: -1,
        type: 'space'
    },

    // DARK
    {
        name: 'Dark Spirit',
        attack: 10,
        heal: 1,
        attackadd: 2,
        type: 'dark'
    },
    {
        name: 'Shadow Assassin',
        attack: 14,
        heal: 0,
        attackadd: 3,
        type: 'dark'
    },
    {
        name: 'Necromancer',
        attack: 12,
        heal: 2,
        attackadd: 1,
        type: 'dark'
    },
    
    // FREEZE
    {
        name: 'Freeze Shard',
        attack: 5,
        heal: 5,
        freeze: true,
        type: 'freeze'
    },
    {
        name: 'Frozen Heart',
        attack: 8,
        heal: 3,
        freeze: true,
        type: 'freeze'
    },
    {
        name: 'Glacial Spike',
        attack: 10,
        heal: 2,
        freeze: true,
        type: 'freeze'
    },

    // ICE
    {
        name: 'Ice Golem',
        attack: 7,
        heal: 6,
        freeze: true,
        type: 'ice'
    },
    {
        name: 'Frost Mage',
        attack: 9,
        heal: 5,
        freeze: true,
        type: 'ice'
    },

    // LIFESTEAL
    {
        name: 'Vampire Bite',
        attack: -5,
        heal: 0,
        healthbaradd: 5,
        healthbarremove: 3,
        type: 'lifesteal'
    },
    {
        name: 'Batsie',
        attack: 5,
        heal: 25,
        healthbaradd: -1,
        healthbarremove: 3,
        type: 'lifesteal'
    },
    {
        name: 'Bloodthirsty',
        attack: 10,
        heal: 15,
        healadd: -1,
        healthbaradd: -2,
        healthbarremove: 5,
        type: 'lifesteal'
    },

    // HEAL
    {
        name: 'Healing Potion',
        attack: 0,
        heal: 27,
        healadd: 3,
        healthbaradd: 5,
        type: 'heal'
    },
    {
        name: 'Greater Heal',
        attack: 0,
        heal: 26,
        healadd: 3,
        healthbaradd: 3,
        type: 'heal'
    },
    {
        name: 'Full Recovery',
        attack: 0,
        heal: 25,
        healadd: 2,
        healthbaradd: 7,
        type: 'heal'
    },
    {
        name: 'Healing Light',
        attack: 0,
        heal: 28,
        healthbaradd: 3,
        type: 'heal'
    },
    {
        name: 'Healing Rain',
        attack: 0,
        heal: 20,
        healadd: 1,
        healthbaradd: 5,
        type: 'heal'
    },

    // RARE
    {
        name: 'Rare Beast',
        attack: 8,
        heal: 5,
        attackadd: 1,
        type: 'rare'
    },
    {
        name: 'Rare Flower',
        attack: 9,
        heal: 5,
        healadd: 1,
        type: 'rare'
    },
    {
        name: 'Rare Warrior',
        attack: 10,
        heal: 0,
        attackadd: 1,
        type: 'rare'
    },
    {
        name: 'Rare Mage',
        attack: 7,
        heal: 8,
        healadd: 1,
        type: 'rare'
    },

    // UNIQUE
    {
        name: 'Unique Beast',
        attack: 10,
        heal: 10,
        healadd: 3,
        type: 'unique'
    },
    {
        name: 'Unique Flower',
        attack: 9,
        heal: 9,
        healthbaradd: 3,
        type: 'unique'
    },
    {
        name: 'Unique Warrior',
        attack: 11,
        heal: 8,
        attackadd: 3,
        type: 'unique'
    },
    {
        name: 'Unique Mage',
        attack: 8,
        heal: 11,
        healthbarremove: 3,
        removecardnummer: 1,
        type: 'unique'
    },

    // GHOST
    {
        name: 'Ghostly Apparition',
        attack: 12,
        heal: 0,
        removecardnummer: 1,
        type: 'ghost'
    },
    {
        name: 'Phantom',
        attack: 10,
        heal: 0,
        healthbarremove: -1,
        removecardnummer: 2,
        type: 'ghost'
    },
    {
        name: 'Specter',
        attack: 15,
        heal: 0,
        healthbarremove: -2,
        removecardnummer: 1,
        type: 'ghost'
    },

    // POISON
    {
        name: 'Poison Card',
        attack: 5,
        heal: 5,
        healthbarremove: 2,
        type: 'poison'
    },

    // TNT
    {
        name: 'TNT',
        attack: 25,
        heal: 0,
        healthbarremove: 5,
        type: 'tnt'
    },

    // SOFT
    {
        name: 'Teddy',
        attack: 1,
        heal: 1,
        type: 'soft'
    },
    {
        name: 'Pet',
        attack: -1,
        heal: -1,
        healadd: 1,
        attackadd: 1,
        type: 'soft'
    },
    {
        name: 'Cuddly',
        attack: 0,
        heal: 0,
        healthbaradd: 1,
        healthbarremove: 1,
        type: 'soft'
    },
    {
        name: 'Fluffy',
        attack: -1,
        heal: -1,
        removecardnummer: 1,
        morecards: 1,
        type: 'soft'
    },

    // HELL
    {
        name: 'Hellfire',
        attack: 20,
        heal: -10,
        burn: 5,
        burnTurns: 1,
        type: 'hell'
    },

    // TROLL
    {
        name: 'Clown',
        attack: -20,
        healthbaradd: -5,
        healthbarremove: 5,
        heal: 20,
        type: 'troll'
    },
    {
        name: 'No',
        attack: 0,
        heal: 0,
        type: 'troll'
    },
    {
        name: 'Nerf',
        attack: 0,
        heal: 0,
        attackadd: -5,
        type: 'troll'
    },

    // KAART
    {
        name: 'Shake',
        attack: 0,
        heal: 0,
        stapel: 'shake',
        type: 'kaart'
    },
    {
        name: 'New Deck',
        attack: 0,
        heal: 0,
        stapel: 'newdeck',
        type: 'kaart'
    },
    {
        name: 'New Deck Other',
        attack: 0,
        heal: 0,
        stapel: 'newdeckother',
        type: 'kaart'
    },

    // GAMBLE
    {
        name: 'Gamble',
        attack: 0,
        heal: 0,
        gamble: true,
        gambleCards: 3,
        type: 'gamble'
    },

    // LUCKY
    {
        name: 'Lucky Charm',
        attack: 7,
        heal: 7,
        healadd: 2,
        attackadd: 1,
        morecards: 1,
        removecardnummer: 1,
        type: 'lucky'
    },
    {
        name: 'Lucky Chicken',
        attack: 10,
        heal: 10,
        attackadd: 2,
        removecardnummer: 1,
        healthbaradd: 2,
        type: 'lucky'
    },

    // RAINBOW
    {
        name: 'Rainbow',
        attack: 15,
        heal: 25,
        healthbaradd: 3,
        healthbarremove: 1,
        healadd: 2,
        attackadd: 2,
        morecards: 3,
        removecardnummer: 1,
        freeze: true,
        type: 'rainbow'
    },
]