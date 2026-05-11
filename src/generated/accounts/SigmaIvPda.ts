import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SigmaIvPdaFields {
  btc_long: number
  btc_short: number
  eth_long: number
  eth_short: number
  sol_long: number
  sol_short: number
  last_update_long: BN
  last_update_short: BN
  authority: PublicKey
  bump: number
  jup_rv: number
  bonk_rv: number
  wif_rv: number
  sol_rv: number
  last_update_rv: BN
  btc_r_t: number
  eth_r_t: number
  sol_r_t: number
  last_update_r_t: BN
  xrp_long: number
  xrp_short: number
  hype_long: number
  hype_short: number
}

export interface SigmaIvPdaJSON {
  btc_long: number
  btc_short: number
  eth_long: number
  eth_short: number
  sol_long: number
  sol_short: number
  last_update_long: string
  last_update_short: string
  authority: string
  bump: number
  jup_rv: number
  bonk_rv: number
  wif_rv: number
  sol_rv: number
  last_update_rv: string
  btc_r_t: number
  eth_r_t: number
  sol_r_t: number
  last_update_r_t: string
  xrp_long: number
  xrp_short: number
  hype_long: number
  hype_short: number
}

export class SigmaIvPda {
  readonly btc_long: number
  readonly btc_short: number
  readonly eth_long: number
  readonly eth_short: number
  readonly sol_long: number
  readonly sol_short: number
  readonly last_update_long: BN
  readonly last_update_short: BN
  readonly authority: PublicKey
  readonly bump: number
  readonly jup_rv: number
  readonly bonk_rv: number
  readonly wif_rv: number
  readonly sol_rv: number
  readonly last_update_rv: BN
  readonly btc_r_t: number
  readonly eth_r_t: number
  readonly sol_r_t: number
  readonly last_update_r_t: BN
  readonly xrp_long: number
  readonly xrp_short: number
  readonly hype_long: number
  readonly hype_short: number

  static readonly discriminator = Buffer.from([
    234, 61, 166, 22, 14, 205, 169, 101,
  ])

  static readonly layout = borsh.struct([
    borsh.f64("btc_long"),
    borsh.f64("btc_short"),
    borsh.f64("eth_long"),
    borsh.f64("eth_short"),
    borsh.f64("sol_long"),
    borsh.f64("sol_short"),
    borsh.i64("last_update_long"),
    borsh.i64("last_update_short"),
    borsh.publicKey("authority"),
    borsh.u8("bump"),
    borsh.f64("jup_rv"),
    borsh.f64("bonk_rv"),
    borsh.f64("wif_rv"),
    borsh.f64("sol_rv"),
    borsh.i64("last_update_rv"),
    borsh.f64("btc_r_t"),
    borsh.f64("eth_r_t"),
    borsh.f64("sol_r_t"),
    borsh.i64("last_update_r_t"),
    borsh.f64("xrp_long"),
    borsh.f64("xrp_short"),
    borsh.f64("hype_long"),
    borsh.f64("hype_short"),
  ])

  constructor(fields: SigmaIvPdaFields) {
    this.btc_long = fields.btc_long
    this.btc_short = fields.btc_short
    this.eth_long = fields.eth_long
    this.eth_short = fields.eth_short
    this.sol_long = fields.sol_long
    this.sol_short = fields.sol_short
    this.last_update_long = fields.last_update_long
    this.last_update_short = fields.last_update_short
    this.authority = fields.authority
    this.bump = fields.bump
    this.jup_rv = fields.jup_rv
    this.bonk_rv = fields.bonk_rv
    this.wif_rv = fields.wif_rv
    this.sol_rv = fields.sol_rv
    this.last_update_rv = fields.last_update_rv
    this.btc_r_t = fields.btc_r_t
    this.eth_r_t = fields.eth_r_t
    this.sol_r_t = fields.sol_r_t
    this.last_update_r_t = fields.last_update_r_t
    this.xrp_long = fields.xrp_long
    this.xrp_short = fields.xrp_short
    this.hype_long = fields.hype_long
    this.hype_short = fields.hype_short
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<SigmaIvPda | null> {
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
  ): Promise<Array<SigmaIvPda | null>> {
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

  static decode(data: Buffer): SigmaIvPda {
    if (!data.slice(0, 8).equals(SigmaIvPda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = SigmaIvPda.layout.decode(data.slice(8))

    return new SigmaIvPda({
      btc_long: dec.btc_long,
      btc_short: dec.btc_short,
      eth_long: dec.eth_long,
      eth_short: dec.eth_short,
      sol_long: dec.sol_long,
      sol_short: dec.sol_short,
      last_update_long: dec.last_update_long,
      last_update_short: dec.last_update_short,
      authority: dec.authority,
      bump: dec.bump,
      jup_rv: dec.jup_rv,
      bonk_rv: dec.bonk_rv,
      wif_rv: dec.wif_rv,
      sol_rv: dec.sol_rv,
      last_update_rv: dec.last_update_rv,
      btc_r_t: dec.btc_r_t,
      eth_r_t: dec.eth_r_t,
      sol_r_t: dec.sol_r_t,
      last_update_r_t: dec.last_update_r_t,
      xrp_long: dec.xrp_long,
      xrp_short: dec.xrp_short,
      hype_long: dec.hype_long,
      hype_short: dec.hype_short,
    })
  }

  toJSON(): SigmaIvPdaJSON {
    return {
      btc_long: this.btc_long,
      btc_short: this.btc_short,
      eth_long: this.eth_long,
      eth_short: this.eth_short,
      sol_long: this.sol_long,
      sol_short: this.sol_short,
      last_update_long: this.last_update_long.toString(),
      last_update_short: this.last_update_short.toString(),
      authority: this.authority.toString(),
      bump: this.bump,
      jup_rv: this.jup_rv,
      bonk_rv: this.bonk_rv,
      wif_rv: this.wif_rv,
      sol_rv: this.sol_rv,
      last_update_rv: this.last_update_rv.toString(),
      btc_r_t: this.btc_r_t,
      eth_r_t: this.eth_r_t,
      sol_r_t: this.sol_r_t,
      last_update_r_t: this.last_update_r_t.toString(),
      xrp_long: this.xrp_long,
      xrp_short: this.xrp_short,
      hype_long: this.hype_long,
      hype_short: this.hype_short,
    }
  }

  static fromJSON(obj: SigmaIvPdaJSON): SigmaIvPda {
    return new SigmaIvPda({
      btc_long: obj.btc_long,
      btc_short: obj.btc_short,
      eth_long: obj.eth_long,
      eth_short: obj.eth_short,
      sol_long: obj.sol_long,
      sol_short: obj.sol_short,
      last_update_long: new BN(obj.last_update_long),
      last_update_short: new BN(obj.last_update_short),
      authority: new PublicKey(obj.authority),
      bump: obj.bump,
      jup_rv: obj.jup_rv,
      bonk_rv: obj.bonk_rv,
      wif_rv: obj.wif_rv,
      sol_rv: obj.sol_rv,
      last_update_rv: new BN(obj.last_update_rv),
      btc_r_t: obj.btc_r_t,
      eth_r_t: obj.eth_r_t,
      sol_r_t: obj.sol_r_t,
      last_update_r_t: new BN(obj.last_update_r_t),
      xrp_long: obj.xrp_long,
      xrp_short: obj.xrp_short,
      hype_long: obj.hype_long,
      hype_short: obj.hype_short,
    })
  }
}
