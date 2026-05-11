"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeBuilderCode = closeBuilderCode;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function closeBuilderCode(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.builder_code, isSigner: false, isWritable: true },
        { pubkey: accounts.builder, isSigner: true, isWritable: true },
        {
            pubkey: accounts.builder_token_account,
            isSigner: false,
            isWritable: true,
        },
        { pubkey: accounts.builder_escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.fee_authority, isSigner: false, isWritable: false },
        { pubkey: accounts.settlement_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
        { pubkey: accounts.token_program, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([183, 242, 248, 227, 160, 78, 223, 144]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=closeBuilderCode.js.map