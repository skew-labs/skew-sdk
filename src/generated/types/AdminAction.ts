import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export type ListAssetFields = {
  pythFeed: PublicKey
  tier: number
  symbol: Array<number>
  pMaxFloorBps: number
  liqPremiumBps: number
}
export type ListAssetValue = {
  pythFeed: PublicKey
  tier: number
  symbol: Array<number>
  pMaxFloorBps: number
  liqPremiumBps: number
}

export interface ListAssetJSON {
  kind: "ListAsset"
  value: {
    pythFeed: string
    tier: number
    symbol: Array<number>
    pMaxFloorBps: number
    liqPremiumBps: number
  }
}

export class ListAsset {
  static readonly discriminator = 0
  static readonly kind = "ListAsset"
  readonly discriminator = 0
  readonly kind = "ListAsset"
  readonly value: ListAssetValue

  constructor(value: ListAssetFields) {
    this.value = {
      pythFeed: value.pythFeed,
      tier: value.tier,
      symbol: value.symbol,
      pMaxFloorBps: value.pMaxFloorBps,
      liqPremiumBps: value.liqPremiumBps,
    }
  }

  toJSON(): ListAssetJSON {
    return {
      kind: "ListAsset",
      value: {
        pythFeed: this.value.pythFeed.toString(),
        tier: this.value.tier,
        symbol: this.value.symbol,
        pMaxFloorBps: this.value.pMaxFloorBps,
        liqPremiumBps: this.value.liqPremiumBps,
      },
    }
  }

  toEncodable() {
    return {
      ListAsset: {
        pyth_feed: this.value.pythFeed,
        tier: this.value.tier,
        symbol: this.value.symbol,
        p_max_floor_bps: this.value.pMaxFloorBps,
        liq_premium_bps: this.value.liqPremiumBps,
      },
    }
  }
}

export type DelistAssetFields = {
  panelIdx: number
}
export type DelistAssetValue = {
  panelIdx: number
}

export interface DelistAssetJSON {
  kind: "DelistAsset"
  value: {
    panelIdx: number
  }
}

export class DelistAsset {
  static readonly discriminator = 1
  static readonly kind = "DelistAsset"
  readonly discriminator = 1
  readonly kind = "DelistAsset"
  readonly value: DelistAssetValue

  constructor(value: DelistAssetFields) {
    this.value = {
      panelIdx: value.panelIdx,
    }
  }

  toJSON(): DelistAssetJSON {
    return {
      kind: "DelistAsset",
      value: {
        panelIdx: this.value.panelIdx,
      },
    }
  }

  toEncodable() {
    return {
      DelistAsset: {
        panel_idx: this.value.panelIdx,
      },
    }
  }
}

export type UpdateParamFields = {
  name: types.ParamNameKind
  value: BN
}
export type UpdateParamValue = {
  name: types.ParamNameKind
  value: BN
}

export interface UpdateParamJSON {
  kind: "UpdateParam"
  value: {
    name: types.ParamNameJSON
    value: string
  }
}

export class UpdateParam {
  static readonly discriminator = 2
  static readonly kind = "UpdateParam"
  readonly discriminator = 2
  readonly kind = "UpdateParam"
  readonly value: UpdateParamValue

  constructor(value: UpdateParamFields) {
    this.value = {
      name: value.name,
      value: value.value,
    }
  }

  toJSON(): UpdateParamJSON {
    return {
      kind: "UpdateParam",
      value: {
        name: this.value.name.toJSON(),
        value: this.value.value.toString(),
      },
    }
  }

  toEncodable() {
    return {
      UpdateParam: {
        name: this.value.name.toEncodable(),
        value: this.value.value,
      },
    }
  }
}

export type UpdateWithdrawalLimitFields = {
  newLimitBps: number
}
export type UpdateWithdrawalLimitValue = {
  newLimitBps: number
}

export interface UpdateWithdrawalLimitJSON {
  kind: "UpdateWithdrawalLimit"
  value: {
    newLimitBps: number
  }
}

export class UpdateWithdrawalLimit {
  static readonly discriminator = 3
  static readonly kind = "UpdateWithdrawalLimit"
  readonly discriminator = 3
  readonly kind = "UpdateWithdrawalLimit"
  readonly value: UpdateWithdrawalLimitValue

