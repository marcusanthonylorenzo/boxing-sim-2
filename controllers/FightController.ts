import { Boxer } from "@prisma/client";
import { FightActionT } from "../containers/FightUpdates";
import { generateRandomValue } from "../services/generateBoxer";

interface DamageOutputT {
    attacker: string,
    damage: number
}

const startRound = () => {
};

// Fighter methods

const attack = (fighter: Boxer) => { //for aggressor
    return generateRandomValue(1, fighter.power)
};

const evade =  (fighter: Boxer) => { //for non-aggressor
    return generateRandomValue(1, fighter.evasion)
};

const counterAttack =  (fighter: Boxer) => { //for 2nd subsequent non-aggressive action
    return generateRandomValue(1, fighter.reaction)
};

const fightersDisengage = () => {
    console.log(`Both Fighters Disengage`) //placeholder
};

/*
    Fight Sequence
*/

const engagement = (boxerOne: Boxer, boxerTwo: Boxer): { attacker: Boxer, defender: Boxer} => {
    let attacker: Boxer;
    let defender: Boxer;

    const boxerOneAggression = generateRandomValue(1, boxerOne.aggression);
    const boxerTwoAggression = generateRandomValue(1, boxerTwo.aggression);
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
    let damageOutput: Array<DamageOutputT | null> = []

    const attackerAction = (attackingBoxer: Boxer, defendingBoxer: Boxer) => {
        const getAttack = attack(attackingBoxer); //aggressor attacks
        damageOutput.push( //update damage 
            {
                attacker: `${attackingBoxer.first_name}`,
                damage: getAttack
            });
        defenderAction(defendingBoxer, attackingBoxer); //defender responds with evade or counter
    };

    const defenderAction = (respondingBoxer: Boxer, attackingBoxer: Boxer) => {
        const respondingBoxerEvades = evade(respondingBoxer)
        const respondingBoxerCounters = counterAttack(respondingBoxer)
        // console.log(`${respondingBoxer.first_name} evade/counter`, respondingBoxerEvades, respondingBoxerCounters)

        if (respondingBoxerEvades > respondingBoxerCounters) {
            fightersDisengage();
            console.log(`end of attack`)
            return;
        } else {
            attackerAction(respondingBoxer, attackingBoxer) //continue to attack back and forth until top condition true
        }
    };

    await attackerAction(attacker, defender);
    return damageOutput;
};


const fight = async (boxerOne: Boxer, boxerTwo: Boxer) => {
    //Check who attacks first
    const { attacker, defender } = await engagement(boxerOne, boxerTwo);
    //Run attack vs defense (evade or counter attack), repeat until fighters disengage
    const damageOutputResult = await exchangeAction(attacker, defender);
    //update Pbp Object, later
    console.log(`damage output results`, damageOutputResult)
    return damageOutputResult;
}

export { startRound, fight }