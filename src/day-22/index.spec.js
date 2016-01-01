import { expect } from "chai";
import { title, parse } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        describe("parse", function() {

            before(function() {
                this.generateInput = (health, damage) => [
                    "Hit Points: " + health,
                    "Damage: " + damage
                ].join("\n");
            });

            it("should return an object with the properties: 'health' and 'damage'", function() {
                const result = parse(this.generateInput(32, 15));

                expect(result).to.be.an("object");
                expect(result).to.have.all.keys(["health", "damage"]);
            });

            it("should return the correct values from the inputs", function() {
                const test = (health, damage) => {
                    const result = parse(this.generateInput(health, damage));
                    
                    expect(result).to.eql({health, damage});
                };

                test(22, 13);
                test(0, 5);
                test(43, 0);
                test(530, 4);
                test(1, 66);
                test(34, 150);
            });
            
        });        

    });

});
