"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rfqMakerReallocV2 = rfqMakerReallocV2;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function rfqMakerReallocV2(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.mm, isSigner: true, isWritable: true },
        { pubkey: accounts.registry, isSigner: false, isWritable: true },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([188, 154, 252, 27, 161, 150, 8, 167]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=rfqMakerReallocV2.js.map