"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyCloseIsolatedAction = applyCloseIsolatedAction;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function applyCloseIsolatedAction(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.user, isSigner: true, isWritable: true },
        { pubkey: accounts.order, isSigner: false, isWritable: true },
        { pubkey: accounts.option, isSigner: false, isWritable: false },
        { pubkey: accounts.vault, isSigner: false, isWritable: true },
        { pubkey: accounts.usdc_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
        { pubkey: accounts.user_ata, isSigner: false, isWritable: true },
        { pubkey: accounts.vault_escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.token_program, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([76, 86, 108, 101, 41, 91, 246, 84]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=applyCloseIsolatedAction.js.map