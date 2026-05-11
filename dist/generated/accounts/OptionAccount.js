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
exports.OptionAccount = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class OptionAccount {
    constructor(fields) {
        this.creator = fields.creator;
        this.nonce = fields.nonce;
        this.bump = fields.bump;
        this.version = fields.version;
        this.created_at = fields.created_at;
        this.option_type = fields.option_type;
        this.state = fields.state;
        this.expiry_ts = fields.expiry_ts;
        this.underlying_feed_id = fields.underlying_feed_id;
        this.strike = fields.strike;
        this.payoff_amount = fields.payoff_amount;
        this.collateral_locked = fields.collateral_locked;
        this.settlement_mint = fields.settlement_mint;
        this.settlement_decimals = fields.settlement_decimals;
        this.settled = fields.settled;
        this.settled_price = fields.settled_price;
        this.settled_at = fields.settled_at;
        this.metadata = fields.metadata;
        this.holder = fields.holder;
        this.upper_bound = fields.upper_bound;
        this.h_eff = fields.h_eff;
        this.asset = fields.asset;
        this.direction = fields.direction;
        this.extra_param = fields.extra_param;
        this.spot_at_creation = fields.spot_at_creation;
        this.sigma_at_creation = fields.sigma_at_creation;
        this.v0_usdc_micro = fields.v0_usdc_micro;
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
        if (!data.slice(0, 8).equals(OptionAccount.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = OptionAccount.layout.decode(data.slice(8));
        return new OptionAccount({
            creator: dec.creator,
            nonce: dec.nonce,
            bump: dec.bump,
            version: dec.version,
            created_at: dec.created_at,
            option_type: types.OptionType.fromDecoded(dec.option_type),
            state: types.OptionState.fromDecoded(dec.state),
            expiry_ts: dec.expiry_ts,
            underlying_feed_id: dec.underlying_feed_id,
            strike: dec.strike,
            payoff_amount: dec.payoff_amount,
            collateral_locked: dec.collateral_locked,
            settlement_mint: dec.settlement_mint,
            settlement_decimals: dec.settlement_decimals,
            settled: dec.settled,
            settled_price: dec.settled_price,
            settled_at: dec.settled_at,
            metadata: dec.metadata,
            holder: dec.holder,
            upper_bound: dec.upper_bound,
            h_eff: dec.h_eff,
            asset: dec.asset,
            direction: dec.direction,
            extra_param: dec.extra_param,
            spot_at_creation: dec.spot_at_creation,
            sigma_at_creation: dec.sigma_at_creation,
            v0_usdc_micro: dec.v0_usdc_micro,
        });
    }
    toJSON() {
        return {
            creator: this.creator.toString(),
            nonce: this.nonce.toString(),
            bump: this.bump,
            version: this.version,
            created_at: this.created_at.toString(),
            option_type: this.option_type.toJSON(),
            state: this.state.toJSON(),
            expiry_ts: this.expiry_ts.toString(),
            underlying_feed_id: this.underlying_feed_id.toString(),
            strike: this.strike.toString(),
            payoff_amount: this.payoff_amount.toString(),
            collateral_locked: this.collateral_locked.toString(),
            settlement_mint: this.settlement_mint.toString(),
            settlement_decimals: this.settlement_decimals,
            settled: this.settled,
            settled_price: this.settled_price.toString(),
            settled_at: this.settled_at.toString(),
            metadata: this.metadata.toString(),
            holder: this.holder.toString(),
            upper_bound: this.upper_bound.toString(),
            h_eff: this.h_eff,
            asset: this.asset,
            direction: this.direction,
            extra_param: this.extra_param,
            spot_at_creation: this.spot_at_creation.toString(),
            sigma_at_creation: this.sigma_at_creation,
            v0_usdc_micro: this.v0_usdc_micro.toString(),
        };
    }
    static fromJSON(obj) {
        return new OptionAccount({
            creator: new web3_js_1.PublicKey(obj.creator),
            nonce: new bn_js_1.default(obj.nonce),
            bump: obj.bump,
            version: obj.version,
            created_at: new bn_js_1.default(obj.created_at),
            option_type: types.OptionType.fromJSON(obj.option_type),
            state: types.OptionState.fromJSON(obj.state),
            expiry_ts: new bn_js_1.default(obj.expiry_ts),
            underlying_feed_id: new web3_js_1.PublicKey(obj.underlying_feed_id),
            strike: new bn_js_1.default(obj.strike),
            payoff_amount: new bn_js_1.default(obj.payoff_amount),
            collateral_locked: new bn_js_1.default(obj.collateral_locked),
            settlement_mint: new web3_js_1.PublicKey(obj.settlement_mint),
            settlement_decimals: obj.settlement_decimals,
            settled: obj.settled,
            settled_price: new bn_js_1.default(obj.settled_price),
            settled_at: new bn_js_1.default(obj.settled_at),
            metadata: new web3_js_1.PublicKey(obj.metadata),
            holder: new web3_js_1.PublicKey(obj.holder),
            upper_bound: new bn_js_1.default(obj.upper_bound),
            h_eff: obj.h_eff,
            asset: obj.asset,
            direction: obj.direction,
            extra_param: obj.extra_param,
            spot_at_creation: new bn_js_1.default(obj.spot_at_creation),
            sigma_at_creation: obj.sigma_at_creation,
            v0_usdc_micro: new bn_js_1.default(obj.v0_usdc_micro),
        });
    }
}
exports.OptionAccount = OptionAccount;
OptionAccount.discriminator = Buffer.from([
    82, 44, 195, 42, 219, 57, 18, 92,
]);
OptionAccount.layout = borsh.struct([
    borsh.publicKey("creator"),
    borsh.u64("nonce"),
    borsh.u8("bump"),
    borsh.u8("version"),
    borsh.i64("created_at"),
    types.OptionType.layout("option_type"),
    types.OptionState.layout("state"),
    borsh.i64("expiry_ts"),
    borsh.publicKey("underlying_feed_id"),
    borsh.u64("strike"),
    borsh.u64("payoff_amount"),
    borsh.u64("collateral_locked"),
    borsh.publicKey("settlement_mint"),
    borsh.u8("settlement_decimals"),
    borsh.bool("settled"),
    borsh.i64("settled_price"),
    borsh.i64("settled_at"),
    borsh.publicKey("metadata"),
    borsh.publicKey("holder"),
    borsh.u64("upper_bound"),
    borsh.f64("h_eff"),
    borsh.u8("asset"),
    borsh.i8("direction"),
    borsh.f64("extra_param"),
    borsh.i64("spot_at_creation"),
    borsh.f64("sigma_at_creation"),
    borsh.u64("v0_usdc_micro"),
]);
//# sourceMappingURL=OptionAccount.js.map