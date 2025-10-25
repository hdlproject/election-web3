const Citizenship = artifacts.require('Citizenship');
const Election = artifacts.require('Election');
const truffleAssert = require('truffle-assertions');

contract('Election', (accounts) => {
  let citizenship;
  let election;
  const owner = accounts[0];
  const electee1 = accounts[1];
  const electee2 = accounts[2];
  const elector1 = accounts[3];
  const elector2 = accounts[4];
  const underage = accounts[5];

  before(async () => {
    citizenship = await Citizenship.deployed();
    election = await Election.deployed();

    // Grant ELECTION_ADMIN role to owner (already owner so can call addElectionAdmin)
    await citizenship.addElectionAdmin(owner, {from: owner});

    // Set election contract in citizenship so finish() can change president later
    await citizenship.setElectionContract(election.address, {from: owner});

    // Register citizens (onlyOwner)
    await citizenship.registerCitizen(electee1, 'E1', 30, {from: owner});
    await citizenship.registerCitizen(electee2, 'E2', 32, {from: owner});
    await citizenship.registerCitizen(elector1, 'R1', 25, {from: owner});
    await citizenship.registerCitizen(elector2, 'R2', 28, {from: owner});
    await citizenship.registerCitizen(underage, 'UA', 17, {from: owner});

    // Register electees / electors through election contract
    await election.registerElectee(electee1, {from: owner});
    await election.registerElectee(electee2, {from: owner});
    await election.registerElector(elector1, {from: owner});
    await election.registerElector(elector2, {from: owner});
  });

  it('returns correct electee data', async () => {
    const result = await election.getElectee(electee1);
    assert.equal(result.id, 'E1');
    assert.equal(result.age.toNumber(), 30);
    assert.equal(result.voteCount.toNumber(), 0);
  });

  it('lists all electees', async () => {
    const result = await election.getElectees();
    assert.equal(result.length, 2);
  });

  it('returns correct elector data', async () => {
    const result = await election.getElector(elector1);
    assert.equal(result.id, 'R1');
    assert.equal(result.age.toNumber(), 25);
    assert.equal(result.alreadyElected, false);
  });

  it('lists all electors', async () => {
    const result = await election.getElectors();
    assert.equal(result.length, 2);
  });

  it('reverts non-admin registration', async () => {
    await truffleAssert.reverts(
      election.registerElectee(electee1, {from: electee1}),
    );
  });

  it('reverts underage electee registration', async () => {
    await truffleAssert.reverts(
      election.registerElectee(underage, {from: owner}),
    );
  });

  it('reverts duplicate electee registration', async () => {
    await truffleAssert.reverts(
      election.registerElectee(electee1, {from: owner}),
    );
  });

  it('reverts elect before start', async () => {
    await truffleAssert.reverts(
      election.elect(electee1, {from: elector1}),
    );
  });

  it('reverts start with no candidates (fresh election instance)', async () => {
    const electionEmpty = await Election.new(citizenship.address, {from: owner});
    // has election admin role via citizenship already
    await truffleAssert.reverts(
      electionEmpty.start({from: owner}),
      'Election: no candidates',
    );
  });

  it('starts election and emits event', async () => {
    const tx = await election.start({from: owner});
    truffleAssert.eventEmitted(tx, 'ElectionStarted');
    const status = await election.getStatus();
    assert.equal(status.started, true);
    assert.equal(status.finished, false);
  });

  it('reverts registerElectee after start', async () => {
    await truffleAssert.reverts(
      election.registerElectee(accounts[7], {from: owner}),
    );
  });

  it('casts first vote and updates best electee', async () => {
    const tx = await election.elect(electee1, {from: elector1});
    truffleAssert.eventEmitted(tx, 'Elected', (ev) => ev.electeeAddress === electee1 && ev.electorAddress === elector1);
    const electeeData = await election.getElectee(electee1);
    assert.equal(electeeData.voteCount.toNumber(), 1);
    const leader = await election.getBestElectee();
    assert.equal(leader, electee1, 'Leader should be electee1');
  });

  it('casts second vote for same electee and maintains leader', async () => {
    await election.elect(electee1, {from: elector2});
    const electeeData = await election.getElectee(electee1);
    assert.equal(electeeData.voteCount.toNumber(), 2);
    const leader = await election.getBestElectee();
    assert.equal(leader, electee1);
  });

  it('reverts double voting by same elector', async () => {
    await truffleAssert.reverts(
      election.elect(electee1, {from: elector1}),
    );
  });

  it('finishes election, updates president and emits event', async () => {
    const tx = await election.finish({from: owner});
    truffleAssert.eventEmitted(tx, 'ElectionFinished');
    const status = await election.getStatus();
    assert.equal(status.finished, true);
    const president = await citizenship.getPresident();
    assert.equal(president, electee1, 'President should be winning electee');
  });

  it('reverts finish after already finished', async () => {
    await truffleAssert.reverts(
      election.finish({from: owner}),
    );
  });
});
