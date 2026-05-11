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
exports.PositionLimitUpdated = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class PositionLimitUpdated {
    constructor(fields) {
        this.asset_idx = fields.asset_idx;
        this.prev_limit_usd_micro = fields.prev_limit_usd_micro;
        this.new_limit_usd_micro = fields.new_limit_usd_micro;
        this.updated_at = fields.updated_at;
        this.updated_by = fields.updated_by;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u8("asset_idx"),
            borsh.u64("prev_limit_usd_micro"),
            borsh.u64("new_limit_usd_micro"),
            borsh.i64("updated_at"),
            borsh.publicKey("updated_by"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new PositionLimitUpdated({
            asset_idx: obj.asset_idx,
            prev_limit_usd_micro: obj.prev_limit_usd_micro,
            new_limit_usd_micro: obj.new_limit_usd_micro,
            updated_at: obj.updated_at,
            updated_by: obj.updated_by,
        });
    }
    static toEncodable(fields) {
        return {
            asset_idx: fields.asset_idx,
            prev_limit_usd_micro: fields.prev_limit_usd_micro,
            new_limit_usd_micro: fields.new_limit_usd_micro,
            updated_at: fields.updated_at,
            updated_by: fields.updated_by,
        };
    }
    toJSON() {
        return {
            asset_idx: this.asset_idx,
            prev_limit_usd_micro: this.prev_limit_usd_micro.toString(),
            new_limit_usd_micro: this.new_limit_usd_micro.toString(),
            updated_at: this.updated_at.toString(),
            updated_by: this.updated_by.toString(),
        };
    }
    static fromJSON(obj) {
        return new PositionLimitUpdated({
            asset_idx: obj.asset_idx,
            prev_limit_usd_micro: new bn_js_1.default(obj.prev_limit_usd_micro),
            new_limit_usd_micro: new bn_js_1.default(obj.new_limit_usd_micro),
            updated_at: new bn_js_1.default(obj.updated_at),
            updated_by: new web3_js_1.PublicKey(obj.updated_by),
        });
    }
    toEncodable() {
        return PositionLimitUpdated.toEncodable(this);
    }
}
exports.PositionLimitUpdated = PositionLimitUpdated;
//# sourceMappingURL=PositionLimitUpdated.js.map