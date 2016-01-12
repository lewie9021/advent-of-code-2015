import { uniqueDeep, chunkBy } from "./helpers";

describe("Helpers", function() {

    describe("uniqueDeep", function() {

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
            const result = uniqueDeep(permutations);
            
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
                [5, 3, 2, 4, 1],v
                [5, 4, 1, 2, 3],
                [5, 4, 1, 3, 2]
            ];
            const result = uniqueDeep(permutations, true);
            
            expect(result).to.eql([
                [1, 2, 3, 4, 5]
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

});
