# Election
This project provide an election platform backed by Ethereum smart contract.
The function is to provide an extra security for the election process.
This is possible due to the nature of a blockchain system.

# Domain

## Citizenship
This contract is responsible for managing the citizenship.
The citizen is an entity that can be the electee and/or elector in the election process.
### TODO
- [] ???

## Election
This contract is the main contract of the project. 
It is responsible for the election process.
The election process will result in an electee becoming a president after being voted by most of the electees.
### TODO
- [ ] Enhance finish() function by adding election deadline and quorum.
- [ ] Think about a tied vote count scenario.
- [ ] Think about the gas scaling issue.

## Money
This contract is responsible for managing the money.
The money is used to pay for the election process.
The president will have an authority to mint new money.
### TODO
- [ ] ???

## Badge
This contract is responsible for managing the badge.
The badge is used to represent the role of the citizen.
The badge can be minted by the president.
### TODO
- [ ] ???
