import __ from "lodash";
import _ from "lodash-fp";

export const split = _.curry((delimiter, str) => str.split(delimiter));

export function log(x) {
    console.log(x);

    return x;
}

export const groupBy = _.curryRight(__.groupBy, 2);

export const doWhile = _.curry((f, g, x) => {
    let y = f(x);
    
    while (g(y))
        y = f(y);

    return y;
});
