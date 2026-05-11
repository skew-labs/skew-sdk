"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCmRiskCache = initCmRiskCache;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function initCmRiskCache(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.cm, isSigner: false, isWritable: false },
        { pubkey: accounts.cm_risk_cache, isSigner: false, isWritable: true },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([31, 191, 153, 104, 167, 75, 246, 108]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=initCmRiskCache.js.map