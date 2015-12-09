import FS from "fs";
import Path from "path";

export const title = "Day 1: Not Quite Lisp";

function FloorCalculator() {
    
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const instructions = FS.readFileSync(inputPath, "utf-8");
    
    console.log("To what floor do the instructions take Santa?", FloorCalculator(instructions));
}

export default FloorCalculator;
