"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delistSeries = delistSeries;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function delistSeries(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.caller, isSigner: true, isWritable: true },
        { pubkey: accounts.series, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([36, 18, 160, 107, 234, 23, 238, 162]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=delistSeries.js.map