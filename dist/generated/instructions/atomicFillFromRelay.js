"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.layout = void 0;
exports.atomicFillFromRelay = atomicFillFromRelay;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
exports.layout = borsh.struct([types.RelayPayload.layout("payload")]);
function atomicFillFromRelay(args, accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.option, isSigner: false, isWritable: true },
        { pubkey: accounts.seller_cm, isSigner: false, isWritable: true },
        { pubkey: accounts.rfq_maker_registry, isSigner: false, isWritable: true },
        { pubkey: accounts.position_registry, isSigner: false, isWritable: true },
        { pubkey: accounts.buyer, isSigner: true, isWritable: true },
        { pubkey: accounts.settlement_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
        { pubkey: accounts.buyer_premium_ata, isSigner: false, isWritable: true },
        { pubkey: accounts.seller_premium_ata, isSigner: false, isWritable: true },
        { pubkey: accounts.fee_accumulator, isSigner: false, isWritable: true },
        { pubkey: accounts.fee_authority, isSigner: false, isWritable: false },
        {
            pubkey: accounts.seller_collateral_ata,
            isSigner: false,
            isWritable: true,
        },
        { pubkey: accounts.option_escrow, isSigner: false, isWritable: true },
        {
            pubkey: accounts.option_collateral_lock,
            isSigner: false,
            isWritable: true,
        },
        { pubkey: accounts.series_listing, isSigner: false, isWritable: true },
        { pubkey: accounts.option_token_mint, isSigner: false, isWritable: true },
        {
            pubkey: accounts.buyer_option_token_ata,
            isSigner: false,
            isWritable: true,
        },
        { pubkey: accounts.pyth_price, isSigner: false, isWritable: false },
        { pubkey: accounts.swb_aggregator, isSigner: false, isWritable: false },
        {
            pubkey: accounts.instructions_sysvar,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
        { pubkey: accounts.token_program, isSigner: false, isWritable: false },
        {
            pubkey: accounts.associated_token_program,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: accounts.governance, isSigner: false, isWritable: false },
        {
            pubkey: accounts.buyer_volume_tracker,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: accounts.seller_volume_tracker,
            isSigner: false,
            isWritable: true,
        },
        { pubkey: accounts.fee_config, isSigner: false, isWritable: false },
        { pubkey: accounts.builder_code, isSigner: false, isWritable: true },
        { pubkey: accounts.builder_escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.lst_vault, isSigner: false, isWritable: true },
        { pubkey: accounts.lst_vault_ata, isSigner: false, isWritable: true },
        { pubkey: accounts.jitosol_stake_pool, isSigner: false, isWritable: false },
        { pubkey: accounts.native_sol_vault, isSigner: false, isWritable: true },
        {
            pubkey: accounts.native_sol_vault_ata,
            isSigner: false,
            isWritable: true,
        },
    ];
    const identifier = Buffer.from([251, 160, 84, 11, 62, 3, 74, 250]);
    const buffer = Buffer.alloc(1000);
    const len = exports.layout.encode({
        payload: types.RelayPayload.toEncodable(args.payload),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=atomicFillFromRelay.js.map