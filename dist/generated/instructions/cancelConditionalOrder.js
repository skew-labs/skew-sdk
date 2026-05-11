"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelConditionalOrder = cancelConditionalOrder;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function cancelConditionalOrder(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.authority, isSigner: true, isWritable: true },
        { pubkey: accounts.order, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([82, 104, 25, 51, 248, 54, 66, 184]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=cancelConditionalOrder.js.map