"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRfqMaker = registerRfqMaker;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function registerRfqMaker(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.mm, isSigner: true, isWritable: true },
        { pubkey: accounts.registry, isSigner: false, isWritable: true },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([204, 11, 32, 119, 47, 224, 88, 224]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=registerRfqMaker.js.map