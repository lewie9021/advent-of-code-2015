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
            
        });

        it("should evaluate 'turn off 499,499 through 500,500' as turn off the middle four lights.", function() {
            
        });
        
    });

});
