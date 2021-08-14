const Citizenship = artifacts.require('Citizenship');

contract('Citizenship', accounts => {
  before(async function() {
    const citizenship = await Citizenship.deployed();
    await citizenship.registerCitizen(accounts[1], '123', 18, {from: accounts[0]});
    await citizenship.registerCitizen(accounts[2], '234', 19, {from: accounts[0]});
  });

  it('should return correct citizen', async () => {
    const citizenship = await Citizenship.deployed();
    const result = await citizenship.getCitizen(accounts[1], {from: accounts[0]});

    assert.equal(result.id, '123');
    assert.equal(result.age.toNumber(), 18);
  });

  it('should return correct citizens', async () => {
    const citizenship = await Citizenship.deployed();
    const result = await citizenship.getCitizens({from: accounts[0]});

    assert.equal(result.length, 2);
  });
});
