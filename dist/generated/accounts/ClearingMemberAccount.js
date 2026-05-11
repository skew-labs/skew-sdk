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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearingMemberAccount = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class ClearingMemberAccount {
    constructor(fields) {
        this.authority = fields.authority;
        this.bump = fields.bump;
        this.registered_at = fields.registered_at;
        this.collateral = fields.collateral;
        this.if_contribution = fields.if_contribution;
        this.net_notional_long = fields.net_notional_long;
        this.net_notional_short = fields.net_notional_short;
        this.positions_count = fields.positions_count;
        this.last_margin_check = fields.last_margin_check;
        this.under_liquidation = fields.under_liquidation;
        this.kyc_passed = fields.kyc_passed;
        this.last_im_micro = fields.last_im_micro;
        this.tier = fields.tier;
        this.tier_locked_until = fields.tier_locked_until;
        this.tier_lockup_collateral = fields.tier_lockup_collateral;
        this.withdraw_24h_total_micro = fields.withdraw_24h_total_micro;
        this.last_withdraw_window_start_ts = fields.last_withdraw_window_start_ts;
        this.total_pm_locked_micro = fields.total_pm_locked_micro;
        this.whitelist_count = fields.whitelist_count;
        this._whitelist_padding = fields._whitelist_padding;
        this.whitelist = fields.whitelist;
    }
    static async fetch(c, address, programId = programId_1.PROGRAM_ID) {
        const info = await c.getAccountInfo(address);
        if (info === null) {
            return null;
        }
        if (!info.owner.equals(programId)) {
            throw new Error("account doesn't belong to this program");
        }
        return this.decode(info.data);
    }
    static async fetchMultiple(c, addresses, programId = programId_1.PROGRAM_ID) {
        const infos = await c.getMultipleAccountsInfo(addresses);
        return infos.map((info) => {
            if (info === null) {
                return null;
            }
            if (!info.owner.equals(programId)) {
                throw new Error("account doesn't belong to this program");
            }
            return this.decode(info.data);
        });
    }
    static decode(data) {
        if (!data.slice(0, 8).equals(ClearingMemberAccount.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = ClearingMemberAccount.layout.decode(data.slice(8));
        return new ClearingMemberAccount({
            authority: dec.authority,
            bump: dec.bump,
            registered_at: dec.registered_at,
            collateral: dec.collateral,
            if_contribution: dec.if_contribution,
            net_notional_long: dec.net_notional_long,
            net_notional_short: dec.net_notional_short,
            positions_count: dec.positions_count,
            last_margin_check: dec.last_margin_check,
            under_liquidation: dec.under_liquidation,
            kyc_passed: dec.kyc_passed,
            last_im_micro: dec.last_im_micro,
            tier: types.VerifiedTier.fromDecoded(dec.tier),
            tier_locked_until: dec.tier_locked_until,
            tier_lockup_collateral: dec.tier_lockup_collateral,
            withdraw_24h_total_micro: dec.withdraw_24h_total_micro,
            last_withdraw_window_start_ts: dec.last_withdraw_window_start_ts,
            total_pm_locked_micro: dec.total_pm_locked_micro,
            whitelist_count: dec.whitelist_count,
            _whitelist_padding: dec._whitelist_padding,
            whitelist: dec.whitelist,
        });
    }
    toJSON() {
        return {
            authority: this.authority.toString(),
            bump: this.bump,
            registered_at: this.registered_at.toString(),
            collateral: this.collateral.toString(),
            if_contribution: this.if_contribution.toString(),
            net_notional_long: this.net_notional_long.toString(),
            net_notional_short: this.net_notional_short.toString(),
            positions_count: this.positions_count,
            last_margin_check: this.last_margin_check.toString(),
            under_liquidation: this.under_liquidation,
            kyc_passed: this.kyc_passed,
            last_im_micro: this.last_im_micro.toString(),
            tier: this.tier.toJSON(),
            tier_locked_until: this.tier_locked_until.toString(),
            tier_lockup_collateral: this.tier_lockup_collateral.toString(),
            withdraw_24h_total_micro: this.withdraw_24h_total_micro.toString(),
            last_withdraw_window_start_ts: this.last_withdraw_window_start_ts.toString(),
            total_pm_locked_micro: this.total_pm_locked_micro.toString(),
            whitelist_count: this.whitelist_count,
            _whitelist_padding: this._whitelist_padding,
            whitelist: this.whitelist.map((item) => item.toString()),
        };
    }
    static fromJSON(obj) {
        return new ClearingMemberAccount({
            authority: new web3_js_1.PublicKey(obj.authority),
            bump: obj.bump,
            registered_at: new bn_js_1.default(obj.registered_at),
            collateral: new bn_js_1.default(obj.collateral),
            if_contribution: new bn_js_1.default(obj.if_contribution),
            net_notional_long: new bn_js_1.default(obj.net_notional_long),
            net_notional_short: new bn_js_1.default(obj.net_notional_short),
            positions_count: obj.positions_count,
            last_margin_check: new bn_js_1.default(obj.last_margin_check),
            under_liquidation: obj.under_liquidation,
            kyc_passed: obj.kyc_passed,
            last_im_micro: new bn_js_1.default(obj.last_im_micro),
            tier: types.VerifiedTier.fromJSON(obj.tier),
            tier_locked_until: new bn_js_1.default(obj.tier_locked_until),
            tier_lockup_collateral: new bn_js_1.default(obj.tier_lockup_collateral),
            withdraw_24h_total_micro: new bn_js_1.default(obj.withdraw_24h_total_micro),
            last_withdraw_window_start_ts: new bn_js_1.default(obj.last_withdraw_window_start_ts),
            total_pm_locked_micro: new bn_js_1.default(obj.total_pm_locked_micro),
            whitelist_count: obj.whitelist_count,
            _whitelist_padding: obj._whitelist_padding,
            whitelist: obj.whitelist.map((item) => new web3_js_1.PublicKey(item)),
        });
    }
}
exports.ClearingMemberAccount = ClearingMemberAccount;
ClearingMemberAccount.discriminator = Buffer.from([177, 40, 5, 45, 64, 70, 177, 95]);
ClearingMemberAccount.layout = borsh.struct([
    borsh.publicKey("authority"),
    borsh.u8("bump"),
    borsh.i64("registered_at"),
    borsh.u64("collateral"),
    borsh.u64("if_contribution"),
    borsh.u64("net_notional_long"),
    borsh.u64("net_notional_short"),
    borsh.u32("positions_count"),
    borsh.i64("last_margin_check"),
    borsh.bool("under_liquidation"),
    borsh.bool("kyc_passed"),
    borsh.u64("last_im_micro"),
    types.VerifiedTier.layout("tier"),
    borsh.i64("tier_locked_until"),
    borsh.u64("tier_lockup_collateral"),
    borsh.u64("withdraw_24h_total_micro"),
    borsh.i64("last_withdraw_window_start_ts"),
    borsh.u64("total_pm_locked_micro"),
    borsh.u8("whitelist_count"),
    borsh.array(borsh.u8(), 7, "_whitelist_padding"),
    borsh.array(borsh.publicKey(), 32, "whitelist"),
]);
//# sourceMappingURL=ClearingMemberAccount.js.map