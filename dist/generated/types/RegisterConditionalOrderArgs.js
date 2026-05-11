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
exports.RegisterConditionalOrderArgs = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RegisterConditionalOrderArgs {
    constructor(fields) {
        this.order_id = fields.order_id;
        this.kind = fields.kind;
        this.trigger_oracle = fields.trigger_oracle;
        this.trigger_price_1e8 = fields.trigger_price_1e8;
        this.trigger_direction = fields.trigger_direction;
        this.trigger_mode = fields.trigger_mode;
        this.trigger_grace_slots = fields.trigger_grace_slots;
        this.action = fields.action;
        this.action_target = fields.action_target;
        this.action_min_premium_micro = fields.action_min_premium_micro;
        this.action_max_premium_micro = fields.action_max_premium_micro;
        this.action_max_slippage_bps = fields.action_max_slippage_bps;
        this.valid_until_ts = fields.valid_until_ts;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("order_id"),
            borsh.u8("kind"),
            borsh.publicKey("trigger_oracle"),
            borsh.i64("trigger_price_1e8"),
            borsh.u8("trigger_direction"),
            borsh.u8("trigger_mode"),
            borsh.u32("trigger_grace_slots"),
            borsh.u8("action"),
            borsh.publicKey("action_target"),
            borsh.u64("action_min_premium_micro"),
            borsh.u64("action_max_premium_micro"),
            borsh.u16("action_max_slippage_bps"),
            borsh.i64("valid_until_ts"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RegisterConditionalOrderArgs({
            order_id: obj.order_id,
            kind: obj.kind,
            trigger_oracle: obj.trigger_oracle,
            trigger_price_1e8: obj.trigger_price_1e8,
            trigger_direction: obj.trigger_direction,
            trigger_mode: obj.trigger_mode,
            trigger_grace_slots: obj.trigger_grace_slots,
            action: obj.action,
            action_target: obj.action_target,
            action_min_premium_micro: obj.action_min_premium_micro,
            action_max_premium_micro: obj.action_max_premium_micro,
            action_max_slippage_bps: obj.action_max_slippage_bps,
            valid_until_ts: obj.valid_until_ts,
        });
    }
    static toEncodable(fields) {
        return {
            order_id: fields.order_id,
            kind: fields.kind,
            trigger_oracle: fields.trigger_oracle,
            trigger_price_1e8: fields.trigger_price_1e8,
            trigger_direction: fields.trigger_direction,
            trigger_mode: fields.trigger_mode,
            trigger_grace_slots: fields.trigger_grace_slots,
            action: fields.action,
            action_target: fields.action_target,
            action_min_premium_micro: fields.action_min_premium_micro,
            action_max_premium_micro: fields.action_max_premium_micro,
            action_max_slippage_bps: fields.action_max_slippage_bps,
            valid_until_ts: fields.valid_until_ts,
        };
    }
    toJSON() {
        return {
            order_id: this.order_id.toString(),
            kind: this.kind,
            trigger_oracle: this.trigger_oracle.toString(),
            trigger_price_1e8: this.trigger_price_1e8.toString(),
            trigger_direction: this.trigger_direction,
            trigger_mode: this.trigger_mode,
            trigger_grace_slots: this.trigger_grace_slots,
            action: this.action,
            action_target: this.action_target.toString(),
            action_min_premium_micro: this.action_min_premium_micro.toString(),
            action_max_premium_micro: this.action_max_premium_micro.toString(),
            action_max_slippage_bps: this.action_max_slippage_bps,
            valid_until_ts: this.valid_until_ts.toString(),
        };
    }
    static fromJSON(obj) {
        return new RegisterConditionalOrderArgs({
            order_id: new bn_js_1.default(obj.order_id),
            kind: obj.kind,
            trigger_oracle: new web3_js_1.PublicKey(obj.trigger_oracle),
            trigger_price_1e8: new bn_js_1.default(obj.trigger_price_1e8),
            trigger_direction: obj.trigger_direction,
            trigger_mode: obj.trigger_mode,
            trigger_grace_slots: obj.trigger_grace_slots,
            action: obj.action,
            action_target: new web3_js_1.PublicKey(obj.action_target),
            action_min_premium_micro: new bn_js_1.default(obj.action_min_premium_micro),
            action_max_premium_micro: new bn_js_1.default(obj.action_max_premium_micro),
            action_max_slippage_bps: obj.action_max_slippage_bps,
            valid_until_ts: new bn_js_1.default(obj.valid_until_ts),
        });
    }
    toEncodable() {
        return RegisterConditionalOrderArgs.toEncodable(this);
    }
}
exports.RegisterConditionalOrderArgs = RegisterConditionalOrderArgs;
//# sourceMappingURL=RegisterConditionalOrderArgs.js.map