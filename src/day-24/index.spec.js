import { expect } from "chai";
import { title, parse, getPermutations, unique, getRanges, chunkBy, getConfigurations } from "./";
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

        describe("unique", function() {

            it("should return 6 permutations given getPermutations([1, 2, 3], 2)", function() {
                const permutations = getPermutations([1, 2, 3], 2);
                const result = unique(permutations);
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
                const result = unique(permutations);
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

            it("should return 1 permutation given identical permutations", function() {
                const permutations = [
                    [5, 1, 4, 2, 3],
                    [5, 1, 4, 3, 2],
                    [5, 2, 3, 1, 4],
                    [5, 2, 3, 4, 1],
                    [5, 3, 2, 1, 4],
                    [5, 3, 2, 4, 1],
                    [5, 4, 1, 2, 3],
                    [5, 4, 1, 3, 2]
                ];
                const result = unique(permutations);
                
                expect(result).to.eql([
                    [5, 1, 4, 2, 3]
                ]);
            });

            it("should return sorted permutations if 'sort' is true", function() {
                const permutations = [
                    [5, 1, 4, 2, 3],
                    [5, 1, 4, 3, 2],
                    [5, 2, 3, 1, 4],
                    [5, 2, 3, 4, 1],
                    [5, 3, 2, 1, 4],
                    [5, 3, 2, 4, 1],
                    [5, 4, 1, 2, 3],
                    [5, 4, 1, 3, 2]
                ];
                const result = unique(permutations, true);
                
                expect(result).to.eql([
                    [1, 2, 3, 4, 5]
                ]);
            });
            
        });

        describe("getRanges", function() {
            
            it("should return [[0, 1], [1, 3], [3, 6]], given [1, 2, 3]", function() {
                const result = getRanges([1, 2, 3]);

                expect(result).to.eql([
                    [0, 1], [1, 3], [3, 6]
                ]);
            });

            it("should return [[0, 2], [2, 5], [5, 9]], given [2, 3, 4]", function() {
                const result = getRanges([2, 3, 4]);

                expect(result).to.eql([
                    [0, 2], [2, 5], [5, 9]
                ]);
            });
            
        });
        

        describe("chunkBy", function() {

            it("should return [[1], [2], [3]], given [1, 1, 1] and [1, 2, 3]", function() {
                const result = chunkBy([1, 1, 1], [1, 2, 3]);

                expect(result).to.eql([[1], [2], [3]]);
            });

            it("should return [[5], [4, 1], [2, 3]], given [1, 2, 2] and [5, 4, 1, 2, 3]", function() {
                const result = chunkBy([1, 2, 2], [5, 4, 1, 2, 3]);

                expect(result).to.eql([[5], [4, 1], [2, 3]]);
            });

            it("should return [[1, 2, 3], [4, 5]], given [3, 2] and [1, 2, 3, 4, 5]", function() {
                const result = chunkBy([3, 2], [1, 2, 3, 4, 5]);

                expect(result).to.eql([[1, 2, 3], [4, 5]]);
            });
            
        });
        
        describe("getConfigurations", function() {

            it("should return 4 configurations, given [1, 2, 2] and [1, 2, 3, 4, 5]", function() {
                const values = [1, 2, 3, 4, 5];
                const blueprint = [1, 2, 2];
                const result = getConfigurations(blueprint, values);

                expect(result).to.eql([
                    [[5], [1, 4], [2, 3]]
                ]);
            });
            
        });

    });

});
