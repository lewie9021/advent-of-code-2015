import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { reverse } from "../helpers";

export const title = "Day 16: Aunt Sue";

export function parse(input) {
    return _.map((line) => {
        const sentence = line.replace("Sue", "index");
        const properties = sentence.match(/[a-z]+/g);
        const values = sentence.match(/\d+/g);

        return _.reduce((attributes, property, index) => _.assign(attributes, {
            [property]: parseInt(values[index], 10)
        }), {}, properties);
    }, input);
}

export function getMatchScore(subject, sample) {
    const matches = _.map((key) => {
        const a = subject[key];
        const b = sample[key];

        if (_.isUndefined(b))
            return false;

        return (_.isEqual(a, b)) ? true : null;
    }, _.keys(subject));
    
    if (_.includes(null, matches))
        return null;

    if (!matches.length)
        return 0;

    return (_.filter(_.isEqual(true), matches).length / matches.length) * 100;
}

export function getMatchScoreV2(subject, sample) {
    const matches = _.map((key) => {
        const a = subject[key];
        const b = sample[key];

        if (_.isUndefined(b))
            return false;

        if (_.includes(key, ["cats", "trees"]) && _.gt(a, b))
            return true;

        if (_.includes(key, ["pomeranians", "goldfish"]) && _.lt(a, b))
            return true;
        
        return _.isEqual(a, b) ? true : null;
    }, _.keys(subject));
    
    if (_.includes(null, matches))
        return null;

    if (!matches.length)
        return 0;

    return (_.filter(_.isEqual(true), matches).length / matches.length) * 100;
}

export function analysisMachine(matcher, input, subject) {
    const isNull = _.compose(_.isEqual(null), _.get("score"));
    const matches = _.map((sample) => ({
        index: sample.index,
        score: matcher(subject, sample)
    }), parse(input));

    return reverse(_.sortBy("score", _.filter(_.negate(isNull), matches)));
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    const matches = analysisMachine(getMatchScore, input, {
        children: 3,
        cats: 7,
        samoyeds: 2,
        pomeranians: 3,
        akitas: 0,
        vizslas: 0,
        goldfish: 5,
        trees: 3,
        cars: 2,
        perfumes: 1
    });

    console.log("What is the number of the Sue that got you the gift?", _.get("index", _.first(matches)));
}
