import { expect } from "chai";
import { title, getCodeAt } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        describe("getCodeAt", function() {

            it("should return 20151125, given x: 1, y: 1", function() {
                const result = getCodeAt(1, 1);

                expect(result).to.eq(20151125);
            });

            it("should return 31916031, given x: 1, y: 2", function() {
                const result = getCodeAt(1, 2);

                expect(result).to.eq(31916031);
            });

            it("should return 18749137, given x: 2, y: 1", function() {
                const result = getCodeAt(1, 2);

                expect(result).to.eq(18749137);
            });

            it("should return 1601130, given x: 3, y: 3", function() {
                const result = getCodeAt(1, 2);

                expect(result).to.eq(1601130);
            });

            it("should return 28094349, given x: 3, y: 5", function() {
                const result = getCodeAt(1, 2);

                expect(result).to.eq(28094349);
            });

        });

    });

});
