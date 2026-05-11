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
exports.SeriesListingPda = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class SeriesListingPda {
    constructor(fields) {
        this.asset = fields.asset;
        this.option_type = fields.option_type;
        this.direction = fields.direction;
        this.status = fields.status;
        this._padding_a = fields._padding_a;
        this.strike = fields.strike;
        this.expiry_ts = fields.expiry_ts;
        this.last_fill_price_micro = fields.last_fill_price_micro;
        this.last_fill_at = fields.last_fill_at;
        this.total_oi_count = fields.total_oi_count;
        this.cumulative_fill_count = fields.cumulative_fill_count;
        this.max_oi_count = fields.max_oi_count;
        this.listed_at = fields.listed_at;
        this.bump = fields.bump;
        this._padding_b = fields._padding_b;
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
        if (!data.slice(0, 8).equals(SeriesListingPda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = SeriesListingPda.layout.decode(data.slice(8));
        return new SeriesListingPda({
            asset: dec.asset,
            option_type: types.OptionType.fromDecoded(dec.option_type),
            direction: dec.direction,
            status: dec.status,
            _padding_a: dec._padding_a,
            strike: dec.strike,
            expiry_ts: dec.expiry_ts,
            last_fill_price_micro: dec.last_fill_price_micro,
            last_fill_at: dec.last_fill_at,
            total_oi_count: dec.total_oi_count,
            cumulative_fill_count: dec.cumulative_fill_count,
            max_oi_count: dec.max_oi_count,
            listed_at: dec.listed_at,
            bump: dec.bump,
            _padding_b: dec._padding_b,
        });
    }
    toJSON() {
        return {
            asset: this.asset,
            option_type: this.option_type.toJSON(),
            direction: this.direction,
            status: this.status,
            _padding_a: this._padding_a,
            strike: this.strike.toString(),
            expiry_ts: this.expiry_ts.toString(),
            last_fill_price_micro: this.last_fill_price_micro.toString(),
            last_fill_at: this.last_fill_at.toString(),
            total_oi_count: this.total_oi_count,
            cumulative_fill_count: this.cumulative_fill_count,
            max_oi_count: this.max_oi_count,
            listed_at: this.listed_at.toString(),
            bump: this.bump,
            _padding_b: this._padding_b,
        };
    }
    static fromJSON(obj) {
        return new SeriesListingPda({
            asset: obj.asset,
            option_type: types.OptionType.fromJSON(obj.option_type),
            direction: obj.direction,
            status: obj.status,
            _padding_a: obj._padding_a,
            strike: new bn_js_1.default(obj.strike),
            expiry_ts: new bn_js_1.default(obj.expiry_ts),
            last_fill_price_micro: new bn_js_1.default(obj.last_fill_price_micro),
            last_fill_at: new bn_js_1.default(obj.last_fill_at),
            total_oi_count: obj.total_oi_count,
            cumulative_fill_count: obj.cumulative_fill_count,
            max_oi_count: obj.max_oi_count,
            listed_at: new bn_js_1.default(obj.listed_at),
            bump: obj.bump,
            _padding_b: obj._padding_b,
        });
    }
}
exports.SeriesListingPda = SeriesListingPda;
SeriesListingPda.discriminator = Buffer.from([
    50, 23, 32, 98, 25, 203, 138, 104,
]);
SeriesListingPda.layout = borsh.struct([
    borsh.u8("asset"),
    types.OptionType.layout("option_type"),
    borsh.i8("direction"),
    borsh.u8("status"),
    borsh.array(borsh.u8(), 4, "_padding_a"),
    borsh.u64("strike"),
    borsh.i64("expiry_ts"),
    borsh.u64("last_fill_price_micro"),
    borsh.i64("last_fill_at"),
    borsh.u32("total_oi_count"),
    borsh.u32("cumulative_fill_count"),
    borsh.u32("max_oi_count"),
    borsh.i64("listed_at"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 3, "_padding_b"),
]);
//# sourceMappingURL=SeriesListingPda.js.map