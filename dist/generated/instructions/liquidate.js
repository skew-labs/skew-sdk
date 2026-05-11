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
exports.liquidate = liquidate;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
exports.layout = borsh.struct([
    borsh.u16("close_factor_bps"),
    borsh.u16("min_expected_bonus_bps"),
]);
function liquidate(args, accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.liq_state, isSigner: false, isWritable: true },
        { pubkey: accounts.option, isSigner: false, isWritable: true },
        { pubkey: accounts.defaulting_cm, isSigner: false, isWritable: true },
        { pubkey: accounts.position_registry, isSigner: false, isWritable: true },
        { pubkey: accounts.insurance_fund, isSigner: false, isWritable: true },
        { pubkey: accounts.option_escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.cm_escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.if_escrow, isSigner: false, isWritable: true },
        {
            pubkey: accounts.liquidator_payout_ata,
            isSigner: false,
            isWritable: true,
        },
        { pubkey: accounts.settlement_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
        { pubkey: accounts.liquidator, isSigner: true, isWritable: true },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
        { pubkey: accounts.token_program, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([223, 179, 226, 125, 48, 46, 39, 74]);
    const buffer = Buffer.alloc(1000);
    const len = exports.layout.encode({
        close_factor_bps: args.close_factor_bps,
        min_expected_bonus_bps: args.min_expected_bonus_bps,
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=liquidate.js.map