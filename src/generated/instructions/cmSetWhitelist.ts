import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CmSetWhitelistArgs {
  new_entries: Array<PublicKey>
  replace_all: boolean
}

export interface CmSetWhitelistAccounts {
  authority: PublicKey
  cm: PublicKey
}

export const layout = borsh.struct([
  borsh.vec(borsh.publicKey(), "new_entries"),
  borsh.bool("replace_all"),
])

export function cmSetWhitelist(
  args: CmSetWhitelistArgs,
  accounts: CmSetWhitelistAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: false },
    { pubkey: accounts.cm, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([215, 11, 135, 253, 242, 215, 240, 169])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      new_entries: args.new_entries,
      replace_all: args.replace_all,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
