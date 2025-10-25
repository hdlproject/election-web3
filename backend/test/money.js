// Tests for Money ERC20 national currency contract
// Using fresh deployments to avoid migration/env var dependency
const Citizenship = artifacts.require('Citizenship');
const Money = artifacts.require('Money');
const truffleAssert = require('truffle-assertions');

contract('Money', (accounts) => {
  const owner = accounts[0]; // Will also act as president by setting electionContract to itself
  const citizen1 = accounts[1];
  const citizen2 = accounts[2];
  const citizen3 = accounts[3];
  const nonCitizen = accounts[9];

  let citizenship;
  let moneyUncapped; // cap = 0
  let moneyCapped;   // cap = 500

  before(async () => {
    // Deploy fresh Citizenship
    citizenship = await Citizenship.new({from: owner});

    // Register citizens (onlyOwner)
    await citizenship.registerCitizen(owner, 'OWN', 45, {from: owner});
    await citizenship.registerCitizen(citizen1, 'C1', 30, {from: owner});
    await citizenship.registerCitizen(citizen2, 'C2', 28, {from: owner});
    await citizenship.registerCitizen(citizen3, 'C3', 33, {from: owner});

    // Configure electionContract to owner so owner can changePresident
    await citizenship.setElectionContract(owner, {from: owner});
    await citizenship.changePresident(owner, {from: owner});

    // Deploy uncapped and capped Money instances
    moneyUncapped = await Money.new(citizenship.address, 0, {from: owner});
    moneyCapped = await Money.new(citizenship.address, 500, {from: owner});
  });

  describe('Authorization & Mint/Burn', () => {
    it('reverts mint by non-president', async () => {
      await truffleAssert.reverts(
        moneyUncapped.mint(citizen1, 1000, {from: citizen1}),
      );
    });

    it('president mints tokens (uncapped) and emits Minted event', async () => {
      const tx = await moneyUncapped.mint(citizen1, 1000, {from: owner});
      truffleAssert.eventEmitted(tx, 'Minted', ev => ev.to === citizen1 && ev.amount.toNumber() === 1000);
      const bal = await moneyUncapped.balanceOf(citizen1);
      assert.equal(bal.toString(), '1000');
    });

    it('president burns tokens and emits Burned event', async () => {
      const tx = await moneyUncapped.burn(citizen1, 400, {from: owner});
      truffleAssert.eventEmitted(tx, 'Burned', ev => ev.from === citizen1 && ev.amount.toNumber() === 400);
      const bal = await moneyUncapped.balanceOf(citizen1);
      assert.equal(bal.toString(), '600');
    });

    it('reverts burning more than balance', async () => {
      await truffleAssert.reverts(
        moneyUncapped.burn(citizen1, 10_000, {from: owner}),
      );
    });
  });

  describe('Cap enforcement', () => {
    it('allows mints up to cap', async () => {
      await moneyCapped.mint(citizen2, 300, {from: owner});
      await moneyCapped.mint(citizen2, 200, {from: owner});
      const bal = await moneyCapped.balanceOf(citizen2);
      assert.equal(bal.toString(), '500');
    });

    it('reverts mint exceeding cap', async () => {
      await truffleAssert.reverts(
        moneyCapped.mint(citizen2, 1, {from: owner}),
      );
    });
  });

  describe('Transfers & Citizenship restrictions', () => {
    it('reverts transfer to non-citizen', async () => {
      await truffleAssert.reverts(
        moneyUncapped.transfer(nonCitizen, 10, {from: citizen1}),
      );
    });

    it('allows transfer between citizens', async () => {
      const tx = await moneyUncapped.transfer(citizen2, 100, {from: citizen1});
      truffleAssert.eventEmitted(tx, 'Transfer', ev => ev.from === citizen1 && ev.to === citizen2 && ev.value.toNumber() === 100);
      const bal1 = await moneyUncapped.balanceOf(citizen1);
      const bal2 = await moneyUncapped.balanceOf(citizen2);
      assert.equal(bal1.toString(), '500');
      assert.equal(bal2.toString(), '100');
    });

    it('transferFrom works with allowance between citizens', async () => {
      await moneyUncapped.approve(citizen3, 200, {from: citizen1});
      const tx = await moneyUncapped.transferFrom(citizen1, citizen3, 150, {from: citizen3});
      truffleAssert.eventEmitted(tx, 'Transfer', ev => ev.from === citizen1 && ev.to === citizen3 && ev.value.toNumber() === 150);
      const bal1 = await moneyUncapped.balanceOf(citizen1);
      const bal3 = await moneyUncapped.balanceOf(citizen3);
      assert.equal(bal1.toString(), '350');
      assert.equal(bal3.toString(), '150');
    });
  });

  describe('Pause behavior', () => {
    it('pauses and blocks transfer/mint/burn', async () => {
      await moneyUncapped.pause({from: owner});
      await truffleAssert.reverts(moneyUncapped.transfer(citizen2, 10, {from: citizen1}));
      await truffleAssert.reverts(moneyUncapped.mint(citizen1, 10, {from: owner}));
      await truffleAssert.reverts(moneyUncapped.burn(citizen1, 10, {from: owner}));
    });

    it('unpauses and operations resume', async () => {
      await moneyUncapped.unpause({from: owner});
      await moneyUncapped.transfer(citizen2, 50, {from: citizen1});
      const bal2 = await moneyUncapped.balanceOf(citizen2);
      assert.equal(bal2.toString(), '150');
    });
  });

  describe('Citizenship contract update', () => {
    it('updates citizenship contract address and emits event', async () => {
      // Deploy a second citizenship instance for update test
      const newCitizenship = await Citizenship.new({from: owner});
      await newCitizenship.registerCitizen(owner, 'OWN2', 46, {from: owner});
      await newCitizenship.setElectionContract(owner, {from: owner});
      await newCitizenship.changePresident(owner, {from: owner});
      const tx = await moneyUncapped.setCitizenshipContract(newCitizenship.address, {from: owner});
      truffleAssert.eventEmitted(tx, 'CitizenshipContractSet', ev => ev.newAddress === newCitizenship.address);
      const stored = await moneyUncapped.getCitizenshipContract();
      assert.equal(stored, newCitizenship.address);
    });
  });
});

