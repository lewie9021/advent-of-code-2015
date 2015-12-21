import { expect } from "chai";
import { title, parse } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        describe("parse", function() {

            it("should return objects with properties 'name', 'speed', 'flyTime', and 'restTime'", function() {
                const input = [
                    "Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds.",
                    "Rudolph can fly 3 km/s for 15 seconds, but then must rest for 28 seconds."
                ];
                const result = parse(input);

                
                expect(Array.isArray(result)).to.eq(true);
                expect(result.length).to.eq(2);

                result.forEach((description) => expect(description).to.be.an("object"));
            });

            it("should make the first word in each sentence the 'name'", function() {
                const input = ["Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds."];
                const [description] = parse(input);

                expect(description).to.have.property("name", "Vixen");
            });

            it("should make the first integer in each sentence the 'speed'", function() {
                const input = ["Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds."];
                const [description] = parse(input);

                expect(description).to.have.property("speed", 19);
            });

            it("should make the second integer in each sentence the 'flyTime'", function() {
                const input = ["Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds."];
                const [description] = parse(input);

                expect(description).to.have.property("flyTime", 7);
            });

            it("should make the last integer in each sentence the 'restTime'", function() {
                const input = ["Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds."];
                const [description] = parse(input);

                expect(description).to.have.property("restTime", 124);
            });
            
        });
        
        describe("startRace", function() {

            it("should expect an array of participants", function() {
                
            });

            it("should expect an end time in seconds", function() {
                
            });

            it("should return an array of participants with their name and distance covered", function() {
                
            });
            
        });

        describe("getWinner", function() {

            it("should expect an array of participants and their distace covered", function() {
                
            });

            it("should return the participant with the most distance covered", function() {
                
            });
            
        });
        
        describe("reindeer", function() {

            it("should expect a name", function() {
                
            });

            it("should expect a speed value", function() {
                
            });

            it("should expect a fly time", function() {
                
            });

            it("should expect a rest time", function() {
                
            });
            
            it("should return an object with properties 'name', 'distance', and 'next'", function() {
                
            });

            describe("name", function() {

                it("should return the name given on creation", function() {
                    
                });

            });
            
            describe("distance", function() {

                it("should return the current distance covered", function() {
                    
                });

                it("should initially return 0 if 'next' has never been called", function() {
                    
                });

            });

            describe("next", function() {

                it("should intially move the reindeer", function() {
                    
                });

                it("should stop moving the reindeer after calling more than the fly time", function() {
                    
                });

                it("should start moving the reindeer after calling more than the rest time", function() {
                    
                });
                
            });
            
        });

    });

});
