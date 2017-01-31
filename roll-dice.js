"use strict";

const TIMES = 1;
const DIE = 2;
const VALUE = 3;

/**
 * Rolls dice according to a formula.
 * @param {string} formula
 * @return {number} the result of the formula
 */
function rollDice(formula) {

  let splitre = /[+-]/g

  if (!formula) {
    throw new Error("Empty formula");
  }

  // Process each element of the formula, building the total
  var total = 0;
  var match;
  var clause = "";
  var start = 0;
  var isNegative = false;
  while ((match = splitre.exec(formula)) !== null) {

    // Is there a previous clause (not the case of a leading sign)?
    if (match.index != start) {

      // Capture the previous clause and process it
      clause = formula.substring(start, match["index"]);
      start = match.index + 1;
      total += processClause(clause) * (isNegative ? -1 : 1);
    }

    // Save any sign for the next clause
    isNegative = match[0] === "-";
  }

  // Capture any final clause and process it
  clause = formula.substring(start, formula.length);
  total += processClause(clause) * (isNegative ? -1 : 1);

  return total;
}

function processClause(clause) {

  let clausere = /(\d+)?d(\d+)|(\d+(?!.))/;

  if (!clause) {
    return 0;
  }
  if (!clause.match(clausere)) {
    throw new Error("Bad clause: " + clause);
  }

  var match = clausere.exec(clause);

  let subtotal = 0;
  if (match[DIE]) {
    let times = match[TIMES] ? parseInt(match[TIMES]) : 1;
    let die = parseInt(match[DIE]);
    for (let i = 0; i < times; i++) {
      let roll = Math.floor(Math.random() * die) + 1;
      subtotal += roll;
    }
  } else if (match[VALUE]) {
    let value = parseInt(match[VALUE]);
    subtotal += value;
  }

  return subtotal;
}

module.exports = rollDice;
