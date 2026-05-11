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
exports.CrossAssetMatrixUpdated = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class CrossAssetMatrixUpdated {
    constructor(fields) {
        this.matrix = fields.matrix;
        this.last_update_slot = fields.last_update_slot;
        this.rho_p5_bps = fields.rho_p5_bps;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("matrix"),
            borsh.u64("last_update_slot"),
            borsh.array(borsh.u16(), 10, "rho_p5_bps"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new CrossAssetMatrixUpdated({
            matrix: obj.matrix,
            last_update_slot: obj.last_update_slot,
            rho_p5_bps: obj.rho_p5_bps,
        });
    }
    static toEncodable(fields) {
        return {
            matrix: fields.matrix,
            last_update_slot: fields.last_update_slot,
            rho_p5_bps: fields.rho_p5_bps,
        };
    }
    toJSON() {
        return {
            matrix: this.matrix.toString(),
            last_update_slot: this.last_update_slot.toString(),
            rho_p5_bps: this.rho_p5_bps,
        };
    }
    static fromJSON(obj) {
        return new CrossAssetMatrixUpdated({
            matrix: new web3_js_1.PublicKey(obj.matrix),
            last_update_slot: new bn_js_1.default(obj.last_update_slot),
            rho_p5_bps: obj.rho_p5_bps,
        });
    }
    toEncodable() {
        return CrossAssetMatrixUpdated.toEncodable(this);
    }
}
exports.CrossAssetMatrixUpdated = CrossAssetMatrixUpdated;
//# sourceMappingURL=CrossAssetMatrixUpdated.js.map