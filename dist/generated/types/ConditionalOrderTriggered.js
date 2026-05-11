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
exports.ConditionalOrderTriggered = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ConditionalOrderTriggered {
    constructor(fields) {
        this.order = fields.order;
        this.authority = fields.authority;
        this.order_id = fields.order_id;
        this.action = fields.action;
        this.action_target = fields.action_target;
        this.triggered_at_slot = fields.triggered_at_slot;
        this.oracle_price_micro = fields.oracle_price_micro;
        this.threshold_micro = fields.threshold_micro;
        this.keeper = fields.keeper;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("order"),
            borsh.publicKey("authority"),
            borsh.u64("order_id"),
            borsh.u8("action"),
            borsh.publicKey("action_target"),
            borsh.u64("triggered_at_slot"),
            borsh.i64("oracle_price_micro"),
            borsh.i64("threshold_micro"),
            borsh.publicKey("keeper"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ConditionalOrderTriggered({
            order: obj.order,
            authority: obj.authority,
            order_id: obj.order_id,
            action: obj.action,
            action_target: obj.action_target,
            triggered_at_slot: obj.triggered_at_slot,
            oracle_price_micro: obj.oracle_price_micro,
            threshold_micro: obj.threshold_micro,
            keeper: obj.keeper,
        });
    }
    static toEncodable(fields) {
        return {
            order: fields.order,
            authority: fields.authority,
            order_id: fields.order_id,
            action: fields.action,
            action_target: fields.action_target,
            triggered_at_slot: fields.triggered_at_slot,
            oracle_price_micro: fields.oracle_price_micro,
            threshold_micro: fields.threshold_micro,
            keeper: fields.keeper,
        };
    }
    toJSON() {
        return {
            order: this.order.toString(),
            authority: this.authority.toString(),
            order_id: this.order_id.toString(),
            action: this.action,
            action_target: this.action_target.toString(),
            triggered_at_slot: this.triggered_at_slot.toString(),
            oracle_price_micro: this.oracle_price_micro.toString(),
            threshold_micro: this.threshold_micro.toString(),
            keeper: this.keeper.toString(),
        };
    }
    static fromJSON(obj) {
        return new ConditionalOrderTriggered({
            order: new web3_js_1.PublicKey(obj.order),
            authority: new web3_js_1.PublicKey(obj.authority),
            order_id: new bn_js_1.default(obj.order_id),
            action: obj.action,
            action_target: new web3_js_1.PublicKey(obj.action_target),
            triggered_at_slot: new bn_js_1.default(obj.triggered_at_slot),
            oracle_price_micro: new bn_js_1.default(obj.oracle_price_micro),
            threshold_micro: new bn_js_1.default(obj.threshold_micro),
            keeper: new web3_js_1.PublicKey(obj.keeper),
        });
    }
    toEncodable() {
        return ConditionalOrderTriggered.toEncodable(this);
    }
}
exports.ConditionalOrderTriggered = ConditionalOrderTriggered;
//# sourceMappingURL=ConditionalOrderTriggered.js.map