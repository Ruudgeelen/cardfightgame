export function chooseAiCard(cards, playerCards, enemyHealth, playerHealth, enemyMaxHealth, playerMaxHealth) {
    let bestIndex = 0
    let bestScore = -999999

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i]

        let score = 0

        // Normale aanval
        if (card.attack) {
            score += card.attack
        }

        // Heal
        if (card.heal) {
            score += card.heal

            if (enemyHealth < 40) {
                score += card.heal * 2
            }
        }

        // Burn
        if (card.burn) {
            score += card.burn * 3

            // Extra waarde als speler sterke kaarten heeft
            for (let j = 0; j < playerCards.length; j++) {
                if (playerCards[j].attack > 10) {
                    score += 5
                }

                if (playerCards[j].heal > 10) {
                    score += 5
                }
            }
        }

        // Freeze
        if (card.freeze) {
            score += 8

            // Freeze is extra handig tegen sterke kaarten
            for (let j = 0; j < playerCards.length; j++) {
                if (playerCards[j].attack > 10) {
                    score += 5
                }
            }
        }

        // Extra attack
        if (card.attackadd) {
            score += card.attackadd * 2
        }

        // Extra heal
        if (card.healadd) {
            score += card.healadd * 2
        }

        // Maximale HP verhogen
        if (card.healthbaradd) {
            score += 8

            if (enemyHealth < enemyMaxHealth / 2) {
                score += 5
            }
        }

        // Maximale HP van speler verlagen
        if (card.healthbarremove) {
            score += 10
        }

        // Als speler bijna dood is, aanvallen belangrijker maken
        if (playerHealth < 30) {
            if (card.attack) {
                score += card.attack * 2
            }
        }

        // Als AI bijna dood is, verdedigen/healen belangrijker maken
        if (enemyHealth < 30) {
            if (card.heal) {
                score += card.heal * 3
            }

            if (card.healthbaradd) {
                score += 10
            }
        }

        // console.log(card.name, "AI score:", score)

        if (score > bestScore) {
            bestScore = score
            bestIndex = i
        }
    }

    return bestIndex
}