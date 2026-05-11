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
exports.TierUpgraded = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class TierUpgraded {
    constructor(fields) {
        this.cm = fields.cm;
        this.authority = fields.authority;
        this.from_tier = fields.from_tier;
        this.to_tier = fields.to_tier;
        this.new_lockup_collateral = fields.new_lockup_collateral;
        this.tier_locked_until = fields.tier_locked_until;
        this.upgraded_at = fields.upgraded_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("cm"),
            borsh.publicKey("authority"),
            borsh.u8("from_tier"),
            borsh.u8("to_tier"),
            borsh.u64("new_lockup_collateral"),
            borsh.i64("tier_locked_until"),
            borsh.i64("upgraded_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new TierUpgraded({
            cm: obj.cm,
            authority: obj.authority,
            from_tier: obj.from_tier,
            to_tier: obj.to_tier,
            new_lockup_collateral: obj.new_lockup_collateral,
            tier_locked_until: obj.tier_locked_until,
            upgraded_at: obj.upgraded_at,
        });
    }
    static toEncodable(fields) {
        return {
            cm: fields.cm,
            authority: fields.authority,
            from_tier: fields.from_tier,
            to_tier: fields.to_tier,
            new_lockup_collateral: fields.new_lockup_collateral,
            tier_locked_until: fields.tier_locked_until,
            upgraded_at: fields.upgraded_at,
        };
    }
    toJSON() {
        return {
            cm: this.cm.toString(),
            authority: this.authority.toString(),
            from_tier: this.from_tier,
            to_tier: this.to_tier,
            new_lockup_collateral: this.new_lockup_collateral.toString(),
            tier_locked_until: this.tier_locked_until.toString(),
            upgraded_at: this.upgraded_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new TierUpgraded({
            cm: new web3_js_1.PublicKey(obj.cm),
            authority: new web3_js_1.PublicKey(obj.authority),
            from_tier: obj.from_tier,
            to_tier: obj.to_tier,
            new_lockup_collateral: new bn_js_1.default(obj.new_lockup_collateral),
            tier_locked_until: new bn_js_1.default(obj.tier_locked_until),
            upgraded_at: new bn_js_1.default(obj.upgraded_at),
        });
    }
    toEncodable() {
        return TierUpgraded.toEncodable(this);
    }
}
exports.TierUpgraded = TierUpgraded;
//# sourceMappingURL=TierUpgraded.js.map