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

// Returns a new effects object.
// Note: Applies side-effects to the player an opponent objects.
// TODO: return new effects, player and opponent objects.
function applyEffects(effects, spells, player, opponent) {
    return _.compose(
        _.forEach((counter, key) => {
            const spell = spells[key];
            
            // Attack the opponent.
            if (spell.damage)
                opponent.health -= spell.damage;

            // If the armor is about to wear off, remove it.
            if (spell.armor && !counter)
                player.armor -= spell.armor;

            // Increase health.
            if (spell.health)
                player.health += spell.health;

            // Increase mana.
            if (spell.mana)
                player.mana += spell.mana;
        }),
        _.mapValues(_.add(-1)),
        _.pick(_.gt(0))
    )(effects);
}

const castSpell = _.curry((player, opponent, effects, spell) => {
    const {mana, spent, armor, health} = player;
    const {id, cost, turns} = spell;

    return {
        player: {
            mana: mana - cost,
            spent: spent + cost,
            armor: armor + (spell.armor || 0),
            health: health + (!turns && spell.health || 0)
        },
        opponent: {
            health: opponent.health - (!turns && spell.damage || 0),
            damage: opponent.damage
        },
        effects: assign({[id]: turns}, effects, {})
    };
});

export function getLeastManaAndWin(spells, player, opponent) {
    // Assign an index to each spell.
    spells = _.map((id) => {
        return assign({id}, spells[id], {});
    }, _.range(0, spells.length));
    // Assign a spent property which will increase on each spell purchase.
    player = assign({spent: 0, armor: 0}, player, {});

    let score = Infinity;
    const simulate = (player, opponent, effects, turn = 0) => {
        // If we haven't won / lost and spent more than our current best. Don't carry on.
        // This removes the case where we may never die, but never kill the opponent -.-
        if (player.spent >= score)
            return score;
        
        // Clone each parameter to prevent accidental mutations.
        player = _.clone(player);
        opponent = _.clone(opponent);

        // Apply effects, deducting timer values.
        effects = applyEffects(effects, spells, player, opponent);

        // We die, or run out of mana.
        if (player.health <= 0 || player.mana < 0)
            return score;
            
        // We killed the opponent.
        if (opponent.health <= 0)
            return score = player.spent;

        // Opponent's turn.
        if (turn % 2) {
            // Note: the opponent's attack must always deal at least 1 damage.
            const health = player.health - Math.max(1, opponent.damage - player.armor);
            
            return simulate(assign({health}, player, {}), opponent, effects, turn + 1);
        }
        
        // Our turn, select a spell.
        return _.compose(
            _.min,
            _.map(({player, opponent, effects}) => {
                // Progress the game with the casted spell.
                return simulate(player, opponent, effects, turn + 1);
            }),
            // Each spell we cast, we want to return the new state of
            // the player, opponent, and effects.
            _.map(castSpell(player, opponent, effects)),
            // Can't select a spell that's already in effect.
            _.filter(({id}) => !effects[id])
        )(spells);
    };

    return simulate(player, opponent, _.reduce((effects, index) => {
        return assign({[index]: 0}, effects, {});
    }, {}, _.range(0, spells.length)));
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const spellsPath = Path.join(__dirname, "spells.json");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    const spells = JSON.parse(FS.readFileSync(spellsPath, "utf-8"));
    const opponent = parse(input);
    const player = {
        health: 50,
        mana: 500
    };
    
    console.log("What is the least amount of mana you can spend and still win the fight?", getLeastManaAndWin(spells, player, opponent));
}
