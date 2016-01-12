import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split, match } from "../helpers";

export const title = "Day 25: Let It Snow";

export const parse = _.compose(
    _.map(_.parseInt(10)),
    _.map(_.first),
    _.map(match(/\d+$/)),
    split("\n")
);

export function getCodeAt(targetX, targetY) {
    const findCode = (value, height, x, y) => {
        if (x == targetX && y == targetY)
            return value;

        const nextValue = (value * 252533) % 33554393;
        
        if (y > 1)
            return findCode(nextValue, height, x + 1, y - 1);
        
        return findCode(nextValue, height + 1, 1, height + 1);
    };

    return findCode(20151125, 1, 1, 1);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What code do you give the machine?");
}
