import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 11: Corporate Policy";

export function validate(password) {
    
}

export function nextPassword(oldPassword) {
    
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What should Santa's next password be?");
}
