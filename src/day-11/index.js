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
    // Passwords may not contain the letters i, o, or l.
    if (password.match(/i|o|l/))
        return false;

    const charCodes = _.map((l) => l.charCodeAt(0), password);
    
    // Passwords must include one increasing straight of at least three letters.
    const straights = _.filter((straight) => {
        const expected = _.range(straight[0], straight[0] + 3);

        return _.isEqual(straight, expected);
    }, chunks(charCodes, 3));

    if (!straights.length)
        return false;
    
    // Passwords must contain at least two different, non-overlapping pairs of letters.
    const pairs = password.match(/(.)\1/g) || [];
    
    return pairs.length >= 2;
}

export function nextPassword(oldPassword) {
    const increment = (x) => {
        const charMap = {"a": 97, "z": 122};
        const difference = charMap["z"] - charMap["a"] + 1;
        let increment = true;
        
        return _.reduce((codes, l) => {
            const currentCode = l.charCodeAt(0);
            const code = ((currentCode + increment) - charMap["a"]) % difference;
            
            codes.push(code + charMap["a"]);
            increment = (code === 0) && increment;

            return codes;
        }, [], x);
    };
    const toString = (x) => _.reduce((str, l) => str + String.fromCharCode(l), "", x);
    const next = _.compose(toString, reverse, increment, reverse, split(""));

    let newPassword = next(oldPassword);
    
    while (!validate(newPassword)) {
        newPassword = next(newPassword);
    }
    
    return newPassword;
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What should Santa's next password be?", nextPassword(input));
}
