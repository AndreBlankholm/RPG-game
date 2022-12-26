const Player = require('../lib/Player.js');

const Potion = require('../lib/Potion.js');

jest.mock('../lib/Potion');

// console.log the mock potion
console.log(new Potion());
console.log(new Player());

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

test('get players stats as an object', () => {
  const player = new Player('Dave');

  expect(player.getStats()).toHaveProperty('potions');
  expect(player.getStats()).toHaveProperty('health');
  expect(player.getStats()).toHaveProperty('strength');
  expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');

  expect(player.getInventory()).toEqual(expect.any(Array));

  player.inventory = [];

  expect(player.getInventory()).toEqual(false);
});

// test inorder to get the players current health as an statement
test('gets player health value', () => {
  const player = new Player('Dave');

// here the .toString is concatennating the player data so the Game will only have to display the data.
  expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});


test('checks to see if player is still alive', () => {
  const player = new Player('Dave');

  expect(player.isAlive()).toBeTruthy();

  player.health = 0;

  expect(player.isAlive()).toBeFalsy();
});


test('subtracts from players health', () => {
 const player = new Player('Dave');

  const oldHealth = player.health;

  player.reduceHealth(5);

  expect(player.health).toBe(oldHealth -5);

  player.reduceHealth(99999);

  expect(player.health).toBe(0);

});

//  The following code shows how to create a new test that verifies that a player's attack value is within range:
test('gets players attack values', () => {
  const player = new Player('Dave');
  player.strength = 10;

  expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
  expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});


 // Test in Player.test.js to check that a Potion was added correctly.
test('adds a potion to the inventory', () => {
  const player = new Player('Dave');
  const oldCount = player.inventory.length;

  player.addPotion(new Potion());

  expect(player.inventory.length).toBeGreaterThan(oldCount);
});

test('uses a potion from inventory', () => {
  const player = new Player('Dave');
  player.inventory = [new Potion(), new Potion(), new Potion()];
  const oldCount = player.inventory.length;

  player.usePotion(1);

  expect(player.inventory.length).toBeLessThan(oldCount);
});