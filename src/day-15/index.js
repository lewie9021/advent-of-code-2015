import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { merge, multiply } from "../helpers";

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
        const properties = sentence.match(/\b[a-z]+/g);
        const values = sentence.match(/\-?\d+/g);
        
        return _.reduce((attributes, property, index) => _.assign(attributes, {
            [property]: parseInt(values[index], 10)
        }), {}, properties);
    }, input);
}

function getScorings(ingredients) {
    const permutations = getPermutations(ingredients.length, 100);
    return _.map((permutation) => {
        const totals =_.map((index) => {
            const quantity = permutation[index];

            return _.mapValues(multiply(quantity), ingredients[index]);
        }, _.range(0, permutation.length));

        return _.mapValues((x) => Math.max(0, x), merge(_.add, ...totals));
    }, permutations);
}

export function getBestRecipeScore(ingredients, calories) {
    const scorings = _.filter((x) => x.calories == (calories || x.calories), getScorings(ingredients));
    
    return _.max(_.map((scoring) => {
        const attributes = _.pick((x, k) => k !== "calories", scoring);

        return _.values(attributes).reduce(multiply);
    }, scorings));
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    const ingredients = parse(input);
    
    console.log("What is the total score of the highest-scoring cookie you can make?", getBestRecipeScore(ingredients));
}
