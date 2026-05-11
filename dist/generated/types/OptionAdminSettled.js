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
exports.OptionAdminSettled = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class OptionAdminSettled {
    constructor(fields) {
        this.option = fields.option;
        this.admin_price = fields.admin_price;
        this.payoff_to_holder = fields.payoff_to_holder;
        this.collateral = fields.collateral;
        this.settled_at = fields.settled_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("option"),
            borsh.i64("admin_price"),
            borsh.bool("payoff_to_holder"),
            borsh.u64("collateral"),
            borsh.i64("settled_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new OptionAdminSettled({
            option: obj.option,
            admin_price: obj.admin_price,
            payoff_to_holder: obj.payoff_to_holder,
            collateral: obj.collateral,
            settled_at: obj.settled_at,
        });
    }
    static toEncodable(fields) {
        return {
            option: fields.option,
            admin_price: fields.admin_price,
            payoff_to_holder: fields.payoff_to_holder,
            collateral: fields.collateral,
            settled_at: fields.settled_at,
        };
    }
    toJSON() {
        return {
            option: this.option.toString(),
            admin_price: this.admin_price.toString(),
            payoff_to_holder: this.payoff_to_holder,
            collateral: this.collateral.toString(),
            settled_at: this.settled_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new OptionAdminSettled({
            option: new web3_js_1.PublicKey(obj.option),
            admin_price: new bn_js_1.default(obj.admin_price),
            payoff_to_holder: obj.payoff_to_holder,
            collateral: new bn_js_1.default(obj.collateral),
            settled_at: new bn_js_1.default(obj.settled_at),
        });
    }
    toEncodable() {
        return OptionAdminSettled.toEncodable(this);
    }
}
exports.OptionAdminSettled = OptionAdminSettled;
//# sourceMappingURL=OptionAdminSettled.js.map