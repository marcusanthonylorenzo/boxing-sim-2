import { Boxer } from "@prisma/client";
import { FightActionT } from "../containers/FightUpdates";

const startRound = () => {
};

// Fighter methods

const attack = async (fighter: Boxer) => { //for aggressor
    
};

const evade = async (fighter: Boxer) => { //for non-aggressor
};

const counterAttack = async (fighter: Boxer) => { //for 2nd subsequent non-aggressive action
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
        //update Pbp Object!
    };

    const defenderAction = (respondingBoxer: Boxer, attackingBoxer: Boxer) => {
        const respondingBoxerEvades = evade(respondingBoxer)
        const respondingBoxerCounters = counterAttack(respondingBoxer)

        if (respondingBoxerEvades > respondingBoxerCounters) {
            return fightersDisengage();
        } else {
            attackerAction(respondingBoxer, attackingBoxer)
        }
    };

    await attackerAction(attacker, defender);
    //return PBP object
};


const fight = async (boxerOne: Boxer, boxerTwo: Boxer) => {
    //Check who attacks first
    const { attacker, defender } = await engagement(boxerOne, boxerTwo);
    //Run attack vs defense (evade or counter attack), repeat until fighters disengage
    await exchangeAction(attacker, defender);
    //update Pbp Object, later
}

export { startRound, fight }