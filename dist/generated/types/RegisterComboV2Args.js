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
exports.RegisterComboV2Args = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RegisterComboV2Args {
    constructor(fields) {
        this.combo_id = fields.combo_id;
        this.leg_count = fields.leg_count;
        this.legs = fields.legs.map((item) => new types.ComboV2Leg({ ...item }));
        this.total_max_premium_micro = fields.total_max_premium_micro;
        this.expires_ts = fields.expires_ts;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("combo_id"),
            borsh.u8("leg_count"),
            borsh.vec(types.ComboV2Leg.layout(), "legs"),
            borsh.u64("total_max_premium_micro"),
            borsh.i64("expires_ts"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RegisterComboV2Args({
            combo_id: obj.combo_id,
            leg_count: obj.leg_count,
            legs: obj.legs.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.ComboV2Leg.fromDecoded(item)),
            total_max_premium_micro: obj.total_max_premium_micro,
            expires_ts: obj.expires_ts,
        });
    }
    static toEncodable(fields) {
        return {
            combo_id: fields.combo_id,
            leg_count: fields.leg_count,
            legs: fields.legs.map((item) => types.ComboV2Leg.toEncodable(item)),
            total_max_premium_micro: fields.total_max_premium_micro,
            expires_ts: fields.expires_ts,
        };
    }
    toJSON() {
        return {
            combo_id: this.combo_id.toString(),
            leg_count: this.leg_count,
            legs: this.legs.map((item) => item.toJSON()),
            total_max_premium_micro: this.total_max_premium_micro.toString(),
            expires_ts: this.expires_ts.toString(),
        };
    }
    static fromJSON(obj) {
        return new RegisterComboV2Args({
            combo_id: new bn_js_1.default(obj.combo_id),
            leg_count: obj.leg_count,
            legs: obj.legs.map((item) => types.ComboV2Leg.fromJSON(item)),
            total_max_premium_micro: new bn_js_1.default(obj.total_max_premium_micro),
            expires_ts: new bn_js_1.default(obj.expires_ts),
        });
    }
    toEncodable() {
        return RegisterComboV2Args.toEncodable(this);
    }
}
exports.RegisterComboV2Args = RegisterComboV2Args;
//# sourceMappingURL=RegisterComboV2Args.js.map