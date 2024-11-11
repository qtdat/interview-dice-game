import { RoundClass } from './RoundClass';

test('run round until having winner', () => {
  const objRound = new RoundClass(10000, 10);
  objRound.startGame();

  // automatically run
  const winners = objRound.runUtilHavingWinners();

  // find max point
  let maxPoint = 0;
  objRound.objPlayer.getLayers().forEach(({ point }) => {
    if (point > maxPoint) {
      maxPoint = point;
    }
  });

  // test winners number
  expect(winners.filter(({ point }) => point === maxPoint)).toHaveLength(winners.length);
});

