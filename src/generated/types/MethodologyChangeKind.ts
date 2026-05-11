import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OracleHierarchyJSON {
  kind: "OracleHierarchy"
}

export class OracleHierarchy {
  static readonly discriminator = 0
  static readonly kind = "OracleHierarchy"
  readonly discriminator = 0
  readonly kind = "OracleHierarchy"

  toJSON(): OracleHierarchyJSON {
    return {
      kind: "OracleHierarchy",
    }
  }

  toEncodable() {
    return {
      OracleHierarchy: {},
    }
  }
}

export interface DivergenceGateJSON {
  kind: "DivergenceGate"
}

export class DivergenceGate {
  static readonly discriminator = 1
  static readonly kind = "DivergenceGate"
  readonly discriminator = 1
  readonly kind = "DivergenceGate"

  toJSON(): DivergenceGateJSON {
    return {
      kind: "DivergenceGate",
    }
  }

  toEncodable() {
    return {
      DivergenceGate: {},
    }
  }
}

export interface ConfidenceGateJSON {
  kind: "ConfidenceGate"
}

export class ConfidenceGate {
  static readonly discriminator = 2
  static readonly kind = "ConfidenceGate"
  readonly discriminator = 2
  readonly kind = "ConfidenceGate"

  toJSON(): ConfidenceGateJSON {
    return {
      kind: "ConfidenceGate",
    }
  }

  toEncodable() {
    return {
      ConfidenceGate: {},
    }
  }
}

export interface SsviSurfaceJSON {
  kind: "SsviSurface"
}

export class SsviSurface {
  static readonly discriminator = 3
  static readonly kind = "SsviSurface"
  readonly discriminator = 3
  readonly kind = "SsviSurface"

  toJSON(): SsviSurfaceJSON {
    return {
      kind: "SsviSurface",
    }
  }

  toEncodable() {
    return {
      SsviSurface: {},
    }
  }
}

export interface DexTwapFallbackJSON {
  kind: "DexTwapFallback"
}

export class DexTwapFallback {
  static readonly discriminator = 4
  static readonly kind = "DexTwapFallback"
  readonly discriminator = 4
  readonly kind = "DexTwapFallback"

  toJSON(): DexTwapFallbackJSON {
    return {
      kind: "DexTwapFallback",
    }
  }

  toEncodable() {
    return {
      DexTwapFallback: {},
    }
  }
}

export interface OtherJSON {
  kind: "Other"
}

export class Other {
  static readonly discriminator = 5
  static readonly kind = "Other"
  readonly discriminator = 5
  readonly kind = "Other"

  toJSON(): OtherJSON {
    return {
      kind: "Other",
    }
  }

  toEncodable() {
    return {
      Other: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.MethodologyChangeKindKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("OracleHierarchy" in obj) {
    return new OracleHierarchy()
  }
  if ("DivergenceGate" in obj) {
    return new DivergenceGate()
  }
  if ("ConfidenceGate" in obj) {
    return new ConfidenceGate()
  }
  if ("SsviSurface" in obj) {
    return new SsviSurface()
  }
  if ("DexTwapFallback" in obj) {
    return new DexTwapFallback()
  }
  if ("Other" in obj) {
    return new Other()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.MethodologyChangeKindJSON
): types.MethodologyChangeKindKind {
  switch (obj.kind) {
    case "OracleHierarchy": {
      return new OracleHierarchy()
    }
    case "DivergenceGate": {
      return new DivergenceGate()
    }
    case "ConfidenceGate": {
      return new ConfidenceGate()
    }
    case "SsviSurface": {
      return new SsviSurface()
    }
    case "DexTwapFallback": {
      return new DexTwapFallback()
    }
    case "Other": {
      return new Other()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "OracleHierarchy"),
    borsh.struct([], "DivergenceGate"),
    borsh.struct([], "ConfidenceGate"),
    borsh.struct([], "SsviSurface"),
    borsh.struct([], "DexTwapFallback"),
    borsh.struct([], "Other"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
