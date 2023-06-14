export interface Boxer {
    id: number | string
    created_at: Date
    updated_at: Date
    is_user: boolean
    first_name?: string
    last_name?: string
    nickname?: string | null
    weightclass?: number
    birthday?: number //03161997 = 03-16-1997
    hometown?: string
    is_champion?: boolean
    wins?: number
    losses?: number
    draws?: number
    ranking?: number | null

    // attributes: {
    //     offensive: {
            agility?: number
            power?: number
            hand_speed?: number
            accuracy?: number
            aggression?: number
        // }
        // defensive: {
            reflex?: number
            footwork?: number
            evasion?: number
            blocking?: number
            reaction?: number //higher number, higher % of offensive reaction
        // }
        // health: {
            conditioning?: number
            hp?: number
            recovery?: number
            chin?: number
            body?: number
            mental?: number
            awareness?: number
            fight_iq?: number
            danger_state?: number
            //calculate parameter for which the boxers attributes change ie
            // if (hp < 38% && mental < 50%) { updateBoxer(`power`, power*1.5) }
            desperation_state?: number
            //same, some fighters are different, some are same
    //     }
    // }
}