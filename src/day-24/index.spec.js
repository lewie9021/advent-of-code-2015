import { expect } from "chai";
import { title, parse, getPermutations, uniquePermutations, getConfigurations } from "./";
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

        describe("getPermutations", function() {

            it("should return an array of permutations", function() {
                const result = getPermutations([1, 2, 3], 3);

                expect(result).to.be.an("array");
            });

            it("should return permutations of length 'size'", function() {
                const size = 3;
                const result = getPermutations([1, 2, 3], size);

                _.forEach((permutation) => {
                    expect(permutation).to.be.an("array");
                    expect(permutation.length).to.eq(size);
                }, result);
            });

            it("should return 9 permutations, given [1, 2, 3] and 2", function() {
                const result = getPermutations([1, 2, 3], 2);
                const expected = [
                    [1, 1],
                    [1, 2],
                    [1, 3],
                    
                    [2, 1],
                    [2, 2],
                    [2, 3],
                    
                    [3, 1],
                    [3, 2],
                    [3, 3]
                ];

                expect(result.length).to.eq(expected.length);
                
                _.forEach((expected) => {
                    const match = _.filter(_.isEqual(expected), result);

                    expect(match.length).to.eq(1);
                }, result);
            });

            it("should return 27 permutations, given [1, 2, 3] and 3", function() {
                const result = getPermutations([1, 2, 3], 3);
                const expected = [
                    [1, 1, 1],
                    [1, 1, 2],
                    [1, 1, 3],
                    [1, 2, 1],
                    [1, 2, 2],
                    [1, 2, 3],
                    [1, 3, 1],
                    [1, 3, 2],
                    [1, 3, 3],
                    
                    [2, 1, 1],
                    [2, 1, 2],
                    [2, 1, 3],
                    [2, 2, 1],
                    [2, 2, 2],
                    [2, 2, 3],
                    [2, 3, 1],
                    [2, 3, 2],
                    [2, 3, 3],
                    
                    [3, 1, 1],
                    [3, 1, 2],
                    [3, 1, 3],
                    [3, 2, 1],
                    [3, 2, 2],
                    [3, 2, 3],
                    [3, 3, 1],
                    [3, 3, 2],
                    [3, 3, 3]
                ];

                expect(result.length).to.eq(expected.length);
                
                _.forEach((expected) => {
                    const match = _.filter(_.isEqual(expected), result);

                    expect(match.length).to.eq(1);
                }, result);
            });

            it("should return 64 permutations, given [1, 2, 3, 4] and 3", function() {
                const result = getPermutations([1, 2, 3, 4], 3);

                expect(result.length).to.eq(4 * 4 * 4);
            });
            
            it("should return 1296 permutations, given [1, 2, 3, 4, 5, 6] and 4", function() {
                const result = getPermutations([1, 2, 3, 4, 5, 6], 4);

                expect(result.length).to.eq(6 * 6 * 6 * 6);
            });

            it("should return 1000 permutations, given [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] and 3", function() {
                const result = getPermutations([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);

                expect(result.length).to.eq(10 * 10 * 10);
            });
            
        });

        describe("uniquePermutations", function() {

            it("should return 6 permutations given getPermutations([1, 2, 3], 2)", function() {
                const permutations = getPermutations([1, 2, 3], 2);
                const result = uniquePermutations(permutations);
                const expected = [
                    [1, 1],
                    [1, 2],
                    [1, 3],
                    
                    [2, 2],
                    [2, 3],
                    
                    [3, 3]
                ];

                expect(result.length).to.eq(expected.length);
                
                _.forEach((expected) => {
                    const match = _.filter(_.isEqual(expected), result);

                    expect(match.length).to.eq(1);
                }, result);
            });

            it("should return 10 permutations given getPermutations([1, 2, 3], 3)", function() {
                const permutations = getPermutations([1, 2, 3], 3);
                const result = uniquePermutations(permutations);
                const expected = [
                    [1, 1, 1],
                    [1, 1, 2],
                    [1, 1, 3],
                    [1, 2, 2],
                    [1, 2, 3],
                    [1, 3, 3],
                    
                    [2, 2, 2],
                    [2, 2, 3],
                    [2, 3, 3],
                    
                    [3, 3, 3]
                ];
                
                expect(result.length).to.eq(expected.length);

                _.forEach((expected) => {
                    const match = _.filter(_.isEqual(expected), result);

                    expect(match.length).to.eq(1);
                }, result);
            });
            
        });
        
        xdescribe("getConfigurations", function() {

            it("should work", function() {
                
            });
            
        });

    });

});
