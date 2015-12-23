import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 15: Science for Hungry People";

// https://en.wikipedia.org/wiki/Stars_and_bars_(combinatorics).
export function getPermutations(bins, balls) {
    if (!balls)
        return [_.times(_.constant(0), bins)];
    
    if (!bins)
        return [];

    if (bins == 1)
        return [[balls]];

    // Reduce the total number of bins so the individual values increase.
    const prepend = _.map((permutation) => [0, ...permutation], getPermutations(bins - 1, balls));

    // Reduce the total number of balls by one so we can increment the first value of each permutation.
    const increment = _.map(([first, ...rest]) => [first + 1, ...rest], getPermutations(bins, balls - 1));
    
    return prepend.concat(increment);
};

export function parse(input) {
    return _.map((sentence) => {
        const [name] = sentence.match(/\w+/);
        const properties = sentence.match(/\b[a-z]+/g);
        const values = sentence.match(/\-?\d+/g);
        const attributes = _.reduce((attributes, property, index) => {
            return _.assign(attributes, {[property]: parseInt(values[index], 10)});
        }, {}, properties);

        return _.assign(attributes, {name});
    }, input);
}

export function getBestRecipe(ingredients) {
    
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the total score of the highest-scoring cookie you can make?");
}
