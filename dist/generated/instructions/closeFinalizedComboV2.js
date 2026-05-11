"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeFinalizedComboV2 = closeFinalizedComboV2;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function closeFinalizedComboV2(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.buyer, isSigner: true, isWritable: true },
        { pubkey: accounts.intent, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([225, 124, 237, 164, 214, 144, 208, 215]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=closeFinalizedComboV2.js.map