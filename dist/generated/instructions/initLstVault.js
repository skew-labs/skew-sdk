"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLstVault = initLstVault;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function initLstVault(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.vault, isSigner: false, isWritable: true },
        { pubkey: accounts.user, isSigner: true, isWritable: true },
        { pubkey: accounts.lst_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.vault_ata, isSigner: false, isWritable: true },
        { pubkey: accounts.token_program, isSigner: false, isWritable: false },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
        { pubkey: accounts.rent, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([32, 243, 158, 121, 123, 202, 97, 27]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=initLstVault.js.map