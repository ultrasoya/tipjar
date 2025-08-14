const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DonateContract", function () {
    async function deployDonateFixture() {
        const [owner, otherAccount, thirdAccount] = await ethers.getSigners();

        const DonateContract = await ethers.getContractFactory("DonateContract");
        const donateContract = await DonateContract.deploy();

        return { donateContract, owner, otherAccount, thirdAccount };
    }

    describe("Deployment", function () {
        it("Should set the correct i_owner", async function () {
            const { donateContract, owner } = await loadFixture(deployDonateFixture);

            expect(await donateContract.i_owner()).to.equal(owner.address);
        })
        it("Should set the correct totalDonations", async function () {
            const { donateContract, otherAccount } = await loadFixture(deployDonateFixture);

            expect(await donateContract.totalDonations()).to.equal(0n);

            const donationAmount = ethers.parseEther("1");
            await donateContract.connect(otherAccount).donate("name", "msg", { value: donationAmount });

            expect(await donateContract.totalDonations()).to.equal(donationAmount);
        })
        it("Should correctly track donations for a specific address", async function () {
            const { donateContract, otherAccount, thirdAccount } = await loadFixture(deployDonateFixture);

            expect(await donateContract.addressToDonate(otherAccount.address).to.equal(0n));

            const donationAmount1 = ethers.parseEther("1");
            await donateContract.connect(otherAccount).donate("name1", "msg1", { value: donationAmount1 });
            expect(await donateContract.addressToDonate(otherAccount.address).to.equal(donationAmount1));

            const donationAmount2 = ethers.parseEther("0.5");
            await donateContract.connect(otherAccount).donate("name2", "msg2", { value: donationAmount2 });
            expect(await donateContract.addressToDonate(otherAccount.address).to.equal(donationAmount1 + donationAmount2));

            expect(await donateContract.addressToDonate(thirdAccount.address).to.equal(0n));
        })
    })

    describe("Events", function () {
        
    })
})