import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface OptionAccountFields {
  creator: PublicKey
  nonce: BN
  bump: number
  version: number
  created_at: BN
  option_type: types.OptionTypeKind
  state: types.OptionStateKind
  expiry_ts: BN
  underlying_feed_id: PublicKey
  strike: BN
  payoff_amount: BN
  collateral_locked: BN
  settlement_mint: PublicKey
  settlement_decimals: number
  settled: boolean
  settled_price: BN
  settled_at: BN
  metadata: PublicKey
  holder: PublicKey
  upper_bound: BN
  h_eff: number
  asset: number
  direction: number
  extra_param: number
  spot_at_creation: BN
  sigma_at_creation: number
  v0_usdc_micro: BN
}

export interface OptionAccountJSON {
  creator: string
  nonce: string
  bump: number
  version: number
  created_at: string
  option_type: types.OptionTypeJSON
  state: types.OptionStateJSON
  expiry_ts: string
  underlying_feed_id: string
  strike: string
  payoff_amount: string
  collateral_locked: string
  settlement_mint: string
  settlement_decimals: number
  settled: boolean
  settled_price: string
  settled_at: string
  metadata: string
  holder: string
  upper_bound: string
  h_eff: number
  asset: number
  direction: number
  extra_param: number
  spot_at_creation: string
  sigma_at_creation: number
  v0_usdc_micro: string
}

export class OptionAccount {
  readonly creator: PublicKey
  readonly nonce: BN
  readonly bump: number
  readonly version: number
  readonly created_at: BN
  readonly option_type: types.OptionTypeKind
  readonly state: types.OptionStateKind
  readonly expiry_ts: BN
  readonly underlying_feed_id: PublicKey
  readonly strike: BN
  readonly payoff_amount: BN
  readonly collateral_locked: BN
  readonly settlement_mint: PublicKey
  readonly settlement_decimals: number
  readonly settled: boolean
  readonly settled_price: BN
  readonly settled_at: BN
  readonly metadata: PublicKey
  readonly holder: PublicKey
  readonly upper_bound: BN
  readonly h_eff: number
  readonly asset: number
  readonly direction: number
  readonly extra_param: number
  readonly spot_at_creation: BN
  readonly sigma_at_creation: number
  readonly v0_usdc_micro: BN

  static readonly discriminator = Buffer.from([
    82, 44, 195, 42, 219, 57, 18, 92,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("creator"),
    borsh.u64("nonce"),
    borsh.u8("bump"),
    borsh.u8("version"),
    borsh.i64("created_at"),
    types.OptionType.layout("option_type"),
    types.OptionState.layout("state"),
    borsh.i64("expiry_ts"),
    borsh.publicKey("underlying_feed_id"),
    borsh.u64("strike"),
    borsh.u64("payoff_amount"),
    borsh.u64("collateral_locked"),
    borsh.publicKey("settlement_mint"),
    borsh.u8("settlement_decimals"),
    borsh.bool("settled"),
    borsh.i64("settled_price"),
    borsh.i64("settled_at"),
    borsh.publicKey("metadata"),
    borsh.publicKey("holder"),
    borsh.u64("upper_bound"),
    borsh.f64("h_eff"),
    borsh.u8("asset"),
    borsh.i8("direction"),
    borsh.f64("extra_param"),
    borsh.i64("spot_at_creation"),
    borsh.f64("sigma_at_creation"),
    borsh.u64("v0_usdc_micro"),
  ])

  constructor(fields: OptionAccountFields) {
    this.creator = fields.creator
    this.nonce = fields.nonce
    this.bump = fields.bump
    this.version = fields.version
    this.created_at = fields.created_at
    this.option_type = fields.option_type
    this.state = fields.state
    this.expiry_ts = fields.expiry_ts
    this.underlying_feed_id = fields.underlying_feed_id
    this.strike = fields.strike
    this.payoff_amount = fields.payoff_amount
    this.collateral_locked = fields.collateral_locked
    this.settlement_mint = fields.settlement_mint
    this.settlement_decimals = fields.settlement_decimals
    this.settled = fields.settled
    this.settled_price = fields.settled_price
    this.settled_at = fields.settled_at
    this.metadata = fields.metadata
    this.holder = fields.holder
    this.upper_bound = fields.upper_bound
    this.h_eff = fields.h_eff
    this.asset = fields.asset
    this.direction = fields.direction
    this.extra_param = fields.extra_param
    this.spot_at_creation = fields.spot_at_creation
    this.sigma_at_creation = fields.sigma_at_creation
    this.v0_usdc_micro = fields.v0_usdc_micro
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<OptionAccount | null> {
    const info = await c.getAccountInfo(address)

    if (info === null) {
      return null
    }
    if (!info.owner.equals(programId)) {
      throw new Error("account doesn't belong to this program")
    }

    return this.decode(info.data)
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[],
    programId: PublicKey = PROGRAM_ID
  ): Promise<Array<OptionAccount | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses)

