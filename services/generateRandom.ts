import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

const generateRandomValue = (minimum?: number, maximum?: number) => {
    const min = minimum === undefined ? 0 : minimum
    const max = maximum === undefined ? 100: maximum
    return Math.round(Math.random() * (max! - min!) + min!)
}

const generateRandomBoxer = (isUserToggle?: boolean) => {

    console.log(`generateRandom`, isUserToggle)

    const getHometown = `${faker.location.city()}, ${faker.location.state()}, ${faker.location.country()}`
    const newBoxerLinearAttributes = {
        id: uuidv4(),
        created_at: new Date,
        updated_at: new Date,
        is_user: isUserToggle ? isUserToggle: false,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        nickname: faker.company.catchPhrase(),
        weightclass: generateRandomValue(105, 315),
        birthday: generateRandomValue(), //03161997 = 03-16-1997
        hometown: getHometown,
        is_champion: false,
        wins: generateRandomValue(0, 35),
        losses: generateRandomValue(0, 20),
        draws: generateRandomValue(0, 6),
        ranking: 0,

                agility: generateRandomValue(),
                power: generateRandomValue(),
                hand_speed: generateRandomValue(),
                accuracy: generateRandomValue(),
                aggression: generateRandomValue(),
 
                reflex: generateRandomValue(),
                footwork: generateRandomValue(),
                evasion: generateRandomValue(),
                blocking: generateRandomValue(),
                reaction: generateRandomValue(), //higher generateRandomValue(),, higher % of offensive reaction
      
                conditioning: generateRandomValue(),
                hp: generateRandomValue(),
                recovery: generateRandomValue(),
                chin: generateRandomValue(),
                body: generateRandomValue(),
                mental: generateRandomValue(),
                awareness: generateRandomValue(),
                fight_iq: generateRandomValue(),
                danger_state: generateRandomValue(),
                //calculate parameter for which the boxers attributes change ie
                // if (hp < 38% && mental < 50%) { updateBoxer(`power`, power*1.5) }
                desperation_state: generateRandomValue(),
          
    }
    // const newBoxerCasadingAttributes = {
    //     id: generateRandomValue(),
    //     created_at: new Date, updated_at: new Date,
    //     isUser: false,
    //     first_name: faker.person.first_name(),
    //     last_name: faker.person.last_name(),
    //     nickname: faker.company.catchPhrase(),
    //     birthday: generateRandomValue(), //03161997 = 03-16-1997
    //     hometown: getHometown,
    //     isChampion: false,
    //     wins: generateRandomValue(0, 35),
    //     losses: generateRandomValue(0, 25),
    //     draws: generateRandomValue(0, 6),
    //     ranking: 0,

    //     attributes: {
    //         offensive: {
    //             agility: generateRandomValue(),
    //             power: generateRandomValue(),
    //             handSpeed: generateRandomValue(),
    //             accuracy: generateRandomValue(),
    //             aggression: generateRandomValue(),
    //         },
    //         defensive: {
    //             reflex: generateRandomValue(),
    //             footwork: generateRandomValue(),
    //             evasion: generateRandomValue(),
    //             blocking: generateRandomValue(),
    //             reaction: generateRandomValue(), //higher generateRandomValue(),, higher % of offensive reaction
    //         },
    //         health: {
    //             conditioning: generateRandomValue(),
    //             hp: generateRandomValue(),
    //             recovery: generateRandomValue(),
    //             chin: generateRandomValue(),
    //             body: generateRandomValue(),
    //             mental: generateRandomValue(),
    //             awareness: generateRandomValue(),
    //             fightIQ: generateRandomValue(),
    //             dangerState: generateRandomValue(),
    //             //calculate parameter for which the boxers attributes change ie
    //             // if (hp < 38% && mental < 50%) { updateBoxer(`power`, power*1.5) }
    //             desperationState: generateRandomValue(),
    //         },
    //     }
    // }

    return newBoxerLinearAttributes
}

export { generateRandomValue, generateRandomBoxer }

