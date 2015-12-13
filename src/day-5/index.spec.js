import { expect } from "chai";
import { title, isNiceString } from "./";

describe(title, function() {
    
    describe("Part 1:", function() {
        
        it("should evaluate 'ugknbfddgicrmopn' as nice", function() {
            expect(isNiceString("ugknbfddgicrmopn")).to.eq(true);
        });

        it("should evaluate 'aaa' as nice", function() {
            expect(isNiceString("aaa")).to.eq(true);
        });

        it("should evaluate 'jchzalrnumimnmhp' as naughty", function() {
            expect(isNiceString("jchzalrnumimnmhp")).to.eq(false);
        });

        it("should evaluate 'haegwjzuvuyypxyu' as naughty", function() {
            expect(isNiceString("haegwjzuvuyypxyu")).to.eq(false);
        });

        it("should evaluate 'dvszwmarrgswjxmb' as naughty", function() {
            expect(isNiceString("dvszwmarrgswjxmb")).to.eq(false);
        });

    });

});
