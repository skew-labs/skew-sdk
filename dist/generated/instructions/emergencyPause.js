"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emergencyPause = emergencyPause;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function emergencyPause(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.authority, isSigner: true, isWritable: true },
        { pubkey: accounts.emergency, isSigner: false, isWritable: true },
        { pubkey: accounts.governance, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([21, 143, 27, 142, 200, 181, 210, 255]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=emergencyPause.js.map