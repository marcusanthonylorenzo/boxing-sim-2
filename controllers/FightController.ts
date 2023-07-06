import { Boxer } from "@prisma/client";
import { FightActionT } from "../containers/FightUpdates";
import { generateRandomValue } from "../services/generateBoxer";

interface DamageOutputT {
    attacker: string,
    defender: string,
    damage: number
}

// const startRound = () => {
// };

// Fighter methods

const attack = (fighter: Boxer) => { //for aggressor
    return generateRandomValue(0, fighter.power + fighter.accuracy)*Math.round(fighter.hand_speed/100)
};

const evade =  (fighter: Boxer) => { //for non-aggressor
    return generateRandomValue(0, fighter.evasion)*Math.round(fighter.reflex/100)
};

const counterAttack =  (fighter: Boxer) => { //for 2nd subsequent non-aggressive action
    return generateRandomValue(0, fighter.reaction)*Math.round(fighter.accuracy/100)
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

    const boxerOneAggression = generateRandomValue(0, boxerOne.aggression);
    const boxerTwoAggression = generateRandomValue(0, boxerTwo.aggression);
    console.log(`aggression`, boxerOne.first_name, boxerOneAggression, boxerTwo.first_name, boxerTwoAggression)

        if (boxerOneAggression > boxerTwoAggression) {
            attacker = boxerOne;
            defender = boxerTwo;
        } else {
            attacker = boxerTwo;
            defender = boxerOne;
        }
    return { attacker, defender }
};

const exchangeAction = async (
    //  attacker: Boxer, defender: Boxer
    boxerOne: Boxer, boxerTwo: Boxer
) => {
    const { attacker, defender } = await engagement(boxerOne, boxerTwo);
    let damageOutput: Array<DamageOutputT | null> = []

    const attackerAction = (attackingBoxer: Boxer, defendingBoxer: Boxer) => {

        const getAttack = () => {
            const attackValue: number = attack(attackingBoxer) - evade(defendingBoxer);
            return attackValue
        };

        const getAttackRes = getAttack(); //aggressor attacks
        damageOutput.push( //update damage 
            {
                attacker: `${attackingBoxer.first_name}`,
                defender: `${defendingBoxer.first_name}`,
                damage: getAttackRes
            });
        defenderAction(defendingBoxer, attackingBoxer); //defender responds with evade or counter
    };

    const defenderAction = (respondingBoxer: Boxer, attackingBoxer: Boxer) => {
        const respondingBoxerEvades = evade(respondingBoxer)
        const respondingBoxerCounters = counterAttack(respondingBoxer)

        if (respondingBoxerEvades > respondingBoxerCounters) {
            fightersDisengage();
            console.log(`end of attack`)
            return;
        } else {
            attackerAction(respondingBoxer, attackingBoxer) //continue to atack back and forth until top condition truet
        }
    };
    await attackerAction(attacker, defender);
    return damageOutput;
};


const fight = async (boxerOne: Boxer, boxerTwo: Boxer) => {
    //Check who attacks first
    // const { attacker, defender } = await engagement(boxerOne, boxerTwo);
    //Run attack vs defense (evade or counter attack), repeat until fighters disengage
    const damageOutputResult = await exchangeAction(boxerOne, boxerTwo);
    //update Pbp Object, later
    // console.log(`damage output results`, damageOutputResult)
    return damageOutputResult;
}

export { fight }