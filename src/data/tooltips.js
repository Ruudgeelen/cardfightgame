function effectNames(card) {
    if (Array.isArray(card.effect)) {
        return card.effect.join(', ')
    }

    return card.effect
}

function effectDetails(card, property) {
    if (card[property] && typeof card[property] === 'object') {
        return Object.entries(card[property])
            .map(([effect, value]) => `${effect}: ${value}`)
            .join(', ')
    }

    return card[property]
}

function valueDescription(value, positiveText, negativeText) {
    const number = Number(value)

    if (number < 0) {
        return negativeText(Math.abs(number))
    }

    return positiveText(number)
}

export function cardStatDescription(card, stat) {
    const value = card[stat]

    if (value === undefined || value === null) {
        return ''
    }

    const descriptions = {
        attack: (amount) => valueDescription(
            value,
            (number) => `Deals ${number} damage to the opponent`,
            (number) => `Heals the opponent for ${number}`
        ),
        heal: (amount) => valueDescription(
            value,
            (number) => `Heals you for ${number}`,
            (number) => `Damages you for ${number}`
        ),
        attackadd: () => valueDescription(
            value,
            (number) => `Your cards gain ${number} attack`,
            (number) => `Your cards lose ${number} attack`
        ),
        healadd: () => valueDescription(
            value,
            (number) => `Your cards gain ${number} healing`,
            (number) => `Your cards lose ${number} healing`
        ),
        attackaddadd: () => valueDescription(
            value,
            (number) => `Your cards gain ${number} attack bonus`,
            (number) => `Your cards lose ${number} attack bonus`
        ),
        healaddadd: () => valueDescription(
            value,
            (number) => `Your cards gain ${number} healing bonus`,
            (number) => `Your cards lose ${number} healing bonus`
        ),
        healthbaradd: () => valueDescription(
            value,
            (number) => `Your maximum health increases by ${number}`,
            (number) => `Your maximum health decreases by ${number}`
        ),
        healthbarremove: () => valueDescription(
            value,
            (number) => `Opponent maximum health decreases by ${number}`,
            (number) => `Opponent maximum health increases by ${number}`
        )
    }

    return descriptions[stat]?.() || `${stat}: ${value}`
}

function statTooltip(card, stat) {
    return card[stat] !== undefined
        ? cardStatDescription(card, stat)
        : ''
}

export function cardTooltip(card) {
    const effects = effectNames(card)

    return [
        card.type && `Type: ${card.type}`,
        card.faketype && `Fake type: ${card.faketype}`,
        statTooltip(card, 'attack'),
        statTooltip(card, 'heal'),
        card.freeze && 'Freezes all of your cards until the effect is removed',
        card.freezeadd && 'Makes your cards freeze-capable',
        card.flip && `Flips ${card.flip} random opponent card${card.flip === 1 ? '' : 's'} for ${card.flipTurns} turn${card.flipTurns === 1 ? '' : 's'}. Flipped cards cannot be played`,
        card.burn && `Burns all opponent cards for ${card.burn} damage each turn (${card.burnTurns} turn${card.burnTurns === 1 ? '' : 's'})`,
        card.lock && `Locks ${card.lock} random opponent card${card.lock === 1 ? '' : 's'} for ${card.lockTurns} turn${card.lockTurns === 1 ? '' : 's'}. Locked cards cannot be played`,
        card.blind && `Blinds ${card.blind} random opponent card${card.blind === 1 ? '' : 's'} for ${card.blindTurns} turn${card.blindTurns === 1 ? '' : 's'}. Blinded cards cannot be seen by the person`,
        card.light && `Reveals ${card.light} opponent cards for ${card.lightTurns} turn${card.lightTurns === 1 ? '' : 's'}. Revealed cards can be seen by the person playing the card`,
        card.poison && `Poisons ${card.poison} opponent cards for ${card.poisonDamage} heal each turn (${card.poisonTurns} turn${card.poisonTurns === 1 ? '' : 's'})`,
        card.weak && `Weakens ${card.weak} opponent cards for ${card.weakTurns} turn${card.weakTurns === 1 ? '' : 's'}. Weakened cards deal ${card.weakDamage} less damage each turn`,
        statTooltip(card, 'attackadd'),
        statTooltip(card, 'healadd'),
        statTooltip(card, 'attackaddadd'),
        statTooltip(card, 'healaddadd'),
        card.removecardnummer && `Removes ${card.removecardnummer} opponent card${card.removecardnummer === 1 ? '' : 's'}`,
        card.morecards && `Draws ${card.morecards} extra card${card.morecards === 1 ? '' : 's'}`,
        statTooltip(card, 'healthbaradd'),
        statTooltip(card, 'healthbarremove'),
        card.shield && `Protects ${card.shield} random cards from all card effects forever`,
        card.stapel && `Deck effect: ${card.stapel}`,
        card.gambleCards && `Makes ${card.gambleCards} random card${card.gambleCards === 1 ? '' : 's'} gamble`,
        effects && `Effects: ${effects}`,
        statTooltip(card, 'steal') && `Steals ${card.steal} random card${card.steal === 1 ? '' : 's'} from the opponent`,
        effectDetails(card, 'effectturnsmap') && `Effect durations: ${effectDetails(card, 'effectturnsmap')}`,
        effectDetails(card, 'effectvalues') && `Effect powers: ${effectDetails(card, 'effectvalues')}`
    ].filter(Boolean).join('\n')
}

export function cardTooltiphide(card) {
    const effects = effectNames(card)

    return [
        card.faketype ? `Type: ${card.faketype}` : `Type: ${card.type}`,
        effects && `Effects: ${effects}`,
        effectDetails(card, 'effectturnsmap') && `Effect durations: ${effectDetails(card, 'effectturnsmap')}`,
        effectDetails(card, 'effectvalues') && `Effect powers: ${effectDetails(card, 'effectvalues')}`
    ].filter(Boolean).join('\n')
}