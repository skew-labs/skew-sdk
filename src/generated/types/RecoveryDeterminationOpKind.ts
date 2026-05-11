import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ProposeJSON {
  kind: "Propose"
}

export class Propose {
  static readonly discriminator = 0
  static readonly kind = "Propose"
  readonly discriminator = 0
  readonly kind = "Propose"

  toJSON(): ProposeJSON {
    return {
      kind: "Propose",
    }
  }

  toEncodable() {
    return {
      Propose: {},
    }
  }
}

export interface ExecuteJSON {
  kind: "Execute"
}

export class Execute {
  static readonly discriminator = 1
  static readonly kind = "Execute"
  readonly discriminator = 1
  readonly kind = "Execute"

  toJSON(): ExecuteJSON {
    return {
      kind: "Execute",
    }
  }

  toEncodable() {
    return {
      Execute: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.RecoveryDeterminationOpKindKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Propose" in obj) {
    return new Propose()
  }
  if ("Execute" in obj) {
    return new Execute()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.RecoveryDeterminationOpKindJSON
): types.RecoveryDeterminationOpKindKind {
  switch (obj.kind) {
    case "Propose": {
      return new Propose()
    }
    case "Execute": {
      return new Execute()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Propose"),
    borsh.struct([], "Execute"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
