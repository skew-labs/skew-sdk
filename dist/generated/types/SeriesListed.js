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
exports.SeriesListed = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class SeriesListed {
    constructor(fields) {
        this.series_pda = fields.series_pda;
        this.asset = fields.asset;
        this.strike = fields.strike;
        this.expiry_ts = fields.expiry_ts;
        this.option_type = fields.option_type;
        this.direction = fields.direction;
        this.listed_at = fields.listed_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("series_pda"),
            borsh.u8("asset"),
            borsh.u64("strike"),
            borsh.i64("expiry_ts"),
            types.OptionType.layout("option_type"),
            borsh.i8("direction"),
            borsh.i64("listed_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new SeriesListed({
            series_pda: obj.series_pda,
            asset: obj.asset,
            strike: obj.strike,
            expiry_ts: obj.expiry_ts,
            option_type: types.OptionType.fromDecoded(obj.option_type),
            direction: obj.direction,
            listed_at: obj.listed_at,
        });
    }
    static toEncodable(fields) {
        return {
            series_pda: fields.series_pda,
            asset: fields.asset,
            strike: fields.strike,
            expiry_ts: fields.expiry_ts,
            option_type: fields.option_type.toEncodable(),
            direction: fields.direction,
            listed_at: fields.listed_at,
        };
    }
    toJSON() {
        return {
            series_pda: this.series_pda.toString(),
            asset: this.asset,
            strike: this.strike.toString(),
            expiry_ts: this.expiry_ts.toString(),
            option_type: this.option_type.toJSON(),
            direction: this.direction,
            listed_at: this.listed_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new SeriesListed({
            series_pda: new web3_js_1.PublicKey(obj.series_pda),
            asset: obj.asset,
            strike: new bn_js_1.default(obj.strike),
            expiry_ts: new bn_js_1.default(obj.expiry_ts),
            option_type: types.OptionType.fromJSON(obj.option_type),
            direction: obj.direction,
            listed_at: new bn_js_1.default(obj.listed_at),
        });
    }
    toEncodable() {
        return SeriesListed.toEncodable(this);
    }
}
exports.SeriesListed = SeriesListed;
//# sourceMappingURL=SeriesListed.js.map