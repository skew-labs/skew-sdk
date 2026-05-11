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
exports.updateSkewMetrics = updateSkewMetrics;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
exports.layout = borsh.struct([
    borsh.u8("asset"),
    borsh.u64("atm_iv_28d_micro"),
    borsh.i64("rr25_micro"),
    borsh.i64("bf25_micro"),
    borsh.i64("rr10_micro"),
    borsh.i64("atm_slope_micro"),
    borsh.u64("iv_7d_micro"),
    borsh.u64("iv_14d_micro"),
    borsh.u64("iv_21d_micro"),
    borsh.u64("iv_28d_micro"),
    borsh.u64("iv_60d_micro"),
    borsh.u64("iv_90d_micro"),
    borsh.u64("iv_180d_micro"),
    borsh.u64("iv_365d_micro"),
]);
function updateSkewMetrics(args, accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.authority, isSigner: true, isWritable: true },
        { pubkey: accounts.skew_metrics, isSigner: false, isWritable: true },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([96, 124, 131, 43, 23, 210, 93, 92]);
    const buffer = Buffer.alloc(1000);
    const len = exports.layout.encode({
        asset: args.asset,
        atm_iv_28d_micro: args.atm_iv_28d_micro,
        rr25_micro: args.rr25_micro,
        bf25_micro: args.bf25_micro,
        rr10_micro: args.rr10_micro,
        atm_slope_micro: args.atm_slope_micro,
        iv_7d_micro: args.iv_7d_micro,
        iv_14d_micro: args.iv_14d_micro,
        iv_21d_micro: args.iv_21d_micro,
        iv_28d_micro: args.iv_28d_micro,
        iv_60d_micro: args.iv_60d_micro,
        iv_90d_micro: args.iv_90d_micro,
        iv_180d_micro: args.iv_180d_micro,
        iv_365d_micro: args.iv_365d_micro,
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=updateSkewMetrics.js.map