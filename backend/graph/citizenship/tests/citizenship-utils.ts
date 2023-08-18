import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { Registered } from "../generated/Citizenship/Citizenship"

export function createRegisteredEvent(
  citizenAddress: Address,
  citizenId: string,
  citizenAge: i32
): Registered {
  let registeredEvent = changetype<Registered>(newMockEvent())

  registeredEvent.parameters = new Array()

  registeredEvent.parameters.push(
    new ethereum.EventParam(
      "citizenAddress",
      ethereum.Value.fromAddress(citizenAddress)
    )
  )
  registeredEvent.parameters.push(
    new ethereum.EventParam("citizenId", ethereum.Value.fromString(citizenId))
  )
  registeredEvent.parameters.push(
    new ethereum.EventParam(
      "citizenAge",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(citizenAge))
    )
  )

  return registeredEvent
}
