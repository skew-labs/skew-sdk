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
exports.MethodologyCommitteeProposalQueued = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class MethodologyCommitteeProposalQueued {
    constructor(fields) {
        this.proposal = fields.proposal;
        this.committee = fields.committee;
        this.op = fields.op;
        this.target = fields.target;
        this.independent = fields.independent;
        this.queued_at_slot = fields.queued_at_slot;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("proposal"),
            borsh.publicKey("committee"),
            borsh.u8("op"),
            borsh.publicKey("target"),
            borsh.bool("independent"),
            borsh.u64("queued_at_slot"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new MethodologyCommitteeProposalQueued({
            proposal: obj.proposal,
            committee: obj.committee,
            op: obj.op,
            target: obj.target,
            independent: obj.independent,
            queued_at_slot: obj.queued_at_slot,
        });
    }
    static toEncodable(fields) {
        return {
            proposal: fields.proposal,
            committee: fields.committee,
            op: fields.op,
            target: fields.target,
            independent: fields.independent,
            queued_at_slot: fields.queued_at_slot,
        };
    }
    toJSON() {
        return {
            proposal: this.proposal.toString(),
            committee: this.committee.toString(),
            op: this.op,
            target: this.target.toString(),
            independent: this.independent,
            queued_at_slot: this.queued_at_slot.toString(),
        };
    }
    static fromJSON(obj) {
        return new MethodologyCommitteeProposalQueued({
            proposal: new web3_js_1.PublicKey(obj.proposal),
            committee: new web3_js_1.PublicKey(obj.committee),
            op: obj.op,
            target: new web3_js_1.PublicKey(obj.target),
            independent: obj.independent,
            queued_at_slot: new bn_js_1.default(obj.queued_at_slot),
        });
    }
    toEncodable() {
        return MethodologyCommitteeProposalQueued.toEncodable(this);
    }
}
exports.MethodologyCommitteeProposalQueued = MethodologyCommitteeProposalQueued;
//# sourceMappingURL=MethodologyCommitteeProposalQueued.js.map