"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashRfqMaker = slashRfqMaker;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function slashRfqMaker(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.slasher, isSigner: true, isWritable: true },
        { pubkey: accounts.registry, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([177, 23, 196, 81, 75, 43, 225, 146]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=slashRfqMaker.js.map