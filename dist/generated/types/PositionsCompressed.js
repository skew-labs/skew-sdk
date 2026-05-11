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
exports.PositionsCompressed = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class PositionsCompressed {
    constructor(fields) {
        this.cm = fields.cm;
        this.n_legs_compressed = fields.n_legs_compressed;
        this.gross_notional_before = fields.gross_notional_before;
        this.gross_notional_after = fields.gross_notional_after;
        this.freed_im_micro = fields.freed_im_micro;
        this.compressed_at = fields.compressed_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("cm"),
            borsh.u32("n_legs_compressed"),
            borsh.u64("gross_notional_before"),
            borsh.u64("gross_notional_after"),
            borsh.u64("freed_im_micro"),
            borsh.i64("compressed_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new PositionsCompressed({
            cm: obj.cm,
            n_legs_compressed: obj.n_legs_compressed,
            gross_notional_before: obj.gross_notional_before,
            gross_notional_after: obj.gross_notional_after,
            freed_im_micro: obj.freed_im_micro,
            compressed_at: obj.compressed_at,
        });
    }
    static toEncodable(fields) {
        return {
            cm: fields.cm,
            n_legs_compressed: fields.n_legs_compressed,
            gross_notional_before: fields.gross_notional_before,
            gross_notional_after: fields.gross_notional_after,
            freed_im_micro: fields.freed_im_micro,
            compressed_at: fields.compressed_at,
        };
    }
    toJSON() {
        return {
            cm: this.cm.toString(),
            n_legs_compressed: this.n_legs_compressed,
            gross_notional_before: this.gross_notional_before.toString(),
            gross_notional_after: this.gross_notional_after.toString(),
            freed_im_micro: this.freed_im_micro.toString(),
            compressed_at: this.compressed_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new PositionsCompressed({
            cm: new web3_js_1.PublicKey(obj.cm),
            n_legs_compressed: obj.n_legs_compressed,
            gross_notional_before: new bn_js_1.default(obj.gross_notional_before),
            gross_notional_after: new bn_js_1.default(obj.gross_notional_after),
            freed_im_micro: new bn_js_1.default(obj.freed_im_micro),
            compressed_at: new bn_js_1.default(obj.compressed_at),
        });
    }
    toEncodable() {
        return PositionsCompressed.toEncodable(this);
    }
}
exports.PositionsCompressed = PositionsCompressed;
//# sourceMappingURL=PositionsCompressed.js.map