  constructor(value: UpdateWithdrawalLimitFields) {
    this.value = {
      newLimitBps: value.newLimitBps,
    }
  }

  toJSON(): UpdateWithdrawalLimitJSON {
    return {
      kind: "UpdateWithdrawalLimit",
      value: {
        newLimitBps: this.value.newLimitBps,
      },
    }
  }

  toEncodable() {
    return {
      UpdateWithdrawalLimit: {
        new_limit_bps: this.value.newLimitBps,
      },
    }
  }
}

export type UpgradeProgramFields = {
  newProgramId: PublicKey
}
export type UpgradeProgramValue = {
  newProgramId: PublicKey
}

export interface UpgradeProgramJSON {
  kind: "UpgradeProgram"
  value: {
    newProgramId: string
  }
}

export class UpgradeProgram {
  static readonly discriminator = 4
  static readonly kind = "UpgradeProgram"
  readonly discriminator = 4
  readonly kind = "UpgradeProgram"
  readonly value: UpgradeProgramValue

  constructor(value: UpgradeProgramFields) {
    this.value = {
      newProgramId: value.newProgramId,
    }
  }

  toJSON(): UpgradeProgramJSON {
    return {
      kind: "UpgradeProgram",
      value: {
        newProgramId: this.value.newProgramId.toString(),
      },
    }
  }

  toEncodable() {
    return {
      UpgradeProgram: {
        new_program_id: this.value.newProgramId,
      },
    }
  }
}

export type RotateMultisigMemberFields = {
  old: PublicKey
  new: PublicKey
}
export type RotateMultisigMemberValue = {
  old: PublicKey
  new: PublicKey
}

export interface RotateMultisigMemberJSON {
  kind: "RotateMultisigMember"
  value: {
    old: string
    new: string
  }
}

export class RotateMultisigMember {
  static readonly discriminator = 5
  static readonly kind = "RotateMultisigMember"
  readonly discriminator = 5
  readonly kind = "RotateMultisigMember"
  readonly value: RotateMultisigMemberValue

  constructor(value: RotateMultisigMemberFields) {
    this.value = {
      old: value.old,
      new: value.new,
    }
  }

  toJSON(): RotateMultisigMemberJSON {
    return {
      kind: "RotateMultisigMember",
      value: {
        old: this.value.old.toString(),
        new: this.value.new.toString(),
      },
    }
  }

  toEncodable() {
    return {
      RotateMultisigMember: {
        old: this.value.old,
        new: this.value.new,
      },
    }
  }
}

export type ChangeMultisigThresholdFields = {
  newThreshold: number
}
export type ChangeMultisigThresholdValue = {
  newThreshold: number
}

export interface ChangeMultisigThresholdJSON {
  kind: "ChangeMultisigThreshold"
  value: {
    newThreshold: number
  }
}

export class ChangeMultisigThreshold {
  static readonly discriminator = 6
  static readonly kind = "ChangeMultisigThreshold"
  readonly discriminator = 6
  readonly kind = "ChangeMultisigThreshold"
  readonly value: ChangeMultisigThresholdValue

  constructor(value: ChangeMultisigThresholdFields) {
    this.value = {
      newThreshold: value.newThreshold,
    }
  }

  toJSON(): ChangeMultisigThresholdJSON {
    return {
      kind: "ChangeMultisigThreshold",
      value: {
        newThreshold: this.value.newThreshold,
      },
    }
  }

  toEncodable() {
    return {
      ChangeMultisigThreshold: {
        new_threshold: this.value.newThreshold,
      },
    }
  }
}

export interface PauseProtocolJSON {
  kind: "PauseProtocol"
}

export class PauseProtocol {
  static readonly discriminator = 7
  static readonly kind = "PauseProtocol"
  readonly discriminator = 7
  readonly kind = "PauseProtocol"

  toJSON(): PauseProtocolJSON {
    return {
      kind: "PauseProtocol",
    }
  }

  toEncodable() {
    return {
      PauseProtocol: {},
    }
  }
}

export interface UnpauseProtocolJSON {
  kind: "UnpauseProtocol"
}

