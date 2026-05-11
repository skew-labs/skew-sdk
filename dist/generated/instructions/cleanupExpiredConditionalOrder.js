"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupExpiredConditionalOrder = cleanupExpiredConditionalOrder;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function cleanupExpiredConditionalOrder(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.authority, isSigner: false, isWritable: true },
        { pubkey: accounts.caller, isSigner: true, isWritable: true },
        { pubkey: accounts.order, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([195, 119, 237, 107, 136, 207, 221, 163]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=cleanupExpiredConditionalOrder.js.map