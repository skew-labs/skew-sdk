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
exports.GovernanceMultisig = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class GovernanceMultisig {
    constructor(fields) {
        this.members = fields.members;
        this.threshold = fields.threshold;
        this.padding_0 = fields.padding_0;
        this.last_rotation_slot = fields.last_rotation_slot;
        this.next_proposal_id = fields.next_proposal_id;
        this.paused = fields.paused;
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
        if (!data.slice(0, 8).equals(GovernanceMultisig.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = GovernanceMultisig.layout.decode(data.slice(8));
        return new GovernanceMultisig({
            members: dec.members,
            threshold: dec.threshold,
            padding_0: dec.padding_0,
            last_rotation_slot: dec.last_rotation_slot,
            next_proposal_id: dec.next_proposal_id,
            paused: dec.paused,
            bump: dec.bump,
            padding_1: dec.padding_1,
        });
    }
    toJSON() {
        return {
            members: this.members.map((item) => item.toString()),
            threshold: this.threshold,
            padding_0: this.padding_0,
            last_rotation_slot: this.last_rotation_slot.toString(),
            next_proposal_id: this.next_proposal_id.toString(),
            paused: this.paused,
            bump: this.bump,
            padding_1: this.padding_1,
        };
    }
    static fromJSON(obj) {
        return new GovernanceMultisig({
            members: obj.members.map((item) => new web3_js_1.PublicKey(item)),
            threshold: obj.threshold,
            padding_0: obj.padding_0,
            last_rotation_slot: new bn_js_1.default(obj.last_rotation_slot),
            next_proposal_id: new bn_js_1.default(obj.next_proposal_id),
            paused: obj.paused,
            bump: obj.bump,
            padding_1: obj.padding_1,
        });
    }
}
exports.GovernanceMultisig = GovernanceMultisig;
GovernanceMultisig.discriminator = Buffer.from([
    55, 102, 234, 175, 98, 155, 147, 224,
]);
GovernanceMultisig.layout = borsh.struct([
    borsh.array(borsh.publicKey(), 5, "members"),
    borsh.u8("threshold"),
    borsh.array(borsh.u8(), 7, "padding_0"),
    borsh.u64("last_rotation_slot"),
    borsh.u64("next_proposal_id"),
    borsh.bool("paused"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "padding_1"),
]);
//# sourceMappingURL=GovernanceMultisig.js.map