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

export function getPermutations(values, size, partial = [], result = []) {
    if (partial.length >= size)
	return result.push(partial);
    
    for (let i = 0; i < values.length; i++) {	
	getPermutations(values, size, partial.concat(values[i]), result);
    }

    return result;
}

export function uniquePermutations(permutations) {
    return _.reduce((result, permutation) => {
        const sorted = _.sortBy(_.identity, permutation);
        const identical = _.compose(_.isEqual(sorted), _.sortBy(_.identity));
        
        // Check if we already have the permutation.
        // For exampple, we class [1, 2, 3] and [3, 1, 2] as identical.
        if (!_.some(identical, result))
            result.push(sorted);

        return result;
    }, [], permutations);
};

export function getConfigurations() {

}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the quantum entanglement of the first group of packages in the ideal configuration?");
}
