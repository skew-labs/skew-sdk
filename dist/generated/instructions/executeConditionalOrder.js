"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeConditionalOrder = executeConditionalOrder;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function executeConditionalOrder(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.caller, isSigner: true, isWritable: true },
        { pubkey: accounts.order, isSigner: false, isWritable: true },
        { pubkey: accounts.trigger_oracle, isSigner: false, isWritable: false },
        { pubkey: accounts.action_target, isSigner: false, isWritable: false },
        { pubkey: accounts.linked_order, isSigner: false, isWritable: true },
        { pubkey: accounts.governance, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([41, 108, 144, 244, 28, 207, 141, 254]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=executeConditionalOrder.js.map