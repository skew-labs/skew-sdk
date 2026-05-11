"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupExpiredEmergency = cleanupExpiredEmergency;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function cleanupExpiredEmergency(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.caller, isSigner: true, isWritable: false },
        { pubkey: accounts.emergency, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([132, 167, 106, 81, 208, 126, 122, 232]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=cleanupExpiredEmergency.js.map