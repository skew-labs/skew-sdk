"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callVariationMarginCached = callVariationMarginCached;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function callVariationMarginCached(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.keeper, isSigner: true, isWritable: false },
        { pubkey: accounts.cm, isSigner: false, isWritable: true },
        { pubkey: accounts.cm_risk_cache, isSigner: false, isWritable: false },
        { pubkey: accounts.position_registry, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([147, 116, 42, 74, 170, 252, 157, 238]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=callVariationMarginCached.js.map