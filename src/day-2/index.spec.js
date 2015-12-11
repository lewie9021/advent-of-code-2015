import { expect } from "chai";
import { title, getWrappingFootage, getRibbonFootage } from "./";

describe(title, function() {

    describe("Part 1:", function() {
    
        it("should evaluate '2x3x4' as 58 square feet of wrapping", function() {
            expect(getWrappingFootage("2x3x4")).to.eq(58);
        });

        it("should evaluate '1x1x10' as 43 square feet of wrapping", function() {
            expect(getWrappingFootage("1x1x10")).to.eq(43);
        });

    });

    describe("Part 2:", function() {
    
        it("should evaluate '2x3x4' as 34 feet of ribbon", function() {
            expect(getRibbonFootage("2x3x4")).to.eq(34);
        });

        it("should evaluate '1x1x10' as 14 feet of ribbon", function() {
            expect(getRibbonFootage("1x1x10")).to.eq(14);
        });

    });

});
