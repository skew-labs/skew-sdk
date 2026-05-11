import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface VaultDrainJSON {
  kind: "VaultDrain"
}

export class VaultDrain {
  static readonly discriminator = 0
  static readonly kind = "VaultDrain"
  readonly discriminator = 0
  readonly kind = "VaultDrain"

  toJSON(): VaultDrainJSON {
    return {
      kind: "VaultDrain",
    }
  }

  toEncodable() {
    return {
      VaultDrain: {},
    }
  }
}

export interface CommitteeDeterminationJSON {
  kind: "CommitteeDetermination"
}

export class CommitteeDetermination {
  static readonly discriminator = 1
  static readonly kind = "CommitteeDetermination"
  readonly discriminator = 1
  readonly kind = "CommitteeDetermination"

  toJSON(): CommitteeDeterminationJSON {
    return {
      kind: "CommitteeDetermination",
    }
  }

  toEncodable() {
    return {
      CommitteeDetermination: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.RecoveryTriggerKindKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("VaultDrain" in obj) {
    return new VaultDrain()
  }
  if ("CommitteeDetermination" in obj) {
    return new CommitteeDetermination()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.RecoveryTriggerKindJSON
): types.RecoveryTriggerKindKind {
  switch (obj.kind) {
    case "VaultDrain": {
      return new VaultDrain()
    }
    case "CommitteeDetermination": {
      return new CommitteeDetermination()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "VaultDrain"),
    borsh.struct([], "CommitteeDetermination"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
