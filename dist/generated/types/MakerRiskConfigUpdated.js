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
exports.MakerRiskConfigUpdated = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class MakerRiskConfigUpdated {
    constructor(fields) {
        this.registry = fields.registry;
        this.mm = fields.mm;
        this.quote_off = fields.quote_off;
        this.identity_mode = fields.identity_mode;
        this.margin_mode = fields.margin_mode;
        this.risk_scope_asset = fields.risk_scope_asset;
        this.collateral_scope = fields.collateral_scope;
        this.updated_at = fields.updated_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("registry"),
            borsh.publicKey("mm"),
            borsh.bool("quote_off"),
            borsh.u8("identity_mode"),
            borsh.u8("margin_mode"),
            borsh.u8("risk_scope_asset"),
            borsh.u8("collateral_scope"),
            borsh.i64("updated_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new MakerRiskConfigUpdated({
            registry: obj.registry,
            mm: obj.mm,
            quote_off: obj.quote_off,
            identity_mode: obj.identity_mode,
            margin_mode: obj.margin_mode,
            risk_scope_asset: obj.risk_scope_asset,
            collateral_scope: obj.collateral_scope,
            updated_at: obj.updated_at,
        });
    }
    static toEncodable(fields) {
        return {
            registry: fields.registry,
            mm: fields.mm,
            quote_off: fields.quote_off,
            identity_mode: fields.identity_mode,
            margin_mode: fields.margin_mode,
            risk_scope_asset: fields.risk_scope_asset,
            collateral_scope: fields.collateral_scope,
            updated_at: fields.updated_at,
        };
    }
    toJSON() {
        return {
            registry: this.registry.toString(),
            mm: this.mm.toString(),
            quote_off: this.quote_off,
            identity_mode: this.identity_mode,
            margin_mode: this.margin_mode,
            risk_scope_asset: this.risk_scope_asset,
            collateral_scope: this.collateral_scope,
            updated_at: this.updated_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new MakerRiskConfigUpdated({
            registry: new web3_js_1.PublicKey(obj.registry),
            mm: new web3_js_1.PublicKey(obj.mm),
            quote_off: obj.quote_off,
            identity_mode: obj.identity_mode,
            margin_mode: obj.margin_mode,
            risk_scope_asset: obj.risk_scope_asset,
            collateral_scope: obj.collateral_scope,
            updated_at: new bn_js_1.default(obj.updated_at),
        });
    }
    toEncodable() {
        return MakerRiskConfigUpdated.toEncodable(this);
    }
}
exports.MakerRiskConfigUpdated = MakerRiskConfigUpdated;
//# sourceMappingURL=MakerRiskConfigUpdated.js.map