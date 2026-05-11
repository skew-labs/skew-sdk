"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markDisputed = markDisputed;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function markDisputed(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.option, isSigner: false, isWritable: true },
        { pubkey: accounts.caller, isSigner: true, isWritable: false },
    ];
    const identifier = Buffer.from([136, 86, 152, 120, 3, 21, 223, 251]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=markDisputed.js.map