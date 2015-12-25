import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 16: Aunt Sue";

export function getMatchPercentage(a, b) {
    const matches = _.map((key) => {
        const val = a[key];
        const otherVal = b[key];

        if (_.isUndefined(otherVal))
            return false;

        if (_.isEqual(val, otherVal))
            return true;
        else
            return null;
    }, _.keys(a));
    
    if (_.includes(null, matches))
        return null;

    if (!matches.length)
        return 0;

    return (_.filter(_.isEqual(true), matches).length / matches.length) * 100;
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    
    console.log("What is the number of the Sue that got you the gift?");
}
