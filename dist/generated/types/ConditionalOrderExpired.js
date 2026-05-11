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
exports.ConditionalOrderExpired = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ConditionalOrderExpired {
    constructor(fields) {
        this.order = fields.order;
        this.authority = fields.authority;
        this.order_id = fields.order_id;
        this.expired_at = fields.expired_at;
        this.cleanup_caller = fields.cleanup_caller;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("order"),
            borsh.publicKey("authority"),
            borsh.u64("order_id"),
            borsh.i64("expired_at"),
            borsh.publicKey("cleanup_caller"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ConditionalOrderExpired({
            order: obj.order,
            authority: obj.authority,
            order_id: obj.order_id,
            expired_at: obj.expired_at,
            cleanup_caller: obj.cleanup_caller,
        });
    }
    static toEncodable(fields) {
        return {
            order: fields.order,
            authority: fields.authority,
            order_id: fields.order_id,
            expired_at: fields.expired_at,
            cleanup_caller: fields.cleanup_caller,
        };
    }
    toJSON() {
        return {
            order: this.order.toString(),
            authority: this.authority.toString(),
            order_id: this.order_id.toString(),
            expired_at: this.expired_at.toString(),
            cleanup_caller: this.cleanup_caller.toString(),
        };
    }
    static fromJSON(obj) {
        return new ConditionalOrderExpired({
            order: new web3_js_1.PublicKey(obj.order),
            authority: new web3_js_1.PublicKey(obj.authority),
            order_id: new bn_js_1.default(obj.order_id),
            expired_at: new bn_js_1.default(obj.expired_at),
            cleanup_caller: new web3_js_1.PublicKey(obj.cleanup_caller),
        });
    }
    toEncodable() {
        return ConditionalOrderExpired.toEncodable(this);
    }
}
exports.ConditionalOrderExpired = ConditionalOrderExpired;
//# sourceMappingURL=ConditionalOrderExpired.js.map