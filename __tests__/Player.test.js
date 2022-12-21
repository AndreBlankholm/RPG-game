const Player = require('../lib/Player.js');

const Potion = require('../lib/Potion.js');

jest.mock('../lib/Potion');

// console.log the mock potion
console.log(new Potion());


test('creates a new player object', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
      );
});

