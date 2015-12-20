import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { join, split, reverse } from "../helpers";

export const title = "Day 11: Corporate Policy";

function chunks(collection, size = 0) {
    const counter = _.range(0, collection.length - (size - 1));

    return _.reduce((chunks, index) => {
        chunks.push(collection.slice(index, index + size));
        
        return chunks;
    }, [], counter);
}

export function validate(password) {
    const charCodes = _.map((l) => l.charCodeAt(0), password);
    
    // Passwords must include one increasing straight of at least three letters.
    const straights = _.filter((straight) => {
        const expected = _.range(straight[0], straight[0] + 3);

        return _.isEqual(straight, expected);
    }, chunks(charCodes, 3));

    // Passwords may not contain the letters i, o, or l.
    const blacklist = ["i", "o", "l"];
    const getMatches = _.curry((list, string) => _.filter((x) => _.includes(x, string), list));
    const blacklistLetters = _.compose(_.gte(1), _.get("length"), getMatches(blacklist));

    // Passwords must contain at least two different, non-overlapping pairs of letters.
    const pairs = _.filter(([a, b]) => a === b, chunks(charCodes, 2));

    return straights.length >= 1 && !blacklistLetters(password) && pairs.length >= 2;
}

export function nextPassword(oldPassword) {
    const increment = (x) => {
        const charMap = {"a": 97, "z": 122};
        const difference = charMap["z"] - charMap["a"];
        let increment = false;
        
        return _.reduce((codes, l) => {
            const currentCode = l.charCodeAt(0);
            const code = (increment + currentCode - charMap["a"]) % difference;
            
            codes.push(code + charMap["a"]);
            increment = (currentCode == charMap["z"]);

            return codes;
        }, [], x);
    };
    const toString = (x) => _.reduce((str, l) => str + String.fromCharCode(l), "", x);
    const next = _.compose(toString, reverse, increment, reverse, split(""));
    
    return next(oldPassword);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What should Santa's next password be?");
}
