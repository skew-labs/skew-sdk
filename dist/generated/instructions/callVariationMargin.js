"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callVariationMargin = callVariationMargin;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function callVariationMargin(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.keeper, isSigner: true, isWritable: false },
        { pubkey: accounts.cm, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([37, 81, 195, 140, 16, 66, 243, 159]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=callVariationMargin.js.map