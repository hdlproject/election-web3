import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  CitizenRegistered,
  OwnerAdded,
  OwnerRemoved,
  OwnershipTransferred,
  PresidentChanged,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked
} from "../generated/Citizenship/Citizenship"

export function createCitizenRegisteredEvent(
  citizenAddress: Address,
  citizenId: string,
  citizenAge: i32
): CitizenRegistered {
  let citizenRegisteredEvent = changetype<CitizenRegistered>(newMockEvent())

  citizenRegisteredEvent.parameters = new Array()

  citizenRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "citizenAddress",
      ethereum.Value.fromAddress(citizenAddress)
    )
  )
  citizenRegisteredEvent.parameters.push(
    new ethereum.EventParam("citizenId", ethereum.Value.fromString(citizenId))
  )
  citizenRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "citizenAge",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(citizenAge))
    )
  )

  return citizenRegisteredEvent
}

export function createOwnerAddedEvent(ownerAddress: Address): OwnerAdded {
  let ownerAddedEvent = changetype<OwnerAdded>(newMockEvent())

  ownerAddedEvent.parameters = new Array()

  ownerAddedEvent.parameters.push(
    new ethereum.EventParam(
      "ownerAddress",
      ethereum.Value.fromAddress(ownerAddress)
    )
  )

  return ownerAddedEvent
}

export function createOwnerRemovedEvent(ownerAddress: Address): OwnerRemoved {
  let ownerRemovedEvent = changetype<OwnerRemoved>(newMockEvent())

  ownerRemovedEvent.parameters = new Array()

  ownerRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "ownerAddress",
      ethereum.Value.fromAddress(ownerAddress)
    )
  )

  return ownerRemovedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPresidentChangedEvent(
  oldPresidentAddress: Address,
  newPresidentAddress: Address
): PresidentChanged {
  let presidentChangedEvent = changetype<PresidentChanged>(newMockEvent())

  presidentChangedEvent.parameters = new Array()

  presidentChangedEvent.parameters.push(
    new ethereum.EventParam(
      "oldPresidentAddress",
      ethereum.Value.fromAddress(oldPresidentAddress)
    )
  )
  presidentChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newPresidentAddress",
      ethereum.Value.fromAddress(newPresidentAddress)
    )
  )

  return presidentChangedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}
