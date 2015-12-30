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

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the least amount of gold you can spend and still win the fight?");
}
