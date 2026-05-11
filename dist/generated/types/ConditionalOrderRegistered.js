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
exports.ConditionalOrderRegistered = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ConditionalOrderRegistered {
    constructor(fields) {
        this.order = fields.order;
        this.authority = fields.authority;
        this.order_id = fields.order_id;
        this.kind = fields.kind;
        this.trigger_mode = fields.trigger_mode;
        this.trigger_direction = fields.trigger_direction;
        this.trigger_price_1e8 = fields.trigger_price_1e8;
        this.action = fields.action;
        this.action_target = fields.action_target;
        this.valid_until_ts = fields.valid_until_ts;
        this.registered_at = fields.registered_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("order"),
            borsh.publicKey("authority"),
            borsh.u64("order_id"),
            borsh.u8("kind"),
            borsh.u8("trigger_mode"),
            borsh.u8("trigger_direction"),
            borsh.i64("trigger_price_1e8"),
            borsh.u8("action"),
            borsh.publicKey("action_target"),
            borsh.i64("valid_until_ts"),
            borsh.i64("registered_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ConditionalOrderRegistered({
            order: obj.order,
            authority: obj.authority,
            order_id: obj.order_id,
            kind: obj.kind,
            trigger_mode: obj.trigger_mode,
            trigger_direction: obj.trigger_direction,
            trigger_price_1e8: obj.trigger_price_1e8,
            action: obj.action,
            action_target: obj.action_target,
            valid_until_ts: obj.valid_until_ts,
            registered_at: obj.registered_at,
        });
    }
    static toEncodable(fields) {
        return {
            order: fields.order,
            authority: fields.authority,
            order_id: fields.order_id,
            kind: fields.kind,
            trigger_mode: fields.trigger_mode,
            trigger_direction: fields.trigger_direction,
            trigger_price_1e8: fields.trigger_price_1e8,
            action: fields.action,
            action_target: fields.action_target,
            valid_until_ts: fields.valid_until_ts,
            registered_at: fields.registered_at,
        };
    }
    toJSON() {
        return {
            order: this.order.toString(),
            authority: this.authority.toString(),
            order_id: this.order_id.toString(),
            kind: this.kind,
            trigger_mode: this.trigger_mode,
            trigger_direction: this.trigger_direction,
            trigger_price_1e8: this.trigger_price_1e8.toString(),
            action: this.action,
            action_target: this.action_target.toString(),
            valid_until_ts: this.valid_until_ts.toString(),
            registered_at: this.registered_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new ConditionalOrderRegistered({
            order: new web3_js_1.PublicKey(obj.order),
            authority: new web3_js_1.PublicKey(obj.authority),
            order_id: new bn_js_1.default(obj.order_id),
            kind: obj.kind,
            trigger_mode: obj.trigger_mode,
            trigger_direction: obj.trigger_direction,
            trigger_price_1e8: new bn_js_1.default(obj.trigger_price_1e8),
            action: obj.action,
            action_target: new web3_js_1.PublicKey(obj.action_target),
            valid_until_ts: new bn_js_1.default(obj.valid_until_ts),
            registered_at: new bn_js_1.default(obj.registered_at),
        });
    }
    toEncodable() {
        return ConditionalOrderRegistered.toEncodable(this);
    }
}
exports.ConditionalOrderRegistered = ConditionalOrderRegistered;
//# sourceMappingURL=ConditionalOrderRegistered.js.map