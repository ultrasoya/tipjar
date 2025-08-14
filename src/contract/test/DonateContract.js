const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("DonateContract", function () {
    async function deployDonateFixture() {
        const [owner, otherAccount] = await ethers.getSigners();

        const DonateContract = await ethers.getContractFactory("DonateContract");
        const donateContract = await DonateContract.deploy({ totalDonations, addressToDonate });

        return { donateContract, owner, otherAccount, totalDonations, addressToDonate };
    }

    describe("Deployment", function () {
        it("Should set the correct i_owner", async function () {
            const { donateContract, owner } = await loadFixture(deployDonateFixture);

            expect(await donateContract.i_owner()).to.equal(owner.address);
        })
        it("Should set the correct totalDonations", async function () {
            const { donateContract, otherAccount } = await loadFixture(deployDonateFixture);

            expect(await donateContract.totalDonations()).to.equal(0);

            await donateContract.connect(otherAccount).donate("name", "msg", { value: ethers.parseEther("1") });
            expect(await donateContract.totalDonations()).to.equal(ethers.parseEther("1"));
        })
        it("Should set the correct addressToDonate", async function () {
            const { donateContract, otherAccount } = await loadFixture(deployDonateFixture);
        })
    })
})