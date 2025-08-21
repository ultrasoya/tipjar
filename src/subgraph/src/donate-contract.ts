import { NewDonation as NewDonationEvent } from "../generated/DonateContract/DonateContract";
import { NewDonation } from "../generated/schema";

export function handleNewDonation(event: NewDonationEvent): void {
  const entity = new NewDonation(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.donor = event.params.donor;
  entity.name = event.params.name;
  entity.message = event.params.message;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
