import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "";

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("");
}
