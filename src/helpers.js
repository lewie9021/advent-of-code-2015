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

export const chunkBy = _.curry((blueprint, values, result = []) => {
    if (!blueprint.length)
        return result;
    
    const length = _.first(blueprint);
    const group = values.slice(0, length);
    
    return chunkBy(blueprint.slice(1), values.slice(length), result.concat([group]));
}, 2);

export const inRange = _.curry((a, b, x) => x >= a && x <= b);

// Takes a two-dimensional array of arrays and returns only the ones that are unique.
export const uniqueDeep = _.curry((sort, arrays) => {
    let store = {};

    return _.reduce((result, array) => {
        const sorted = _.sortBy(_.identity, array);

        if (store[sorted])
            return result;

        store[sorted] = true;
        result.push(sort ? sorted : array);

        return result;
    }, [], arrays);
});

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
