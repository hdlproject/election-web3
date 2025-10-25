const Citizenship = artifacts.require('Citizenship');
const truffleAssert = require('truffle-assertions');

contract('Citizenship', (accounts) => {
  let citizenship;

  before(async function() {
    citizenship = await Citizenship.deployed();
    await citizenship.registerCitizen(accounts[1], '123', 18, {from: accounts[0]});
    await citizenship.registerCitizen(accounts[2], '234', 19, {from: accounts[0]});
  });

  it('should return correct citizen', async () => {
    const result = await citizenship.getCitizen(accounts[1]);
    assert.equal(result.id, '123');
    assert.equal(result.age.toNumber(), 18);
  });

  it('should return correct citizens', async () => {
    const result = await citizenship.getCitizens();
    assert.equal(result.length, 2);
  });

  it('should revert non-owner registerCitizen', async () => {
    await truffleAssert.reverts(
      citizenship.registerCitizen(accounts[3], '345', 20, {from: accounts[2]}),
      'Ownable: caller is not the owner',
    );
  });

  it('should revert invalid (empty) id', async () => {
    await truffleAssert.reverts(
      citizenship.registerCitizen(accounts[3], '', 20, {from: accounts[0]}),
    );
  });

  it('should register a new citizen and revert duplicate', async () => {
    await citizenship.registerCitizen(accounts[3], '345', 20, {from: accounts[0]});
    const c = await citizenship.getCitizen(accounts[3]);
    assert.equal(c.id, '345');
    await truffleAssert.reverts(
      citizenship.registerCitizen(accounts[3], '345', 20, {from: accounts[0]}),
    );
  });

  it('should revert changePresident before electionContract is set', async () => {
    await truffleAssert.reverts(
      citizenship.changePresident(accounts[1], {from: accounts[0]}),
    );
  });

  it('should set electionContract only by owner and emit event', async () => {
    await truffleAssert.reverts(
      citizenship.setElectionContract(accounts[5], {from: accounts[1]}),
      'Ownable: caller is not the owner',
    );
    const tx = await citizenship.setElectionContract(accounts[5], {from: accounts[0]});
    truffleAssert.eventEmitted(tx, 'ElectionContractSet', (ev) => ev.newElectionContract === accounts[5]);
  });

  it('should revert changePresident from unauthorized caller', async () => {
    await truffleAssert.reverts(
      citizenship.changePresident(accounts[1], {from: accounts[4]}),
    );
  });

  it('should revert changePresident if target not citizen', async () => {
    await truffleAssert.reverts(
      citizenship.changePresident(accounts[9], {from: accounts[5]}),
    );
  });

  it('should change president and grant PRESIDENT role', async () => {
    const tx = await citizenship.changePresident(accounts[1], {from: accounts[5]});
    truffleAssert.eventEmitted(tx, 'PresidentChanged', (ev) => ev.newPresidentAddress === accounts[1]);
    const president = await citizenship.getPresident();
    assert.equal(president, accounts[1]);
    const roleId = await citizenship.PRESIDENT();
    const has = await citizenship.hasRole(roleId, accounts[1]);
    assert.equal(has, true, 'PRESIDENT role not granted');
  });

  it('should revoke old president role on change', async () => {
    await citizenship.registerCitizen(accounts[4], '456', 22, {from: accounts[0]});
    const oldPresident = await citizenship.getPresident();
    const tx = await citizenship.changePresident(accounts[4], {from: accounts[5]});
    truffleAssert.eventEmitted(tx, 'PresidentChanged', (ev) => ev.newPresidentAddress === accounts[4] && ev.oldPresidentAddress === oldPresident);
    const roleId = await citizenship.PRESIDENT();
    const oldHas = await citizenship.hasRole(roleId, oldPresident);
    const newHas = await citizenship.hasRole(roleId, accounts[4]);
    assert.equal(oldHas, false, 'Old president role should be revoked');
    assert.equal(newHas, true, 'New president role should be granted');
  });

  it('should add and remove election admin role', async () => {
    const roleId = await citizenship.ELECTION_ADMIN();
    const addTx = await citizenship.addElectionAdmin(accounts[6], {from: accounts[0]});
    truffleAssert.eventEmitted(addTx, 'ElectionAdminAdded', (ev) => ev.electionAdminAddress === accounts[6]);
    const hasAfterAdd = await citizenship.hasRole(roleId, accounts[6]);
    assert.equal(hasAfterAdd, true, 'ELECTION_ADMIN role not granted');
    const removeTx = await citizenship.removeElectionAdmin(accounts[6], {from: accounts[0]});
    truffleAssert.eventEmitted(removeTx, 'ElectionAdminRemoved', (ev) => ev.electionAdminAddress === accounts[6]);
    const hasAfterRemove = await citizenship.hasRole(roleId, accounts[6]);
    assert.equal(hasAfterRemove, false, 'ELECTION_ADMIN role not revoked');
  });
});
