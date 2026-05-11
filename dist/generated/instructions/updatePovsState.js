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
exports.updatePovsState = updatePovsState;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
exports.layout = borsh.struct([
    borsh.u8("asset"),
    borsh.u64("sigma_t_micro"),
    borsh.u64("sigma_inf_micro"),
    borsh.u64("theta_d_micro"),
    borsh.i64("vrp_rel_micro"),
    borsh.u64("iv_micro"),
    borsh.u64("p_max_micro"),
    borsh.i64("xi_micro"),
    borsh.u64("beta_micro"),
    borsh.u64("var_99_micro"),
    borsh.u64("es_999_micro"),
    borsh.u64("regime_indicator_micro"),
]);
function updatePovsState(args, accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.authority, isSigner: true, isWritable: true },
        { pubkey: accounts.povs_state, isSigner: false, isWritable: true },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([116, 243, 125, 164, 58, 174, 32, 217]);
    const buffer = Buffer.alloc(1000);
    const len = exports.layout.encode({
        asset: args.asset,
        sigma_t_micro: args.sigma_t_micro,
        sigma_inf_micro: args.sigma_inf_micro,
        theta_d_micro: args.theta_d_micro,
        vrp_rel_micro: args.vrp_rel_micro,
        iv_micro: args.iv_micro,
        p_max_micro: args.p_max_micro,
        xi_micro: args.xi_micro,
        beta_micro: args.beta_micro,
        var_99_micro: args.var_99_micro,
        es_999_micro: args.es_999_micro,
        regime_indicator_micro: args.regime_indicator_micro,
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=updatePovsState.js.map