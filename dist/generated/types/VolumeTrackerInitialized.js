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
exports.VolumeTrackerInitialized = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class VolumeTrackerInitialized {
    constructor(fields) {
        this.volume_tracker_pda = fields.volume_tracker_pda;
        this.authority = fields.authority;
        this.initialized_at = fields.initialized_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("volume_tracker_pda"),
            borsh.publicKey("authority"),
            borsh.i64("initialized_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VolumeTrackerInitialized({
            volume_tracker_pda: obj.volume_tracker_pda,
            authority: obj.authority,
            initialized_at: obj.initialized_at,
        });
    }
    static toEncodable(fields) {
        return {
            volume_tracker_pda: fields.volume_tracker_pda,
            authority: fields.authority,
            initialized_at: fields.initialized_at,
        };
    }
    toJSON() {
        return {
            volume_tracker_pda: this.volume_tracker_pda.toString(),
            authority: this.authority.toString(),
            initialized_at: this.initialized_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new VolumeTrackerInitialized({
            volume_tracker_pda: new web3_js_1.PublicKey(obj.volume_tracker_pda),
            authority: new web3_js_1.PublicKey(obj.authority),
            initialized_at: new bn_js_1.default(obj.initialized_at),
        });
    }
    toEncodable() {
        return VolumeTrackerInitialized.toEncodable(this);
    }
}
exports.VolumeTrackerInitialized = VolumeTrackerInitialized;
//# sourceMappingURL=VolumeTrackerInitialized.js.map