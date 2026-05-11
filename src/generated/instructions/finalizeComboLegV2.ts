import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface FinalizeComboLegV2Args {
  leg_index: number
  realised_premium_micro: BN
}

export interface FinalizeComboLegV2Accounts {
  caller: PublicKey
  intent: PublicKey
  option: PublicKey
  governance: PublicKey
}

export const layout = borsh.struct([
  borsh.u8("leg_index"),
  borsh.u64("realised_premium_micro"),
])

export function finalizeComboLegV2(
  args: FinalizeComboLegV2Args,
  accounts: FinalizeComboLegV2Accounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.caller, isSigner: true, isWritable: true },
    { pubkey: accounts.intent, isSigner: false, isWritable: true },
    { pubkey: accounts.option, isSigner: false, isWritable: false },
    { pubkey: accounts.governance, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([142, 181, 177, 241, 144, 84, 248, 68])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      leg_index: args.leg_index,
      realised_premium_micro: args.realised_premium_micro,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
