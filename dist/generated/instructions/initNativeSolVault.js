"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initNativeSolVault = initNativeSolVault;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function initNativeSolVault(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.vault, isSigner: false, isWritable: true },
        { pubkey: accounts.user, isSigner: true, isWritable: true },
        { pubkey: accounts.wsol_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.vault_ata, isSigner: false, isWritable: true },
        { pubkey: accounts.token_program, isSigner: false, isWritable: false },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
        { pubkey: accounts.rent, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([7, 161, 184, 100, 178, 56, 37, 115]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=initNativeSolVault.js.map