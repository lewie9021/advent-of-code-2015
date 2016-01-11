import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split, remove } from "../helpers";

export const title = "Day 24: It Hangs in the Balance";

export const parse = _.compose(
    _.map(_.parseInt(10)),
    split("\n")
);

export function getPermutations(values, size) {
    let store = {};
    let result = [];

    const findPermutations = (values, partial = []) => {
        if (partial.length >= size) {
            const sorted = _.sortBy(_.identity, partial);

            if (store[sorted])
                return result;

            store[sorted] = true;
            result.push(sorted);
            
	    return result;
        }

        // Pick each value from values.
        _.forEach((index) => {
            getPermutations(remove(values, index), partial.concat(values[index]));
        }, _.range(0, values.length));
        
        return result;
    };

    return findPermutations(values);
}

export function getCombinations(values, target, limit = null) {
    let store = {};
    let result = [];

    const findCombinations = (values, partial = []) => {
        const total = _.sum(partial);
        
        if (total === target) {
            const sorted = _.sortBy(_.identity, partial);

            if (store[sorted])
                return result;

            store[sorted] = true;
            result.push(sorted);
        }

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

export function unique(permutations, sort) {
    let store = {};

    return _.reduce((result, permutation) => {
        const sorted = _.sortBy(_.identity, permutation);

        if (store[sorted])
            return result;

        store[sorted] = true;
        result.push(sort ? sorted : permutation);

        return result;
    }, [], permutations);
}

export function getRanges(blueprint) {
    let sum = 0;

    return _.reduce((result, length) => {
        result.push([sum, sum + length]);
        sum += length;

        return result;
    }, [], blueprint);
}

export const chunkBy = _.curry((blueprint, values, result = []) => {
    if (!blueprint.length)
        return result;
    
    const length = _.first(blueprint);
    const group = values.slice(0, length);
    
    return chunkBy(blueprint.slice(1), values.slice(length), result.concat([group]));
}, 2);

function inRange(a, b, x) {
    return  (x >= a && x <= b);
}

export function getConfigurations(values) {
    // Looking at the example, each group has a sum of exactly one third of the total.
    const target = _.sum(values) / 3;
    // Since we want the least amount of packages, it can't be less than the total / 3.
    const limit = Math.floor(values.length / 3);
    // Get a list of combinations which have sum of 'target'.
    const combinations = getCombinations(values, target, limit);
    
    console.log("combinations.length:", combinations.length);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    const values = parse(input);

    getCombinations(values);
    
    
    console.log("What is the quantum entanglement of the first group of packages in the ideal configuration?");
}
