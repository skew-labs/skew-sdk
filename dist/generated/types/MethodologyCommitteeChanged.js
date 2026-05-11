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
exports.MethodologyCommitteeChanged = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class MethodologyCommitteeChanged {
    constructor(fields) {
        this.committee = fields.committee;
        this.proposal = fields.proposal;
        this.op = fields.op;
        this.target = fields.target;
        this.member_count = fields.member_count;
        this.independent_count = fields.independent_count;
        this.executed_at_slot = fields.executed_at_slot;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("committee"),
            borsh.publicKey("proposal"),
            borsh.u8("op"),
            borsh.publicKey("target"),
            borsh.u8("member_count"),
            borsh.u8("independent_count"),
            borsh.u64("executed_at_slot"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new MethodologyCommitteeChanged({
            committee: obj.committee,
            proposal: obj.proposal,
            op: obj.op,
            target: obj.target,
            member_count: obj.member_count,
            independent_count: obj.independent_count,
            executed_at_slot: obj.executed_at_slot,
        });
    }
    static toEncodable(fields) {
        return {
            committee: fields.committee,
            proposal: fields.proposal,
            op: fields.op,
            target: fields.target,
            member_count: fields.member_count,
            independent_count: fields.independent_count,
            executed_at_slot: fields.executed_at_slot,
        };
    }
    toJSON() {
        return {
            committee: this.committee.toString(),
            proposal: this.proposal.toString(),
            op: this.op,
            target: this.target.toString(),
            member_count: this.member_count,
            independent_count: this.independent_count,
            executed_at_slot: this.executed_at_slot.toString(),
        };
    }
    static fromJSON(obj) {
        return new MethodologyCommitteeChanged({
            committee: new web3_js_1.PublicKey(obj.committee),
            proposal: new web3_js_1.PublicKey(obj.proposal),
            op: obj.op,
            target: new web3_js_1.PublicKey(obj.target),
            member_count: obj.member_count,
            independent_count: obj.independent_count,
            executed_at_slot: new bn_js_1.default(obj.executed_at_slot),
        });
    }
    toEncodable() {
        return MethodologyCommitteeChanged.toEncodable(this);
    }
}
exports.MethodologyCommitteeChanged = MethodologyCommitteeChanged;
//# sourceMappingURL=MethodologyCommitteeChanged.js.map