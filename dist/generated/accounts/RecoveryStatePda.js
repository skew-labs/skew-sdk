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
exports.RecoveryStatePda = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class RecoveryStatePda {
    constructor(fields) {
        this.active = fields.active;
        this.bump = fields.bump;
        this.trigger_kind = fields.trigger_kind;
        this.snapshot_published = fields.snapshot_published;
        this._pad_0 = fields._pad_0;
        this.declared_at_slot = fields.declared_at_slot;
        this.declared_at_ts = fields.declared_at_ts;
        this.snapshot_at_slot = fields.snapshot_at_slot;
        this.snapshot_oi_digest = fields.snapshot_oi_digest;
        this.residual_unfunded_loss_micro = fields.residual_unfunded_loss_micro;
        this.vmgh_total_drained_micro = fields.vmgh_total_drained_micro;
        this.vmgh_apply_count = fields.vmgh_apply_count;
        this.tear_up_total_drained_micro = fields.tear_up_total_drained_micro;
        this.tear_up_cycle_count = fields.tear_up_cycle_count;
        this._pad_1 = fields._pad_1;
        this.last_oi_digest = fields.last_oi_digest;
        this.last_gain_digest = fields.last_gain_digest;
        this.last_notional_digest = fields.last_notional_digest;
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
        if (!data.slice(0, 8).equals(RecoveryStatePda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = RecoveryStatePda.layout.decode(data.slice(8));
        return new RecoveryStatePda({
            active: dec.active,
            bump: dec.bump,
            trigger_kind: dec.trigger_kind,
            snapshot_published: dec.snapshot_published,
            _pad_0: dec._pad_0,
            declared_at_slot: dec.declared_at_slot,
            declared_at_ts: dec.declared_at_ts,
            snapshot_at_slot: dec.snapshot_at_slot,
            snapshot_oi_digest: dec.snapshot_oi_digest,
            residual_unfunded_loss_micro: dec.residual_unfunded_loss_micro,
            vmgh_total_drained_micro: dec.vmgh_total_drained_micro,
            vmgh_apply_count: dec.vmgh_apply_count,
            tear_up_total_drained_micro: dec.tear_up_total_drained_micro,
            tear_up_cycle_count: dec.tear_up_cycle_count,
            _pad_1: dec._pad_1,
            last_oi_digest: dec.last_oi_digest,
            last_gain_digest: dec.last_gain_digest,
            last_notional_digest: dec.last_notional_digest,
            _reserved: dec._reserved,
        });
    }
    toJSON() {
        return {
            active: this.active,
            bump: this.bump,
            trigger_kind: this.trigger_kind,
            snapshot_published: this.snapshot_published,
            _pad_0: this._pad_0,
            declared_at_slot: this.declared_at_slot.toString(),
            declared_at_ts: this.declared_at_ts.toString(),
            snapshot_at_slot: this.snapshot_at_slot.toString(),
            snapshot_oi_digest: this.snapshot_oi_digest,
            residual_unfunded_loss_micro: this.residual_unfunded_loss_micro.toString(),
            vmgh_total_drained_micro: this.vmgh_total_drained_micro.toString(),
            vmgh_apply_count: this.vmgh_apply_count,
            tear_up_total_drained_micro: this.tear_up_total_drained_micro.toString(),
            tear_up_cycle_count: this.tear_up_cycle_count,
            _pad_1: this._pad_1,
            last_oi_digest: this.last_oi_digest,
            last_gain_digest: this.last_gain_digest,
            last_notional_digest: this.last_notional_digest,
            _reserved: this._reserved,
        };
    }
    static fromJSON(obj) {
        return new RecoveryStatePda({
            active: obj.active,
            bump: obj.bump,
            trigger_kind: obj.trigger_kind,
            snapshot_published: obj.snapshot_published,
            _pad_0: obj._pad_0,
            declared_at_slot: new bn_js_1.default(obj.declared_at_slot),
            declared_at_ts: new bn_js_1.default(obj.declared_at_ts),
            snapshot_at_slot: new bn_js_1.default(obj.snapshot_at_slot),
            snapshot_oi_digest: obj.snapshot_oi_digest,
            residual_unfunded_loss_micro: new bn_js_1.default(obj.residual_unfunded_loss_micro),
            vmgh_total_drained_micro: new bn_js_1.default(obj.vmgh_total_drained_micro),
            vmgh_apply_count: obj.vmgh_apply_count,
            tear_up_total_drained_micro: new bn_js_1.default(obj.tear_up_total_drained_micro),
            tear_up_cycle_count: obj.tear_up_cycle_count,
            _pad_1: obj._pad_1,
            last_oi_digest: obj.last_oi_digest,
            last_gain_digest: obj.last_gain_digest,
            last_notional_digest: obj.last_notional_digest,
            _reserved: obj._reserved,
        });
    }
}
exports.RecoveryStatePda = RecoveryStatePda;
RecoveryStatePda.discriminator = Buffer.from([
    15, 44, 91, 146, 14, 208, 140, 15,
]);
RecoveryStatePda.layout = borsh.struct([
    borsh.bool("active"),
    borsh.u8("bump"),
    borsh.u8("trigger_kind"),
    borsh.bool("snapshot_published"),
    borsh.array(borsh.u8(), 4, "_pad_0"),
    borsh.u64("declared_at_slot"),
    borsh.i64("declared_at_ts"),
    borsh.u64("snapshot_at_slot"),
    borsh.array(borsh.u8(), 32, "snapshot_oi_digest"),
    borsh.u64("residual_unfunded_loss_micro"),
    borsh.u64("vmgh_total_drained_micro"),
    borsh.u32("vmgh_apply_count"),
    borsh.u64("tear_up_total_drained_micro"),
    borsh.u32("tear_up_cycle_count"),
    borsh.array(borsh.u8(), 4, "_pad_1"),
    borsh.array(borsh.u8(), 32, "last_oi_digest"),
    borsh.array(borsh.u8(), 32, "last_gain_digest"),
    borsh.array(borsh.u8(), 32, "last_notional_digest"),
    borsh.array(borsh.u8(), 64, "_reserved"),
]);
//# sourceMappingURL=RecoveryStatePda.js.map