import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RecoveryDeterminationOpArgs {
  op: types.RecoveryDeterminationOpKindKind
  determination_id: BN
}

export interface RecoveryDeterminationOpAccounts {
  determination: PublicKey
  signer: PublicKey
  system_program: PublicKey
}

export const layout = borsh.struct([
  types.RecoveryDeterminationOpKind.layout("op"),
  borsh.u64("determination_id"),
])

export function recoveryDeterminationOp(
  args: RecoveryDeterminationOpArgs,
  accounts: RecoveryDeterminationOpAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.determination, isSigner: false, isWritable: true },
    { pubkey: accounts.signer, isSigner: true, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([114, 45, 141, 242, 232, 183, 54, 74])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      op: args.op.toEncodable(),
      determination_id: args.determination_id,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
