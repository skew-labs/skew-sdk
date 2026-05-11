"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupExpiredComboV2 = cleanupExpiredComboV2;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function cleanupExpiredComboV2(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.buyer, isSigner: false, isWritable: true },
        { pubkey: accounts.caller, isSigner: true, isWritable: true },
        { pubkey: accounts.intent, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([175, 29, 88, 232, 28, 155, 87, 155]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=cleanupExpiredComboV2.js.map