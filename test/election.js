const Citizenship = artifacts.require('Citizenship');
const Election = artifacts.require('Election');

contract('Election', accounts => {
  before(async function() {
    const citizenship = await Citizenship.deployed();
    await citizenship.registerCitizen(accounts[1], '123', 18, {from: accounts[0]});
    await citizenship.registerCitizen(accounts[2], '234', 19, {from: accounts[0]});
    await citizenship.registerCitizen(accounts[3], '345', 20, {from: accounts[0]});
    await citizenship.registerCitizen(accounts[4], '456', 21, {from: accounts[0]});

    const election = await Election.deployed();
    await election.registerElectee(accounts[1], {from: accounts[0]});
    await election.registerElectee(accounts[2], {from: accounts[0]});
    await election.registerElector(accounts[3], {from: accounts[0]});
    await election.registerElector(accounts[4], {from: accounts[0]});
  });

  it('should return correct electee', async () => {
    const election = await Election.deployed();
    const result = await election.getElectee(accounts[1], {from: accounts[0]});

    assert.equal(result.id, '123');
    assert.equal(result.age.toNumber(), 18);
    assert.equal(result.voteCount.toNumber(), 0);
  });

  it('should return correct electees', async () => {
    const election = await Election.deployed();
    const result = await election.getElectees({from: accounts[0]});

    assert.equal(result.length, 2);
  });

  it('should return correct elector', async () => {
    const election = await Election.deployed();
    const result = await election.getElector(accounts[3], {from: accounts[0]});

    assert.equal(result.id, '345');
    assert.equal(result.age.toNumber(), 20);
    assert.equal(result.alreadyElected, false);
  });

  it('should return correct electors', async () => {
    const election = await Election.deployed();
    const result = await election.getElectors({from: accounts[0]});

    assert.equal(result.length, 2);
  });
});
