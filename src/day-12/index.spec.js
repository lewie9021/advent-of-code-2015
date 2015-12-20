import _ from "lodash-fp";
import { expect } from "chai";
import { title, total } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        it(`should evaluate '[]' and '{}' as 0`, function() {
            expect(total([])).to.eq(0);
            expect(total({})).to.eq(0);
        });

        it(`should evaluate '[1,2,3]' and '{a: 2, b: 4}' as 6`, function() {
            expect(total([1,2,3])).to.eq(6);
            expect(total({a: 2, b: 4})).to.eq(6);
        });

        it("should evaluate '[[[3]]]' and '{a: {b: 4}, c: -1}' as 3", function() {
            expect(total([[[3]]])).to.eq(3);
            expect(total({a: {b: 4}, c: -1})).to.eq(3);
        });

        it(`should evaluate '[-1 ,{a: 1}]' and '{a: [-1, 1]}' as 0`, function() {
            expect(total({a: [-1, 1]})).to.eq(0);
            expect(total([-1 ,{a: 1}])).to.eq(0);
        });

        it(`should evaluate '{a: {b: [1, 2, 3], c: {d: [3, 2, 1]}}}' as 12`, function() {
            expect(total({a: {b: [1, 2, 3], c: {d: [3, 2, 1]}}})).to.eq(12);
        });

        it(`should evaluate '{a: "hello", b: "world"}' as 0`, function() {
            expect(total({a: "hello", b: "world"})).to.eq(0);
        });
        
        it(`should evaluate '{a: "hello", b: [1, "world", 3]}' as 4`, function() {
            expect(total({a: "hello", b: [1, "world", 3]})).to.eq(4);
        });

    });

    describe("Part 2:", function() {

        before(function() {
            this.customizer = function(node) {
                if (_.isPlainObject(node))
                    return !_.includes("red", node);
                
                return true;
            };
        });

        it(`should evaluate '[1, 2, 3]' as 6`, function() {
            expect(total([1, 2, 3], this.customizer)).to.eq(6);
        });

        it(`should evaluate '[1, {c: "red", b: 2}, 3]' as 4`, function() {
            expect(total([1, {c: "red", b: 2}, 3], this.customizer)).to.eq(4);
        });

        it(`should evaluate '{d: "red", e: [1, 2, 3, 4], f: 5}' as 0`, function() {
            expect(total({d: "red", e: [1, 2, 3, 4], f: 5}, this.customizer)).to.eq(0);
        });

        it(`should evaluate '[1, "red", 5]' as 6`, function() {
            expect(total([1, "red", 5], this.customizer)).to.eq(6);
        });

    });

});
