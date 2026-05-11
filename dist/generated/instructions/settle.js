"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settle = settle;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function settle(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.option, isSigner: false, isWritable: true },
        { pubkey: accounts.caller, isSigner: true, isWritable: true },
        { pubkey: accounts.pyth_price, isSigner: false, isWritable: false },
        {
            pubkey: accounts.escrow_token_account,
            isSigner: false,
            isWritable: true,
        },
        { pubkey: accounts.option_token_mint, isSigner: false, isWritable: false },
        {
            pubkey: accounts.current_holder_option_ata,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: accounts.payoff_token_account,
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
        { pubkey: accounts.creator_cm, isSigner: false, isWritable: true },
        { pubkey: accounts.position_registry, isSigner: false, isWritable: true },
        {
            pubkey: accounts.creator_cm_collateral_ata,
            isSigner: false,
            isWritable: true,
        },
        { pubkey: accounts.swb_aggregator, isSigner: false, isWritable: false },
        { pubkey: accounts.fee_accumulator, isSigner: false, isWritable: true },
        { pubkey: accounts.fee_authority, isSigner: false, isWritable: false },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
        { pubkey: accounts.rent, isSigner: false, isWritable: false },
        {
            pubkey: accounts.option_collateral_lock,
            isSigner: false,
            isWritable: true,
        },
        { pubkey: accounts.lst_vault, isSigner: false, isWritable: true },
        { pubkey: accounts.lst_vault_ata, isSigner: false, isWritable: true },
        { pubkey: accounts.native_sol_vault, isSigner: false, isWritable: true },
        {
            pubkey: accounts.native_sol_vault_ata,
            isSigner: false,
            isWritable: true,
        },
        { pubkey: accounts.holder_cm, isSigner: false, isWritable: true },
        {
            pubkey: accounts.holder_position_registry,
            isSigner: false,
            isWritable: true,
        },
    ];
    const identifier = Buffer.from([175, 42, 185, 87, 144, 131, 102, 212]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=settle.js.map