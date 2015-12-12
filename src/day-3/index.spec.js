import { expect } from "chai";
import { title, getDeliveredHouses } from "./";

describe(title, function() {

    describe("Part 1:", function() {
    
        it("should evaluate '>' as delivering to 2 houses", function() {
            expect(getDeliveredHouses(">")).to.eq(2);
        });

        it("should evaluate '^>v<' as delivering to 4 houses", function() {
            expect(getDeliveredHouses("^>v<")).to.eq(4);
        });

        it("should evaluate '^v^v^v^v^v' as delivering to 2 houses", function() {
            expect(getDeliveredHouses("^v^v^v^v^v")).to.eq(2);
        });

    });

});
