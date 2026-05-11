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
exports.CmWhitelistUpdated = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class CmWhitelistUpdated {
    constructor(fields) {
        this.cm = fields.cm;
        this.authority = fields.authority;
        this.whitelist_count = fields.whitelist_count;
        this.replace_all = fields.replace_all;
        this.updated_at = fields.updated_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("cm"),
            borsh.publicKey("authority"),
            borsh.u8("whitelist_count"),
            borsh.bool("replace_all"),
            borsh.i64("updated_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new CmWhitelistUpdated({
            cm: obj.cm,
            authority: obj.authority,
            whitelist_count: obj.whitelist_count,
            replace_all: obj.replace_all,
            updated_at: obj.updated_at,
        });
    }
    static toEncodable(fields) {
        return {
            cm: fields.cm,
            authority: fields.authority,
            whitelist_count: fields.whitelist_count,
            replace_all: fields.replace_all,
            updated_at: fields.updated_at,
        };
    }
    toJSON() {
        return {
            cm: this.cm.toString(),
            authority: this.authority.toString(),
            whitelist_count: this.whitelist_count,
            replace_all: this.replace_all,
            updated_at: this.updated_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new CmWhitelistUpdated({
            cm: new web3_js_1.PublicKey(obj.cm),
            authority: new web3_js_1.PublicKey(obj.authority),
            whitelist_count: obj.whitelist_count,
            replace_all: obj.replace_all,
            updated_at: new bn_js_1.default(obj.updated_at),
        });
    }
    toEncodable() {
        return CmWhitelistUpdated.toEncodable(this);
    }
}
exports.CmWhitelistUpdated = CmWhitelistUpdated;
//# sourceMappingURL=CmWhitelistUpdated.js.map