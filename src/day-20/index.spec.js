import { expect } from "chai";
import { title, getPresentCount, getLowestHouseNumber } from "./";
import _ from "lodash-fp";

describe(title, function() {

    describe("Part 1:", function() {

        describe("getPresentCount", function() {
            const counts = {
                1: 10,
                2: 30,
                3: 40,
                4: 70,
                5: 60,
                6: 120,
                7: 80,
                8: 150,
                9: 130
            };

            _.forEach((key) => {
                it(`should return ${counts[key]}, given ${key}`, function() {
                    expect(getPresentCount(key)).to.eq(counts[key]);
                });
            }, Object.keys(counts));
        });

        describe("getLowestHouseNumber", function() {
            const counts = {
                20: 2,
                60: 5,
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
