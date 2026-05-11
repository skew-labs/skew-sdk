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
exports.ComboIntentPda = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class ComboIntentPda {
    constructor(fields) {
        this.buyer = fields.buyer;
        this.combo_id = fields.combo_id;
        this.n_legs = fields.n_legs;
        this.legs_filled_mask = fields.legs_filled_mask;
        this.status = fields.status;
        this.bump = fields.bump;
        this._padding_0 = fields._padding_0;
        this.total_max_premium_micro = fields.total_max_premium_micro;
        this.total_premium_paid_micro = fields.total_premium_paid_micro;
        this.expiry_ts = fields.expiry_ts;
        this.created_at = fields.created_at;
        this.legs = fields.legs.map((item) => new types.ComboLegSpec({ ...item }));
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
        if (!data.slice(0, 8).equals(ComboIntentPda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = ComboIntentPda.layout.decode(data.slice(8));
        return new ComboIntentPda({
            buyer: dec.buyer,
            combo_id: dec.combo_id,
            n_legs: dec.n_legs,
            legs_filled_mask: dec.legs_filled_mask,
            status: types.ComboStatus.fromDecoded(dec.status),
            bump: dec.bump,
            _padding_0: dec._padding_0,
            total_max_premium_micro: dec.total_max_premium_micro,
            total_premium_paid_micro: dec.total_premium_paid_micro,
            expiry_ts: dec.expiry_ts,
            created_at: dec.created_at,
            legs: dec.legs.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.ComboLegSpec.fromDecoded(item)),
        });
    }
    toJSON() {
        return {
            buyer: this.buyer.toString(),
            combo_id: this.combo_id.toString(),
            n_legs: this.n_legs,
            legs_filled_mask: this.legs_filled_mask,
            status: this.status.toJSON(),
            bump: this.bump,
            _padding_0: this._padding_0,
            total_max_premium_micro: this.total_max_premium_micro.toString(),
            total_premium_paid_micro: this.total_premium_paid_micro.toString(),
            expiry_ts: this.expiry_ts.toString(),
            created_at: this.created_at.toString(),
            legs: this.legs.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new ComboIntentPda({
            buyer: new web3_js_1.PublicKey(obj.buyer),
            combo_id: new bn_js_1.default(obj.combo_id),
            n_legs: obj.n_legs,
            legs_filled_mask: obj.legs_filled_mask,
            status: types.ComboStatus.fromJSON(obj.status),
            bump: obj.bump,
            _padding_0: obj._padding_0,
            total_max_premium_micro: new bn_js_1.default(obj.total_max_premium_micro),
            total_premium_paid_micro: new bn_js_1.default(obj.total_premium_paid_micro),
            expiry_ts: new bn_js_1.default(obj.expiry_ts),
            created_at: new bn_js_1.default(obj.created_at),
            legs: obj.legs.map((item) => types.ComboLegSpec.fromJSON(item)),
        });
    }
}
exports.ComboIntentPda = ComboIntentPda;
ComboIntentPda.discriminator = Buffer.from([
    39, 204, 133, 2, 228, 151, 60, 203,
]);
ComboIntentPda.layout = borsh.struct([
    borsh.publicKey("buyer"),
    borsh.u64("combo_id"),
    borsh.u8("n_legs"),
    borsh.u8("legs_filled_mask"),
    types.ComboStatus.layout("status"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 4, "_padding_0"),
    borsh.u64("total_max_premium_micro"),
    borsh.u64("total_premium_paid_micro"),
    borsh.i64("expiry_ts"),
    borsh.i64("created_at"),
    borsh.array(types.ComboLegSpec.layout(), 4, "legs"),
]);
//# sourceMappingURL=ComboIntentPda.js.map