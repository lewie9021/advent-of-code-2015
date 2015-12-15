import _ from "lodash-fp";
import { expect } from "chai";
import { title, createGrid, configureLighting } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        beforeEach(function() {
            this.grid = createGrid(1000, 1000);
        });
        
        it("should evaluate 'turn on 0,0 through 999,999' as turn on every light", function() {
            const result = configureLighting(this.grid, "turn on 0,0 through 999,999");
            const count = _.reduce((count, row) => {
                return count + _.sum(row);
            }, 0, result);
            
            expect(count).to.eq(1000 * 1000);
        });

        it("should evaluate 'toggle 0,0 through 999,0' as toggle the first 1000 lights", function() {
            const total = _.compose(_.sum, _.map(_.sum));
            const result = configureLighting(this.grid, "toggle 0,0 through 999,0");

            // Check the first row of lights are on.
            expect(_.sum(result[0])).to.eq(1000);

            // Make sure the other lights are off.
            expect(total(_.rest(result))).to.eq(0);

            // Sanity check the grand total of lights on.
            expect(total(result)).to.eq(1000);
        });

        it("should evaluate 'turn off 499,499 through 500,500' as turn off the middle four lights.", function() {
            
        });
        
    });

});
