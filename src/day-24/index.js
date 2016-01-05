import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split } from "../helpers";

export const title = "Day 24: It Hangs in the Balance";

export const parse = _.compose(
    _.map(_.parseInt(10)),
    split("\n")
);

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the quantum entanglement of the first group of packages in the ideal configuration?");
}
