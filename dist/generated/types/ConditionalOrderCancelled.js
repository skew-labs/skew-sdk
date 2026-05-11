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
exports.ConditionalOrderCancelled = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ConditionalOrderCancelled {
    constructor(fields) {
        this.order = fields.order;
        this.authority = fields.authority;
        this.order_id = fields.order_id;
        this.cancelled_at = fields.cancelled_at;
        this.was_oco_pair = fields.was_oco_pair;
        this.linked_order = fields.linked_order;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("order"),
            borsh.publicKey("authority"),
            borsh.u64("order_id"),
            borsh.i64("cancelled_at"),
            borsh.bool("was_oco_pair"),
            borsh.publicKey("linked_order"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ConditionalOrderCancelled({
            order: obj.order,
            authority: obj.authority,
            order_id: obj.order_id,
            cancelled_at: obj.cancelled_at,
            was_oco_pair: obj.was_oco_pair,
            linked_order: obj.linked_order,
        });
    }
    static toEncodable(fields) {
        return {
            order: fields.order,
            authority: fields.authority,
            order_id: fields.order_id,
            cancelled_at: fields.cancelled_at,
            was_oco_pair: fields.was_oco_pair,
            linked_order: fields.linked_order,
        };
    }
    toJSON() {
        return {
            order: this.order.toString(),
            authority: this.authority.toString(),
            order_id: this.order_id.toString(),
            cancelled_at: this.cancelled_at.toString(),
            was_oco_pair: this.was_oco_pair,
            linked_order: this.linked_order.toString(),
        };
    }
    static fromJSON(obj) {
        return new ConditionalOrderCancelled({
            order: new web3_js_1.PublicKey(obj.order),
            authority: new web3_js_1.PublicKey(obj.authority),
            order_id: new bn_js_1.default(obj.order_id),
            cancelled_at: new bn_js_1.default(obj.cancelled_at),
            was_oco_pair: obj.was_oco_pair,
            linked_order: new web3_js_1.PublicKey(obj.linked_order),
        });
    }
    toEncodable() {
        return ConditionalOrderCancelled.toEncodable(this);
    }
}
exports.ConditionalOrderCancelled = ConditionalOrderCancelled;
//# sourceMappingURL=ConditionalOrderCancelled.js.map