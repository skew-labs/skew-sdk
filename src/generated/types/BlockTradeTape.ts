import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface BlockTradeTapeFields {
  option: PublicKey
  buyer: PublicKey
  seller_cm: PublicKey
  block_rfq_id: BN
  asset: number
  option_type: number
  direction: number
  identity_mode: number
  execution_lane: number
  margin_mode: number
  risk_scope_asset: number
  collateral_scope: number
  settlement_mint: PublicKey
  notional_micro: BN
  premium: BN
  filled_at: BN
  is_block_trade: number
}

export interface BlockTradeTapeJSON {
  option: string
  buyer: string
  seller_cm: string
  block_rfq_id: string
  asset: number
  option_type: number
  direction: number
  identity_mode: number
  execution_lane: number
  margin_mode: number
  risk_scope_asset: number
  collateral_scope: number
  settlement_mint: string
  notional_micro: string
  premium: string
  filled_at: string
  is_block_trade: number
}

export class BlockTradeTape {
  readonly option: PublicKey
  readonly buyer: PublicKey
  readonly seller_cm: PublicKey
  readonly block_rfq_id: BN
  readonly asset: number
  readonly option_type: number
  readonly direction: number
  readonly identity_mode: number
  readonly execution_lane: number
  readonly margin_mode: number
  readonly risk_scope_asset: number
  readonly collateral_scope: number
  readonly settlement_mint: PublicKey
  readonly notional_micro: BN
  readonly premium: BN
  readonly filled_at: BN
  readonly is_block_trade: number

  constructor(fields: BlockTradeTapeFields) {
    this.option = fields.option
    this.buyer = fields.buyer
    this.seller_cm = fields.seller_cm
    this.block_rfq_id = fields.block_rfq_id
    this.asset = fields.asset
    this.option_type = fields.option_type
    this.direction = fields.direction
    this.identity_mode = fields.identity_mode
    this.execution_lane = fields.execution_lane
    this.margin_mode = fields.margin_mode
    this.risk_scope_asset = fields.risk_scope_asset
    this.collateral_scope = fields.collateral_scope
    this.settlement_mint = fields.settlement_mint
    this.notional_micro = fields.notional_micro
    this.premium = fields.premium
    this.filled_at = fields.filled_at
    this.is_block_trade = fields.is_block_trade
  }

  static layout(property?: string) {
    return borsh.struct(
      [
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
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
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
    })
  }

  static toEncodable(fields: BlockTradeTapeFields) {
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
    }
  }

  toJSON(): BlockTradeTapeJSON {
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
    }
  }

  static fromJSON(obj: BlockTradeTapeJSON): BlockTradeTape {
    return new BlockTradeTape({
      option: new PublicKey(obj.option),
      buyer: new PublicKey(obj.buyer),
      seller_cm: new PublicKey(obj.seller_cm),
      block_rfq_id: new BN(obj.block_rfq_id),
      asset: obj.asset,
      option_type: obj.option_type,
      direction: obj.direction,
      identity_mode: obj.identity_mode,
      execution_lane: obj.execution_lane,
      margin_mode: obj.margin_mode,
      risk_scope_asset: obj.risk_scope_asset,
      collateral_scope: obj.collateral_scope,
      settlement_mint: new PublicKey(obj.settlement_mint),
      notional_micro: new BN(obj.notional_micro),
      premium: new BN(obj.premium),
      filled_at: new BN(obj.filled_at),
      is_block_trade: obj.is_block_trade,
    })
  }

  toEncodable() {
    return BlockTradeTape.toEncodable(this)
  }
}
