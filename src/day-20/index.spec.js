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
                    expect(getPresentCounts(key)).to.eql(counts[key]);
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

});
