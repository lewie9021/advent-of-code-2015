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

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What code do you give the machine?");
}
