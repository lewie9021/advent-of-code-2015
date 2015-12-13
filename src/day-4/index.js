import FS from "fs";
import Path from "path";
import Crypto from "crypto";
import _ from "lodash-fp";
import { doWhile } from "../helpers";

export const title = "Day 4: The Ideal Stocking Stuffer";

function md5(value) {
    return Crypto
        .createHash("md5")
        .update(value)
        .digest("hex");
}

// Requires tail-end recursion. It exceeds the max call stack way too soon.
function findHashIndex(key, i) {
    const hash = md5(`${key}${i}`);

    if (hash.indexOf("00000") == 0)
        return i;

    return findHashIndex(key, i + 1);
}

export function getHashWithZeros(key, zeros) {
    const calculateNextHash = ({key, index}) => ({
        index: index + 1,
        hash: md5(`${key}${index + 1}`),
        key
    });

    const matcher = _.repeat(zeros, "0");
    const getHashIndex = _.compose(_.get("index"), doWhile(calculateNextHash, (x) => x.hash.indexOf(matcher) != 0));

    return getHashIndex({index: -1, key});
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("Find the hash which, in hexadecimal, start with at least five zeroes?", getHashWithZeros(input, 5));
    console.log("Find the hash which, in hexadecimal, start with at least six zeroes?", getHashWithZeros(input, 6));
}
