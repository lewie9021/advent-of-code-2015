import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split } from "../helpers";
import { getCombinations } from "../day-17";

export const title = "Day 24: It Hangs in the Balance";

export const parse = _.compose(
    _.map(_.parseInt(10)),
    split("\n")
);

function getPermutations(values, size, partial = [], result = []) {
    if (partial.length >= size)
	return result.push(partial);
    
    for (let i = 0; i < values.length; i++) {	
	getPermutations(values, size, partial.concat(values[i]), result);
    }

    return result;
}

function uniquePermutations(configuration) {
    const permutations = getPermutations(_.range(0, configuration.length), 3);

    return _.compose(
        _.reduce((result, permutation) => {
            // Check if we already have the permutation.
            // For exampple, we class [1, 2, 3] and [3, 1, 2] as identical.
            if (!_.some((x) => !_.difference(x, permutation).length, result))
                result.push(permutation);

            return result;
        }, []),
        _.filter((x) => _.unique(x).length == 3)
    )(permutations);
};

export function getConfigurations(weights) {
    const uniqueWeights = _.compose(_.unique, _.flatten);
    
    return _.compose(
        // Filter out groups that don't use all the weights or contain duplicates.
        _.filter((group) => {
            return uniqueWeights(group).length == weights.length;
        }),
        // Remove the addition level of nesting caused by the triple map.
        _.flatten,
        // We want groups of 3 combintations with the same sum.
        _.map((configuration) => {
            return _.map((permutation) => {
                return _.map((index) => configuration[index], permutation);
            }, uniquePermutations(configuration));
        }),
        // Check there are at least 3 groups.
        _.filter((x) => x.length >= 3),
        // Get a list of weight combinations that equal the value of each 'weight'.
        _.map((weight) => getCombinations(weights, weight))
    )(weights);
};

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the quantum entanglement of the first group of packages in the ideal configuration?");
}
