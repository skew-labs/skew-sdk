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
exports.DvolUpdated = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class DvolUpdated {
    constructor(fields) {
        this.dvol_pda = fields.dvol_pda;
        this.asset = fields.asset;
        this.last_update_slot = fields.last_update_slot;
        this.dvol_28d_micro = fields.dvol_28d_micro;
        this.dvol_90d_micro = fields.dvol_90d_micro;
        this.realized_var_28d_micro = fields.realized_var_28d_micro;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("dvol_pda"),
            borsh.u8("asset"),
            borsh.u64("last_update_slot"),
            borsh.u64("dvol_28d_micro"),
            borsh.u64("dvol_90d_micro"),
            borsh.u64("realized_var_28d_micro"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new DvolUpdated({
            dvol_pda: obj.dvol_pda,
            asset: obj.asset,
            last_update_slot: obj.last_update_slot,
            dvol_28d_micro: obj.dvol_28d_micro,
            dvol_90d_micro: obj.dvol_90d_micro,
            realized_var_28d_micro: obj.realized_var_28d_micro,
        });
    }
    static toEncodable(fields) {
        return {
            dvol_pda: fields.dvol_pda,
            asset: fields.asset,
            last_update_slot: fields.last_update_slot,
            dvol_28d_micro: fields.dvol_28d_micro,
            dvol_90d_micro: fields.dvol_90d_micro,
            realized_var_28d_micro: fields.realized_var_28d_micro,
        };
    }
    toJSON() {
        return {
            dvol_pda: this.dvol_pda.toString(),
            asset: this.asset,
            last_update_slot: this.last_update_slot.toString(),
            dvol_28d_micro: this.dvol_28d_micro.toString(),
            dvol_90d_micro: this.dvol_90d_micro.toString(),
            realized_var_28d_micro: this.realized_var_28d_micro.toString(),
        };
    }
    static fromJSON(obj) {
        return new DvolUpdated({
            dvol_pda: new web3_js_1.PublicKey(obj.dvol_pda),
            asset: obj.asset,
            last_update_slot: new bn_js_1.default(obj.last_update_slot),
            dvol_28d_micro: new bn_js_1.default(obj.dvol_28d_micro),
            dvol_90d_micro: new bn_js_1.default(obj.dvol_90d_micro),
            realized_var_28d_micro: new bn_js_1.default(obj.realized_var_28d_micro),
        });
    }
    toEncodable() {
        return DvolUpdated.toEncodable(this);
    }
}
exports.DvolUpdated = DvolUpdated;
//# sourceMappingURL=DvolUpdated.js.map