# BOXING SIM 2.0
Next.js - Tailwind - Postgres/Supabase

## Models:
- Boxer
    - id: number
    - createdAt: string
    - updatedAt: Date | string | timestamp
    - isUser: boolean
    - name: string
    - birthday: number //03161997 = 03-16-1997
    - hometown: string
    - attributes: object{}
        - offensive:  object{}
            - agility: number
            - power: number
            - handSpeed: number
            - accuracy: number
            - aggression: number
        - defensive: object {}
            - agility: number
            - footwork: number
            - evasion: number
            - blocking: number
            - reaction: number //higher number, higher % of offensive reaction
        - health: object {}
            - conditioning: number
            - hp: number
            - recovery: number
            - chin: number
            - body: number
            - mental: number

    - isChampion: boolean
    - wins: number
    - losses: number
    - draws: number
    - ranking: number

- Calendar
    - id: number //use for different careers
    - week: number //each progression is a week

## Controller:
    - User
        - createUser
        - updateUser
    - Boxer
        - createBoxer
        - updateBoxer
        - retireBoxer
    - Calendar
        - createCalendar
        - updateCalendar
    - Organization
        - updateRanking
        - createJudges
    - Fight
        - createFight
        - startIntros
        - startFight
        - startRound
        - judgeScoreRound
        - endRound
        - endFight
        - judgeScoreFight
        - judgesDecision
        - updateBoxers
            - updateUser
            - updateBoxer

## Services:
    - fightEngine
        - 
