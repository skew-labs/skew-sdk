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
exports.RecoveryDeterminationProposed = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RecoveryDeterminationProposed {
    constructor(fields) {
        this.determination = fields.determination;
        this.committee = fields.committee;
        this.id = fields.id;
        this.trigger_kind = fields.trigger_kind;
        this.proposal_digest = fields.proposal_digest;
        this.proposed_at_slot = fields.proposed_at_slot;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("determination"),
            borsh.publicKey("committee"),
            borsh.u64("id"),
            borsh.u8("trigger_kind"),
            borsh.array(borsh.u8(), 32, "proposal_digest"),
            borsh.u64("proposed_at_slot"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RecoveryDeterminationProposed({
            determination: obj.determination,
            committee: obj.committee,
            id: obj.id,
            trigger_kind: obj.trigger_kind,
            proposal_digest: obj.proposal_digest,
            proposed_at_slot: obj.proposed_at_slot,
        });
    }
    static toEncodable(fields) {
        return {
            determination: fields.determination,
            committee: fields.committee,
            id: fields.id,
            trigger_kind: fields.trigger_kind,
            proposal_digest: fields.proposal_digest,
            proposed_at_slot: fields.proposed_at_slot,
        };
    }
    toJSON() {
        return {
            determination: this.determination.toString(),
            committee: this.committee.toString(),
            id: this.id.toString(),
            trigger_kind: this.trigger_kind,
            proposal_digest: this.proposal_digest,
            proposed_at_slot: this.proposed_at_slot.toString(),
        };
    }
    static fromJSON(obj) {
        return new RecoveryDeterminationProposed({
            determination: new web3_js_1.PublicKey(obj.determination),
            committee: new web3_js_1.PublicKey(obj.committee),
            id: new bn_js_1.default(obj.id),
            trigger_kind: obj.trigger_kind,
            proposal_digest: obj.proposal_digest,
            proposed_at_slot: new bn_js_1.default(obj.proposed_at_slot),
        });
    }
    toEncodable() {
        return RecoveryDeterminationProposed.toEncodable(this);
    }
}
exports.RecoveryDeterminationProposed = RecoveryDeterminationProposed;
//# sourceMappingURL=RecoveryDeterminationProposed.js.map