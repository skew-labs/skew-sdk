import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DowngradeTierArgs {
  target_rank: number
}

export interface DowngradeTierAccounts {
  cm: PublicKey
  authority: PublicKey
  lst_vault: PublicKey
}

export const layout = borsh.struct([borsh.u8("target_rank")])

export function downgradeTier(
  args: DowngradeTierArgs,
  accounts: DowngradeTierAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.cm, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: false },
    { pubkey: accounts.lst_vault, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([138, 196, 174, 218, 44, 100, 21, 108])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      target_rank: args.target_rank,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
