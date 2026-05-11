import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface LiquidationHolderUnresolvedFields {
  option: PublicKey
  holder: PublicKey
  liquidator: PublicKey
  residual_collateral_micro: BN
  liquidated_at: BN
}

export interface LiquidationHolderUnresolvedJSON {
  option: string
  holder: string
  liquidator: string
  residual_collateral_micro: string
  liquidated_at: string
}

export class LiquidationHolderUnresolved {
  readonly option: PublicKey
  readonly holder: PublicKey
  readonly liquidator: PublicKey
  readonly residual_collateral_micro: BN
  readonly liquidated_at: BN

  constructor(fields: LiquidationHolderUnresolvedFields) {
    this.option = fields.option
    this.holder = fields.holder
    this.liquidator = fields.liquidator
    this.residual_collateral_micro = fields.residual_collateral_micro
    this.liquidated_at = fields.liquidated_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("option"),
        borsh.publicKey("holder"),
        borsh.publicKey("liquidator"),
        borsh.u64("residual_collateral_micro"),
        borsh.i64("liquidated_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new LiquidationHolderUnresolved({
      option: obj.option,
      holder: obj.holder,
      liquidator: obj.liquidator,
      residual_collateral_micro: obj.residual_collateral_micro,
      liquidated_at: obj.liquidated_at,
    })
  }

  static toEncodable(fields: LiquidationHolderUnresolvedFields) {
    return {
      option: fields.option,
      holder: fields.holder,
      liquidator: fields.liquidator,
      residual_collateral_micro: fields.residual_collateral_micro,
      liquidated_at: fields.liquidated_at,
    }
  }

  toJSON(): LiquidationHolderUnresolvedJSON {
    return {
      option: this.option.toString(),
      holder: this.holder.toString(),
      liquidator: this.liquidator.toString(),
      residual_collateral_micro: this.residual_collateral_micro.toString(),
      liquidated_at: this.liquidated_at.toString(),
    }
  }

  static fromJSON(
    obj: LiquidationHolderUnresolvedJSON
  ): LiquidationHolderUnresolved {
    return new LiquidationHolderUnresolved({
      option: new PublicKey(obj.option),
      holder: new PublicKey(obj.holder),
      liquidator: new PublicKey(obj.liquidator),
      residual_collateral_micro: new BN(obj.residual_collateral_micro),
      liquidated_at: new BN(obj.liquidated_at),
    })
  }

  toEncodable() {
    return LiquidationHolderUnresolved.toEncodable(this)
  }
}