export class UnpauseProtocol {
  static readonly discriminator = 8
  static readonly kind = "UnpauseProtocol"
  readonly discriminator = 8
  readonly kind = "UnpauseProtocol"

  toJSON(): UnpauseProtocolJSON {
    return {
      kind: "UnpauseProtocol",
    }
  }

  toEncodable() {
    return {
      UnpauseProtocol: {},
    }
  }
}

export type AddSettlementFallbackFields = {
  panelIdx: number
  dexVenue: PublicKey
}
export type AddSettlementFallbackValue = {
  panelIdx: number
  dexVenue: PublicKey
}

export interface AddSettlementFallbackJSON {
  kind: "AddSettlementFallback"
  value: {
    panelIdx: number
    dexVenue: string
  }
}

export class AddSettlementFallback {
  static readonly discriminator = 9
  static readonly kind = "AddSettlementFallback"
  readonly discriminator = 9
  readonly kind = "AddSettlementFallback"
  readonly value: AddSettlementFallbackValue

  constructor(value: AddSettlementFallbackFields) {
    this.value = {
      panelIdx: value.panelIdx,
      dexVenue: value.dexVenue,
    }
  }

  toJSON(): AddSettlementFallbackJSON {
    return {
      kind: "AddSettlementFallback",
      value: {
        panelIdx: this.value.panelIdx,
        dexVenue: this.value.dexVenue.toString(),
      },
    }
  }

  toEncodable() {
    return {
      AddSettlementFallback: {
        panel_idx: this.value.panelIdx,
        dex_venue: this.value.dexVenue,
      },
    }
  }
}

export type AdjustIccMatrixFields = {
  pairIdx: number
  newRhoP5Micro: number
}
export type AdjustIccMatrixValue = {
  pairIdx: number
  newRhoP5Micro: number
}

export interface AdjustIccMatrixJSON {
  kind: "AdjustIccMatrix"
  value: {
    pairIdx: number
    newRhoP5Micro: number
  }
}

export class AdjustIccMatrix {
  static readonly discriminator = 10
  static readonly kind = "AdjustIccMatrix"
  readonly discriminator = 10
  readonly kind = "AdjustIccMatrix"
  readonly value: AdjustIccMatrixValue

  constructor(value: AdjustIccMatrixFields) {
    this.value = {
      pairIdx: value.pairIdx,
      newRhoP5Micro: value.newRhoP5Micro,
    }
  }

  toJSON(): AdjustIccMatrixJSON {
    return {
      kind: "AdjustIccMatrix",
      value: {
        pairIdx: this.value.pairIdx,
        newRhoP5Micro: this.value.newRhoP5Micro,
      },
    }
  }

