import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 17: No Such Thing as Too Much";

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    
    console.log("Filling all containers entirely, how many different combinations of containers can exactly fit all 150 liters of eggnog?");
}
