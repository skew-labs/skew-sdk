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
exports.CollateralPolicyPda = void 0;
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class CollateralPolicyPda {
    constructor(fields) {
        this.bump = fields.bump;
        this.entry_count = fields.entry_count;
        this.padding = fields.padding;
        this.entries = fields.entries.map((item) => new types.CollateralPolicyEntry({ ...item }));
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
        if (!data.slice(0, 8).equals(CollateralPolicyPda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = CollateralPolicyPda.layout.decode(data.slice(8));
        return new CollateralPolicyPda({
            bump: dec.bump,
            entry_count: dec.entry_count,
            padding: dec.padding,
            entries: dec.entries.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.CollateralPolicyEntry.fromDecoded(item)),
        });
    }
    toJSON() {
        return {
            bump: this.bump,
            entry_count: this.entry_count,
            padding: this.padding,
            entries: this.entries.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new CollateralPolicyPda({
            bump: obj.bump,
            entry_count: obj.entry_count,
            padding: obj.padding,
            entries: obj.entries.map((item) => types.CollateralPolicyEntry.fromJSON(item)),
        });
    }
}
exports.CollateralPolicyPda = CollateralPolicyPda;
CollateralPolicyPda.discriminator = Buffer.from([
    51, 144, 214, 139, 2, 151, 155, 50,
]);
CollateralPolicyPda.layout = borsh.struct([
    borsh.u8("bump"),
    borsh.u8("entry_count"),
    borsh.array(borsh.u8(), 6, "padding"),
    borsh.array(types.CollateralPolicyEntry.layout(), 8, "entries"),
]);
//# sourceMappingURL=CollateralPolicyPda.js.map