import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface DvolUpdatedFields {
  dvol_pda: PublicKey
  asset: number
  last_update_slot: BN
  dvol_28d_micro: BN
  dvol_90d_micro: BN
  realized_var_28d_micro: BN
}

export interface DvolUpdatedJSON {
  dvol_pda: string
  asset: number
  last_update_slot: string
  dvol_28d_micro: string
  dvol_90d_micro: string
  realized_var_28d_micro: string
}

export class DvolUpdated {
  readonly dvol_pda: PublicKey
  readonly asset: number
  readonly last_update_slot: BN
  readonly dvol_28d_micro: BN
  readonly dvol_90d_micro: BN
  readonly realized_var_28d_micro: BN

  constructor(fields: DvolUpdatedFields) {
    this.dvol_pda = fields.dvol_pda
    this.asset = fields.asset
    this.last_update_slot = fields.last_update_slot
    this.dvol_28d_micro = fields.dvol_28d_micro
    this.dvol_90d_micro = fields.dvol_90d_micro
    this.realized_var_28d_micro = fields.realized_var_28d_micro
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("dvol_pda"),
        borsh.u8("asset"),
        borsh.u64("last_update_slot"),
        borsh.u64("dvol_28d_micro"),
        borsh.u64("dvol_90d_micro"),
        borsh.u64("realized_var_28d_micro"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new DvolUpdated({
      dvol_pda: obj.dvol_pda,
      asset: obj.asset,
      last_update_slot: obj.last_update_slot,
      dvol_28d_micro: obj.dvol_28d_micro,
      dvol_90d_micro: obj.dvol_90d_micro,
      realized_var_28d_micro: obj.realized_var_28d_micro,
    })
  }

  static toEncodable(fields: DvolUpdatedFields) {
    return {
      dvol_pda: fields.dvol_pda,
      asset: fields.asset,
      last_update_slot: fields.last_update_slot,
      dvol_28d_micro: fields.dvol_28d_micro,
      dvol_90d_micro: fields.dvol_90d_micro,
      realized_var_28d_micro: fields.realized_var_28d_micro,
    }
  }

  toJSON(): DvolUpdatedJSON {
    return {
      dvol_pda: this.dvol_pda.toString(),
      asset: this.asset,
      last_update_slot: this.last_update_slot.toString(),
      dvol_28d_micro: this.dvol_28d_micro.toString(),
      dvol_90d_micro: this.dvol_90d_micro.toString(),
      realized_var_28d_micro: this.realized_var_28d_micro.toString(),
    }
  }

  static fromJSON(obj: DvolUpdatedJSON): DvolUpdated {
    return new DvolUpdated({
      dvol_pda: new PublicKey(obj.dvol_pda),
      asset: obj.asset,
      last_update_slot: new BN(obj.last_update_slot),
      dvol_28d_micro: new BN(obj.dvol_28d_micro),
      dvol_90d_micro: new BN(obj.dvol_90d_micro),
      realized_var_28d_micro: new BN(obj.realized_var_28d_micro),
    })
  }

  toEncodable() {
    return DvolUpdated.toEncodable(this)
  }
}
