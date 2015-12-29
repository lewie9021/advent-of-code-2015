import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { multiply } from "../helpers";

export const title = "Day 20: Infinite Elves and Infinite Houses";

export function getPresentCount(houseNumber) {
    return _.compose(
        _.sum,
        _.map(multiply(10)),
        _.filter((x) => houseNumber % x == 0),
        _.range(1)
    )(houseNumber + 1);
}

export function getLowestHouseNumber(target) {
    const firstMatch = (target, index = 0) => {
        if (getPresentCount(index) >= target)
            return index;

        return firstMatch(target, index + 1);
    };
    const index = firstMatch(target);

    return _.compose(
        _.get("house"),
        _.first,
        _.sortByAll(["presents", "house"]),
        _.filter(({presents}) => presents >= target),
        _.map((count) => ({
            house: index + count,
            presents: getPresentCount(index + count)
        }))
    )(_.range(0, 3));
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the lowest house number of the house to get at least as many presents as the number in your puzzle input?");
}
