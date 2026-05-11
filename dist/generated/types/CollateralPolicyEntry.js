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
exports.CollateralPolicyEntry = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class CollateralPolicyEntry {
    constructor(fields) {
        this.mint = fields.mint;
        this.decimals = fields.decimals;
        this.kind = fields.kind;
        this.oracle_feed = fields.oracle_feed;
        this.max_depeg_bps = fields.max_depeg_bps;
        this.padding = fields.padding;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("mint"),
            borsh.u8("decimals"),
            borsh.u8("kind"),
            borsh.publicKey("oracle_feed"),
            borsh.u16("max_depeg_bps"),
            borsh.array(borsh.u8(), 8, "padding"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new CollateralPolicyEntry({
            mint: obj.mint,
            decimals: obj.decimals,
            kind: obj.kind,
            oracle_feed: obj.oracle_feed,
            max_depeg_bps: obj.max_depeg_bps,
            padding: obj.padding,
        });
    }
    static toEncodable(fields) {
        return {
            mint: fields.mint,
            decimals: fields.decimals,
            kind: fields.kind,
            oracle_feed: fields.oracle_feed,
            max_depeg_bps: fields.max_depeg_bps,
            padding: fields.padding,
        };
    }
    toJSON() {
        return {
            mint: this.mint.toString(),
            decimals: this.decimals,
            kind: this.kind,
            oracle_feed: this.oracle_feed.toString(),
            max_depeg_bps: this.max_depeg_bps,
            padding: this.padding,
        };
    }
    static fromJSON(obj) {
        return new CollateralPolicyEntry({
            mint: new web3_js_1.PublicKey(obj.mint),
            decimals: obj.decimals,
            kind: obj.kind,
            oracle_feed: new web3_js_1.PublicKey(obj.oracle_feed),
            max_depeg_bps: obj.max_depeg_bps,
            padding: obj.padding,
        });
    }
    toEncodable() {
        return CollateralPolicyEntry.toEncodable(this);
    }
}
exports.CollateralPolicyEntry = CollateralPolicyEntry;
//# sourceMappingURL=CollateralPolicyEntry.js.map