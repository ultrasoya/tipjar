import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { handleNewDonation } from "../src/donate-contract";
import { createNewDonationEvent } from "./donate-contract-utils";


describe("Describe entity assertions", () => {
  beforeAll(() => {
    const donor = Address.fromString("0x0000000000000000000000000000000000000001");
    const name = "Example string value";
    const message = "Example string value";
    const amount = BigInt.fromI32(234);
    const newNewDonationEvent = createNewDonationEvent(
      donor,
      name,
      message,
      amount
    );
    handleNewDonation(newNewDonationEvent);
  });

  afterAll(() => {
    clearStore();
  });


  test("NewDonation created and stored", () => {
    assert.entityCount("NewDonation", 1);

    assert.fieldEquals(
      "NewDonation",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "donor",
      "0x0000000000000000000000000000000000000001"
    );
    assert.fieldEquals(
      "NewDonation",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    );
    assert.fieldEquals(
      "NewDonation",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "message",
      "Example string value"
    );
    assert.fieldEquals(
      "NewDonation",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    );

  });
});
