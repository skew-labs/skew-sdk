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
exports.LiquidationBufferChecked = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class LiquidationBufferChecked {
    constructor(fields) {
        this.option = fields.option;
        this.defaulting_cm = fields.defaulting_cm;
        this.close_factor_bps = fields.close_factor_bps;
        this.health_after_bps = fields.health_after_bps;
        this.buffer_margin_micro = fields.buffer_margin_micro;
        this.checked_at = fields.checked_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("option"),
            borsh.publicKey("defaulting_cm"),
            borsh.u16("close_factor_bps"),
            borsh.u64("health_after_bps"),
            borsh.i64("buffer_margin_micro"),
            borsh.i64("checked_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new LiquidationBufferChecked({
            option: obj.option,
            defaulting_cm: obj.defaulting_cm,
            close_factor_bps: obj.close_factor_bps,
            health_after_bps: obj.health_after_bps,
            buffer_margin_micro: obj.buffer_margin_micro,
            checked_at: obj.checked_at,
        });
    }
    static toEncodable(fields) {
        return {
            option: fields.option,
            defaulting_cm: fields.defaulting_cm,
            close_factor_bps: fields.close_factor_bps,
            health_after_bps: fields.health_after_bps,
            buffer_margin_micro: fields.buffer_margin_micro,
            checked_at: fields.checked_at,
        };
    }
    toJSON() {
        return {
            option: this.option.toString(),
            defaulting_cm: this.defaulting_cm.toString(),
            close_factor_bps: this.close_factor_bps,
            health_after_bps: this.health_after_bps.toString(),
            buffer_margin_micro: this.buffer_margin_micro.toString(),
            checked_at: this.checked_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new LiquidationBufferChecked({
            option: new web3_js_1.PublicKey(obj.option),
            defaulting_cm: new web3_js_1.PublicKey(obj.defaulting_cm),
            close_factor_bps: obj.close_factor_bps,
            health_after_bps: new bn_js_1.default(obj.health_after_bps),
            buffer_margin_micro: new bn_js_1.default(obj.buffer_margin_micro),
            checked_at: new bn_js_1.default(obj.checked_at),
        });
    }
    toEncodable() {
        return LiquidationBufferChecked.toEncodable(this);
    }
}
exports.LiquidationBufferChecked = LiquidationBufferChecked;
//# sourceMappingURL=LiquidationBufferChecked.js.map