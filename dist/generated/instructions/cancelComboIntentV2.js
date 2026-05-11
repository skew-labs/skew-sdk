"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelComboIntentV2 = cancelComboIntentV2;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function cancelComboIntentV2(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.buyer, isSigner: true, isWritable: true },
        { pubkey: accounts.intent, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([148, 206, 194, 101, 44, 33, 215, 232]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=cancelComboIntentV2.js.map