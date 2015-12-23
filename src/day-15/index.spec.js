import _ from "lodash-fp";
import { expect } from "chai";
import { title, getPermutations } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        describe("getPermutations", function() {

            before(function() {
                function factorial(x) {
                    if (x == 0)
                        return x;

                    if (x == 1)
                        return 1;

                    return x * factorial(x - 1);
                }
                
                // (n + k − 1)! / (n! * (k - 1)!)
                this.calculate = (bins, balls) => {
                    const top = factorial(balls + bins - 1);
                    const bottom = factorial(balls) * factorial(bins - 1);
                    
                    return top / bottom;
                };
            });

            it("should return a 2d array containing an array of zeros if no balls are passed", function() {
                const result = getPermutations(4, 0);

                expect(result).to.eql([[0, 0, 0, 0]]);
            });

            it("should return an empty array if no bins are passed", function() {
                const result = getPermutations(0, 4);

                expect(result).to.eql([]);
            });

            it("should return '[[balls]]' if only one bin is passed", function() {
                const result = getPermutations(1, 4);

                expect(result).to.eql([[4]]);
            });

            it("should return 5 permutations given 2 bins, 4 balls", function() {
                const result = getPermutations(2, 4);
                const total = this.calculate(2, 4);
                const permutations = [
                    [0, 4],
                    [4, 0],
                    [3, 1],
                    [1, 3],
                    [2, 2]
                ];

                expect(result.length).to.eq(total);

                _.forEach((expected) => {
                    const match = result.filter((res) => _.isEqual(res, expected));

                    expect(match.length).to.eq(1);
                }, permutations);
            });

            it("should return 21 permutations given 3 bins, 5 balls", function() {
                const result = getPermutations(3, 5);
                const total = this.calculate(3, 5);
                const permutations = [
                    [5, 0, 0],
                    [4, 1, 0],
                    [4, 0, 1],
                    [3, 2, 0],
                    [3, 1, 1],
                    [3, 0, 2],
                    [2, 3, 0],
                    [2, 2, 1],
                    [2, 1, 2],
                    [2, 0, 3],
                    [1, 4, 0],
                    [1, 3, 1],
                    [1, 2, 2],
                    [1, 1, 3],
                    [1, 0, 4],
                    [0, 5, 0],
                    [0, 4, 1],
                    [0, 3, 2],
                    [0, 2, 3],
                    [0, 1, 4],
                    [0, 0, 5]
                ];

                expect(result.length).to.eq(total);

                _.forEach((expected) => {
                    const match = _.filter((res) => _.isEqual(res, expected), result);

                    expect(match.length).to.eq(1);
                }, permutations);
            });
            
        });

    });

});
