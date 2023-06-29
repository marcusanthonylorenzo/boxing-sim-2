import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

const generateRandomValue = (minimum?: number, maximum?: number) => {
    const min = minimum === undefined ? 0 : minimum
    const max = maximum === undefined ? 100: maximum
    return Math.round(Math.random() * (max! - min!) + min!)
}

const generateBoxer = (isUserToggle?: boolean, customAttributes?: any) => {
    const {
        first_name, last_name, nickname, hometown, homestate, country, weightclass, 
    } = customAttributes;

    // const getHometown = `${faker.location.city()}, ${faker.location.state()}, ${faker.location.country()}`
    const newBoxerLinearAttributes = {
        id: uuidv4(),
        created_at: new Date,
        updated_at: new Date,
        is_user: isUserToggle ? isUserToggle: false,
        first_name: !first_name || first_name.length <= 1 ? faker.person.firstName() : first_name,
        last_name: !last_name || last_name.length <= 1 ? faker.person.lastName(): last_name,
        nickname: !nickname || nickname.length <= 1 ? faker.company.catchPhrase() : nickname,
        weightclass: !weightclass || weightclass < 105 ? generateRandomValue(105, 315) : weightclass,
        birthday: generateRandomValue(), //03161997 = 03-16-1997
        hometown: !hometown || hometown.length <= 1 ? faker.location.city() : hometown,
        homestate: !homestate || homestate.length <= 1 ? faker.location.state() : homestate,
        country: !country || country.length <= 1 ? faker.location.country() : country,
        is_champion: false,
        wins: generateRandomValue(0, 40),
        losses: generateRandomValue(0, 20),
        draws: generateRandomValue(0, 4),
        ranking: 0, //build logic later

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
    return newBoxerLinearAttributes
}

export { generateRandomValue, generateBoxer }

