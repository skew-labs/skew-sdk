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
exports.registerComboIntent = registerComboIntent;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
exports.layout = borsh.struct([
    borsh.u64("combo_id"),
    borsh.u8("n_legs"),
    borsh.array(borsh.publicKey(), 4, "leg_options"),
    borsh.array(borsh.i8(), 4, "leg_sides"),
    borsh.array(borsh.u64(), 4, "leg_max_premiums"),
    borsh.u64("total_max_premium_micro"),
    borsh.i64("expiry_ts"),
]);
function registerComboIntent(args, accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.buyer, isSigner: true, isWritable: true },
        { pubkey: accounts.combo, isSigner: false, isWritable: true },
        { pubkey: accounts.usdc_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
        { pubkey: accounts.buyer_ata, isSigner: false, isWritable: true },
        { pubkey: accounts.combo_escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.token_program, isSigner: false, isWritable: false },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
        { pubkey: accounts.rent, isSigner: false, isWritable: false },
        { pubkey: accounts.governance, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([118, 118, 107, 249, 224, 125, 130, 178]);
    const buffer = Buffer.alloc(1000);
    const len = exports.layout.encode({
        combo_id: args.combo_id,
        n_legs: args.n_legs,
        leg_options: args.leg_options,
        leg_sides: args.leg_sides,
        leg_max_premiums: args.leg_max_premiums,
        total_max_premium_micro: args.total_max_premium_micro,
        expiry_ts: args.expiry_ts,
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=registerComboIntent.js.map