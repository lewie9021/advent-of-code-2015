import { expect } from "chai";
import { title, getHashWithZeros } from "./";

describe(title, function() {
    // Creating hashes is rather slow :(
    this.timeout(0);
    
    describe("Part 1:", function() {
        
        it("should evaluate 'abcdef' as 609043", function() {
            expect(getHashWithZeros("abcdef", 5)).to.eq(609043);
        });

        it("should evaluate 'pqrstuv' as 1048970", function() {
            expect(getHashWithZeros("pqrstuv", 5)).to.eq(1048970);
        });

    });

    describe("Part 2:", function() {
        
        it("should evaluate 'abcdef' as 6742839", function() {
            expect(getHashWithZeros("abcdef", 6)).to.eq(6742839);
        });

        it("should evaluate 'pqrstuv' as 5714438", function() {
            expect(getHashWithZeros("pqrstuv", 6)).to.eq(5714438);
        });
        
    });

});
