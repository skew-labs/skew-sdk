import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CrossAssetMatrixUpdatedFields {
  matrix: PublicKey
  last_update_slot: BN
  rho_p5_bps: Array<number>
}

export interface CrossAssetMatrixUpdatedJSON {
  matrix: string
  last_update_slot: string
  rho_p5_bps: Array<number>
}

export class CrossAssetMatrixUpdated {
  readonly matrix: PublicKey
  readonly last_update_slot: BN
  readonly rho_p5_bps: Array<number>

  constructor(fields: CrossAssetMatrixUpdatedFields) {
    this.matrix = fields.matrix
    this.last_update_slot = fields.last_update_slot
    this.rho_p5_bps = fields.rho_p5_bps
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("matrix"),
        borsh.u64("last_update_slot"),
        borsh.array(borsh.u16(), 10, "rho_p5_bps"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CrossAssetMatrixUpdated({
      matrix: obj.matrix,
      last_update_slot: obj.last_update_slot,
      rho_p5_bps: obj.rho_p5_bps,
    })
  }

  static toEncodable(fields: CrossAssetMatrixUpdatedFields) {
    return {
      matrix: fields.matrix,
      last_update_slot: fields.last_update_slot,
      rho_p5_bps: fields.rho_p5_bps,
    }
  }

  toJSON(): CrossAssetMatrixUpdatedJSON {
    return {
      matrix: this.matrix.toString(),
      last_update_slot: this.last_update_slot.toString(),
      rho_p5_bps: this.rho_p5_bps,
    }
  }

  static fromJSON(obj: CrossAssetMatrixUpdatedJSON): CrossAssetMatrixUpdated {
    return new CrossAssetMatrixUpdated({
      matrix: new PublicKey(obj.matrix),
      last_update_slot: new BN(obj.last_update_slot),
      rho_p5_bps: obj.rho_p5_bps,
    })
  }

  toEncodable() {
    return CrossAssetMatrixUpdated.toEncodable(this)
  }
}
