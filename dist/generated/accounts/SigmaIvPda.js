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
exports.SigmaIvPda = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class SigmaIvPda {
    constructor(fields) {
        this.btc_long = fields.btc_long;
        this.btc_short = fields.btc_short;
        this.eth_long = fields.eth_long;
        this.eth_short = fields.eth_short;
        this.sol_long = fields.sol_long;
        this.sol_short = fields.sol_short;
        this.last_update_long = fields.last_update_long;
        this.last_update_short = fields.last_update_short;
        this.authority = fields.authority;
        this.bump = fields.bump;
        this.jup_rv = fields.jup_rv;
        this.bonk_rv = fields.bonk_rv;
        this.wif_rv = fields.wif_rv;
        this.sol_rv = fields.sol_rv;
        this.last_update_rv = fields.last_update_rv;
        this.btc_r_t = fields.btc_r_t;
        this.eth_r_t = fields.eth_r_t;
        this.sol_r_t = fields.sol_r_t;
        this.last_update_r_t = fields.last_update_r_t;
        this.xrp_long = fields.xrp_long;
        this.xrp_short = fields.xrp_short;
        this.hype_long = fields.hype_long;
        this.hype_short = fields.hype_short;
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
        if (!data.slice(0, 8).equals(SigmaIvPda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = SigmaIvPda.layout.decode(data.slice(8));
        return new SigmaIvPda({
            btc_long: dec.btc_long,
            btc_short: dec.btc_short,
            eth_long: dec.eth_long,
            eth_short: dec.eth_short,
            sol_long: dec.sol_long,
            sol_short: dec.sol_short,
            last_update_long: dec.last_update_long,
            last_update_short: dec.last_update_short,
            authority: dec.authority,
            bump: dec.bump,
            jup_rv: dec.jup_rv,
            bonk_rv: dec.bonk_rv,
            wif_rv: dec.wif_rv,
            sol_rv: dec.sol_rv,
            last_update_rv: dec.last_update_rv,
            btc_r_t: dec.btc_r_t,
            eth_r_t: dec.eth_r_t,
            sol_r_t: dec.sol_r_t,
            last_update_r_t: dec.last_update_r_t,
            xrp_long: dec.xrp_long,
            xrp_short: dec.xrp_short,
            hype_long: dec.hype_long,
            hype_short: dec.hype_short,
        });
    }
    toJSON() {
        return {
            btc_long: this.btc_long,
            btc_short: this.btc_short,
            eth_long: this.eth_long,
            eth_short: this.eth_short,
            sol_long: this.sol_long,
            sol_short: this.sol_short,
            last_update_long: this.last_update_long.toString(),
            last_update_short: this.last_update_short.toString(),
            authority: this.authority.toString(),
            bump: this.bump,
            jup_rv: this.jup_rv,
            bonk_rv: this.bonk_rv,
            wif_rv: this.wif_rv,
            sol_rv: this.sol_rv,
            last_update_rv: this.last_update_rv.toString(),
            btc_r_t: this.btc_r_t,
            eth_r_t: this.eth_r_t,
            sol_r_t: this.sol_r_t,
            last_update_r_t: this.last_update_r_t.toString(),
            xrp_long: this.xrp_long,
            xrp_short: this.xrp_short,
            hype_long: this.hype_long,
            hype_short: this.hype_short,
        };
    }
    static fromJSON(obj) {
        return new SigmaIvPda({
            btc_long: obj.btc_long,
            btc_short: obj.btc_short,
            eth_long: obj.eth_long,
            eth_short: obj.eth_short,
            sol_long: obj.sol_long,
            sol_short: obj.sol_short,
            last_update_long: new bn_js_1.default(obj.last_update_long),
            last_update_short: new bn_js_1.default(obj.last_update_short),
            authority: new web3_js_1.PublicKey(obj.authority),
            bump: obj.bump,
            jup_rv: obj.jup_rv,
            bonk_rv: obj.bonk_rv,
            wif_rv: obj.wif_rv,
            sol_rv: obj.sol_rv,
            last_update_rv: new bn_js_1.default(obj.last_update_rv),
            btc_r_t: obj.btc_r_t,
            eth_r_t: obj.eth_r_t,
            sol_r_t: obj.sol_r_t,
            last_update_r_t: new bn_js_1.default(obj.last_update_r_t),
            xrp_long: obj.xrp_long,
            xrp_short: obj.xrp_short,
            hype_long: obj.hype_long,
            hype_short: obj.hype_short,
        });
    }
}
exports.SigmaIvPda = SigmaIvPda;
SigmaIvPda.discriminator = Buffer.from([
    234, 61, 166, 22, 14, 205, 169, 101,
]);
SigmaIvPda.layout = borsh.struct([
    borsh.f64("btc_long"),
    borsh.f64("btc_short"),
    borsh.f64("eth_long"),
    borsh.f64("eth_short"),
    borsh.f64("sol_long"),
    borsh.f64("sol_short"),
    borsh.i64("last_update_long"),
    borsh.i64("last_update_short"),
    borsh.publicKey("authority"),
    borsh.u8("bump"),
    borsh.f64("jup_rv"),
    borsh.f64("bonk_rv"),
    borsh.f64("wif_rv"),
    borsh.f64("sol_rv"),
    borsh.i64("last_update_rv"),
    borsh.f64("btc_r_t"),
    borsh.f64("eth_r_t"),
    borsh.f64("sol_r_t"),
    borsh.i64("last_update_r_t"),
    borsh.f64("xrp_long"),
    borsh.f64("xrp_short"),
    borsh.f64("hype_long"),
    borsh.f64("hype_short"),
]);
//# sourceMappingURL=SigmaIvPda.js.map