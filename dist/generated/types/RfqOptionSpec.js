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
exports.RfqOptionSpec = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RfqOptionSpec {
    constructor(fields) {
        this.asset = fields.asset;
        this.option_type = fields.option_type;
        this.direction = fields.direction;
        this._pad_0 = fields._pad_0;
        this.strike = fields.strike;
        this.expiry_ts = fields.expiry_ts;
        this.payoff_amount_micro = fields.payoff_amount_micro;
        this.upper_bound = fields.upper_bound;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u8("asset"),
            borsh.u8("option_type"),
            borsh.i8("direction"),
            borsh.array(borsh.u8(), 5, "_pad_0"),
            borsh.u64("strike"),
            borsh.i64("expiry_ts"),
            borsh.u64("payoff_amount_micro"),
            borsh.u64("upper_bound"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RfqOptionSpec({
            asset: obj.asset,
            option_type: obj.option_type,
            direction: obj.direction,
            _pad_0: obj._pad_0,
            strike: obj.strike,
            expiry_ts: obj.expiry_ts,
            payoff_amount_micro: obj.payoff_amount_micro,
            upper_bound: obj.upper_bound,
        });
    }
    static toEncodable(fields) {
        return {
            asset: fields.asset,
            option_type: fields.option_type,
            direction: fields.direction,
            _pad_0: fields._pad_0,
            strike: fields.strike,
            expiry_ts: fields.expiry_ts,
            payoff_amount_micro: fields.payoff_amount_micro,
            upper_bound: fields.upper_bound,
        };
    }
    toJSON() {
        return {
            asset: this.asset,
            option_type: this.option_type,
            direction: this.direction,
            _pad_0: this._pad_0,
            strike: this.strike.toString(),
            expiry_ts: this.expiry_ts.toString(),
            payoff_amount_micro: this.payoff_amount_micro.toString(),
            upper_bound: this.upper_bound.toString(),
        };
    }
    static fromJSON(obj) {
        return new RfqOptionSpec({
            asset: obj.asset,
            option_type: obj.option_type,
            direction: obj.direction,
            _pad_0: obj._pad_0,
            strike: new bn_js_1.default(obj.strike),
            expiry_ts: new bn_js_1.default(obj.expiry_ts),
            payoff_amount_micro: new bn_js_1.default(obj.payoff_amount_micro),
            upper_bound: new bn_js_1.default(obj.upper_bound),
        });
    }
    toEncodable() {
        return RfqOptionSpec.toEncodable(this);
    }
}
exports.RfqOptionSpec = RfqOptionSpec;
//# sourceMappingURL=RfqOptionSpec.js.map