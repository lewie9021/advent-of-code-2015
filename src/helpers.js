import __ from "lodash";
import _ from "lodash-fp";

export function split(delimiter) {
    return _.curry((str) => str.split(delimiter));
}

export function log(x) {
    console.log(x);

    return x;
}

export const groupBy = _.curryRight(__.groupBy, 2);
