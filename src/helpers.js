import __ from "lodash";
import _ from "lodash-fp";

export const split = _.curry((delimiter, str) => str.split(delimiter));

export function log(x) {
    console.log(x);

    return x;
}

export const groupBy = _.curryRight(__.groupBy, 2);

// A less annoying _.fill function.
export const fill = _.curry((x, arr) => _.map(() => x, arr));

export const doWhile = _.curry((f, g, x) => {
    let y = f(x);
    
    while (g(y))
        y = f(y);

    return y;
});