    return infos.map((info) => {
      if (info === null) {
        return null
      }
      if (!info.owner.equals(programId)) {
        throw new Error("account doesn't belong to this program")
      }

      return this.decode(info.data)
    })
  }

  static decode(data: Buffer): OptionAccount {
    if (!data.slice(0, 8).equals(OptionAccount.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = OptionAccount.layout.decode(data.slice(8))

    return new OptionAccount({
      creator: dec.creator,
      nonce: dec.nonce,
      bump: dec.bump,
      version: dec.version,
      created_at: dec.created_at,
      option_type: types.OptionType.fromDecoded(dec.option_type),
      state: types.OptionState.fromDecoded(dec.state),
      expiry_ts: dec.expiry_ts,
      underlying_feed_id: dec.underlying_feed_id,
      strike: dec.strike,
      payoff_amount: dec.payoff_amount,
      collateral_locked: dec.collateral_locked,
      settlement_mint: dec.settlement_mint,
      settlement_decimals: dec.settlement_decimals,
      settled: dec.settled,
      settled_price: dec.settled_price,
      settled_at: dec.settled_at,
      metadata: dec.metadata,
      holder: dec.holder,
      upper_bound: dec.upper_bound,
      h_eff: dec.h_eff,
      asset: dec.asset,
      direction: dec.direction,
      extra_param: dec.extra_param,
      spot_at_creation: dec.spot_at_creation,
      sigma_at_creation: dec.sigma_at_creation,
      v0_usdc_micro: dec.v0_usdc_micro,
    })
  }

  toJSON(): OptionAccountJSON {
    return {
      creator: this.creator.toString(),
      nonce: this.nonce.toString(),
      bump: this.bump,
      version: this.version,
      created_at: this.created_at.toString(),
      option_type: this.option_type.toJSON(),
      state: this.state.toJSON(),
      expiry_ts: this.expiry_ts.toString(),
      underlying_feed_id: this.underlying_feed_id.toString(),
      strike: this.strike.toString(),
      payoff_amount: this.payoff_amount.toString(),
      collateral_locked: this.collateral_locked.toString(),
      settlement_mint: this.settlement_mint.toString(),
      settlement_decimals: this.settlement_decimals,
      settled: this.settled,
      settled_price: this.settled_price.toString(),
      settled_at: this.settled_at.toString(),
      metadata: this.metadata.toString(),
      holder: this.holder.toString(),
      upper_bound: this.upper_bound.toString(),
      h_eff: this.h_eff,
      asset: this.asset,
      direction: this.direction,
      extra_param: this.extra_param,
      spot_at_creation: this.spot_at_creation.toString(),
      sigma_at_creation: this.sigma_at_creation,
      v0_usdc_micro: this.v0_usdc_micro.toString(),
    }
  }

  static fromJSON(obj: OptionAccountJSON): OptionAccount {
    return new OptionAccount({
      creator: new PublicKey(obj.creator),
      nonce: new BN(obj.nonce),
      bump: obj.bump,
      version: obj.version,
      created_at: new BN(obj.created_at),
      option_type: types.OptionType.fromJSON(obj.option_type),
      state: types.OptionState.fromJSON(obj.state),
      expiry_ts: new BN(obj.expiry_ts),
      underlying_feed_id: new PublicKey(obj.underlying_feed_id),
      strike: new BN(obj.strike),
      payoff_amount: new BN(obj.payoff_amount),
      collateral_locked: new BN(obj.collateral_locked),
      settlement_mint: new PublicKey(obj.settlement_mint),
      settlement_decimals: obj.settlement_decimals,
      settled: obj.settled,
      settled_price: new BN(obj.settled_price),
      settled_at: new BN(obj.settled_at),
      metadata: new PublicKey(obj.metadata),
      holder: new PublicKey(obj.holder),
      upper_bound: new BN(obj.upper_bound),
      h_eff: obj.h_eff,
      asset: obj.asset,
      direction: obj.direction,
      extra_param: obj.extra_param,
      spot_at_creation: new BN(obj.spot_at_creation),
      sigma_at_creation: obj.sigma_at_creation,
      v0_usdc_micro: new BN(obj.v0_usdc_micro),
    })
  }
}
