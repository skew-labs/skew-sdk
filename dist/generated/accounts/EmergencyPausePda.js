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
exports.EmergencyPausePda = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class EmergencyPausePda {
    constructor(fields) {
        this.active = fields.active;
        this.bump = fields.bump;
        this._pad_0 = fields._pad_0;
        this.started_at_slot = fields.started_at_slot;
        this.started_by = fields.started_by;
        this._reserved = fields._reserved;
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
        if (!data.slice(0, 8).equals(EmergencyPausePda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = EmergencyPausePda.layout.decode(data.slice(8));
        return new EmergencyPausePda({
            active: dec.active,
            bump: dec.bump,
            _pad_0: dec._pad_0,
            started_at_slot: dec.started_at_slot,
            started_by: dec.started_by,
            _reserved: dec._reserved,
        });
    }
    toJSON() {
        return {
            active: this.active,
            bump: this.bump,
            _pad_0: this._pad_0,
            started_at_slot: this.started_at_slot.toString(),
            started_by: this.started_by.toString(),
            _reserved: this._reserved,
        };
    }
    static fromJSON(obj) {
        return new EmergencyPausePda({
            active: obj.active,
            bump: obj.bump,
            _pad_0: obj._pad_0,
            started_at_slot: new bn_js_1.default(obj.started_at_slot),
            started_by: new web3_js_1.PublicKey(obj.started_by),
            _reserved: obj._reserved,
        });
    }
}
exports.EmergencyPausePda = EmergencyPausePda;
EmergencyPausePda.discriminator = Buffer.from([
    142, 229, 63, 48, 165, 226, 138, 233,
]);
EmergencyPausePda.layout = borsh.struct([
    borsh.bool("active"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "_pad_0"),
    borsh.u64("started_at_slot"),
    borsh.publicKey("started_by"),
    borsh.array(borsh.u8(), 32, "_reserved"),
]);
//# sourceMappingURL=EmergencyPausePda.js.map