"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmReallocV2 = cmReallocV2;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function cmReallocV2(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.authority, isSigner: true, isWritable: true },
        { pubkey: accounts.cm, isSigner: false, isWritable: true },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([106, 155, 90, 12, 20, 34, 255, 12]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=cmReallocV2.js.map