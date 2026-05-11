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
exports.SeriesMaxOiUpdated = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class SeriesMaxOiUpdated {
    constructor(fields) {
        this.series = fields.series;
        this.asset = fields.asset;
        this.strike = fields.strike;
        this.expiry_ts = fields.expiry_ts;
        this.option_type = fields.option_type;
        this.direction = fields.direction;
        this.prev_max_oi = fields.prev_max_oi;
        this.new_max_oi = fields.new_max_oi;
        this.current_oi = fields.current_oi;
        this.updated_at = fields.updated_at;
        this.updated_by = fields.updated_by;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("series"),
            borsh.u8("asset"),
            borsh.u64("strike"),
            borsh.i64("expiry_ts"),
            borsh.u8("option_type"),
            borsh.i8("direction"),
            borsh.u32("prev_max_oi"),
            borsh.u32("new_max_oi"),
            borsh.u32("current_oi"),
            borsh.i64("updated_at"),
            borsh.publicKey("updated_by"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new SeriesMaxOiUpdated({
            series: obj.series,
            asset: obj.asset,
            strike: obj.strike,
            expiry_ts: obj.expiry_ts,
            option_type: obj.option_type,
            direction: obj.direction,
            prev_max_oi: obj.prev_max_oi,
            new_max_oi: obj.new_max_oi,
            current_oi: obj.current_oi,
            updated_at: obj.updated_at,
            updated_by: obj.updated_by,
        });
    }
    static toEncodable(fields) {
        return {
            series: fields.series,
            asset: fields.asset,
            strike: fields.strike,
            expiry_ts: fields.expiry_ts,
            option_type: fields.option_type,
            direction: fields.direction,
            prev_max_oi: fields.prev_max_oi,
            new_max_oi: fields.new_max_oi,
            current_oi: fields.current_oi,
            updated_at: fields.updated_at,
            updated_by: fields.updated_by,
        };
    }
    toJSON() {
        return {
            series: this.series.toString(),
            asset: this.asset,
            strike: this.strike.toString(),
            expiry_ts: this.expiry_ts.toString(),
            option_type: this.option_type,
            direction: this.direction,
            prev_max_oi: this.prev_max_oi,
            new_max_oi: this.new_max_oi,
            current_oi: this.current_oi,
            updated_at: this.updated_at.toString(),
            updated_by: this.updated_by.toString(),
        };
    }
    static fromJSON(obj) {
        return new SeriesMaxOiUpdated({
            series: new web3_js_1.PublicKey(obj.series),
            asset: obj.asset,
            strike: new bn_js_1.default(obj.strike),
            expiry_ts: new bn_js_1.default(obj.expiry_ts),
            option_type: obj.option_type,
            direction: obj.direction,
            prev_max_oi: obj.prev_max_oi,
            new_max_oi: obj.new_max_oi,
            current_oi: obj.current_oi,
            updated_at: new bn_js_1.default(obj.updated_at),
            updated_by: new web3_js_1.PublicKey(obj.updated_by),
        });
    }
    toEncodable() {
        return SeriesMaxOiUpdated.toEncodable(this);
    }
}
exports.SeriesMaxOiUpdated = SeriesMaxOiUpdated;
//# sourceMappingURL=SeriesMaxOiUpdated.js.map