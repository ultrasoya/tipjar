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
            const { donateContract, otherAccount, thirdAccount } = await loadFixture(deployDonateFixture);

            expect(await donateContract.totalDonations()).to.equal(0n);

            const donationAmount = ethers.parseEther("1");
            await donateContract.connect(otherAccount).donate("name", "msg", { value: donationAmount });

            expect(await donateContract.totalDonations()).to.equal(donationAmount);

            const donationAmount2 = ethers.parseEther("0.5");
            await donateContract.connect(thirdAccount).donate("name", "msg", { value: donationAmount2 });

            expect(await donateContract.totalDonations()).to.equal(donationAmount + donationAmount2);
        })
        it("Should correctly track donations for a specific address", async function () {
            const { donateContract, otherAccount, thirdAccount } = await loadFixture(deployDonateFixture);

            expect(await donateContract.addressToDonate(otherAccount.address)).to.equal(0n);

            const donationAmount1 = ethers.parseEther("1");
            await donateContract.connect(otherAccount).donate("name1", "msg1", { value: donationAmount1 });
            expect(await donateContract.addressToDonate(otherAccount.address)).to.equal(donationAmount1);

            const donationAmount2 = ethers.parseEther("0.5");
            await donateContract.connect(otherAccount).donate("name2", "msg2", { value: donationAmount2 });
            expect(await donateContract.addressToDonate(otherAccount.address)).to.equal(donationAmount1 + donationAmount2);

            expect(await donateContract.addressToDonate(thirdAccount.address)).to.equal(0n);
        })
    })

    describe("Events", function () {
       it("Should emit a NewDonation event when a donation is made", async function () {
            const { donateContract, otherAccount } = await loadFixture(deployDonateFixture);

            const donationAmount = ethers.parseEther("1");
            await expect(donateContract.connect(otherAccount).donate("name", "msg", { value: donationAmount })).to.emit(donateContract, "NewDonation")
            .withArgs(otherAccount.address, "name", "msg", donationAmount);
       }) 
    })

    describe("Withdraw", function () {
        it("Should revert if the caller is not the owner", async function () {
            const { donateContract, otherAccount } = await loadFixture(deployDonateFixture);

            await expect(donateContract.connect(otherAccount).withdraw()).to.be.revertedWithCustomError(donateContract, "NotOwner");
        })
        it("Should transfer the funds to the owner", async function () {
            const { donateContract, owner, otherAccount } = await loadFixture(deployDonateFixture);

           const donationAmount = ethers.parseEther("1");
           await donateContract.connect(otherAccount).donate("name", "msg", { value: donationAmount });

           await expect(donateContract.connect(owner).withdraw()).to.changeEtherBalances([owner, donateContract], [donationAmount, -donationAmount]);
        })
        it("Should not revert if the balance is 0", async function () {
            const { donateContract, owner } = await loadFixture(deployDonateFixture);

            await expect(donateContract.connect(owner).withdraw()).to.not.be.reverted;
        })
    })

    describe("Donate", function () {
        it("Should revert if the donation amount is equal to 0", async function () {
            const { donateContract, otherAccount } = await loadFixture(deployDonateFixture);

            await expect(donateContract.connect(otherAccount).donate("name", "msg", { value: 0n })).to.be.revertedWithCustomError(donateContract, "InsuffientBalance");
        })
    })
})