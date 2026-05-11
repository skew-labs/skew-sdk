"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeRfqAuction = closeRfqAuction;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function closeRfqAuction(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.refund_target, isSigner: false, isWritable: true },
        { pubkey: accounts.auction, isSigner: false, isWritable: true },
        { pubkey: accounts.escrow_ata, isSigner: false, isWritable: true },
        { pubkey: accounts.token_program, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([6, 168, 35, 111, 104, 196, 224, 159]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=closeRfqAuction.js.map