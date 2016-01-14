# Advent of Code

[Advent of Code](http://adventofcode.com) is a series of programming challenges with a new one released each day of December up until the 25th.

I saw Advent of Code as a great opportunity to exercise some of the functional programming concepts I've been recently learning about. Originally, my plan was to simply familarise myself with the [Lodash](https://lodash.com/) library. Digging deeper, I found a [sub-project](https://github.com/lodash/lodash-fp) which curried each function and reversed the order of the parameters, pushing the data value to the end.

By applying these two factors, functions could be composed together in a much more natural way. It also opened the door for [point-free programming](https://en.wikipedia.org/wiki/Tacit_programming) too, where functions are somewhat oblivious to the data they are passed. For instance, given the input string from [day 21](http://adventofcode.com/day/21), I could compose the following function to parse it into a more useful format:

```javascript
import _ from "lodash-fp";

// A couple of helpers that make String.match and String.split more composable.
const match = _.curry((pattern, str) => str.match(pattern));
const split = _.curry((delimiter, str) => str.split(delimiter));

// Our point-free function. Notice the functions we use never refer to the
// data that with will flow through the chain. Having functions like 'split'
// and 'match' can make composing new functions like LEGO.
// Note: We read compose declarations bottom-to-top.
const parse = _.compose(
    // Our numerical values will be strings, so we parse them in base 10.
    _.map(_.parseInt(10)),
    // For each line, we want to extract the numeric value.
    _.map(match(/\d+/)),
    // Split the string by new lines.
    split("\n")
);

const input = `Hit Points: 109
               Damage: 8
               Armor: 2`;

parse(input); // [109, 8, 2]
```
