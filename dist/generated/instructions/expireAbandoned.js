"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expireAbandoned = expireAbandoned;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function expireAbandoned(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.option, isSigner: false, isWritable: true },
        { pubkey: accounts.caller, isSigner: true, isWritable: false },
        {
            pubkey: accounts.escrow_token_account,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: accounts.creator_refund_token_account,
            isSigner: false,
            isWritable: true,
        },
        { pubkey: accounts.settlement_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
        { pubkey: accounts.token_program, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([176, 172, 83, 185, 254, 191, 175, 67]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=expireAbandoned.js.map