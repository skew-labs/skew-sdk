import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface Tier1JSON {
  kind: "Tier1"
}

export class Tier1 {
  static readonly discriminator = 0
  static readonly kind = "Tier1"
  readonly discriminator = 0
  readonly kind = "Tier1"

  toJSON(): Tier1JSON {
    return {
      kind: "Tier1",
    }
  }

  toEncodable() {
    return {
      Tier1: {},
    }
  }
}

export interface Tier2JSON {
  kind: "Tier2"
}

export class Tier2 {
  static readonly discriminator = 1
  static readonly kind = "Tier2"
  readonly discriminator = 1
  readonly kind = "Tier2"

  toJSON(): Tier2JSON {
    return {
      kind: "Tier2",
    }
  }

  toEncodable() {
    return {
      Tier2: {},
    }
  }
}

export interface CrossJSON {
  kind: "Cross"
}

export class Cross {
  static readonly discriminator = 2
  static readonly kind = "Cross"
  readonly discriminator = 2
  readonly kind = "Cross"

  toJSON(): CrossJSON {
    return {
      kind: "Cross",
    }
  }

  toEncodable() {
    return {
      Cross: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.IfTierKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Tier1" in obj) {
    return new Tier1()
  }
  if ("Tier2" in obj) {
    return new Tier2()
  }
  if ("Cross" in obj) {
    return new Cross()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.IfTierJSON): types.IfTierKind {
  switch (obj.kind) {
    case "Tier1": {
      return new Tier1()
    }
    case "Tier2": {
      return new Tier2()
    }
    case "Cross": {
      return new Cross()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Tier1"),
    borsh.struct([], "Tier2"),
    borsh.struct([], "Cross"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
