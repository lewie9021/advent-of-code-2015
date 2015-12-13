import { expect } from "chai";
import { title, isNiceString, isNiceString2 } from "./";

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

    describe("Part 2:", function() {
        
        it("should evaluate 'qjhvhtzxzqqjkmpb' as nice", function() {
            expect(isNiceString2("qjhvhtzxzqqjkmpb")).to.eq(true);
        });

        it("should evaluate 'xxyxx' as nice", function() {
            expect(isNiceString2("xxyxx")).to.eq(true);
        });

        it("should evaluate 'uurcxstgmygtbstg' as naughty", function() {
            expect(isNiceString2("uurcxstgmygtbstg")).to.eq(false);
        });

        it("should evaluate 'ieodomkazucvgmuy' as naughty", function() {
            expect(isNiceString2("ieodomkazucvgmuy")).to.eq(false);
        });

    });

});
