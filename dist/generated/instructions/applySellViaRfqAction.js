"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySellViaRfqAction = applySellViaRfqAction;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function applySellViaRfqAction(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.user, isSigner: true, isWritable: true },
        { pubkey: accounts.order, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([1, 205, 226, 220, 35, 182, 210, 116]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=applySellViaRfqAction.js.map