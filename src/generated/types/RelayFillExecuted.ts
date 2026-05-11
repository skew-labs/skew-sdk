import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RelayFillExecutedFields {
  option: PublicKey
  buyer: PublicKey
  seller_cm: PublicKey
  relay_nonce: BN
  premium: BN
  fee: BN
  collateral_locked: BN
  quote_expiry_ts: BN
  filled_at: BN
  buyer_sig: Array<number>
  cm_sig: Array<number>
  digest: Array<number>
}

export interface RelayFillExecutedJSON {
  option: string
  buyer: string
  seller_cm: string
  relay_nonce: string
  premium: string
  fee: string
  collateral_locked: string
  quote_expiry_ts: string
  filled_at: string
  buyer_sig: Array<number>
  cm_sig: Array<number>
  digest: Array<number>
}

export class RelayFillExecuted {
  readonly option: PublicKey
  readonly buyer: PublicKey
  readonly seller_cm: PublicKey
  readonly relay_nonce: BN
  readonly premium: BN
  readonly fee: BN
  readonly collateral_locked: BN
  readonly quote_expiry_ts: BN
  readonly filled_at: BN
  readonly buyer_sig: Array<number>
  readonly cm_sig: Array<number>
  readonly digest: Array<number>

  constructor(fields: RelayFillExecutedFields) {
    this.option = fields.option
    this.buyer = fields.buyer
    this.seller_cm = fields.seller_cm
    this.relay_nonce = fields.relay_nonce
    this.premium = fields.premium
    this.fee = fields.fee
    this.collateral_locked = fields.collateral_locked
    this.quote_expiry_ts = fields.quote_expiry_ts
    this.filled_at = fields.filled_at
    this.buyer_sig = fields.buyer_sig
    this.cm_sig = fields.cm_sig
    this.digest = fields.digest
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("option"),
        borsh.publicKey("buyer"),
        borsh.publicKey("seller_cm"),
        borsh.u64("relay_nonce"),
        borsh.u64("premium"),
        borsh.u64("fee"),
        borsh.u64("collateral_locked"),
        borsh.i64("quote_expiry_ts"),
        borsh.i64("filled_at"),
        borsh.array(borsh.u8(), 64, "buyer_sig"),
        borsh.array(borsh.u8(), 64, "cm_sig"),
        borsh.array(borsh.u8(), 32, "digest"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RelayFillExecuted({
      option: obj.option,
      buyer: obj.buyer,
      seller_cm: obj.seller_cm,
      relay_nonce: obj.relay_nonce,
      premium: obj.premium,
      fee: obj.fee,
      collateral_locked: obj.collateral_locked,
      quote_expiry_ts: obj.quote_expiry_ts,
      filled_at: obj.filled_at,
      buyer_sig: obj.buyer_sig,
      cm_sig: obj.cm_sig,
      digest: obj.digest,
    })
  }

  static toEncodable(fields: RelayFillExecutedFields) {
    return {
      option: fields.option,
      buyer: fields.buyer,
      seller_cm: fields.seller_cm,
      relay_nonce: fields.relay_nonce,
      premium: fields.premium,
      fee: fields.fee,
      collateral_locked: fields.collateral_locked,
      quote_expiry_ts: fields.quote_expiry_ts,
      filled_at: fields.filled_at,
      buyer_sig: fields.buyer_sig,
      cm_sig: fields.cm_sig,
      digest: fields.digest,
    }
  }

  toJSON(): RelayFillExecutedJSON {
    return {
      option: this.option.toString(),
      buyer: this.buyer.toString(),
      seller_cm: this.seller_cm.toString(),
      relay_nonce: this.relay_nonce.toString(),
      premium: this.premium.toString(),
      fee: this.fee.toString(),
      collateral_locked: this.collateral_locked.toString(),
      quote_expiry_ts: this.quote_expiry_ts.toString(),
      filled_at: this.filled_at.toString(),
      buyer_sig: this.buyer_sig,
      cm_sig: this.cm_sig,
      digest: this.digest,
    }
  }

  static fromJSON(obj: RelayFillExecutedJSON): RelayFillExecuted {
    return new RelayFillExecuted({
      option: new PublicKey(obj.option),
      buyer: new PublicKey(obj.buyer),
      seller_cm: new PublicKey(obj.seller_cm),
      relay_nonce: new BN(obj.relay_nonce),
      premium: new BN(obj.premium),
      fee: new BN(obj.fee),
      collateral_locked: new BN(obj.collateral_locked),
      quote_expiry_ts: new BN(obj.quote_expiry_ts),
      filled_at: new BN(obj.filled_at),
      buyer_sig: obj.buyer_sig,
      cm_sig: obj.cm_sig,
      digest: obj.digest,
    })
  }

  toEncodable() {
    return RelayFillExecuted.toEncodable(this)
  }
}
