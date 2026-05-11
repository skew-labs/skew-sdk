"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeOptionCollateralLock = closeOptionCollateralLock;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function closeOptionCollateralLock(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.lock, isSigner: false, isWritable: true },
        { pubkey: accounts.caller, isSigner: true, isWritable: false },
        { pubkey: accounts.refund, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([99, 170, 118, 24, 119, 176, 120, 176]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=closeOptionCollateralLock.js.map