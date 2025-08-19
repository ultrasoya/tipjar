import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { NewDonation } from "../generated/schema"
import { NewDonation as NewDonationEvent } from "../generated/DonateContract/DonateContract"
import { handleNewDonation } from "../src/donate-contract"
import { createNewDonationEvent } from "./donate-contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let donor = Address.fromString("0x0000000000000000000000000000000000000001")
    let name = "Example string value"
    let message = "Example string value"
    let amount = BigInt.fromI32(234)
    let newNewDonationEvent = createNewDonationEvent(
      donor,
      name,
      message,
      amount
    )
    handleNewDonation(newNewDonationEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("NewDonation created and stored", () => {
    assert.entityCount("NewDonation", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewDonation",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "donor",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "NewDonation",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "NewDonation",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "message",
      "Example string value"
    )
    assert.fieldEquals(
      "NewDonation",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
