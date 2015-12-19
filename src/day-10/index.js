import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split, join } from "../helpers";

export const title = "Day 10: Elves Look, Elves Say";

function groupByDigit(sequence) {
    return _.reduce((groups, char) => {
        const digit = parseInt(char, 10);
        const group = _.last(groups);

        if (!group || group[0] !== digit)
            return groups.concat([[digit]]);

        groups[groups.length - 1] = group.concat(digit);
        
        return groups;
    }, [], sequence);
}

export function lookSay(sequence) {
    const say = (group) => `${group.length}${group[0]}`;
   
    return _.compose(_.parseInt(10), join(""), _.map(say), groupByDigit, (x) => x.toString())(sequence);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the length of the result?");
}
