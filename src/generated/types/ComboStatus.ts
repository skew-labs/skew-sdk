import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OpenJSON {
  kind: "Open"
}

export class Open {
  static readonly discriminator = 0
  static readonly kind = "Open"
  readonly discriminator = 0
  readonly kind = "Open"

  toJSON(): OpenJSON {
    return {
      kind: "Open",
    }
  }

  toEncodable() {
    return {
      Open: {},
    }
  }
}

export interface ActiveJSON {
  kind: "Active"
}

export class Active {
  static readonly discriminator = 1
  static readonly kind = "Active"
  readonly discriminator = 1
  readonly kind = "Active"

  toJSON(): ActiveJSON {
    return {
      kind: "Active",
    }
  }

  toEncodable() {
    return {
      Active: {},
    }
  }
}

export interface CancelledJSON {
  kind: "Cancelled"
}

export class Cancelled {
  static readonly discriminator = 2
  static readonly kind = "Cancelled"
  readonly discriminator = 2
  readonly kind = "Cancelled"

  toJSON(): CancelledJSON {
    return {
      kind: "Cancelled",
    }
  }

  toEncodable() {
    return {
      Cancelled: {},
    }
  }
}

export interface SettledJSON {
  kind: "Settled"
}

export class Settled {
  static readonly discriminator = 3
  static readonly kind = "Settled"
  readonly discriminator = 3
  readonly kind = "Settled"

  toJSON(): SettledJSON {
    return {
      kind: "Settled",
    }
  }

  toEncodable() {
    return {
      Settled: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.ComboStatusKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Open" in obj) {
    return new Open()
  }
  if ("Active" in obj) {
    return new Active()
  }
  if ("Cancelled" in obj) {
    return new Cancelled()
  }
  if ("Settled" in obj) {
    return new Settled()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.ComboStatusJSON): types.ComboStatusKind {
  switch (obj.kind) {
    case "Open": {
      return new Open()
    }
    case "Active": {
      return new Active()
    }
    case "Cancelled": {
      return new Cancelled()
    }
    case "Settled": {
      return new Settled()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Open"),
    borsh.struct([], "Active"),
    borsh.struct([], "Cancelled"),
    borsh.struct([], "Settled"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
