import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split, match } from "../helpers";

export const title = "Day 25: Let It Snow";

export const parse = _.compose(
    _.map(_.parseInt(10)),
    match(/\d+/g)
);

export function getCodeAt(targetX, targetY) {
    let value = 20151125;
    let height = 1;
    let x = 1;
    let y = 1;

    while (x != targetX || y != targetY) {
        // Find the next value.
        value = (value * 252533) % 33554393;

        if (y == 1) {
            // Height is used to determine the value of
            // 'y' when we are forced to wrap.
            height += 1;
            
            // Reset the x and y position. This time,
            // we start at the next y down.
            x = 1;
            y = height;
        } else {
            // Modify the x and y to create a diagonal effect.
            x += 1;
            y -= 1;
        }
    }

    return value;
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    const [targetY, targetX] = parse(input);

    console.log("What code do you give the machine?", getCodeAt(targetX, targetY));
}
