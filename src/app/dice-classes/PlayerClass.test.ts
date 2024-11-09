import { PlayerClass } from './PlayerClass';

test('release a layer without the list', () => {
  const oPlayer = new PlayerClass(5);
  oPlayer.initPlayersData([]);
  oPlayer.releaseThePlayer('p#3');

  const playerList = oPlayer.getLayers();

  // current
  expect(playerList.get('p#3')?.prevPlayerId).toBeNull();
  expect(playerList.get('p#3')?.nextPlayerId).toBeNull();

  // prev
  expect(playerList.get('p#2')?.prevPlayerId).toEqual('p#1');
  expect(playerList.get('p#2')?.nextPlayerId).toEqual('p#4');

  // next
  expect(playerList.get('p#4')?.prevPlayerId).toEqual('p#2');
  expect(playerList.get('p#4')?.nextPlayerId).toEqual('p#5');
});
