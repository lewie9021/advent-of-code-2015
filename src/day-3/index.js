import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split } from "../helpers";

export const title = "Day 3: Perfectly Spherical Houses in a Vacuum";

function navigate(directions) {
    return _.reduce((tracking, [xx, yy]) => {
        const {x, y} = tracking;

        tracking.x += xx;
        tracking.y += yy;

        tracking.houses[`${x + xx}-${y + yy}`] = null;

        return tracking;
    }, {x: 0, y: 0, houses: {"0-0": null}}, directions);
}

const direction = {
    ">": [1, 0],
    "<": [-1, 0],
    "v": [0, 1],
    "^": [0, -1]
};

export function getDeliveredHouses(instructions) {
    const parse = _.compose(_.map((x) => direction[x]), split(""));
    const total = _.compose(_.get("length"), Object.keys, _.get("houses"));
    const deliver = _.compose(total, navigate, parse);

    return deliver(instructions);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("How many houses receive at least one present?", getDeliveredHouses(input));
}
