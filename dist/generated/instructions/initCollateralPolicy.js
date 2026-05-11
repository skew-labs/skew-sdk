"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCollateralPolicy = initCollateralPolicy;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function initCollateralPolicy(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.authority, isSigner: true, isWritable: true },
        { pubkey: accounts.policy, isSigner: false, isWritable: true },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([113, 20, 168, 251, 28, 130, 75, 9]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=initCollateralPolicy.js.map