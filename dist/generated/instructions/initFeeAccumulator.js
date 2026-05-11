"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFeeAccumulator = initFeeAccumulator;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function initFeeAccumulator(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.fee_accumulator, isSigner: false, isWritable: true },
        { pubkey: accounts.fee_authority, isSigner: false, isWritable: false },
        { pubkey: accounts.settlement_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
        { pubkey: accounts.token_program, isSigner: false, isWritable: false },
        { pubkey: accounts.rent, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([60, 176, 74, 42, 20, 237, 153, 206]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=initFeeAccumulator.js.map