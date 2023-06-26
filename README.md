# BOXING SIM 2.0
Next.js - React Query - TypeScript - Tailwind - Framer Motion - Postgres/Supabase - [Trello](https://trello.com/b/SgfstIJl/box-sim-20)
## Deployed Site:
[https://boxing-sim-2.vercel.app/](https://boxing-sim-2.vercel.app/)

## Table of Contents:
    - Demo
    - Ideas
    - Containers
    - Components
    - Models
    - Controller
    - Services
    - DB (Table relations)

#### Demo of original iteration, from a different repo:
    Version 2.0 will utilise a UI library for a better UX

![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/100096239/182052991-a6f1cf5c-8690-4357-b022-2bcda9c467b6.gif)

## Ideas:
    - Use Socket.io to update in real time? Supabase allows subscriptions?
    - Tailwind UI? Need designs.

## Containers:
Mostly contain stateless data, used to wrap, pass props and update children (Boxers, Fight PBP, etc)

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

## Components:
Render and update inside containers

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
        - created_at: string
        - updated_at: Date | string | timestamp
        - is_user: boolean
        - first_name: string
        - last_name: string
        - nickname: string
        - birthday: number //03161997 = 03-16-1997
        - hometown: string

          // offensive attributes
        - agility: number
        - power: number
        - hand_speed: number
        - accuracy: number
        - aggression: number

          // defensive attributes
        - agility: number
        - footwork: number
        - evasion: number
        - blocking: number
        - reaction: number //higher number, higher % of offensive reaction
          
          // intangible attributes
        - conditioning: number
        - hp: number
        - recovery: number
        - chin: number
        - body: number
        - mental: number
        - awareness: number
        - fight_iq: number

          /* boxer states are psychological thresholds, the lower the threshold,
            the wider range of values will be returned for each boxer action.
             i.e.:
                - Boxer has "power" attribute value = 100, danger_state = 25.
                - In a state of "danger", this person's power will fluctuate random values between a min output of 25 to a max ouput of 100
                - Conditioning will further reduce the total value of this result
                - Conversely, a boxer like Manny Pacquiao who may have { power = 90, danger_state = 90, desperation_state = 90 } may output
                    a consistent level of power over all 12 rounds, save conditioning.
          */
        - danger_state: () =>  
            //calculate parameter for which the boxers attributes change ie
            if (hp < 38% && mental < 50%) { updateBoxer(`power`, power*1.5) }
        - desperation_state: () =>
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
        - retireBoxer //currently "deleteBoxer"
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
        - primary key: uuid
        - created_at: new Date
        - foreign key: Boxer
        - foreign key: Boxer
        - play_by_play: [{}] //Array of Objects, jsonb

    - (TBD) Calendar
        - Day: Int4
