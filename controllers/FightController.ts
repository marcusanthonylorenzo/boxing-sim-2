import { Boxer } from "@prisma/client";
import { FightActionT } from "../containers/FightUpdates";

const startRound = () => {
};

// Fighter methods

const attack = async (fighter: Boxer) => { //for aggressor
};

const evade = async (fighter: Boxer) => { //for non-aggressor
};

// const defense = async (fighter: Boxer) => { //for 1st subsequent non-aggressive action
// };

const counterAttack = async (fighter: Boxer) => { //for 2nd subsequent non-aggressive action
};

const fightersDisengage = () => {

};

/*
Fight Sequence
*/

const engagement = (boxerOne: Boxer, boxerTwo: Boxer): { attacker: Boxer, defender: Boxer} => {

    let attacker: Boxer;
    let defender: Boxer;

    const boxerOneAggression = boxerOne.aggression;
        const boxerTwoAggression = boxerTwo.aggression;
        if (boxerOneAggression > boxerTwoAggression) {
            attacker = boxerOne;
            defender = boxerTwo;
        } else {
            attacker = boxerTwo;
            defender = boxerOne;
        }

    return { attacker, defender }
};

const exchangeAction = async (attacker: Boxer, defender: Boxer) => {

    const attackerAction = (attackingBoxer: Boxer, defendingBoxer: Boxer) => {
        const getAttack = attack(attackingBoxer);
        const getDefense = defenderAction(defendingBoxer, attackingBoxer);
        
        console.log(`attackerAction`, `attack: ${attackingBoxer.first_name} ${getAttack}`)
        console.log(`defenderAction`, `defense: ${defendingBoxer.first_name} ${getDefense}`)
    };

    const defenderAction = (respondingBoxer: Boxer, attackingBoxer: Boxer) => {
        const respondingBoxerEvades = evade(respondingBoxer)
        const respondingBoxerCounters = counterAttack(respondingBoxer)

        if (respondingBoxerEvades > respondingBoxerCounters) {
            fightersDisengage();
        } else {
            attackerAction(respondingBoxer, attackingBoxer)
        }
    };

    await attackerAction(attacker, defender);
};


const fight = async (boxerOne: Boxer, boxerTwo: Boxer) => {
    const { attacker, defender } = await engagement(boxerOne, boxerTwo);
    await exchangeAction(attacker, defender);
}

// const updateFightHistory = () => {
    
// }

export { startRound, fight }