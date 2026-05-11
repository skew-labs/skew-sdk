"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeRfqMakerRegistry = closeRfqMakerRegistry;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function closeRfqMakerRegistry(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.mm, isSigner: true, isWritable: true },
        { pubkey: accounts.registry, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([3, 76, 1, 94, 168, 89, 166, 213]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=closeRfqMakerRegistry.js.map