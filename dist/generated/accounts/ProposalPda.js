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
exports.ProposalPda = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class ProposalPda {
    constructor(fields) {
        this.id = fields.id;
        this.queued_at_slot = fields.queued_at_slot;
        this.executed_at_slot = fields.executed_at_slot;
        this.approvals_bitmap = fields.approvals_bitmap;
        this.executed = fields.executed;
        this.padding_0 = fields.padding_0;
        this.action = fields.action;
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
        if (!data.slice(0, 8).equals(ProposalPda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = ProposalPda.layout.decode(data.slice(8));
        return new ProposalPda({
            id: dec.id,
            queued_at_slot: dec.queued_at_slot,
            executed_at_slot: dec.executed_at_slot,
            approvals_bitmap: dec.approvals_bitmap,
            executed: dec.executed,
            padding_0: dec.padding_0,
            action: types.AdminAction.fromDecoded(dec.action),
            bump: dec.bump,
            padding_1: dec.padding_1,
        });
    }
    toJSON() {
        return {
            id: this.id.toString(),
            queued_at_slot: this.queued_at_slot.toString(),
            executed_at_slot: this.executed_at_slot.toString(),
            approvals_bitmap: this.approvals_bitmap,
            executed: this.executed,
            padding_0: this.padding_0,
            action: this.action.toJSON(),
            bump: this.bump,
            padding_1: this.padding_1,
        };
    }
    static fromJSON(obj) {
        return new ProposalPda({
            id: new bn_js_1.default(obj.id),
            queued_at_slot: new bn_js_1.default(obj.queued_at_slot),
            executed_at_slot: new bn_js_1.default(obj.executed_at_slot),
            approvals_bitmap: obj.approvals_bitmap,
            executed: obj.executed,
            padding_0: obj.padding_0,
            action: types.AdminAction.fromJSON(obj.action),
            bump: obj.bump,
            padding_1: obj.padding_1,
        });
    }
}
exports.ProposalPda = ProposalPda;
ProposalPda.discriminator = Buffer.from([
    231, 115, 217, 162, 33, 243, 132, 22,
]);
ProposalPda.layout = borsh.struct([
    borsh.u64("id"),
    borsh.u64("queued_at_slot"),
    borsh.u64("executed_at_slot"),
    borsh.u8("approvals_bitmap"),
    borsh.bool("executed"),
    borsh.array(borsh.u8(), 6, "padding_0"),
    types.AdminAction.layout("action"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 7, "padding_1"),
]);
//# sourceMappingURL=ProposalPda.js.map