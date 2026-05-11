"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeSigmaIv = closeSigmaIv;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function closeSigmaIv(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.sigma_iv_pda, isSigner: false, isWritable: true },
        { pubkey: accounts.authority, isSigner: true, isWritable: true },
    ];
    const identifier = Buffer.from([92, 144, 237, 110, 48, 207, 138, 81]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=closeSigmaIv.js.map