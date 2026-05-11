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
exports.BlockTradeTape = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class BlockTradeTape {
    constructor(fields) {
        this.option = fields.option;
        this.buyer = fields.buyer;
        this.seller_cm = fields.seller_cm;
        this.block_rfq_id = fields.block_rfq_id;
        this.asset = fields.asset;
        this.option_type = fields.option_type;
        this.direction = fields.direction;
        this.identity_mode = fields.identity_mode;
        this.execution_lane = fields.execution_lane;
        this.margin_mode = fields.margin_mode;
        this.risk_scope_asset = fields.risk_scope_asset;
        this.collateral_scope = fields.collateral_scope;
        this.settlement_mint = fields.settlement_mint;
        this.notional_micro = fields.notional_micro;
        this.premium = fields.premium;
        this.filled_at = fields.filled_at;
        this.is_block_trade = fields.is_block_trade;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("option"),
            borsh.publicKey("buyer"),
            borsh.publicKey("seller_cm"),
            borsh.u64("block_rfq_id"),
            borsh.u8("asset"),
            borsh.u8("option_type"),
            borsh.i8("direction"),
            borsh.u8("identity_mode"),
            borsh.u8("execution_lane"),
            borsh.u8("margin_mode"),
            borsh.u8("risk_scope_asset"),
            borsh.u8("collateral_scope"),
            borsh.publicKey("settlement_mint"),
            borsh.u64("notional_micro"),
            borsh.u64("premium"),
            borsh.i64("filled_at"),
            borsh.u8("is_block_trade"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new BlockTradeTape({
            option: obj.option,
            buyer: obj.buyer,
            seller_cm: obj.seller_cm,
            block_rfq_id: obj.block_rfq_id,
            asset: obj.asset,
            option_type: obj.option_type,
            direction: obj.direction,
            identity_mode: obj.identity_mode,
            execution_lane: obj.execution_lane,
            margin_mode: obj.margin_mode,
            risk_scope_asset: obj.risk_scope_asset,
            collateral_scope: obj.collateral_scope,
            settlement_mint: obj.settlement_mint,
            notional_micro: obj.notional_micro,
            premium: obj.premium,
            filled_at: obj.filled_at,
            is_block_trade: obj.is_block_trade,
        });
    }
    static toEncodable(fields) {
        return {
            option: fields.option,
            buyer: fields.buyer,
            seller_cm: fields.seller_cm,
            block_rfq_id: fields.block_rfq_id,
            asset: fields.asset,
            option_type: fields.option_type,
            direction: fields.direction,
            identity_mode: fields.identity_mode,
            execution_lane: fields.execution_lane,
            margin_mode: fields.margin_mode,
            risk_scope_asset: fields.risk_scope_asset,
            collateral_scope: fields.collateral_scope,
            settlement_mint: fields.settlement_mint,
            notional_micro: fields.notional_micro,
            premium: fields.premium,
            filled_at: fields.filled_at,
            is_block_trade: fields.is_block_trade,
        };
    }
    toJSON() {
        return {
            option: this.option.toString(),
            buyer: this.buyer.toString(),
            seller_cm: this.seller_cm.toString(),
            block_rfq_id: this.block_rfq_id.toString(),
            asset: this.asset,
            option_type: this.option_type,
            direction: this.direction,
            identity_mode: this.identity_mode,
            execution_lane: this.execution_lane,
            margin_mode: this.margin_mode,
            risk_scope_asset: this.risk_scope_asset,
            collateral_scope: this.collateral_scope,
            settlement_mint: this.settlement_mint.toString(),
            notional_micro: this.notional_micro.toString(),
            premium: this.premium.toString(),
            filled_at: this.filled_at.toString(),
            is_block_trade: this.is_block_trade,
        };
    }
    static fromJSON(obj) {
        return new BlockTradeTape({
            option: new web3_js_1.PublicKey(obj.option),
            buyer: new web3_js_1.PublicKey(obj.buyer),
            seller_cm: new web3_js_1.PublicKey(obj.seller_cm),
            block_rfq_id: new bn_js_1.default(obj.block_rfq_id),
            asset: obj.asset,
            option_type: obj.option_type,
            direction: obj.direction,
            identity_mode: obj.identity_mode,
            execution_lane: obj.execution_lane,
            margin_mode: obj.margin_mode,
            risk_scope_asset: obj.risk_scope_asset,
            collateral_scope: obj.collateral_scope,
            settlement_mint: new web3_js_1.PublicKey(obj.settlement_mint),
            notional_micro: new bn_js_1.default(obj.notional_micro),
            premium: new bn_js_1.default(obj.premium),
            filled_at: new bn_js_1.default(obj.filled_at),
            is_block_trade: obj.is_block_trade,
        });
    }
    toEncodable() {
        return BlockTradeTape.toEncodable(this);
    }
}
exports.BlockTradeTape = BlockTradeTape;
//# sourceMappingURL=BlockTradeTape.js.map