import { expect } from "chai";
import { title, getHashWithFiveZeros } from "./";

describe(title, function() {
    // Creating hashes is rather slow :(
    this.timeout(0);
    
    describe("Part 1:", function() {
        
        it("should evaluate 'abcdef' as 609043", function() {
            expect(getHashWithFiveZeros("abcdef")).to.eq(609043);
        });

        it("should evaluate 'pqrstuv' as 1048970", function() {
            expect(getHashWithFiveZeros("pqrstuv")).to.eq(1048970);
        });

    });

});
