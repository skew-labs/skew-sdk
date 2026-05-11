"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyBuybackViaRfqAction = applyBuybackViaRfqAction;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function applyBuybackViaRfqAction(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.user, isSigner: true, isWritable: true },
        { pubkey: accounts.order, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([225, 146, 55, 70, 93, 250, 217, 26]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=applyBuybackViaRfqAction.js.map