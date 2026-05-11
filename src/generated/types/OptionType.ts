import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface VanillaJSON {
  kind: "Vanilla"
}

export class Vanilla {
  static readonly discriminator = 0
  static readonly kind = "Vanilla"
  readonly discriminator = 0
  readonly kind = "Vanilla"

  toJSON(): VanillaJSON {
    return {
      kind: "Vanilla",
    }
  }

  toEncodable() {
    return {
      Vanilla: {},
    }
  }
}

export interface DigitalJSON {
  kind: "Digital"
}

export class Digital {
  static readonly discriminator = 1
  static readonly kind = "Digital"
  readonly discriminator = 1
  readonly kind = "Digital"

  toJSON(): DigitalJSON {
    return {
      kind: "Digital",
    }
  }

  toEncodable() {
    return {
      Digital: {},
    }
  }
}

export interface CappedVanillaJSON {
  kind: "CappedVanilla"
}

export class CappedVanilla {
  static readonly discriminator = 2
  static readonly kind = "CappedVanilla"
  readonly discriminator = 2
  readonly kind = "CappedVanilla"

  toJSON(): CappedVanillaJSON {
    return {
      kind: "CappedVanilla",
    }
  }

  toEncodable() {
    return {
      CappedVanilla: {},
    }
  }
}

export interface RangeAccrualJSON {
  kind: "RangeAccrual"
}

export class RangeAccrual {
  static readonly discriminator = 3
  static readonly kind = "RangeAccrual"
  readonly discriminator = 3
  readonly kind = "RangeAccrual"

  toJSON(): RangeAccrualJSON {
    return {
      kind: "RangeAccrual",
    }
  }

  toEncodable() {
    return {
      RangeAccrual: {},
    }
  }
}

export interface VanillaInverseJSON {
  kind: "VanillaInverse"
}

export class VanillaInverse {
  static readonly discriminator = 4
  static readonly kind = "VanillaInverse"
  readonly discriminator = 4
  readonly kind = "VanillaInverse"

  toJSON(): VanillaInverseJSON {
    return {
      kind: "VanillaInverse",
    }
  }

  toEncodable() {
    return {
      VanillaInverse: {},
    }
  }
}

export interface DigitalInverseJSON {
  kind: "DigitalInverse"
}

export class DigitalInverse {
  static readonly discriminator = 5
  static readonly kind = "DigitalInverse"
  readonly discriminator = 5
  readonly kind = "DigitalInverse"

  toJSON(): DigitalInverseJSON {
    return {
      kind: "DigitalInverse",
    }
  }

  toEncodable() {
    return {
      DigitalInverse: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.OptionTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Vanilla" in obj) {
    return new Vanilla()
  }
  if ("Digital" in obj) {
    return new Digital()
  }
  if ("CappedVanilla" in obj) {
    return new CappedVanilla()
  }
  if ("RangeAccrual" in obj) {
    return new RangeAccrual()
  }
  if ("VanillaInverse" in obj) {
    return new VanillaInverse()
  }
  if ("DigitalInverse" in obj) {
    return new DigitalInverse()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.OptionTypeJSON): types.OptionTypeKind {
  switch (obj.kind) {
    case "Vanilla": {
      return new Vanilla()
    }
    case "Digital": {
      return new Digital()
    }
    case "CappedVanilla": {
      return new CappedVanilla()
    }
    case "RangeAccrual": {
      return new RangeAccrual()
    }
    case "VanillaInverse": {
      return new VanillaInverse()
    }
    case "DigitalInverse": {
      return new DigitalInverse()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Vanilla"),
    borsh.struct([], "Digital"),
    borsh.struct([], "CappedVanilla"),
    borsh.struct([], "RangeAccrual"),
    borsh.struct([], "VanillaInverse"),
    borsh.struct([], "DigitalInverse"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
