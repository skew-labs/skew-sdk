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
exports.ComboLegSpec = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ComboLegSpec {
    constructor(fields) {
        this.option = fields.option;
        this.side = fields.side;
        this.max_premium_micro = fields.max_premium_micro;
        this._padding = fields._padding;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("option"),
            borsh.i8("side"),
            borsh.u64("max_premium_micro"),
            borsh.array(borsh.u8(), 7, "_padding"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ComboLegSpec({
            option: obj.option,
            side: obj.side,
            max_premium_micro: obj.max_premium_micro,
            _padding: obj._padding,
        });
    }
    static toEncodable(fields) {
        return {
            option: fields.option,
            side: fields.side,
            max_premium_micro: fields.max_premium_micro,
            _padding: fields._padding,
        };
    }
    toJSON() {
        return {
            option: this.option.toString(),
            side: this.side,
            max_premium_micro: this.max_premium_micro.toString(),
            _padding: this._padding,
        };
    }
    static fromJSON(obj) {
        return new ComboLegSpec({
            option: new web3_js_1.PublicKey(obj.option),
            side: obj.side,
            max_premium_micro: new bn_js_1.default(obj.max_premium_micro),
            _padding: obj._padding,
        });
    }
    toEncodable() {
        return ComboLegSpec.toEncodable(this);
    }
}
exports.ComboLegSpec = ComboLegSpec;
//# sourceMappingURL=ComboLegSpec.js.map