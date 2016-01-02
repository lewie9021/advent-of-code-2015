import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split, match, assign } from "../helpers";

export const title = "Day 22: Wizard Simulator 20XX";

export const parse = _.compose(
    _.zipObject(["health", "damage"]),
    _.map(_.parseInt(10)),
    _.map(_.first),
    _.map(match(/\d+$/)),
    split("\n")
);

export function simulate(spells, player, opponent) {
    // Assign an index to each spell.
    spells = _.map((id) => {
        return assign({id}, spells[id], {});
    }, _.range(0, spells.length));
    // Assign a spent property which will increase on each spell purchase.
    player = assign({spent: 0}, player, {});
    
    const getCombinations = (player, opponent, effects, turn = 0, results = []) => {
        // We die, or run out of mana.
        if (player.health <= 0 || player.mana < 0)
            return results.push({win: false, mana: player.spent});
        
        // We kill the opponent.
        if (opponent.health <= 0)
            return results.push({win: true, mana: player.spent});
        
        // Clone each parameter to prevent unwanted mutations.
        player = _.clone(player);
        opponent = _.clone(opponent);
        effects = _.clone(effects);
        
        // Apply effects, deducting timer values.
        // TODO: It might be best to pull this out into a separate function.
        _.forEach((value, key) => {
            if (value <= 0)
                return;
            
            const spell = spells[key];

            // Attack the opponent.
            if (spell.damage)
                opponent.health -= spell.damage;

            // If the armor is about to wear off, remove it.
            if (spell.armor && value == 1)
                player.armor -= spell.armor;

            // Heal yourself.
            if (spell.health)
                player.health += spell.health;

            // Increase mana.
            if (spell.mana)
                player.mana += spell.mana;

            // Deduct the timer value.
            effects[key] = value - 1;
        }, effects);

        if (turn % 0)
            // Opponent's turn.
            player.health -= opponent.damage;
        else
            // Our turn, select a spell.
            _.compose(
                _.forEach((spell) => {
                    // TODO: We basically cast the spell. Maybe a separate function?
                    const newPlayer = assign({
                        mana: player.mana - spell.cost,
                        spent: player.spent + spell.cost,
                        health: player.health + (!spell.turns && spell.health || 0)
                    }, player, {});
                    const newOpponent = assign({
                        health: opponent.health - (!spell.turns && spell.damage || 0)
                    }, opponent, {});
                    
                    getCombinations(newPlayer, newOpponent, effects, turn + 1, results);
                }),
                // Can't select a spell that's already in effect.
                _.filter(({id}) => !effects[id])
            )(spells);
        
        return results;
    };

    return getCombinations(player, opponent, _.reduce((effects, index) => {
        return assign({[index]: 0}, effects, {});
    }, {}, _.range(0, spells.length)));
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the least amount of mana you can spend and still win the fight?");
}
