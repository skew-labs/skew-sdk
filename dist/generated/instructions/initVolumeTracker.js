"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initVolumeTracker = initVolumeTracker;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function initVolumeTracker(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.volume_tracker, isSigner: false, isWritable: true },
        { pubkey: accounts.authority, isSigner: true, isWritable: true },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([34, 150, 184, 192, 179, 167, 32, 68]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=initVolumeTracker.js.map