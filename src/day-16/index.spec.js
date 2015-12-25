import { expect } from "chai";
import { title, parse, getMatchScore, getMatchScoreV2, analysisMachine } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        describe("parse", function() {

            it("should return an array of objects", function() {
                const input = [
                    "Sue 1: goldfish: 6, trees: 9, akitas: 0"
                ];
                const result = parse(input);
                
                
                expect(result).to.be.an("array");
                expect(result.length).to.eq(1);
            });

            it("should assign an index property using the number after 'Sue'", function() {
                const input = [
                    "Sue 1: goldfish: 6, trees: 9, akitas: 0",
                    "Sue 67: trees: 10, pomeranians: 7, samoyeds: 3"
                ];
                const result = parse(input).map(({index}) => index);

                expect(result).to.eql([1, 67]);
            });
            
            it("should parse each kay value pair", function() {
                const input = [
                    "Sue 1: goldfish: 6, trees: 9, akitas: 0",
                    "Sue 67: trees: 10, pomeranians: 7, samoyeds: 3"
                ];

                expect(parse(input)).to.eql([
                    {index: 1, goldfish: 6, trees: 9, akitas: 0},
                    {index: 67, trees: 10, pomeranians: 7, samoyeds: 3}
                ]);
            });
            
        });
        
        describe("getMatchScore", function() {

            it("should return null if the subject has no matching properties", function() {
                const example = {a: 2, b: 1};
                const subject = {a: 1, b: 2};

                expect(getMatchScore(subject, example)).to.eq(null);
            });

            it("should return null if the subject has at least one property that doesn't match", function() {
                const example = {a: 1, b: 1};
                const subject = {a: 1, b: 2};

                expect(getMatchScore(subject, example)).to.eq(null);
            });

            it("should return 100 if the subject matches every property", function() {
                const example = {a: 1, b: 2};
                const subject = {a: 1, b: 2};

                expect(getMatchScore(subject, example)).to.eq(100);
            });

            it("should return 50 if the subject matches on present properties but missing the other half", function() {
                const example = {a: 1, b: 2};
                const subject = {a: 1, b: 2, c: 3, d: 4};

                expect(getMatchScore(subject, example)).to.eq(50);
            });

            it("should return 0 if the subject is empty", function() {
                const example = {};
                const subject = {a: 1, b: 2, c: 3, d: 4};

                expect(getMatchScore(subject, example)).to.eq(0);
            });
            
        });

        describe("analysisMachine", function() {

            it("should return an object for each match containing a match percentage and index", function() {
                const input = [
                    "Sue 1: a: 1, b: 2",
                    "Sue 2: a: 1, c: 3, d: 4",
                    "Sue 3: c: 3"
                ];
                const subject = {a: 1, b: 2, c: 3, d: 4};

                expect(analysisMachine(getMatchScore, parse(input), subject)).to.eql([
                    {index: 2, score: 75},
                    {index: 1, score: 50},
                    {index: 3, score: 25}
                ]);
            });

            it("should filter out entries that don't match", function() {
                const input = [
                    "Sue 1: a: 1, b: 2",
                    "Sue 2: a: 5, c: 3",
                    "Sue 3: a: 1, c: 3, d: 4"
                ];
                const subject = {a: 1, b: 2, c: 3, d: 4};

                expect(analysisMachine(getMatchScore, parse(input), subject)).to.eql([
                    {index: 3, score: 75},
                    {index: 1, score: 50}
                ]);
            });

            it("should sort by match percentage", function() {
                const input = [
                    "Sue 1: a: 1",
                    "Sue 2: a: 1, c: 3, d: 4",
                    "Sue 3: a: 1, b: 2, c: 3, d: 4"
                ];
                const subject = {a: 1, b: 2, c: 3, d: 4};

                expect(analysisMachine(getMatchScore, parse(input), subject)).to.eql([
                    {index: 3, score: 100},
                    {index: 2, score: 75},
                    {index: 1, score: 25}
                ]);
            });
            
        });
        
    });

    describe("Part 2:", function() {

        describe("getMatchScoreV2", function() {

            it("should match if the example has 'cats' and 'trees' more than the subject", function() {
                const example = {cats: 5, trees: 3};
                const subject = {cats: 3, trees: 1};

                expect(getMatchScoreV2(subject, example)).to.eq(100);
            });

            it("should match if the example has 'pomeranians' and 'goldfish' less than the subject", function() {
                const example = {pomeranians: 2, goldfish: 0};
                const subject = {pomeranians: 6, goldfish: 2};

                expect(getMatchScoreV2(subject, example)).to.eq(100);
            });
            
        });

        describe("analysisMachine", function() {

            it("should only return matches that getMatchScoreV2 considers valid", function() {
                const input = [
                    "Sue 1: cats: 3, goldfish: 3",
                    "Sue 2: cats: 2, c: 3, goldfish: 1",
                    "Sue 3: c: 3"
                ];
                const subject = {cats: 1, goldfish: 4, c: 3, d: 4};

                expect(analysisMachine(getMatchScoreV2, parse(input), subject)).to.eql([
                    {index: 2, score: 75},
                    {index: 1, score: 50},
                    {index: 3, score: 25}
                ]);
            });

        });
        
    });

});
