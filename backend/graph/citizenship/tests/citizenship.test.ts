import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { Registered } from "../generated/schema"
import { Registered as RegisteredEvent } from "../generated/Citizenship/Citizenship"
import { handleRegistered } from "../src/citizenship"
import { createRegisteredEvent } from "./citizenship-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let citizenAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let citizenId = "Example string value"
    let citizenAge = 123
    let newRegisteredEvent = createRegisteredEvent(
      citizenAddress,
      citizenId,
      citizenAge
    )
    handleRegistered(newRegisteredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Registered created and stored", () => {
    assert.entityCount("Registered", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Registered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "citizenAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Registered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "citizenId",
      "Example string value"
    )
    assert.fieldEquals(
      "Registered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "citizenAge",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
