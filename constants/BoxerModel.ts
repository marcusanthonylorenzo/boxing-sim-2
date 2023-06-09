export interface Boxer {
    id: number
    createdAt: string
    updatedAt: Date | string
    isUser: boolean
    name: string
    birthday: number //03161997 = 03-16-1997
    hometown: string
    isChampion: boolean
    wins: number
    losses: number
    draws: number
    ranking: number

    attributes: {
        offensive: {
            agility: number
            power: number
            handSpeed: number
            accuracy: number
            aggression: number
        }
        defensive: {
            agility: number
            footwork: number
            evasion: number
            blocking: number
            reaction: number //higher number, higher % of offensive reaction
        }
        health: {
            conditioning: number
            hp: number
            recovery: number
            chin: number
            body: number
            mental: number
            awareness: number
            fightIQ: number
            dangerState: () => void
            //calculate parameter for which the boxers attributes change ie
            // if (hp < 38% && mental < 50%) { updateBoxer(`power`, power*1.5) }
            desperationState: () => void
            //same, some fighters are different, some are same
        }
    }
}