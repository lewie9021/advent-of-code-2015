import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { log } from "../helpers";

export const title = "Day 20: Infinite Elves and Infinite Houses";

export function getPresentCounts(target) {
    const max = target / 10;
    
    return _.reduce((houses, multiple) => {
        const multiples = _.map((index) => {
            return multiple + (index * multiple);
        }, _.range(0, Math.floor(max / multiple)));
        
        _.forEach((x) => {
            houses[x] = (houses[x] || 0) + (multiple * 10);
        }, multiples);

        return houses;
    }, {}, _.range(1, max + 1));
}

export function getLowestHouseNumber(target) {
    const counts = getPresentCounts(target);

    return _.compose(
        _.get("house"),
        _.first,
        _.sortByAll(["house", "presents"]),
        _.filter(({presents}) => presents >= target),
        _.map((index) => {
            const key = parseInt(index, 10);
            
            return  {
                house: key,
                presents: counts[key]
            };
        })
    )(Object.keys(counts));
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = _.parseInt(10, FS.readFileSync(inputPath, "utf-8").trim());
    
    console.log("What is the lowest house number of the house to get at least as many presents as the number in your puzzle input?", getLowestHouseNumber(input));
}
