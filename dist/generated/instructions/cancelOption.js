"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOption = cancelOption;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function cancelOption(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.option, isSigner: false, isWritable: true },
        { pubkey: accounts.creator, isSigner: true, isWritable: true },
        {
            pubkey: accounts.escrow_token_account,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: accounts.creator_token_account,
            isSigner: false,
            isWritable: true,
        },
        { pubkey: accounts.settlement_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
        { pubkey: accounts.token_program, isSigner: false, isWritable: false },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([176, 215, 7, 71, 184, 200, 241, 217]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=cancelOption.js.map