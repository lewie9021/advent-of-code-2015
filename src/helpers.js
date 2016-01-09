import __ from "lodash";
import _ from "lodash-fp";

export const split = _.curry((delimiter, str) => str.split(delimiter));

export const join = _.curry((delimiter, str) => str.join(delimiter));

export const match = _.curry((pattern, str) => str.match(pattern));

export const multiply = _.curry((x, y) => x * y, 2);

export const merge = (f, ...values) => __.merge(...values, f);

export const reverse = (x) => x.reverse();

export const warpValue = (x, max) => ((x % max) + max) % max;

export const remove = (arr, i) => arr.slice(0, i).concat(arr.slice(i + 1));

// A less annoying _.assign function.
export const assign = (...args) => {
    const object = _.last(args);
    const sources = reverse(_.initial(args));

    return __.assign(object, ...sources);
};

export function log(x) {
    console.log(x);

    return x;
}

export const groupBy = _.curryRight(__.groupBy, 2);

// A less annoying _.fill function.
export const fill = _.curry((x, collection) => _.map(_.constant(x), collection));

export const doWhile = _.curry((f, g, x) => {
    let y = f(x);
    
    while (g(y))
        y = f(y);

    return y;
});
