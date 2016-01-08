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

export function getConfigurations(weights) {
    return _.compose(
        // First check there are at least 3 groups.
        _.filter((x) => x.length >= 3),
        // Go through each value in weights.
        // Call getCombinations with 'weights' and the current weight value.
        _.map((weight) => getCombinations(weights, weight))
    )(weights);
};

function uniquePermutations(permutations) {
    return _.reduce((result, permutation) => {
        // Check if we already have the permutation.
        // For exampple, we class [1, 2, 3] and [3, 1, 2] as identical.
        if (!_.some((x) => !_.difference(x, permutation).length, result))
            result.push(permutation);

        return result;
    }, [], permutations);
};


export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the quantum entanglement of the first group of packages in the ideal configuration?");
}
