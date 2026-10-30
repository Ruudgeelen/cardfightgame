import { getRandomCardType } from './cardTypes.js'
import { getRandomCard } from './card.js'

export const cards = [
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
    {
        name: 'Assassin',
        attack: 10,
        heal: 2,
        type: 'normal'
    },
    {
        name: 'Berserker',
        attack: 12,
        heal: 0,
        type: 'normal'
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
        blind: 1,
        blindTurns: 1,
        type: 'rare'
    },
    {
        name: 'Rare Healer',
        attack: 5,
        heal: 10,
        healadd: 2,
        type: 'rare'
    },
    {
        name: 'Rare Archer',
        attack: 9,
        heal: 4,
        attackadd: 1,
        light: 1,
        lightTurns: 1,
        type: 'rare'
    },
    {
        name: 'Rare Assassin',
        attack: 11,
        heal: 0,
        attackadd: 2,
        type: 'rare'
    },

    // UNIQUE
    {
        name: 'Unique Beast',
        attack: 10,
        heal: 10,
        lock: 1,
        lockTurns: 2,
        type: 'unique'
    },
    {
        name: 'Unique Flower',
        attack: 9,
        heal: 9,
        blind: 1,
        blindTurns: 2,
        healthbaradd: 3,
        type: 'unique'
    },
    {
        name: 'Unique Warrior',
        attack: 11,
        heal: 8,
        blind: 3,
        blindTurns: 2,
        attackadd: 3,
        type: 'unique'
    },
    {
        name: 'Unique Mage',
        attack: 8,
        heal: 11,
        healthbarremove: 3,
        removecardnummer: 1,
        poison: 2,
        poisonTurns: 3,
        poisonDamage: 1,
        type: 'unique'
    },
    {
        name: 'Unique Healer',
        attack: 7,
        heal: 12,
        healadd: 3,
        type: 'unique'
    },

    // LEGENDARY
    {
        name: 'Legendary Beast',
        attack: 15,
        heal: 15,
        attackadd: 3,
        healadd: 1,
        lock: 2,
        lockTurns: 2,
        light: 1,
        lightTurns: 1,
        type: 'legendary'
    },
    {
        name: 'Legendary Flower',
        attack: 12,
        heal: 18,
        burn: 1,
        burnTurns: 1,
        healthbaradd: 5,
        type: 'legendary'
    },
    {
        name: 'Legendary Warrior',
        attack: 18,
        heal: 12,
        freeze: true,
        blind: 2,
        blindTurns: 2,
        light: 2,
        lightTurns: 2,
        attackadd: 1,
        type: 'legendary'
    },

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
    {
        name: 'Flame Spirit',
        attack: 9,
        heal: 5,
        burn: 2,
        burnTurns: 2,
        type: 'fire',
    },
    {
        name: 'Fire Elemental',
        attack: 11,
        heal: 3,
        burn: 1,
        burnTurns: 2,
        type: 'fire',
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
    {
        name: 'Lava Elemental',
        attack: 16,
        heal: 0,
        burn: 3,
        burnTurns: 2,
        type: 'lava'
    },
    {
        name: 'Lava Spirit',
        attack: 14,
        heal: 0,
        burn: 2,
        burnTurns: 2,
        type: 'lava'
    },
    {
        name: 'Lava Guardian',
        attack: 15,
        heal: 0,
        burn: 3,
        burnTurns: 1,   
        type: 'lava'
    },

    // WATER
    {
        name: 'Water Spray',
        attack: 5,
        heal: 8,
        healthbaradd: 1,
        type: 'water'
    },
    {
        name: 'Water Mage',
        attack: 9,
        heal: 6,
        healthbaradd: 2,
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
    {
        name: 'Water Spirit',
        attack: 6,
        heal: 9,
        healthbaradd: 1,
        freeze: true,
        type: 'water'
    },
    {
        name: 'Water Guardian',
        attack: 8,
        heal: 8,
        healthbaradd: 3,
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

    // ANIMAL
    {
        name: 'Shark',
        attack: 8,
        heal: 5,
        healadd: 1,
        healthbaradd: 1,
        lock: 3,
        lockTurns: 1,
        type: 'animal'
    },
    {
        name: 'Snake',
        attack: 10,
        heal: 8,
        blind: 1,
        blindTurns: 1,
        poison: 1,
        poisonTurns: 1,
        poisonDamage: 1,
        type: 'animal'
    },
    {
        name: 'Lion',
        attack: 12,
        heal: 6,
        lock: 1,
        lockTurns: 1,
        type: 'animal'
    },
    {
        name: 'Tiger',
        attack: 11,
        heal: 7,
        attackadd: 2,
        type: 'animal'   
    },
    {
        name: 'Ice Bear',
        attack: 8,
        heal: 5,
        freeze: true,
        type: 'animal'
    },

    // PLANT
    {
        name: 'Venus Flytrap',
        attack: 7,
        heal: 16,
        healthbaradd: 1,
        type: 'plant'
    },
    {
        name: 'Cactus',
        attack: -6,
        heal: 20,
        healthbaradd: 2,
        burn: 1,
        burnTurns: 1,
        type: 'plant'
    },
    {
        name: 'Sunflower',
        attack: 5,
        heal: 15,
        light: 3,
        lightTurns: 1,
        healthbaradd: 1,
        type: 'plant'
    },
    {
        name: 'Poison Ivy',
        attack: 6,
        heal: 14,
        healthbaradd: 1,
        healthbarremove: 1,
        poison: 1,
        poisonTurns: 1,
        poisonDamage: 1,
        type: 'plant'
    },
    {
        name: 'Bamboo',
        attack: 8,
        heal: 12,
        healthbaradd: 2,
        type: 'plant'
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
    {
        name: 'Lock Dragon',
        attack: 15,
        heal: 0,
        lock: 2,
        lockTurns: 1,
        type: 'dragon'
    },
    {
        name: 'Blind Dragon',
        attack: 15,
        heal: 0,
        blind: 1,
        blindTurns: 1,
        type: 'dragon'
    },
    {
        name: 'Light Dragon',
        attack: 15,
        heal: 0,
        light: 2,
        lightTurns: 3,
        type: 'dragon'
    },
    {
        name: 'Poison Dragon',
        attack: 15,
        heal: 0,
        poison: 2,
        poisonTurns: 1,
        poisonDamage: 2,
        type: 'dragon'
    },
    {
        name: 'Weak Dragon',
        attack: 15,
        heal: 0,
        weak: 2,
        weakTurns: 1,
        weakDamage: 2,
        type: 'dragon'
    },

    // UNDEAD
    {
        name: 'Skeleton',
        attack: 21,
        heal: 0,
        attackadd: -1,
        blind: 1,
        blindTurns: 1,
        type: 'undead'
    },
    {
        name: 'Zombie',
        attack: 20,
        heal: 0,
        attackadd: -1,
        type: 'undead'
    },
    {
        name: 'Creeper',
        attack: 25,
        heal: 10,
        attackadd: -2,
        type: 'undead'
    },
    {
        name: 'Bone Collector',
        attack: 22,
        heal: 0,
        attackadd: -1,
        type: 'undead'
    },
    {
        name: 'Warden',
        attack: 25,
        heal: 0,
        blind: 3,
        blindTurns: 1,
        attackadd: -2,
        type: 'undead'
    },

    // LIGHT
    {
        name: 'Light Spirit',
        attack: 3,
        heal: 12,
        healadd: 1,
        healthbaradd: 3,
        light: 3,
        lightTurns: 1,
        type: 'light'
    },
    {
        name: 'Hollow Knight',
        attack: 7,
        heal: 10,
        healadd: 2,
        healthbaradd: 2,
        light: 1,
        lightTurns: 1,
        type: 'light'
    },
    {
        name: 'Divine Healer',
        attack: 4,
        heal: 15,   
        healadd: 3,
        healthbaradd: 1,
        light: 1,
        lightTurns: 2,
        type: 'light'
    },
    {
        name: 'Radiant Guardian',
        attack: 5,
        heal: 13,
        healadd: 2,
        healthbaradd: 2,
        light: 2,
        lightTurns: 1,
        type: 'light'
    },
    {
        name: 'Sun Priest',
        attack: 6,
        heal: 14,
        healadd: 3,
        healthbaradd: 3,
        light: 2,
        lightTurns: 2,
        type: 'light'
    },
    // ALIEN
    {
        name: 'Alien Invader',
        attack: 10,
        heal: 5,
        healthbaradd: 1,
        type: 'alien'
    },
    {
        name: 'Alien Warrior',
        attack: 12,
        heal: 3,
        healthbaradd: 2,
        type: 'alien'
    },
    {
        name: 'Alien Mage',
        attack: 8,
        heal: 7,
        poison: 1,
        poisonTurns: 1,
        poisonDamage: 1,
        healthbaradd: 1,
        type: 'alien'
    },
    {
        name: 'Alien Healer',
        attack: 6,
        heal: 10,
        healthbaradd: 1,
        type: 'alien'
    },
    {
        name: 'Alien Assassin',
        attack: 14,
        heal: 2,
        healthbaradd: 2,
        lock: 1,
        lockTurns: 1,
        type: 'alien'
    },

    // BLUR
    {
        name: 'Blurer',
        attack: 5,
        heal: 5,
        blind: 2,
        blindTurns: 1,
        healthbaradd: 1,
        type: 'blur'
    },
    {
        name: 'Blur Mage',
        attack: 7,
        heal: 3,
        blind: 3,
        blindTurns: 2,
        healthbaradd: 2,
        type: 'blur'
    },
    {
        name: 'Blur Knight',
        attack: 6,
        heal: 4,
        blind: 4,
        blindTurns: 1,
        healthbaradd: 3,
        type: 'blur'
    },
    {
        name: 'Blur Assassin',
        attack: 8,
        heal: 2,
        blind: 3,
        blindTurns: 2,
        healthbaradd: 4,
        type: 'blur'
    },
    {
        name: 'Blur Healer',
        attack: 4,
        heal: 16,
        blind: 2,
        blindTurns: 1,
        healthbaradd: 5,
        type: 'blur'
    },

    // SPACE
    {
        name: 'Sun',
        attack: 10,
        heal: 10,
        burn: 1,
        burnTurns: 1,
        light: 1,
        lightTurns: 1,
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
        lock: 1,
        lockTurns: 1,
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
        blind: 3,
        blindTurns: 1,
        type: 'dark'
    },
    {
        name: 'Shadow Assassin',
        attack: 14,
        heal: 0,
        attackadd: 3,
        blind: 2,
        blindTurns: 2,
        type: 'dark'
    },
    {
        name: 'Necromancer',
        attack: 12,
        heal: 2,
        attackadd: 1,   
        blind: 1,
        blindTurns: 3,
        type: 'dark'
    },
    {
        name: 'Dark Knight',
        attack: 15,
        heal: 0,
        attackadd: 2,
        blind: 2,
        blindTurns: 1,
        type: 'dark'
    },
    {
        name: 'Shadow Lord',
        attack: 18,
        heal: 0,
        attackadd: 3,
        blind: 3,
        blindTurns: 2,
        type: 'dark'
    },

    // LOCK
    {
        name: 'Lockers',
        attack: 4,
        heal: 4,
        lock: 3,
        lockTurns: 1,
        type: 'lock'
    },
    {
        name: 'Locksmith',
        attack: 5,
        heal: 5,
        lock: 2,
        lockTurns: 2,
        type: 'lock'
    },
    {
        name: 'Lockdown',
        attack: 6,
        heal: 6,
        lock: 1,
        lockTurns: 3,
        type: 'lock'
    },
    {
        name: 'Lock Master',
        attack: 7,
        heal: 7,
        lock: 2,
        lockTurns: 1,
        type: 'lock'
    },
    {
        name: 'Lock King',
        attack: 8,
        heal: 8,
        lock: 1,
        lockTurns: 3,
        type: 'lock'
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
    {
        name: 'Freeze Barrier',
        attack: 6,
        heal: 4,
        freeze: true,
        type: 'freeze'
    },
    {
        name: 'Freeze Prison',
        attack: 7,
        heal: 3,
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
    {
        name: 'Ice Elemental',
        attack: 10,
        heal: 4,
        freeze: true,
        type: 'ice'
    },
    {
        name: 'Ice Spirit',
        attack: 8,
        heal: 6,
        freeze: true,
        type: 'ice'
    },
    {
        name: 'Ice Guardian',
        attack: 11,
        heal: 3,
        freeze: true,
        type: 'ice'
    },
    

    // LIFESTEAL
    {
        name: 'Vampire Bite',
        attack: -5,
        heal: 0,
        healthbaradd: 5,
        lock: 1,
        lockTurns: 1,
        healthbarremove: 1,
        type: 'lifesteal'
    },
    {
        name: 'Bloodthirsty',
        attack: 10,
        heal: 15,
        healadd: -1,
        healthbaradd: 2,
        healthbarremove: 1,
        type: 'lifesteal'
    },
    {
        name: 'Nosferatu',
        attack: 15,
        heal: 10,
        healadd: -1,
        healthbaradd: 1,
        healthbarremove: 1,
        blind: 1,
        blindTurns: 1,
        type: 'lifesteal'
    },
    {
        name: 'Blood Pact',
        attack: 10,
        heal: 5,
        healadd: -1,
        healthbaradd: -4,
        healthbarremove: 4,
        type: 'lifesteal'
    },
    {
        name: 'Vampiric Ritual',
        attack: 15,
        heal: 10,
        healadd: -1,
        healthbaradd: 5,
        healthbarremove: 2,
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
        light: 1,
        lightTurns: 1,
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

    // GHOST
    {
        name: 'Ghostly Apparition',
        attack: 12,
        heal: 0,
        lock: 1,
        lockTurns: 1,
        removecardnummer: 1,
        type: 'ghost'
    },
    {
        name: 'Phantom',
        attack: 10,
        heal: 0,
        attackadd: 1,
        lock: 2,
        lockTurns: 1,
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
    {
        name: 'Wraith',
        attack: 11,
        heal: 0,
        healthbarremove: -3,
        removecardnummer: 3,
        type: 'ghost'
    },
    {
        name: 'Banshee',
        attack: 15,
        heal: 0,
        healthbarremove: -4,
        removecardnummer: 2,
        type: 'ghost'
    },

    // POISON
    {
        name: 'Poison Card',
        attack: 5,
        heal: 15,
        healadd: -1,
        attackadd: 1,
        poison: 3,
        poisonTurns: 1,
        poisonDamage: 1,
        healthbarremove: 3,
        type: 'poison'
    },
    {
        name: 'Toxic Cloud',
        attack: 7,
        heal: 13,
        healadd: -1,
        healthbarremove: 5,
        poison: 2,
        poisonTurns: 1,
        poisonDamage: 4,
        type: 'poison'
    },
    {
        name: 'Venomous Bite',
        attack: 10,
        heal: 15,
        healadd: -1,
        poison: 1,
        poisonTurns: 2,
        poisonDamage: 1,
        healthbarremove: 4,
        type: 'poison'
    },
    {
        name: 'Poisonous Gas',
        attack: 8,
        heal: 12,
        healadd: -1,
        poison: 2,
        poisonTurns: 1,
        poisonDamage: 2,
        healthbarremove: 2,
        type: 'poison'
    },
    {
        name: 'Toxic Spill',
        attack: 9,
        heal: 14,
        healadd: -1,
        poison: 1,
        poisonTurns: 3,
        poisonDamage: 2,
        healthbarremove: 1,
        type: 'poison'
    },
    
    // SHIELD
    {
        name: 'Shield Card',
        attack: 0,
        heal: 10,
        healthbaradd: 5,
        type: 'shield'
    },
    {
        name: 'Barrier',
        attack: 0,
        heal: 9,
        healthbaradd: 7,
        type: 'shield'
    },
    {
        name: 'Protective Ward',
        attack: 0,
        heal: 10,
        healthbaradd: 6,
        type: 'shield'
    },
    {
        name: 'Fortress',
        attack: 0,
        heal: 8,
        healadd: 1,
        healthbaradd: 8,
        type: 'shield'
    },
    {
        name: 'Shield',
        attack: 0,
        heal: 11,
        healthbaradd: 5,
        type: 'shield'
    },

    // MAGIC
    {
        name: 'Magic Card',
        attack: 10,
        heal: 10,
        light: 1,
        lightTurns: 1,
        blind: 1,
        blindTurns: 1,
        type: 'magic'
    },
    {
        name: 'Wizard',
        attack: 15,
        heal: 15,
        light: 1,
        lightTurns: 1,
        blind: 1,
        blindTurns: 1,
        type: 'magic'
    
    },
    {
        name: 'Sorcerer',
        attack: 20,
        heal: 5,
        light: 1,
        lightTurns: 1,
        blind: 1,
        blindTurns: 1,
        type: 'magic'
    },
    {
        name: 'Enchanter',
        attack: 5,
        heal: 20,
        light: 1,
        lightTurns: 1,
        blind: 1,
        blindTurns: 1,
        type: 'magic'
    },
    {
        name: 'Magician',
        attack: 12,
        heal: 12,
        light: 1,
        lightTurns: 1,
        blind: 1,
        blindTurns: 1,
        type: 'magic'
    },

    // TNT
    {
        name: 'TNT',
        attack: 25,
        heal: 0,
        healthbarremove: 5,
        type: 'tnt'
    },
    {
        name: 'Dynamite',
        attack: 20,
        heal: 0,
        healthbarremove: 3,
        type: 'tnt'
    },
    {
        name: 'Explosive Charge',
        attack: 15,
        heal: 0,
        healthbarremove: 3,
        type: 'tnt'
    },
    {
        name: 'Bomb',
        attack: 22,
        heal: 0,
        healthbarremove: 4,
        type: 'tnt'
    },
    {
        name: 'Grenade',
        attack: 18,
        heal: 0,
        healthbarremove: 2,
        type: 'tnt'
    },
    // FOOD
    {
        name: 'Apple',
        attack: 0,
        heal: 5,
        healthbaradd: 1,
        type: 'food'
    },
    {
        name: 'Bread',
        attack: 0,
        heal: 8,
        healthbaradd: 2,
        type: 'food'
    },
    {
        name: 'Cheese',
        attack: 0,
        heal: 10,
        healthbaradd: 3,
        type: 'food'
    },
    {
        name: 'Meat',
        attack: 0,
        heal: 12,
        healthbaradd: 4,
        type: 'food'
    },
    {
        name: 'Cake',
        attack: 0,
        heal: 15,
        healthbaradd: 5,
        type: 'food'
    },

    // WEATHER
    {
        name: 'Rain',
        attack: 0,
        heal: 10,
        healthbaradd: 2,
        type: 'weather'
    },
    {
        name: 'Snow',
        attack: 0,
        heal: 8,
        freeze: true,
        healthbaradd: 3,
        type: 'weather'
    },
    {
        name: 'Wind',
        attack: 0,
        heal: 5,
        removecardnummer: 1,
        type: 'weather'
    },
    {
        name: 'Sunny Day',
        attack: 0,
        heal: 12,
        light: 1,
        lightTurns: 1,
        healthbaradd: 2,
        type: 'weather'
    },
    {
        name: 'Hailstorm',
        attack: 0,
        heal: 7,
        freeze: true,
        healthbaradd: 3,
        type: 'weather'
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
        attack: 0,
        heal: 0,
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
        attack: 0,
        heal: 0,
        removecardnummer: 1,
        morecards: 1,
        type: 'soft'
    },
    {
        name: 'Plushie',
        attack: -1,
        heal: -1,
        type: 'soft'
    },

    // DEAD
    {
        name: 'Skeleton Warrior',
        attack: 10,
        heal: 0,
        weak: 1,
        weakTurns: 1,
        weakDamage: 1,
        type: 'dead'
    },
    {
        name: 'Dead Brute',
        attack: 15,
        heal: 0,
        weak: 1,
        weakTurns: 1,
        weakDamage: 1,
        type: 'dead'
    },
    {
        name: 'Dead Mage',
        attack: 10,
        heal: 0,
        weak: 3,
        weakTurns: 3,
        weakDamage: 1,
        type: 'dead'
    },
    {
        name: 'Dead Assassin',
        attack: 12,
        heal: 0,
        weak: 2,
        weakTurns: 2,
        weakDamage: 1,
        type: 'dead'
    },
    {
        name: 'Dead Healer',
        attack: 8,
        heal: 0,
        weak: 1,
        weakTurns: 1,
        weakDamage: 1,
        type: 'dead'
    },

    // HOLE
    {
        name: 'Black Hole',
        attack: 0,
        heal: 0,
        removecardnummer: 5,
        type: 'hole'
    },
    {
        name: 'White Hole',
        attack: 0,
        heal: 0,
        morecards: 5,
        type: 'hole'
    },
    {
        name: 'Wormhole',
        attack: 0,
        heal: 0,
        removecardnummer: 3,
        morecards: 3,
        type: 'hole'
    },
    {
        name: 'Light Hole',
        attack: 0,
        heal: 0,
        light: 5,
        lightTurns: 3,
        type: 'hole'
    },
    {
        name: 'Dark Hole',
        attack: 0,
        heal: 0,
        blind: 5,
        blindTurns: 3,
        type: 'hole'
    },

    // STORM
    {
        name: 'Storm',
        attack: 0,
        heal: 0,
        removecardnummer: 7,
        type: 'storm'
    },
    {
        name: 'Heavy Storm',
        attack: 0,
        heal: 0,
        removecardnummer: 10,
        type: 'storm'
    },

    // CLOSED
    {
        name: 'Closed',
        attack: 0,
        heal: 0,
        lock: 10,
        lockTurns: 1,
        type: 'closed'
    },
    {
        name: 'Closer',
        attack: 0,
        heal: 0,
        lock: 1,
        lockTurns: 10,
        type: 'closed'
    },

    // WORLD 
    {
        name: 'World',
        attack: 0,
        heal: 0,
        morecards: 7,
        type: 'world'
    },
    {
        name: 'World Boss',
        attack: 0,
        heal: 0,
        morecards: 8,
        type: 'world'
    },

    // LIGHTNING
    {
        name: 'Lightning Strike',
        attack: 15,
        heal: 0,
        light: 25,
        lightTurns: 3,
        type: 'lightning'
    },
    {
        name: 'Thunderbolt',
        attack: 15,
        heal: 0,
        light: 1,
        lightTurns: 25,
        type: 'lightning'
    },

    // HELL
    {
        name: 'Hellfire',
        attack: 0,
        heal: 0,
        burn: 10,
        burnTurns: 1,
        type: 'hell'
    },
    {
        name: 'Demon',
        attack: 0,
        heal: 0,
        burn: 7,
        burnTurns: 1,
        type: 'hell'
    },
    {
        name: 'Infernal',
        attack: 0,
        heal: 0,
        burn: 5,
        burnTurns: 3,
        type: 'hell'
    },

    // MEGAICE
    {
        name: 'Mega Ice',
        attack: 0,
        heal: 10,
        freeze: true,
        freezeadd: true,
        type: 'megaice'
    },
    {
        name: 'Mega Freeze',
        attack: 10,
        heal: 0,
        freeze: true,
        freezeadd: true,
        type: 'megaice'
    },

    // OCEAN
    {
        name: 'Ocean',
        attack: 0,
        heal: 25,
        freeze: true,
        flip: 3,
        flipTurns: 3,
        morecards:  1,
        healthbaradd: 5,
        type: 'ocean'
    },
    {
        name: 'Ocean Wave',
        attack: 0,
        heal: 20,
        freeze: true,
        flip: 2,
        flipTurns: 2,
        morecards:  2,
        healthbaradd: 3,
        type: 'ocean'
    },

    // EYE
    {
        name: 'Eye of the Storm',
        attack: 0,
        heal: 0,
        blind: 10,
        blindTurns: 1,
        type: 'eye'
    },
    {
        name: 'Eye of the Beholder',
        attack: 0,
        heal: 0,
        blind: 1,
        blindTurns: 10,
        type: 'eye'
    },

    // MEGAHEAL
    {
        name: 'Megaheal',
        attack: 0,
        heal: 50,
        healadd: 3,
        healthbaradd: 10,
        type: 'megaheal'
    },
    {
        name: 'Megaheal Plus',
        attack: 0,
        heal: 55,
        healthbaradd: 15,
        type: 'megaheal'
    },

    // DEADLY
    {
        name: 'Deadly Strike',  
        weak: 10,
        weakTurns: 1,
        weakDamage: 5,
        type: 'deadly'
    },
    {
        name: 'Deadly Strike Plus',
        weak: 1,
        weakTurns: 2,
        weakDamage: 10,
        type: 'deadly'
    },

    // POISONOUS
    {
        name: 'Poisonous',
        attack: 0,
        heal: 0,
        poison: 1,
        poisonTurns: 5,
        poisonDamage: 5,
        healthbarremove: 3,
        type: 'poisonous'
    },
    {
        name: 'Poisonous Plus',
        attack: 0,
        heal: 0,
        poison: 15,
        poisonTurns: 1,
        poisonDamage: 2,
        healthbarremove: 3,
        type: 'poisonous'
    },

    // HEAVEN
    {
        name: 'Heavenly Blessing',
        attack: 5,
        heal: 5,
        attackadd: 5,
        healadd: 5,
        light: 5,
        lightTurns: 5,
        healthbaradd: 5,
        healthbarremove: 5,
        type: 'heaven'
    },
    {
        name: 'Heavenly Wrath',
        attack: 10,
        heal: 10,
        attackadd: 4,
        healadd: 4,
        light: 4,
        lightTurns: 4,
        healthbaradd: 4,
        healthbarremove: 4,
        type: 'heaven'
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
        attackadd: -1,
        healadd: -1,
        type: 'troll'
    },

    // BATSIE
    {
        name: 'Batsie',
        attack: 10,
        heal: 25,
        healthbaradd: 7,
        lock: 3,
        lockTurns: 3,
        blind: 3,
        blindTurns: 3,
        cardremove: 1,
        healthbarremove: 3,
        type: 'batsie'
    },
    
    // FRIKANDELCAT
    {
        name: 'Frikandelcat',
        attack: 10,
        heal: 10,
        healthbaradd: 5,
        healthbarremove: 5,
        lock: 2,
        lockTurns: 2,
        blind: 2,
        blindTurns: 2,
        gamble: true,
        gambleCards: 1,
        type: 'frikandelcat'
    },

    // BOSS
    {
        name: 'Boss Health',
        attack: 15,
        heal: 20,
        healthbaradd: 10,
        healthbarremove: 10,
        type: 'boss'
    },
    {
        name: 'Boss HotCold',
        attack: 15,
        heal: 20,
        burn: 5,
        burnTurns: 1,
        freeze: true,
        type: 'boss'
    },
    {
        name: 'Boss FlipLock',
        attack: 15,
        heal: 20,
        flip: 3,
        flipTurns: 3,
        lock: 3,
        lockTurns: 3,
        type: 'boss'
    },

    // LUCKY
    {
        name: 'Lucky Charm',
        attack: 7,
        heal: 7,
        healadd: 2,
        attackadd: 1,
        morecards: 1,
        light: 1,
        lightTurns: 1,
        poison: 1,
        poisonTurns: 1,
        poisonDamage: 1,
        removecardnummer: 1,
        type: 'lucky'
    },
    {
        name: 'Lucky Chicken',
        attack: 10,
        heal: 10,
        attackadd: 2,
        removecardnummer: 1,
        lock: 1,
        lockTurns: 1,
        weak: 1,
        weakTurns: 1,
        weakDamage: 1,
        healthbaradd: 2,
        type: 'lucky'
    },
    {
        name: 'Lucky Coin',
        attack: 15,
        heal: 15,
        morecards: 2,
        removecardnummer: 1,
        healthbaradd: 10,
        healthbarremove: 1,
        blind: 3,
        blindTurns: 1,
        flip: 1,
        flipTurns: 2,
        type: 'lucky'
    },

    // BONUS
    {
        name: 'Bonus Card',
        attack: 10,
        heal: 10,
        healaddadd: 1,
        type: 'bonus'
    },
    {
        name: 'Bonus Card',
        attack: 10,
        heal: 10,
        attackaddadd: 1,
        type: 'bonus'
    },

    // MIMIC
    {
        name: 'Mimic',
        attack: 20,
        heal: 20,
        blind: 1,
        blindTurns: 1,
        faketype: getRandomCardType(),
        type: 'mimic'
    },
    {
        name: 'Mimic',
        attack: 10,
        heal: 10,
        attackadd: 1,
        healadd: 2,
        faketype: getRandomCardType(),
        type: 'mimic'
    },
    {
        name: 'Mimic',
        attack: 15,
        heal: 15,
        removecardnummer: 1,
        morecards: 1,
        flip: 1,
        flipTurns: 3,
        faketype: getRandomCardType(),
        type: 'mimic'
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

    // RAINBOW
    {
        name: 'Rainbow',
        attack: 15,
        heal: 25,
        healthbaradd: 10,
        healthbarremove: 5,
        healaddadd: 1,
        attackaddadd: 1,
        morecards: 3,
        removecardnummer: 3,
        lock: 3,
        lockTurns: 1,
        burn: 3,
        burnTurns: 1,
        flip: 3,
        flipTurns: 1,
        freeze: true,
        freezeadd: true,
        type: 'rainbow'
    },

    // RANDOM
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),

    // other
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
    getRandomCard(),
]