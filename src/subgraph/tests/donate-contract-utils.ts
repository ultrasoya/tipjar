import { newMockEvent } from "matchstick-as";
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts";
import { NewDonation } from "../generated/DonateContract/DonateContract";

export function createNewDonationEvent(
  donor: Address,
  name: string,
  message: string,
  amount: BigInt
): NewDonation {
  const newDonationEvent = changetype<NewDonation>(newMockEvent());

  newDonationEvent.parameters = [];

  newDonationEvent.parameters.push(
    new ethereum.EventParam("donor", ethereum.Value.fromAddress(donor))
  );
  newDonationEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  );
  newDonationEvent.parameters.push(
    new ethereum.EventParam("message", ethereum.Value.fromString(message))
  );
  newDonationEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  );

  return newDonationEvent;
}
