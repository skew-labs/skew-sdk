import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StandardJSON {
  kind: "Standard"
}

export class Standard {
  static readonly discriminator = 0
  static readonly kind = "Standard"
  readonly discriminator = 0
  readonly kind = "Standard"

  toJSON(): StandardJSON {
    return {
      kind: "Standard",
    }
  }

  toEncodable() {
    return {
      Standard: {},
    }
  }
}

export interface SilverJSON {
  kind: "Silver"
}

export class Silver {
  static readonly discriminator = 1
  static readonly kind = "Silver"
  readonly discriminator = 1
  readonly kind = "Silver"

  toJSON(): SilverJSON {
    return {
      kind: "Silver",
    }
  }

  toEncodable() {
    return {
      Silver: {},
    }
  }
}

export interface GoldJSON {
  kind: "Gold"
}

export class Gold {
  static readonly discriminator = 2
  static readonly kind = "Gold"
  readonly discriminator = 2
  readonly kind = "Gold"

  toJSON(): GoldJSON {
    return {
      kind: "Gold",
    }
  }

  toEncodable() {
    return {
      Gold: {},
    }
  }
}

export interface PlatinumJSON {
  kind: "Platinum"
}

export class Platinum {
  static readonly discriminator = 3
  static readonly kind = "Platinum"
  readonly discriminator = 3
  readonly kind = "Platinum"

  toJSON(): PlatinumJSON {
    return {
      kind: "Platinum",
    }
  }

  toEncodable() {
    return {
      Platinum: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.VerifiedTierKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Standard" in obj) {
    return new Standard()
  }
  if ("Silver" in obj) {
    return new Silver()
  }
  if ("Gold" in obj) {
    return new Gold()
  }
  if ("Platinum" in obj) {
    return new Platinum()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.VerifiedTierJSON): types.VerifiedTierKind {
  switch (obj.kind) {
    case "Standard": {
      return new Standard()
    }
    case "Silver": {
      return new Silver()
    }
    case "Gold": {
      return new Gold()
    }
    case "Platinum": {
      return new Platinum()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Standard"),
    borsh.struct([], "Silver"),
    borsh.struct([], "Gold"),
    borsh.struct([], "Platinum"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
