import { expect } from "chai";
import { title, calculateSeating } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        describe("parse", function() {

            it("should map the happiness sentences to an array of objects", function() {
                
            });

            it("should create objects with the properties: 'guest', 'neighbour', and 'value'", function() {
                
            });

            it("should make the first name in the sentence the guest", function() {
                
            });

            it("should make the last name in the sentence the neighbour", function() {
                
            });

            it("should make the value property positive if the word 'gain' is present", function() {
                
            });

            it("should make the value property negative if the word 'lose' is present", function() {
                
            });
            
        });
        
        describe("calculateSeating", function() {
            
            it("should return 330 as the total optimal happiness for the given example", function() {
                const input = [
                    {guest: "Alice", neighbour: "Bob", value: 54},
                    {guest: "Alice", neighbour: "Carol", value: -79},
                    {guest: "Alice", neighbour: "David", value: -2},
                    {guest: "Bob", neighbour: "Alice", value: 83},
                    {guest: "Bob", neighbour: "Carol", value: -7},
                    {guest: "Bob", neighbour: "David", value: -63},
                    {guest: "Carol", neighbour: "Alice", value: -62},
                    {guest: "Carol", neighbour: "Bob", value: 60},
                    {guest: "Carol", neighbour: "David", value: 55},
                    {guest: "David", neighbour: "Alice", value: 46},
                    {guest: "David", neighbour: "Bob", value: -7},
                    {guest: "David", neighbour: "Carol", value: 41}
                ];

                expect(calculateSeating(input)).to.eq(330);
            });
            
        });

    });

});
