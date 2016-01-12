import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { multiply, split, remove } from "../helpers";

export const title = "Day 24: It Hangs in the Balance";

export const parse = _.compose(
    _.map(_.parseInt(10)),
    split("\n")
);

export function getCombinations(values, target, limit = null) {
    let result = [];
    
    const findCombinations = (values, partial = []) => {
        const total = _.sum(partial);
        
        if (total === target)
            result.push(partial);

        if (total >= target)
            return result;

        if (limit && partial.length >= limit)
            return result;
        
        // Pick each value from values.
        _.forEach((index) => {
            const value = values[index];
            const rest = values.slice(index + 1);
            
            findCombinations(rest, partial.concat(value));
        }, _.range(0, values.length));
        
        return result;
    };

    return findCombinations(values);
};

export function getQuantumEntanglement(values, groups) {
    // Looking at the example, each group has a sum of exactly one third of the total.
    const target = _.sum(values) / groups;
    // Since we want the least amount of packages, it can't be less than the total / 3.
    const limit = values.length / groups;
    // Get a list of combinations which have sum of 'target'.
    const combinations = getCombinations(values, target, limit);
    // Get the length of the shortest combination.
    const shortest = _.min(_.map(_.get("length"), combinations));

    return _.compose(
        _.min,
        // Get the quantum entanglement (product) of the combination.
        _.map((combination) => _.reduce(multiply, 1, combination)),
        // Filter out combinations that aren't the shortest.
        _.filter((combination) => combination.length == shortest)
    )(combinations);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    const values = parse(input);

    console.log("What is the quantum entanglement of the first group of packages in the ideal configuration (3 groups)?", getQuantumEntanglement(values, 3));
    console.log("What is the quantum entanglement of the first group of packages in the ideal configuration (4 groups)?", getQuantumEntanglement(values, 4));
}
