import { expect } from "chai";
import { title, parse, getUniquePermutations, getConfigurations } from "./";
import _ from "lodash-fp";

describe(title, function() {

    describe("Part 1:", function() {

        describe("parse", function() {
            
            it("should return a list of numbers", function() {
                const input = ["15", "0", "123", "44", "32"].join("\n");
                const result = parse(input);

                expect(result).to.be.an("array");

                _.forEach((x) => expect(x).to.be.a("number"));
            });

            it("should return [1, 2, 3, 4], given '1\\n2\\n3\\n4'", function() {
                const input = ["1", "2", "3", "4"].join("\n");
                const result = parse(input);
                
                expect(result).to.eql([1, 2, 3, 4]);
            });
            
        });

        describe("getUniquePermutations", function() {
            
            it("should return an array of permutations", function() {
                const result = getUniquePermutations([1, 2, 3, 4, 5], 3);

                expect(result).to.be.an("array");
            });

            it("should return x permutations given [1, 2, 3, 4, 5]", function() {
                const numbers = [1, 2, 3, 4, 5];
                const result = getUniquePermutations(numbers, 3);
                const permutations = [
                    [1, 2, 3],
                    [1, 2, 4],
                    [1, 2, 5],
                    [1, 3, 4],
                    [1, 3, 5],
                    [1, 4, 5],
                    [2, 3, 4],
                    [2, 3, 5],
                    [3, 4, 5]
                ];

                expect(result.length).to.eq(permutations.length);

                _.forEach((permutation) => {
                    const match = _.filter((res) => _.isEqual(res, permutation), result);

                    expect(match.length).to.eq(1);
                }, permutations);
            });

        });
        
        describe("getConfigurations", function() {

            it("should return an array of configurations", function() {
                const result = getConfigurations([1, 2, 3, 4, 5, 6]);

                expect(result).to.be.an("array");
            });

            it("should configuration arrays containing 3 groups", function() {
                const result = getConfigurations([1, 2, 3, 4, 5, 6]);

                expect(result).to.be.an("array");
                
                _.forEach((configuration) => {
                    expect(configuration).to.be.an("array");
                    expect(configuration.length).to.eq(3);

                    _.forEach((group) => {
                        expect(group).to.be.an("array");
                        expect(group.length).to.be.at.least(1);
                    }, configuration);
                }, result);
            });

            it("should only return configurations that contain groups of matching sum", function() {
                const result = getConfigurations([1, 2, 3, 4, 5, 6]);
                const expected = [
                    [[1, 4], [2, 3], [5]],
                    [[1, 4], [3, 2], [5]],
                    [[4, 1], [2, 3], [5]],
                    [[4, 1], [3, 2], [5]]
                ];

                expect(result.length).to.eq(4);
                
                _.forEach((expected) => {
                    const match = _.filter((res) => _.isEqual(res, expected), result);

                    expect(match.length).to.eq(1);
                }, result);
            });

            
        });

    });

});
