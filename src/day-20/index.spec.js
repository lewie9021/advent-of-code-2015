import { expect } from "chai";
import { title, getPresentCounts, getLowestHouseNumber } from "./";
import _ from "lodash-fp";

describe(title, function() {

    describe("Part 1:", function() {

        describe("getPresentCounts", function() {
            const counts = {
                20: {
                    1: 10,
                    2: 30
                },
                60: {
                    1: 10,
                    2: 30,
                    3: 40,
                    4: 70,
                    5: 60,
                    6: 120
                },
                100: {
                    1: 10,
                    2: 30,
                    3: 40,
                    4: 70,
                    5: 60,
                    6: 120,
                    7: 80,
                    8: 150,
                    9: 130,
                    10: 180
                },
                150: {
                    1: 10,
                    2: 30,
                    3: 40,
                    4: 70,
                    5: 60,
                    6: 120,
                    7: 80,
                    8: 150,
                    9: 130,
                    10: 180,
                    11: 120,
                    12: 280,
                    13: 140,
                    14: 240,
                    15: 240
                }
            };
            
            _.forEach((key) => {
                it(`should return a map of present counts, given ${key}`, function() {
                    expect(getPresentCounts(key, 10)).to.eql(counts[key]);
                });
            }, Object.keys(counts));
        });

        describe("getLowestHouseNumber", function() {
            const counts = {
                20: 2,
                60: 4,
                100: 6,
                150: 8
            };

            _.forEach((key) =>{ 
                it(`should return ${counts[key]}, given ${key}`, function() {
                    expect(getLowestHouseNumber(key)).to.eq(counts[key]);
                });
            }, Object.keys(counts));
        });

    });

    describe("Part: 2", function() {

        describe("getPresentCounts", function() {

            it("should require a limit parameter to define the number of houses to visit", function() {
                expect(getPresentCounts(150, 10, 3)).to.eql({
                    1: 10,
                    2: 30,
                    3: 40,
                    4: 60,
                    5: 50,
                    6: 110,
                    7: 70,
                    8: 120,
                    9: 120,
                    10: 150,
                    11: 110,
                    12: 220,
                    13: 130,
                    14: 210,
                    15: 200
                });
                expect(getPresentCounts(150, 10, 10)).to.eql({
                    1: 10,
                    2: 30,
                    3: 40,
                    4: 70,
                    5: 60,
                    6: 120,
                    7: 80,
                    8: 150,
                    9: 130,
                    10: 180,
                    11: 110,
                    12: 270,
                    13: 130,
                    14: 230,
                    15: 230
                });
            });
            
            it("should require a increment parameter to define the amount of presents delivered each time", function() {
                expect(getPresentCounts(150, 20, 3)).to.eql({
                    1: 20,
                    2: 60,
                    3: 80,
                    4: 120,
                    5: 100,
                    6: 220,
                    7: 140
                });
                expect(getPresentCounts(150, 20, 10)).to.eql({
                    1: 20,
                    2: 60,
                    3: 80,
                    4: 140,
                    5: 120,
                    6: 240,
                    7: 160
                });
            });
            
        });

        describe("getLowestHouseNumber", function() {

            it("should return 4, given target: 200, limit: 5, and increment: 40", function() {
                const result = getLowestHouseNumber(200, 40, 5);

                expect(result).to.eq(4);
            });
            
        });
        
    });

});
