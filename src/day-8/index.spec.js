import { expect } from "chai";
import { title, charactersInCode, charactersInMemory, charactersEscapedInMemory } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        describe("charactersInCode", function() {
        
            it(`should evaluate '""' as 2 characters`, function() {
                expect(charactersInCode("\"\"")).to.eq(2);
            });

            it(`should evaluate '"abc"' as 5 characters`, function() {
                expect(charactersInCode("\"abc\"")).to.eq(5);
            });

            it(`should evaluate '"aaa\\"aaa"' as 10 characters`, function() {
                expect(charactersInCode("\"aaa\\\"aaa\"")).to.eq(10);
            });

            it(`should evaluate '"\\x27"' as 6 characters`, function() {
                expect(charactersInCode("\"\\x27\"")).to.eq(6);
            });

        });

        describe("charactersInMemory", function() {
        
            it(`should evaluate '""' as 0 characters`, function() {
                expect(charactersInMemory("\"\"")).to.eq(0);
            });

            it(`should evaluate '"abc"' as 3 characters`, function() {
               expect(charactersInMemory("\"abc\"")).to.eq(3); 
            });

            it(`should evaluate '"aaa\\"aaa"' as 7 characters`, function() {
                expect(charactersInMemory("\"aaa\\\"aaa\"")).to.eq(7);
            });

            it(`should evaluate '"\\x27"' as 1 character`, function() {
                expect(charactersInMemory("\"\\x27\"")).to.eq(1);
            });

            it(`should evaulate '"\""' as 1 character`, function() {
                expect(charactersInMemory("\"\"\"")).to.eq(1);
            });
            
            it(`should evaluate '"\\"' as 1 character`, function() {
                expect(charactersInMemory("\"\\\\\"")).to.eq(1);
            });

        });

    });

    describe("Part 2:", function() {

        describe("charactersEscapedInMemory", function() {

            it(`should evaluate '""' as 6 characters`, function() {
                expect(charactersEscapedInMemory("\"\"")).to.eq(6);
            });

            it(`should evaluate '"abc"' as 9 characters`, function() {
               expect(charactersEscapedInMemory("\"abc\"")).to.eq(9); 
            });

            it(`should evaluate '"aaa\\"aaa"' as 16 characters`, function() {
                expect(charactersEscapedInMemory("\"aaa\\\"aaa\"")).to.eq(16);
            });

            it(`should evaluate '"\\x27"' as 11 character`, function() {
                expect(charactersEscapedInMemory("\"\\x27\"")).to.eq(11);
            });
            
        });
        
    });

});
