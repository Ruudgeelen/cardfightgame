export function cardTooltip(card) {
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
        card.effect && `Effect: ${card.effect}`,
        card.effectturns && `Effect duration: ${card.effectturns} turns`,
        card.effectvalue && `EffectPower: ${card.effectvalue}`
    ].filter(Boolean).join('\n')
}

export function cardTooltiphide(card) {
    return [
        card.type && `Type: ${card.type}`,
        card.effect && `Effect: ${card.effect}`,
        card.effectturns && `Effect duration: ${card.effectturns} turns`,
        card.effectvalue && `EffectPower: ${card.effectvalue}`
    ].filter(Boolean).join('\n')
}