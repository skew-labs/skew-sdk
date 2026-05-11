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
exports.OcoPairRegistered = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class OcoPairRegistered {
    constructor(fields) {
        this.authority = fields.authority;
        this.order_a = fields.order_a;
        this.order_b = fields.order_b;
        this.action_target = fields.action_target;
        this.registered_at = fields.registered_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("authority"),
            borsh.publicKey("order_a"),
            borsh.publicKey("order_b"),
            borsh.publicKey("action_target"),
            borsh.i64("registered_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new OcoPairRegistered({
            authority: obj.authority,
            order_a: obj.order_a,
            order_b: obj.order_b,
            action_target: obj.action_target,
            registered_at: obj.registered_at,
        });
    }
    static toEncodable(fields) {
        return {
            authority: fields.authority,
            order_a: fields.order_a,
            order_b: fields.order_b,
            action_target: fields.action_target,
            registered_at: fields.registered_at,
        };
    }
    toJSON() {
        return {
            authority: this.authority.toString(),
            order_a: this.order_a.toString(),
            order_b: this.order_b.toString(),
            action_target: this.action_target.toString(),
            registered_at: this.registered_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new OcoPairRegistered({
            authority: new web3_js_1.PublicKey(obj.authority),
            order_a: new web3_js_1.PublicKey(obj.order_a),
            order_b: new web3_js_1.PublicKey(obj.order_b),
            action_target: new web3_js_1.PublicKey(obj.action_target),
            registered_at: new bn_js_1.default(obj.registered_at),
        });
    }
    toEncodable() {
        return OcoPairRegistered.toEncodable(this);
    }
}
exports.OcoPairRegistered = OcoPairRegistered;
//# sourceMappingURL=OcoPairRegistered.js.map