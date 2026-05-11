"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerOptionMetadata = registerOptionMetadata;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function registerOptionMetadata(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.caller, isSigner: true, isWritable: true },
        { pubkey: accounts.option, isSigner: false, isWritable: true },
        { pubkey: accounts.option_token_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.metadata_pda, isSigner: false, isWritable: true },
        {
            pubkey: accounts.mpl_token_metadata_program,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
        { pubkey: accounts.token_program, isSigner: false, isWritable: false },
        { pubkey: accounts.rent, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([134, 198, 76, 204, 130, 110, 247, 179]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=registerOptionMetadata.js.map