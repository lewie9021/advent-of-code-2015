import _ from "lodash-fp";
import { expect } from "chai";
import { title, createGrid, configureLighting } from "./";

describe(title, function() {
    const total = _.compose(_.sum, _.map(_.sum));

    describe("Part 1:", function() {

        it("should evaluate 'turn on 0,0 through 999,999' as turn on every light", function() {
            const grid = createGrid(1000, 1000);
            const result = configureLighting(grid, "turn on 0,0 through 999,999");
            
            expect(total(result)).to.eq(1000 * 1000);
        });

        it("should evaluate 'toggle 0,0 through 999,0' as toggle the first 1000 lights", function() {
            const grid = createGrid(1000, 1000);
            const result = configureLighting(grid, "toggle 0,0 through 999,0");

            // Check the first row of lights are on.
            expect(_.sum(result[0])).to.eq(1000);

            // Make sure the other lights are off.
            expect(total(_.rest(result))).to.eq(0);

            // Sanity check the grand total of lights on.
            expect(total(result)).to.eq(1000);
        });

        it("should evaluate 'turn off 499,499 through 500,500' as turn off the middle four lights.", function() {
            const grid = createGrid(1000, 1000, true);
            const result = configureLighting(grid, "turn off 499,499 through 500,500");
            
            // Make sure the correct lights are turned off.
            expect(result[499][499]).to.eq(false);
            expect(result[499][500]).to.eq(false);
            expect(result[500][499]).to.eq(false);
            expect(result[500][500]).to.eq(false);
            
            // Make sure all but 4 lights are on.
            expect(total(result)).to.eq((1000 * 1000) - 4);
        });
        
    });

});
