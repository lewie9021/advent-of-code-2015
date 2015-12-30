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

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the least amount of gold you can spend and still win the fight?");
}
