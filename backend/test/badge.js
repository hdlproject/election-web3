const Citizenship = artifacts.require('Citizenship');
const Badge = artifacts.require('Badge');
const truffleAssert = require('truffle-assertions');

contract('Badge', (accounts) => {
  const owner = accounts[0];
  const president = owner; // will set electionContract to owner so owner can act as election contract
  const minister1 = accounts[1];
  const minister2 = accounts[2];
  const nonCitizen = accounts[9];
  let citizenship;
  let badge;

  before(async () => {
    citizenship = await Citizenship.deployed();

    // Ensure owner is a citizen and potential ministers are citizens
    await citizenship.registerCitizen(owner, 'OWN', 40, {from: owner}).catch(() => {
    }); // ignore if already registered
    await citizenship.registerCitizen(minister1, 'M1', 33, {from: owner}).catch(() => {
    });
    await citizenship.registerCitizen(minister2, 'M2', 35, {from: owner}).catch(() => {
    });

    // Set electionContract to owner so changePresident callable
    await citizenship.setElectionContract(owner, {from: owner}).catch(() => {
    });
    // Make owner president (msg.sender == electionContract)
    await citizenship.changePresident(owner, {from: owner});

    // Deploy a fresh Badge linked to citizenship (avoid env var dependency in migrations)
    badge = await Badge.new(citizenship.address, {from: owner});
  });

  it('reverts appointMinister for non-president', async () => {
    await truffleAssert.reverts(
      badge.appointMinister(minister1, 'ipfs://metadata1.json', {from: minister1}),
    );
  });

  it('appoints first minister and emits events', async () => {
    const tx = await badge.appointMinister(minister1, 'ipfs://metadata1.json', {from: president});
    truffleAssert.eventEmitted(tx, 'BadgeMinted', ev => ev.to === minister1);
    truffleAssert.eventEmitted(tx, 'MinisterAppointed', ev => ev.minister === minister1);
    const tokenId = await badge.getMinisterBadgeId(minister1);
    assert(tokenId.toNumber() > 0, 'Token ID should be > 0');
    const ministers = await badge.getMinisters();
    assert.equal(ministers.length, 1, 'Should list one minister');
  });

  it('reverts duplicate minister appointment', async () => {
    await truffleAssert.reverts(
      badge.appointMinister(minister1, 'ipfs://metadata1.json', {from: president}),
    );
  });

  it('appoints second minister independently', async () => {
    const tx = await badge.appointMinister(minister2, 'ipfs://metadata2.json', {from: president});
    truffleAssert.eventEmitted(tx, 'MinisterAppointed', ev => ev.minister === minister2);
    const tokenId2 = await badge.getMinisterBadgeId(minister2);
    assert(tokenId2.toNumber() > 0, 'Second token ID should be > 0');
    const ministers = await badge.getMinisters();
    assert.equal(ministers.length, 2, 'Should list two ministers');
  });

  it('dismisses a minister and burns badge', async () => {
    const tokenBefore = await badge.getMinisterBadgeId(minister1);
    assert(tokenBefore.toNumber() > 0, 'Minister1 should have badge before dismissal');
    const tx = await badge.dismissMinister(minister1, {from: president});
    truffleAssert.eventEmitted(tx, 'BadgeBurned', ev => ev.tokenId.toNumber() === tokenBefore.toNumber());
    truffleAssert.eventEmitted(tx, 'MinisterDismissed', ev => ev.minister === minister1);
    const tokenAfter = await badge.getMinisterBadgeId(minister1);
    assert.equal(tokenAfter.toNumber(), 0, 'Badge should be reset');
    const ministers = await badge.getMinisters();
    assert.equal(ministers.length, 1, 'One minister should remain');
  });

  it('reverts dismissing non-appointed minister', async () => {
    await truffleAssert.reverts(
      badge.dismissMinister(minister1, {from: president}),
    );
  });

  it('reverts appointing non-citizen as minister', async () => {
    await truffleAssert.reverts(
      badge.appointMinister(nonCitizen, 'ipfs://bad.json', {from: president}),
    );
  });
});

