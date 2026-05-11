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
exports.ConditionalActionApplied = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ConditionalActionApplied {
    constructor(fields) {
        this.order = fields.order;
        this.order_id = fields.order_id;
        this.action = fields.action;
        this.action_target = fields.action_target;
        this.amount_settled_micro = fields.amount_settled_micro;
        this.applied_at = fields.applied_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("order"),
            borsh.u64("order_id"),
            borsh.u8("action"),
            borsh.publicKey("action_target"),
            borsh.u64("amount_settled_micro"),
            borsh.i64("applied_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ConditionalActionApplied({
            order: obj.order,
            order_id: obj.order_id,
            action: obj.action,
            action_target: obj.action_target,
            amount_settled_micro: obj.amount_settled_micro,
            applied_at: obj.applied_at,
        });
    }
    static toEncodable(fields) {
        return {
            order: fields.order,
            order_id: fields.order_id,
            action: fields.action,
            action_target: fields.action_target,
            amount_settled_micro: fields.amount_settled_micro,
            applied_at: fields.applied_at,
        };
    }
    toJSON() {
        return {
            order: this.order.toString(),
            order_id: this.order_id.toString(),
            action: this.action,
            action_target: this.action_target.toString(),
            amount_settled_micro: this.amount_settled_micro.toString(),
            applied_at: this.applied_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new ConditionalActionApplied({
            order: new web3_js_1.PublicKey(obj.order),
            order_id: new bn_js_1.default(obj.order_id),
            action: obj.action,
            action_target: new web3_js_1.PublicKey(obj.action_target),
            amount_settled_micro: new bn_js_1.default(obj.amount_settled_micro),
            applied_at: new bn_js_1.default(obj.applied_at),
        });
    }
    toEncodable() {
        return ConditionalActionApplied.toEncodable(this);
    }
}
exports.ConditionalActionApplied = ConditionalActionApplied;
//# sourceMappingURL=ConditionalActionApplied.js.map