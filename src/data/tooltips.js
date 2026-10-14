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

export function cardTooltip(card) {
    const effects = effectNames(card)

    return [
        card.type && `Type: ${card.type}`,
        card.attack && `Attack on the enemy: ${card.attack}`,
        card.heal && `Heal your health: ${card.heal}`,
        card.freeze && 'Freeze your own cards',
        card.burn && `Burn the opponent cards: ${card.burn} (for ${card.burnTurns} turns)`,
        card.attackadd && `Attack add to all your cards: ${card.attackadd}`,
        card.healadd && `Heal add to all your cards: ${card.healadd}`,
        card.removecardnummer && `Remove cards of the opponent: ${card.removecardnummer}`,
        card.morecards && `Give more cards to yourself: ${card.morecards}`,
        card.healthbaradd && `Add health to your healthbar: ${card.healthbaradd}`,
        card.healthbarremove && `Remove health from the opponent healthbar: ${card.healthbarremove}`,
        card.stapel && `Stapel: ${card.stapel}`,
        card.gamble && `Maakt ${card.gambleCards || 3} kaarten gamble`,
        effects && `Effects: ${effects}`,
        effectDetails(card, 'effectturnsmap') && `Effect durations: ${effectDetails(card, 'effectturnsmap')}`,
        effectDetails(card, 'effectvalues') && `Effect powers: ${effectDetails(card, 'effectvalues')}`
    ].filter(Boolean).join('\n')
}

export function cardTooltiphide(card) {
    const effects = effectNames(card)

    return [
        card.type && `Type: ${card.type}`,
        effects && `Effects: ${effects}`,
        effectDetails(card, 'effectturnsmap') && `Effect durations: ${effectDetails(card, 'effectturnsmap')}`,
        effectDetails(card, 'effectvalues') && `Effect powers: ${effectDetails(card, 'effectvalues')}`
    ].filter(Boolean).join('\n')
}