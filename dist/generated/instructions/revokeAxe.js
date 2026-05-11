"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeAxe = revokeAxe;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function revokeAxe(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.mm, isSigner: true, isWritable: true },
        { pubkey: accounts.axe, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([100, 117, 58, 248, 203, 241, 125, 26]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=revokeAxe.js.map