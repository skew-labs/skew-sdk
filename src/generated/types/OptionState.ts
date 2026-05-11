import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CreatedJSON {
  kind: "Created"
}

export class Created {
  static readonly discriminator = 0
  static readonly kind = "Created"
  readonly discriminator = 0
  readonly kind = "Created"

  toJSON(): CreatedJSON {
    return {
      kind: "Created",
    }
  }

  toEncodable() {
    return {
      Created: {},
    }
  }
}

export interface FundedJSON {
  kind: "Funded"
}

export class Funded {
  static readonly discriminator = 1
  static readonly kind = "Funded"
  readonly discriminator = 1
  readonly kind = "Funded"

  toJSON(): FundedJSON {
    return {
      kind: "Funded",
    }
  }

  toEncodable() {
    return {
      Funded: {},
    }
  }
}

export interface ActiveJSON {
  kind: "Active"
}

export class Active {
  static readonly discriminator = 2
  static readonly kind = "Active"
  readonly discriminator = 2
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

export interface ExpiredJSON {
  kind: "Expired"
}

export class Expired {
  static readonly discriminator = 3
  static readonly kind = "Expired"
  readonly discriminator = 3
  readonly kind = "Expired"

  toJSON(): ExpiredJSON {
    return {
      kind: "Expired",
    }
  }

  toEncodable() {
    return {
      Expired: {},
    }
  }
}

export interface SettledJSON {
  kind: "Settled"
}

export class Settled {
  static readonly discriminator = 4
  static readonly kind = "Settled"
  readonly discriminator = 4
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

export interface DisputedJSON {
  kind: "Disputed"
}

export class Disputed {
  static readonly discriminator = 5
  static readonly kind = "Disputed"
  readonly discriminator = 5
  readonly kind = "Disputed"

  toJSON(): DisputedJSON {
    return {
      kind: "Disputed",
    }
  }

  toEncodable() {
    return {
      Disputed: {},
    }
  }
}

export interface ExpiredAbandonedJSON {
  kind: "ExpiredAbandoned"
}

export class ExpiredAbandoned {
  static readonly discriminator = 6
  static readonly kind = "ExpiredAbandoned"
  readonly discriminator = 6
  readonly kind = "ExpiredAbandoned"

  toJSON(): ExpiredAbandonedJSON {
    return {
      kind: "ExpiredAbandoned",
    }
  }

  toEncodable() {
    return {
      ExpiredAbandoned: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.OptionStateKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Created" in obj) {
    return new Created()
  }
  if ("Funded" in obj) {
    return new Funded()
  }
  if ("Active" in obj) {
    return new Active()
  }
  if ("Expired" in obj) {
    return new Expired()
  }
  if ("Settled" in obj) {
    return new Settled()
  }
  if ("Disputed" in obj) {
    return new Disputed()
  }
  if ("ExpiredAbandoned" in obj) {
    return new ExpiredAbandoned()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.OptionStateJSON): types.OptionStateKind {
  switch (obj.kind) {
    case "Created": {
      return new Created()
    }
    case "Funded": {
      return new Funded()
    }
    case "Active": {
      return new Active()
    }
    case "Expired": {
      return new Expired()
    }
    case "Settled": {
      return new Settled()
    }
    case "Disputed": {
      return new Disputed()
    }
    case "ExpiredAbandoned": {
      return new ExpiredAbandoned()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Created"),
    borsh.struct([], "Funded"),
    borsh.struct([], "Active"),
    borsh.struct([], "Expired"),
    borsh.struct([], "Settled"),
    borsh.struct([], "Disputed"),
    borsh.struct([], "ExpiredAbandoned"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
