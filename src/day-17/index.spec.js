import { expect } from "chai";
import { title, getCombinations } from "./";
import _ from "lodash-fp";

describe(title, function() {

    describe("Part 1:", function() {

        describe("getCombinations", function() {

            it("should return an empty array if list is empty", function() {
                const result = getCombinations([], 5);

                expect(result).to.eql([]);
            });

            it("should return one combination given [5] and 5", function() {
                const result = getCombinations([5], 5);

                expect(result).to.eql([[5]]);
            });

            it("should return two combinations given [2, 3] and 5", function() {
                const result = getCombinations([2, 3], 5);

                expect(result).to.eql([[2, 3]]);
            });

            it("should return four combinations given [20, 15, 10, 5, 5] and 25", function() {
                const result = getCombinations([20, 15, 10, 5, 5], 25);
                const combinations = {
                    1: [
                        [15, 10],
                        [15, 5, 5]
                    ],
                    2: [
                        [20, 5]
                    ]
                };
                
                _.map((count) => {
                    _.map((expected) => {
                        const matches = _.filter(_.isEqual(expected), result);
                        
                        expect(matches.length).to.eq(count);
                    }, combinations[count]);
                }, _.map(_.parseInt(10), Object.keys(combinations)));
            });
            
        });

    });

});
