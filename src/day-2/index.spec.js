import { expect } from "chai";
import { title, getSquareFootage } from "./";

describe.only(title, function() {

    describe("Part 1:", function() {
    
        it("should evaluate '2x3x4' as 58 square feet", function() {
            expect(getSquareFootage("2x3x4")).to.eq(58);
        });

        it("should evaluate '1x1x10' as 43 square feet", function() {
            expect(getSquareFootage("1x1x10")).to.eq(43);
        });

    });

});
