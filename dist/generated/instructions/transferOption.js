"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferOption = transferOption;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function transferOption(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.option, isSigner: false, isWritable: true },
        { pubkey: accounts.current_holder, isSigner: true, isWritable: true },
        {
            pubkey: accounts.current_holder_option_ata,
            isSigner: false,
            isWritable: true,
        },
        { pubkey: accounts.new_holder, isSigner: false, isWritable: false },
        {
            pubkey: accounts.new_holder_option_ata,
            isSigner: false,
            isWritable: true,
        },
        { pubkey: accounts.option_token_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
        { pubkey: accounts.token_program, isSigner: false, isWritable: false },
        {
            pubkey: accounts.associated_token_program,
            isSigner: false,
            isWritable: false,
        },
    ];
    const identifier = Buffer.from([166, 82, 240, 67, 23, 249, 34, 105]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=transferOption.js.map