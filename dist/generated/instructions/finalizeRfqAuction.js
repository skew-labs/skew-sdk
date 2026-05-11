"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalizeRfqAuction = finalizeRfqAuction;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function finalizeRfqAuction(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.caller, isSigner: true, isWritable: true },
        { pubkey: accounts.auction, isSigner: false, isWritable: true },
        { pubkey: accounts.usdc_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
        { pubkey: accounts.escrow_ata, isSigner: false, isWritable: true },
        { pubkey: accounts.buyer_usdc_ata, isSigner: false, isWritable: true },
        { pubkey: accounts.token_program, isSigner: false, isWritable: false },
        { pubkey: accounts.governance, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([200, 244, 107, 69, 79, 161, 2, 186]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=finalizeRfqAuction.js.map