  toEncodable() {
    return {
      AdjustIccMatrix: {
        pair_idx: this.value.pairIdx,
        new_rho_p5_micro: this.value.newRhoP5Micro,
      },
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.AdminActionKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("ListAsset" in obj) {
    const val = obj["ListAsset"]
    return new ListAsset({
      pythFeed: val["pyth_feed"],
      tier: val["tier"],
      symbol: val["symbol"],
      pMaxFloorBps: val["p_max_floor_bps"],
      liqPremiumBps: val["liq_premium_bps"],
    })
  }
  if ("DelistAsset" in obj) {
    const val = obj["DelistAsset"]
    return new DelistAsset({
      panelIdx: val["panel_idx"],
    })
  }
  if ("UpdateParam" in obj) {
    const val = obj["UpdateParam"]
    return new UpdateParam({
      name: types.ParamName.fromDecoded(val["name"]),
      value: val["value"],
    })
  }
  if ("UpdateWithdrawalLimit" in obj) {
    const val = obj["UpdateWithdrawalLimit"]
    return new UpdateWithdrawalLimit({
      newLimitBps: val["new_limit_bps"],
    })
  }
  if ("UpgradeProgram" in obj) {
    const val = obj["UpgradeProgram"]
    return new UpgradeProgram({
      newProgramId: val["new_program_id"],
    })
  }
  if ("RotateMultisigMember" in obj) {
    const val = obj["RotateMultisigMember"]
    return new RotateMultisigMember({
      old: val["old"],
      new: val["new"],
    })
  }
  if ("ChangeMultisigThreshold" in obj) {
    const val = obj["ChangeMultisigThreshold"]
    return new ChangeMultisigThreshold({
      newThreshold: val["new_threshold"],
    })
  }
  if ("PauseProtocol" in obj) {
    return new PauseProtocol()
  }
  if ("UnpauseProtocol" in obj) {
    return new UnpauseProtocol()
  }
  if ("AddSettlementFallback" in obj) {
    const val = obj["AddSettlementFallback"]
    return new AddSettlementFallback({
      panelIdx: val["panel_idx"],
      dexVenue: val["dex_venue"],
    })
  }
  if ("AdjustIccMatrix" in obj) {
    const val = obj["AdjustIccMatrix"]
    return new AdjustIccMatrix({
      pairIdx: val["pair_idx"],
      newRhoP5Micro: val["new_rho_p5_micro"],
    })
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.AdminActionJSON): types.AdminActionKind {
  switch (obj.kind) {
    case "ListAsset": {
      return new ListAsset({
        pythFeed: new PublicKey(obj.value.pythFeed),
        tier: obj.value.tier,
        symbol: obj.value.symbol,
        pMaxFloorBps: obj.value.pMaxFloorBps,
        liqPremiumBps: obj.value.liqPremiumBps,
      })
    }
    case "DelistAsset": {
      return new DelistAsset({
        panelIdx: obj.value.panelIdx,
      })
    }
    case "UpdateParam": {
      return new UpdateParam({
        name: types.ParamName.fromJSON(obj.value.name),
        value: new BN(obj.value.value),
      })
    }
    case "UpdateWithdrawalLimit": {
      return new UpdateWithdrawalLimit({
        newLimitBps: obj.value.newLimitBps,
      })
    }
    case "UpgradeProgram": {
      return new UpgradeProgram({
        newProgramId: new PublicKey(obj.value.newProgramId),
      })
    }
    case "RotateMultisigMember": {
      return new RotateMultisigMember({
        old: new PublicKey(obj.value.old),
        new: new PublicKey(obj.value.new),
      })
    }
    case "ChangeMultisigThreshold": {
      return new ChangeMultisigThreshold({
        newThreshold: obj.value.newThreshold,
      })
    }
    case "PauseProtocol": {
      return new PauseProtocol()
    }
    case "UnpauseProtocol": {
      return new UnpauseProtocol()
    }
    case "AddSettlementFallback": {
      return new AddSettlementFallback({
        panelIdx: obj.value.panelIdx,
        dexVenue: new PublicKey(obj.value.dexVenue),
      })
    }
    case "AdjustIccMatrix": {
      return new AdjustIccMatrix({
        pairIdx: obj.value.pairIdx,
        newRhoP5Micro: obj.value.newRhoP5Micro,
      })
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct(
      [
        borsh.publicKey("pyth_feed"),
        borsh.u8("tier"),
        borsh.array(borsh.u8(), 6, "symbol"),
        borsh.u16("p_max_floor_bps"),
        borsh.u16("liq_premium_bps"),
      ],
      "ListAsset"
    ),
    borsh.struct([borsh.u8("panel_idx")], "DelistAsset"),
    borsh.struct(
      [types.ParamName.layout("name"), borsh.u64("value")],
      "UpdateParam"
    ),
    borsh.struct([borsh.u16("new_limit_bps")], "UpdateWithdrawalLimit"),
    borsh.struct([borsh.publicKey("new_program_id")], "UpgradeProgram"),
    borsh.struct(
      [borsh.publicKey("old"), borsh.publicKey("new")],
      "RotateMultisigMember"
    ),
    borsh.struct([borsh.u8("new_threshold")], "ChangeMultisigThreshold"),
    borsh.struct([], "PauseProtocol"),
    borsh.struct([], "UnpauseProtocol"),
    borsh.struct(
      [borsh.u8("panel_idx"), borsh.publicKey("dex_venue")],
      "AddSettlementFallback"
    ),
    borsh.struct(
      [borsh.u8("pair_idx"), borsh.u32("new_rho_p5_micro")],
      "AdjustIccMatrix"
    ),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
