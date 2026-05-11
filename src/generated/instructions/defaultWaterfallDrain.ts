import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DefaultWaterfallDrainArgs {
  tier4_slot: types.IfTierKind
  loss: BN
}

export interface DefaultWaterfallDrainAccounts {
  insurance_fund: PublicKey
  defaulting_cm: PublicKey
  authority: PublicKey
}

export const layout = borsh.struct([
  types.IfTier.layout("tier4_slot"),
  borsh.u64("loss"),
])

export function defaultWaterfallDrain(
  args: DefaultWaterfallDrainArgs,
  accounts: DefaultWaterfallDrainAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.insurance_fund, isSigner: false, isWritable: true },
    { pubkey: accounts.defaulting_cm, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: false },
  ]
  const identifier = Buffer.from([14, 164, 142, 106, 236, 178, 193, 228])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      tier4_slot: args.tier4_slot.toEncodable(),
      loss: args.loss,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
