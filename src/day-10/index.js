import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split, join } from "../helpers";

export const title = "Day 10: Elves Look, Elves Say";

function groupByDigit(sequence) {
    return _.reduce((groups, char) => {
        const digit = parseInt(char, 10);
        const group = _.last(groups);

        if (!group || group[0] !== digit) {
            groups.push([digit]);
            
            return groups;
        }

        group.push(digit);
        
        return groups;
    }, [], sequence);
}

export function lookSay(sequence) {
    const say = (group) => `${group.length}${group[0]}`;
    const combine = (groups) => _.reduce((sequence, group) => sequence + say(group), "", groups);
   
    return _.compose(combine, groupByDigit)(sequence);
}

function nthSequence(n, sequence, i = 0) {
    if (i >= n)
        return sequence;

    return nthSequence(n, lookSay(sequence), i + 1);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the length of the result after 40 times?", nthSequence(40, input).length);
    console.log("What is the length of the result after 50 times?", nthSequence(50, input).length);
}
