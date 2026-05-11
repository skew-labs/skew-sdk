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
exports.ConditionalOrderPda = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class ConditionalOrderPda {
    constructor(fields) {
        this.authority = fields.authority;
        this.order_id = fields.order_id;
        this.kind = fields.kind;
        this.trigger_mode = fields.trigger_mode;
        this.trigger_direction = fields.trigger_direction;
        this.action = fields.action;
        this.state = fields.state;
        this.bump = fields.bump;
        this._padding_0 = fields._padding_0;
        this.trigger_oracle = fields.trigger_oracle;
        this.trigger_price_1e8 = fields.trigger_price_1e8;
        this.trigger_grace_slots = fields.trigger_grace_slots;
        this.trigger_count = fields.trigger_count;
        this.triggered_at_slot = fields.triggered_at_slot;
        this.action_target = fields.action_target;
        this.action_min_premium_micro = fields.action_min_premium_micro;
        this.action_max_premium_micro = fields.action_max_premium_micro;
        this.action_max_slippage_bps = fields.action_max_slippage_bps;
        this._padding_1 = fields._padding_1;
        this.linked_order = fields.linked_order;
        this.valid_until_ts = fields.valid_until_ts;
        this.created_at = fields.created_at;
        this.triggered_action_slot = fields.triggered_action_slot;
        this._reserved = fields._reserved;
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
        if (!data.slice(0, 8).equals(ConditionalOrderPda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = ConditionalOrderPda.layout.decode(data.slice(8));
        return new ConditionalOrderPda({
            authority: dec.authority,
            order_id: dec.order_id,
            kind: dec.kind,
            trigger_mode: dec.trigger_mode,
            trigger_direction: dec.trigger_direction,
            action: dec.action,
            state: dec.state,
            bump: dec.bump,
            _padding_0: dec._padding_0,
            trigger_oracle: dec.trigger_oracle,
            trigger_price_1e8: dec.trigger_price_1e8,
            trigger_grace_slots: dec.trigger_grace_slots,
            trigger_count: dec.trigger_count,
            triggered_at_slot: dec.triggered_at_slot,
            action_target: dec.action_target,
            action_min_premium_micro: dec.action_min_premium_micro,
            action_max_premium_micro: dec.action_max_premium_micro,
            action_max_slippage_bps: dec.action_max_slippage_bps,
            _padding_1: dec._padding_1,
            linked_order: dec.linked_order,
            valid_until_ts: dec.valid_until_ts,
            created_at: dec.created_at,
            triggered_action_slot: dec.triggered_action_slot,
            _reserved: dec._reserved,
        });
    }
    toJSON() {
        return {
            authority: this.authority.toString(),
            order_id: this.order_id.toString(),
            kind: this.kind,
            trigger_mode: this.trigger_mode,
            trigger_direction: this.trigger_direction,
            action: this.action,
            state: this.state,
            bump: this.bump,
            _padding_0: this._padding_0,
            trigger_oracle: this.trigger_oracle.toString(),
            trigger_price_1e8: this.trigger_price_1e8.toString(),
            trigger_grace_slots: this.trigger_grace_slots,
            trigger_count: this.trigger_count,
            triggered_at_slot: this.triggered_at_slot.toString(),
            action_target: this.action_target.toString(),
            action_min_premium_micro: this.action_min_premium_micro.toString(),
            action_max_premium_micro: this.action_max_premium_micro.toString(),
            action_max_slippage_bps: this.action_max_slippage_bps,
            _padding_1: this._padding_1,
            linked_order: this.linked_order.toString(),
            valid_until_ts: this.valid_until_ts.toString(),
            created_at: this.created_at.toString(),
            triggered_action_slot: this.triggered_action_slot.toString(),
            _reserved: this._reserved,
        };
    }
    static fromJSON(obj) {
        return new ConditionalOrderPda({
            authority: new web3_js_1.PublicKey(obj.authority),
            order_id: new bn_js_1.default(obj.order_id),
            kind: obj.kind,
            trigger_mode: obj.trigger_mode,
            trigger_direction: obj.trigger_direction,
            action: obj.action,
            state: obj.state,
            bump: obj.bump,
            _padding_0: obj._padding_0,
            trigger_oracle: new web3_js_1.PublicKey(obj.trigger_oracle),
            trigger_price_1e8: new bn_js_1.default(obj.trigger_price_1e8),
            trigger_grace_slots: obj.trigger_grace_slots,
            trigger_count: obj.trigger_count,
            triggered_at_slot: new bn_js_1.default(obj.triggered_at_slot),
            action_target: new web3_js_1.PublicKey(obj.action_target),
            action_min_premium_micro: new bn_js_1.default(obj.action_min_premium_micro),
            action_max_premium_micro: new bn_js_1.default(obj.action_max_premium_micro),
            action_max_slippage_bps: obj.action_max_slippage_bps,
            _padding_1: obj._padding_1,
            linked_order: new web3_js_1.PublicKey(obj.linked_order),
            valid_until_ts: new bn_js_1.default(obj.valid_until_ts),
            created_at: new bn_js_1.default(obj.created_at),
            triggered_action_slot: new bn_js_1.default(obj.triggered_action_slot),
            _reserved: obj._reserved,
        });
    }
}
exports.ConditionalOrderPda = ConditionalOrderPda;
ConditionalOrderPda.discriminator = Buffer.from([
    49, 221, 55, 189, 244, 42, 111, 130,
]);
ConditionalOrderPda.layout = borsh.struct([
    borsh.publicKey("authority"),
    borsh.u64("order_id"),
    borsh.u8("kind"),
    borsh.u8("trigger_mode"),
    borsh.u8("trigger_direction"),
    borsh.u8("action"),
    borsh.u8("state"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 2, "_padding_0"),
    borsh.publicKey("trigger_oracle"),
    borsh.i64("trigger_price_1e8"),
    borsh.u32("trigger_grace_slots"),
    borsh.u32("trigger_count"),
    borsh.u64("triggered_at_slot"),
    borsh.publicKey("action_target"),
    borsh.u64("action_min_premium_micro"),
    borsh.u64("action_max_premium_micro"),
    borsh.u16("action_max_slippage_bps"),
    borsh.array(borsh.u8(), 6, "_padding_1"),
    borsh.publicKey("linked_order"),
    borsh.i64("valid_until_ts"),
    borsh.i64("created_at"),
    borsh.u64("triggered_action_slot"),
    borsh.array(borsh.u8(), 64, "_reserved"),
]);
//# sourceMappingURL=ConditionalOrderPda.js.map