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
exports.MethodologyDecisionPda = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class MethodologyDecisionPda {
    constructor(fields) {
        this.id = fields.id;
        this.recorded_at_slot = fields.recorded_at_slot;
        this.notice_start_slot = fields.notice_start_slot;
        this.kind = fields.kind;
        this.padding_0 = fields.padding_0;
        this.note = fields.note;
        this.bump = fields.bump;
        this.padding_1 = fields.padding_1;
    }
    static async fetch(c, address, programId = programId_1.PROGRAM_ID) {
        const info = await c.getAccountInfo(address);
        if (info === null) {
            return null;
        }
        if (!info.owner.equals(programId)) {
            throw new Error("account doesn't belong to this program");
        }
        return this.decode(info.data);
    }
    static async fetchMultiple(c, addresses, programId = programId_1.PROGRAM_ID) {
        const infos = await c.getMultipleAccountsInfo(addresses);
        return infos.map((info) => {
            if (info === null) {
                return null;
            }
            if (!info.owner.equals(programId)) {
                throw new Error("account doesn't belong to this program");
            }
            return this.decode(info.data);
        });
    }
    static decode(data) {
        if (!data.slice(0, 8).equals(MethodologyDecisionPda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = MethodologyDecisionPda.layout.decode(data.slice(8));
        return new MethodologyDecisionPda({
            id: dec.id,
            recorded_at_slot: dec.recorded_at_slot,
            notice_start_slot: dec.notice_start_slot,
            kind: types.MethodologyChangeKind.fromDecoded(dec.kind),
            padding_0: dec.padding_0,
            note: dec.note,
            bump: dec.bump,
            padding_1: dec.padding_1,
        });
    }
    toJSON() {
        return {
            id: this.id.toString(),
            recorded_at_slot: this.recorded_at_slot.toString(),
            notice_start_slot: this.notice_start_slot.toString(),
            kind: this.kind.toJSON(),
            padding_0: this.padding_0,
            note: this.note,
            bump: this.bump,
            padding_1: this.padding_1,
        };
    }
    static fromJSON(obj) {
        return new MethodologyDecisionPda({
            id: new bn_js_1.default(obj.id),
            recorded_at_slot: new bn_js_1.default(obj.recorded_at_slot),
            notice_start_slot: new bn_js_1.default(obj.notice_start_slot),
            kind: types.MethodologyChangeKind.fromJSON(obj.kind),
            padding_0: obj.padding_0,
            note: obj.note,
            bump: obj.bump,
            padding_1: obj.padding_1,
        });
    }
}
exports.MethodologyDecisionPda = MethodologyDecisionPda;
MethodologyDecisionPda.discriminator = Buffer.from([
    143, 173, 70, 34, 38, 10, 177, 92,
]);
MethodologyDecisionPda.layout = borsh.struct([
    borsh.u64("id"),
    borsh.u64("recorded_at_slot"),
    borsh.u64("notice_start_slot"),
    types.MethodologyChangeKind.layout("kind"),
    borsh.array(borsh.u8(), 7, "padding_0"),
    borsh.array(borsh.u8(), 256, "note"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 7, "padding_1"),
]);
//# sourceMappingURL=MethodologyDecisionPda.js.map