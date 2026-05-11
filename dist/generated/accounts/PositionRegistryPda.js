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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionRegistryPda = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class PositionRegistryPda {
    constructor(fields) {
        this.cm = fields.cm;
        this.authority = fields.authority;
        this.bump = fields.bump;
        this.count = fields.count;
        this.padding = fields.padding;
        this.positions = fields.positions;
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
        if (!data.slice(0, 8).equals(PositionRegistryPda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = PositionRegistryPda.layout.decode(data.slice(8));
        return new PositionRegistryPda({
            cm: dec.cm,
            authority: dec.authority,
            bump: dec.bump,
            count: dec.count,
            padding: dec.padding,
            positions: dec.positions,
        });
    }
    toJSON() {
        return {
            cm: this.cm.toString(),
            authority: this.authority.toString(),
            bump: this.bump,
            count: this.count,
            padding: this.padding,
            positions: this.positions.map((item) => item.toString()),
        };
    }
    static fromJSON(obj) {
        return new PositionRegistryPda({
            cm: new web3_js_1.PublicKey(obj.cm),
            authority: new web3_js_1.PublicKey(obj.authority),
            bump: obj.bump,
            count: obj.count,
            padding: obj.padding,
            positions: obj.positions.map((item) => new web3_js_1.PublicKey(item)),
        });
    }
}
exports.PositionRegistryPda = PositionRegistryPda;
PositionRegistryPda.discriminator = Buffer.from([
    106, 147, 122, 203, 115, 180, 187, 242,
]);
PositionRegistryPda.layout = borsh.struct([
    borsh.publicKey("cm"),
    borsh.publicKey("authority"),
    borsh.u8("bump"),
    borsh.u8("count"),
    borsh.array(borsh.u8(), 6, "padding"),
    borsh.array(borsh.publicKey(), 32, "positions"),
]);
//# sourceMappingURL=PositionRegistryPda.js.map