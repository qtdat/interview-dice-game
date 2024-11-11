import { DiceClass } from './DiceClass';

test('test dices value when initializing', () => {
  const oDice = new DiceClass(100);

  // value of dices will be 0 on initialization
  oDice.getDices().forEach((value) => {
    expect(value).toMatchObject({
      value: expect.any(Number),
    });

    expect(value.value).toEqual(0);
  });

  oDice.raiseRoll();

  // value of dices will be change in range [1...6] after rolling
  oDice.getDices().forEach((value) => {
    expect(value).toMatchObject({
      value: expect.any(Number),
    });

    expect(value.value).toBeGreaterThanOrEqual(1);
    expect(value.value).toBeLessThanOrEqual(6);
  });
})
