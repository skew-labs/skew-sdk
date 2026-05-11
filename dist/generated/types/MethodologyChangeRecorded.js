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
exports.MethodologyChangeRecorded = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class MethodologyChangeRecorded {
    constructor(fields) {
        this.committee = fields.committee;
        this.decision = fields.decision;
        this.id = fields.id;
        this.kind = fields.kind;
        this.recorded_at_slot = fields.recorded_at_slot;
        this.notice_start_slot = fields.notice_start_slot;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("committee"),
            borsh.publicKey("decision"),
            borsh.u64("id"),
            borsh.u8("kind"),
            borsh.u64("recorded_at_slot"),
            borsh.u64("notice_start_slot"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new MethodologyChangeRecorded({
            committee: obj.committee,
            decision: obj.decision,
            id: obj.id,
            kind: obj.kind,
            recorded_at_slot: obj.recorded_at_slot,
            notice_start_slot: obj.notice_start_slot,
        });
    }
    static toEncodable(fields) {
        return {
            committee: fields.committee,
            decision: fields.decision,
            id: fields.id,
            kind: fields.kind,
            recorded_at_slot: fields.recorded_at_slot,
            notice_start_slot: fields.notice_start_slot,
        };
    }
    toJSON() {
        return {
            committee: this.committee.toString(),
            decision: this.decision.toString(),
            id: this.id.toString(),
            kind: this.kind,
            recorded_at_slot: this.recorded_at_slot.toString(),
            notice_start_slot: this.notice_start_slot.toString(),
        };
    }
    static fromJSON(obj) {
        return new MethodologyChangeRecorded({
            committee: new web3_js_1.PublicKey(obj.committee),
            decision: new web3_js_1.PublicKey(obj.decision),
            id: new bn_js_1.default(obj.id),
            kind: obj.kind,
            recorded_at_slot: new bn_js_1.default(obj.recorded_at_slot),
            notice_start_slot: new bn_js_1.default(obj.notice_start_slot),
        });
    }
    toEncodable() {
        return MethodologyChangeRecorded.toEncodable(this);
    }
}
exports.MethodologyChangeRecorded = MethodologyChangeRecorded;
//# sourceMappingURL=MethodologyChangeRecorded.js.map