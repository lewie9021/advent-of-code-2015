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

export function getMatchPercentage(subject, sample) {
    const matches = _.map((key) => {
        const a = subject[key];
        const b = sample[key];

        if (_.isUndefined(b))
            return false;

        if (_.isEqual(a, b))
            return true;
        else
            return null;
    }, _.keys(subject));
    
    if (_.includes(null, matches))
        return null;

    if (!matches.length)
        return 0;

    return (_.filter(_.isEqual(true), matches).length / matches.length) * 100;
}

export function analysisMachine(input, subject) {
    const isNull = _.compose(_.isEqual(null), _.get("score"));
    const matches = _.map((sample) => ({
        index: sample.index,
        score: getMatchPercentage(subject, sample)
    }), parse(input));

    return reverse(_.sortBy("score", _.filter(_.negate(isNull), matches)));
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");

    console.log("What is the number of the Sue that got you the gift?");
}
