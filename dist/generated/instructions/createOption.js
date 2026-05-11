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
exports.createOption = createOption;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
exports.layout = borsh.struct([
    borsh.u64("nonce"),
    types.OptionType.layout("option_type"),
    borsh.u8("asset"),
    borsh.i8("direction"),
    borsh.u64("strike"),
    borsh.i64("expiry_ts"),
    borsh.u64("payoff_amount"),
    borsh.u8("settlement_decimals"),
    borsh.u64("upper_bound"),
    borsh.f64("extra_param"),
    borsh.i64("spot_at_creation"),
    borsh.f64("sigma_at_creation"),
]);
function createOption(args, accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.option, isSigner: false, isWritable: true },
        { pubkey: accounts.creator, isSigner: true, isWritable: true },
        { pubkey: accounts.underlying_feed, isSigner: false, isWritable: false },
        { pubkey: accounts.settlement_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
        { pubkey: accounts.metadata_pda, isSigner: false, isWritable: true },
        {
            pubkey: accounts.mpl_token_metadata_program,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: accounts.rent, isSigner: false, isWritable: false },
        { pubkey: accounts.governance, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([226, 92, 124, 94, 113, 96, 60, 172]);
    const buffer = Buffer.alloc(1000);
    const len = exports.layout.encode({
        nonce: args.nonce,
        option_type: args.option_type.toEncodable(),
        asset: args.asset,
        direction: args.direction,
        strike: args.strike,
        expiry_ts: args.expiry_ts,
        payoff_amount: args.payoff_amount,
        settlement_decimals: args.settlement_decimals,
        upper_bound: args.upper_bound,
        extra_param: args.extra_param,
        spot_at_creation: args.spot_at_creation,
        sigma_at_creation: args.sigma_at_creation,
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=createOption.js.map