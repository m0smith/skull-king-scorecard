// import { computeSubtotal,computeScore } from '../common';
const { computeSubtotal, computeScore } = require('../common');


describe('computeSubtotal', () => {
  it('should return 0 for empty scores', () => {
    const playerInfo = { scores: [] };
    const round = 0;
    expect(computeSubtotal(playerInfo, round)).toEqual(0);
  });

  it('should correctly compute the subtotal for valid scores', () => {
    const playerInfo = {
      scores: [
        { bid: 2, tricks: 2 }, // assuming computeScore would return a positive value
        { bid: 1, tricks: 3 }  // and a negative value for this, based on your scoring logic
      ]
    };
    const round = 1;
    const expectedSubtotal = computeScore(0, 2, 2) + computeScore(1, 1, 3);
    expect(computeSubtotal(playerInfo, round)).toEqual(expectedSubtotal);
  });

  it('should ignore null and NaN scores', () => {
    const playerInfo = {
      scores: [
        { bid: null, tricks: null },
        { bid: 3, tricks: NaN }
      ]
    };
    const round = 1;
    expect(computeSubtotal(playerInfo, round)).toEqual(0);
  });

  it('should handle rounds beyond the scores length', () => {
    const playerInfo = {
      scores: [
        { bid: 2, tricks: 2, round: 0}
      ]
    };
    const round = 3; // more than the length of scores
    const expectedSubtotal = computeScore(0, 2, 2); // Only the first score is valid

    expect(computeSubtotal(playerInfo, round)).toEqual(expectedSubtotal);
  });

  // Add more test cases as needed to cover all scenarios and edge cases
});
