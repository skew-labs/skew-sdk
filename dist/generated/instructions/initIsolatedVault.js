"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initIsolatedVault = initIsolatedVault;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function initIsolatedVault(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.user, isSigner: true, isWritable: true },
        { pubkey: accounts.option, isSigner: false, isWritable: false },
        { pubkey: accounts.vault, isSigner: false, isWritable: true },
        { pubkey: accounts.usdc_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
        { pubkey: accounts.vault_escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.token_program, isSigner: false, isWritable: false },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
        { pubkey: accounts.rent, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([182, 255, 53, 241, 12, 198, 169, 227]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=initIsolatedVault.js.map