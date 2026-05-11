"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalizeComboIntent = finalizeComboIntent;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function finalizeComboIntent(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.buyer, isSigner: true, isWritable: true },
        { pubkey: accounts.combo, isSigner: false, isWritable: true },
        { pubkey: accounts.usdc_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
        { pubkey: accounts.buyer_ata, isSigner: false, isWritable: true },
        { pubkey: accounts.combo_escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.token_program, isSigner: false, isWritable: false },
        { pubkey: accounts.governance, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([243, 150, 213, 158, 227, 120, 50, 182]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=finalizeComboIntent.js.map