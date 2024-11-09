import { DiceClass } from './DiceClass';

test('test dices value when initializing', () => {
  const oDice = new DiceClass(100);

  oDice.getDices().forEach((value) => {
    expect(value).toMatchObject({
      value: expect.any(Number),
    });

    expect(value.value).toBeGreaterThanOrEqual(1);
    expect(value.value).toBeLessThanOrEqual(6);
  });
})
