import { Registered as RegisteredEvent } from "../generated/Citizenship/Citizenship"
import { Registered } from "../generated/schema"

export function handleRegistered(event: RegisteredEvent): void {
  let entity = new Registered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.citizenAddress = event.params.citizenAddress
  entity.citizenId = event.params.citizenId
  entity.citizenAge = event.params.citizenAge

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
