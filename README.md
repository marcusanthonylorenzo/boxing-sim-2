# BOXING SIM 2.0
Next.js - React Query - TypeScript - Tailwind - Postgres/Supabase

## Ideas:
    - Use Socket.io to update in real time? Supabase allows subscriptions?
    - Tailwind UI? Need designs.

## Containers: Mostly contain stateless data, used to wrap, pass props and update children (Boxers, Fight PBP, etc)
    - Start { CreateBoxer }
    - InGame { Navbar, Home | Arena, BoxerCard x2 }
        - GET User
        - Navbar { Ticker, Calendar }
        - Home { Navbar, Dialogue, BoxersList, Training }
        - Arena { Navbar, Dialogue, CoachesCorner }
        - Dialogue
            - import services/commentary { all }
        - CoachesCorner
            - import services/coaches { coaches.coachesCorner }
        - Training
            - import services/coaches { coaches.training }
        - BoxersList
            - GET Boxers

## Components: Render and update inside containers
    - BoxerCard { boxer, BoxerHealth }
    - BoxerHealth { boxer }
    - Calendar
        - GET or listen for Calendar
    - Ticker
    - TrainingModule
    - CreateBoxer

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
                - awareness: number
                - fightIQ: number
                - dangerState: () => 
                    //calculate parameter for which the boxers attributes change ie
                    if (hp < 38% && mental < 50%) { updateBoxer(`power`, power*1.5) }
                - desperationState: () =>
                    //same, some fighters are different, some are same

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
        - engagement
        - exchange

    - commentary: object {}
        - prefight
        - playByPlay
        - dangerState
        - desperationState
        - TKO
        - KO
        - judgesDecision

    - coaches: object {} 
        - training
        - coachesCorner


# DB
    - Boxer
        - to Fight History

    - Fight History
        - foreign key: Boxer
        - foreign key: Boxer
