import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split } from "../helpers";

export const title = "Day 21: RPG Simulator 20XX";

export function parse(input) {
    const [health, damage, armor] = _.compose(
        _.map(_.parseInt(10)),
        _.map((line) => line.match(/\d+/)),
        split("\n")
    )(input);

    return {
        health,
        damage,
        armor
    };
}

export function simulate(player, opponent) {
    const turns = (x, y) => Math.ceil(y.health / Math.max(1, x.damage - y.armor));

    return turns(player, opponent) <= turns(opponent, player);
}

export function getPermutations(blueprint, partial = [], result = []) {
    if (!blueprint.length)
        result.push(partial);

    _.map((value) => {
        getPermutations(blueprint.slice(1), partial.concat(value), result);
    }, _.range(0, _.first(blueprint) + 1));
    
    return result;
}

export function getLeastGoldAndWin({weapons, armor, rings}, {health}, opponent) {
    const slots = [weapons, armor, rings, rings];
    
    return _.compose(
        _.get("cost"),
        _.first,
        _.sortBy("cost"),
        // Filter only the loadouts that won.
        _.filter(_.get("win")),
        // Simulate each loadout.
        _.map((player) => ({
            win: simulate(player, opponent),
            cost: player.cost
        })),
        // Add the health value to complete the player stats.
        _.map(_.assign({health})),
        // Calculate the total cost, damage, and armor of the loadout.
        _.map(_.reduce((stats, {cost, damage, armor}) => {
            return {
                cost: stats.cost + cost,
                damage: stats.damage + damage,
                armor: stats.armor + armor
            };
        }, {cost: 0, damage: 0, armor: 0})),
        // Remove the null values.
        _.map(_.compact),
        // Convert the indexes to either null (didn't purchase) or the shop item object.
        _.map((indexes) => {
            return _.map((count) => {
                const index = indexes[count] - 1;

                if (index < 0)
                    return null;

                return slots[count][index];
            }, _.range(0, indexes.length));
        }),
        // We want to remove loadouts that are invalid.
        // Each value relates to an index mapping to each slots entry.
        // A value of 0 means we don't purchase it.
        // - Weapon isn't optional.
        // - Can't buy duplicate items (rings).
        // We accept that purchasing no rings valid, not a duplicate.
        _.filter(([w, a, r1, r2]) => w && (!r1 && !r2 || r1 != r2)),
        // Get a two-dimensional array of item loadouts.
        getPermutations,
        // Convert the slots array to their length values.
        _.map(_.get("length"))
    )(slots);
}    

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const shopPath = Path.join(__dirname, "shop.json");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    const shop = JSON.parse(FS.readFileSync(shopPath, "utf-8"));
    const opponent = parse(input);

    console.log("What is the least amount of gold you can spend and still win the fight?", getLeastGoldAndWin(shop, {health: 100}, opponent));
}
