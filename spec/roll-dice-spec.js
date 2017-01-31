"use strict";

let rollDice = require("../roll-dice");

describe("roll dice", () => {

  it("should handle simple values", () => {
    var result = rollDice("4");
    expect(result).toBe(4);
  });

  it("should handle negative simple values", () => {
    var result = rollDice("-4");
    expect(result).toBe(-4);
  });

  it("should add simple values", () => {
    var result = rollDice("1+2");
    expect(result).toBe(3);
  });

  it("should subtract simple values", () => {
    var result = rollDice("10-3");
    expect(result).toBe(7);
  });

  it("should roll a single die", () => {
    for (let i = 0; i < 1000; i++) {
      var result = rollDice("d10");
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(11);
    }
  });

  it("should roll a single die multiple times", () => {
    for (let i = 0; i < 1000; i++) {
      var result = rollDice("2d10");
      expect(result).toBeGreaterThan(1);
      expect(result).toBeLessThan(21);
    }
  });

  it("should roll a single die and add a value to it", () => {
    for (let i = 0; i < 1000; i++) {
      var result = rollDice("d10+4");
      expect(result).toBeGreaterThan(4);
      expect(result).toBeLessThan(15);
    }
  });

  it("should roll a single die and subtract a value to it", () => {
    for (let i = 0; i < 1000; i++) {
      var result = rollDice("d10-4");
      expect(result).toBeGreaterThan(-4);
      expect(result).toBeLessThan(7);
    }
  });

  it("should roll combinations of dice", () => {
    for (let i = 0; i < 1000; i++) {
      var result = rollDice("d10+d6");
      expect(result).toBeGreaterThan(1);
      expect(result).toBeLessThan(17);
    }
  });

  it("should error on a bad simple value", () => {
    var test = function() {
      rollDice("x");
    };
    expect(test).toThrow(new Error("Bad clause: x"));
  });

  it("should error on a bad die", () => {
    var test = function() {
      rollDice("3dy+5");
    };
    expect(test).toThrow(new Error("Bad clause: 3dy"));
  });

  it("should error on an empty formula", () => {
    var test = function() {
      rollDice("");
    };
    expect(test).toThrow(new Error("Empty formula"));
  });

  it("should error on trailing signs", () => {
    var result = rollDice("d10-");
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(11);
  });
});
