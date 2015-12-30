import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 20: Infinite Elves and Infinite Houses";

export function getPresentCounts(target, increment, limit) {
    const max = target / increment;
    
    return _.reduce((houses, multiple) => {
        const count = Math.floor(max / multiple);
        const multiples = _.map((index) => {
            return multiple + (index * multiple);
        }, _.range(0, limit ? Math.min(limit, count) : count));
        
        _.forEach((x) => {
            houses[x] = (houses[x] || 0) + (multiple * increment);
        }, multiples);

        return houses;
    }, {}, _.range(1, max + 1));
}

export function getLowestHouseNumber(target, increment = 10, limit) {
    const counts = getPresentCounts(target, increment, limit);

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
    )(Object.keys(counts)) || null;
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = _.parseInt(10, FS.readFileSync(inputPath, "utf-8").trim());
    
    console.log("Given infinite houses and 10 presents per delivery, what is the lowest house number of the house to get at least as many presents as the number in your puzzle input?", getLowestHouseNumber(input));
    console.log("Given 50 houses and 11 presents per delivery, what is the new lowest house number of the house to get at least as many presents as the number in your puzzle input?", getLowestHouseNumber(input, 11, 50));
}
