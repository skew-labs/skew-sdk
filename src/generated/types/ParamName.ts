import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface AssetImShockBpsJSON {
  kind: "AssetImShockBps"
}

export class AssetImShockBps {
  static readonly discriminator = 0
  static readonly kind = "AssetImShockBps"
  readonly discriminator = 0
  readonly kind = "AssetImShockBps"

  toJSON(): AssetImShockBpsJSON {
    return {
      kind: "AssetImShockBps",
    }
  }

  toEncodable() {
    return {
      AssetImShockBps: {},
    }
  }
}

export interface AssetLiqPremiumBpsJSON {
  kind: "AssetLiqPremiumBps"
}

export class AssetLiqPremiumBps {
  static readonly discriminator = 1
  static readonly kind = "AssetLiqPremiumBps"
  readonly discriminator = 1
  readonly kind = "AssetLiqPremiumBps"

  toJSON(): AssetLiqPremiumBpsJSON {
    return {
      kind: "AssetLiqPremiumBps",
    }
  }

  toEncodable() {
    return {
      AssetLiqPremiumBps: {},
    }
  }
}

export interface ConcentrationCapBpsJSON {
  kind: "ConcentrationCapBps"
}

export class ConcentrationCapBps {
  static readonly discriminator = 2
  static readonly kind = "ConcentrationCapBps"
  readonly discriminator = 2
  readonly kind = "ConcentrationCapBps"

  toJSON(): ConcentrationCapBpsJSON {
    return {
      kind: "ConcentrationCapBps",
    }
  }

  toEncodable() {
    return {
      ConcentrationCapBps: {},
    }
  }
}

export interface IfFloorMicroUsdcJSON {
  kind: "IfFloorMicroUsdc"
}

export class IfFloorMicroUsdc {
  static readonly discriminator = 3
  static readonly kind = "IfFloorMicroUsdc"
  readonly discriminator = 3
  readonly kind = "IfFloorMicroUsdc"

  toJSON(): IfFloorMicroUsdcJSON {
    return {
      kind: "IfFloorMicroUsdc",
    }
  }

  toEncodable() {
    return {
      IfFloorMicroUsdc: {},
    }
  }
}

export interface IfTargetBpsJSON {
  kind: "IfTargetBps"
}

export class IfTargetBps {
  static readonly discriminator = 4
  static readonly kind = "IfTargetBps"
  readonly discriminator = 4
  readonly kind = "IfTargetBps"

  toJSON(): IfTargetBpsJSON {
    return {
      kind: "IfTargetBps",
    }
  }

  toEncodable() {
    return {
      IfTargetBps: {},
    }
  }
}

export interface PremiumFeeBpsJSON {
  kind: "PremiumFeeBps"
}

export class PremiumFeeBps {
  static readonly discriminator = 5
  static readonly kind = "PremiumFeeBps"
  readonly discriminator = 5
  readonly kind = "PremiumFeeBps"

  toJSON(): PremiumFeeBpsJSON {
    return {
      kind: "PremiumFeeBps",
    }
  }

  toEncodable() {
    return {
      PremiumFeeBps: {},
    }
  }
}

export interface RfqTakerFeeBpsJSON {
  kind: "RfqTakerFeeBps"
}

export class RfqTakerFeeBps {
  static readonly discriminator = 6
  static readonly kind = "RfqTakerFeeBps"
  readonly discriminator = 6
  readonly kind = "RfqTakerFeeBps"

  toJSON(): RfqTakerFeeBpsJSON {
    return {
      kind: "RfqTakerFeeBps",
    }
  }

  toEncodable() {
    return {
      RfqTakerFeeBps: {},
    }
  }
}

export interface OracleConfidenceBpsJSON {
  kind: "OracleConfidenceBps"
}

export class OracleConfidenceBps {
  static readonly discriminator = 7
  static readonly kind = "OracleConfidenceBps"
  readonly discriminator = 7
  readonly kind = "OracleConfidenceBps"

  toJSON(): OracleConfidenceBpsJSON {
    return {
      kind: "OracleConfidenceBps",
    }
  }

  toEncodable() {
    return {
      OracleConfidenceBps: {},
    }
  }
}

export interface PythFreshnessSlotsJSON {
  kind: "PythFreshnessSlots"
}

export class PythFreshnessSlots {
  static readonly discriminator = 8
  static readonly kind = "PythFreshnessSlots"
  readonly discriminator = 8
  readonly kind = "PythFreshnessSlots"

  toJSON(): PythFreshnessSlotsJSON {
    return {
      kind: "PythFreshnessSlots",
    }
  }

  toEncodable() {
    return {
      PythFreshnessSlots: {},
    }
  }
}

export interface PythStaleHaltSlotsJSON {
  kind: "PythStaleHaltSlots"
}

export class PythStaleHaltSlots {
  static readonly discriminator = 9
  static readonly kind = "PythStaleHaltSlots"
  readonly discriminator = 9
  readonly kind = "PythStaleHaltSlots"

  toJSON(): PythStaleHaltSlotsJSON {
    return {
      kind: "PythStaleHaltSlots",
    }
  }

  toEncodable() {
    return {
      PythStaleHaltSlots: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.ParamNameKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("AssetImShockBps" in obj) {
    return new AssetImShockBps()
  }
  if ("AssetLiqPremiumBps" in obj) {
    return new AssetLiqPremiumBps()
  }
  if ("ConcentrationCapBps" in obj) {
    return new ConcentrationCapBps()
  }
  if ("IfFloorMicroUsdc" in obj) {
    return new IfFloorMicroUsdc()
  }
  if ("IfTargetBps" in obj) {
    return new IfTargetBps()
  }
  if ("PremiumFeeBps" in obj) {
    return new PremiumFeeBps()
  }
  if ("RfqTakerFeeBps" in obj) {
    return new RfqTakerFeeBps()
  }
  if ("OracleConfidenceBps" in obj) {
    return new OracleConfidenceBps()
  }
  if ("PythFreshnessSlots" in obj) {
    return new PythFreshnessSlots()
  }
  if ("PythStaleHaltSlots" in obj) {
    return new PythStaleHaltSlots()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.ParamNameJSON): types.ParamNameKind {
  switch (obj.kind) {
    case "AssetImShockBps": {
      return new AssetImShockBps()
    }
    case "AssetLiqPremiumBps": {
      return new AssetLiqPremiumBps()
    }
    case "ConcentrationCapBps": {
      return new ConcentrationCapBps()
    }
    case "IfFloorMicroUsdc": {
      return new IfFloorMicroUsdc()
    }
    case "IfTargetBps": {
      return new IfTargetBps()
    }
    case "PremiumFeeBps": {
      return new PremiumFeeBps()
    }
    case "RfqTakerFeeBps": {
      return new RfqTakerFeeBps()
    }
    case "OracleConfidenceBps": {
      return new OracleConfidenceBps()
    }
    case "PythFreshnessSlots": {
      return new PythFreshnessSlots()
    }
    case "PythStaleHaltSlots": {
      return new PythStaleHaltSlots()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "AssetImShockBps"),
    borsh.struct([], "AssetLiqPremiumBps"),
    borsh.struct([], "ConcentrationCapBps"),
    borsh.struct([], "IfFloorMicroUsdc"),
    borsh.struct([], "IfTargetBps"),
    borsh.struct([], "PremiumFeeBps"),
    borsh.struct([], "RfqTakerFeeBps"),
    borsh.struct([], "OracleConfidenceBps"),
    borsh.struct([], "PythFreshnessSlots"),
    borsh.struct([], "PythStaleHaltSlots"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
