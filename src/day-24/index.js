import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split, remove } from "../helpers";
import { getCombinations } from "../day-17";

export const title = "Day 24: It Hangs in the Balance";

export const parse = _.compose(
    _.map(_.parseInt(10)),
    split("\n")
);

export function getPermutations(values, size, partial = [], result = []) {
    if (partial.length >= size)
	return result.push(partial);
    
    for (let i = 0; i < values.length; i++) {	
	getPermutations(values, size, partial.concat(values[i]), result);
    }

    return result;
}

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

export function getGroup(blueprint, partial) {
    if (!partial.length)
        return {
            values: [],
            length: 0
        };
    
    let sum = 0;
    
    for (let i = 0; i < blueprint.length; i += 1) {
        const length = blueprint[i];
        
        if (sum + length < partial.length) {
            sum += length;
        } else {
            return {
                values: partial.slice(sum, sum + Math.min(length, partial.length)),
                length
            };
        }
    }
}

export const chunkBy = _.curry((blueprint, values, result = []) => {
    if (!blueprint.length)
        return result;
    
    const length = _.first(blueprint);
    const group = values.slice(0, length);
    
    return chunkBy(blueprint.slice(1), values.slice(length), result.concat([group]));
}, 2);

export function getConfigurations(blueprint, values) {
    const first = _.first(blueprint);
    const findConfigurations = (values, partial = [], result = []) => {
        const target =  (partial.length >= first) ? _.sum(partial.slice(0, first)) : null;
        const group = getGroup(blueprint, partial);
        const total = _.sum(group.values);

        // The target is determined by the sum of the first group.
        // It's null if we are yet to complete the first group.
        if (target) {
            // The group has exceeded the limit. 
            if (total > target)
                return;

            // We completed the group, but failed to hit the target.
            if (group.values.length == group.length && total != target)
                return;
        }

        if (!values.length)
            result.push(partial);
        
        // Pick each value from values.
        _.forEach((index) => {
            findConfigurations(remove(values, index), partial.concat(values[index]), result);
        }, _.range(0, values.length));

        return result;
    };

    return _.compose(
        _.map(chunkBy(blueprint)),
        unique,
        findConfigurations
    )(values);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the quantum entanglement of the first group of packages in the ideal configuration?");
}
