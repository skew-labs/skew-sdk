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
exports.OcoLinkedCancelled = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class OcoLinkedCancelled {
    constructor(fields) {
        this.triggered_order = fields.triggered_order;
        this.cancelled_order = fields.cancelled_order;
    }
    static layout(property) {
        return borsh.struct([borsh.publicKey("triggered_order"), borsh.publicKey("cancelled_order")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new OcoLinkedCancelled({
            triggered_order: obj.triggered_order,
            cancelled_order: obj.cancelled_order,
        });
    }
    static toEncodable(fields) {
        return {
            triggered_order: fields.triggered_order,
            cancelled_order: fields.cancelled_order,
        };
    }
    toJSON() {
        return {
            triggered_order: this.triggered_order.toString(),
            cancelled_order: this.cancelled_order.toString(),
        };
    }
    static fromJSON(obj) {
        return new OcoLinkedCancelled({
            triggered_order: new web3_js_1.PublicKey(obj.triggered_order),
            cancelled_order: new web3_js_1.PublicKey(obj.cancelled_order),
        });
    }
    toEncodable() {
        return OcoLinkedCancelled.toEncodable(this);
    }
}
exports.OcoLinkedCancelled = OcoLinkedCancelled;
//# sourceMappingURL=OcoLinkedCancelled.js.map