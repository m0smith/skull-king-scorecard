export const range = (size) => Array.from(Array(size).keys())

export const PROJECT_NAME = "SkullKingScorecard"
const SCORE_MULTIPLIER = 20;
const PENALTY_MULTIPLIER = -10;

export const computeScore = (round, bid, tricks) => {
    if (typeof round !== 'number' || typeof bid !== 'number' || typeof tricks !== 'number') {
        return null
    }

    if (bid === null || tricks === null || isNaN(bid) || isNaN(tricks)) {
        return null
    }

    if (bid === tricks) {
        return (round + 1) * SCORE_MULTIPLIER;
    } else {
        return Math.abs(bid - tricks) * PENALTY_MULTIPLIER;
    }
}

export function computeSubtotal(playerInfo, round) {
    const rtnval = playerInfo.scores.slice(0, round + 1).reduce((accumulator, currentScore) => {
        const score = computeScore(round, currentScore.bid, currentScore.tricks)
        if (score === null || isNaN(score))
            return accumulator;
        else
            return accumulator + score
    }, 0)
    return rtnval
}