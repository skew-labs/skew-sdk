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
exports.RecoveryDeterminationExecuted = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RecoveryDeterminationExecuted {
    constructor(fields) {
        this.determination = fields.determination;
        this.id = fields.id;
        this.approval_count = fields.approval_count;
        this.executed_at_slot = fields.executed_at_slot;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("determination"),
            borsh.u64("id"),
            borsh.u8("approval_count"),
            borsh.u64("executed_at_slot"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RecoveryDeterminationExecuted({
            determination: obj.determination,
            id: obj.id,
            approval_count: obj.approval_count,
            executed_at_slot: obj.executed_at_slot,
        });
    }
    static toEncodable(fields) {
        return {
            determination: fields.determination,
            id: fields.id,
            approval_count: fields.approval_count,
            executed_at_slot: fields.executed_at_slot,
        };
    }
    toJSON() {
        return {
            determination: this.determination.toString(),
            id: this.id.toString(),
            approval_count: this.approval_count,
            executed_at_slot: this.executed_at_slot.toString(),
        };
    }
    static fromJSON(obj) {
        return new RecoveryDeterminationExecuted({
            determination: new web3_js_1.PublicKey(obj.determination),
            id: new bn_js_1.default(obj.id),
            approval_count: obj.approval_count,
            executed_at_slot: new bn_js_1.default(obj.executed_at_slot),
        });
    }
    toEncodable() {
        return RecoveryDeterminationExecuted.toEncodable(this);
    }
}
exports.RecoveryDeterminationExecuted = RecoveryDeterminationExecuted;
//# sourceMappingURL=RecoveryDeterminationExecuted.js.map