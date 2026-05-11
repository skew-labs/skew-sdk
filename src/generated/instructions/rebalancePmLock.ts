import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RebalancePmLockArgs {
  max_release_amount: BN
}

export interface RebalancePmLockAccounts {
  caller: PublicKey
  cm: PublicKey
  position_registry: PublicKey
  option: PublicKey
  settlement_mint: PublicKey
  option_escrow: PublicKey
  cm_escrow: PublicKey
  option_collateral_lock: PublicKey
  token_program: PublicKey
}

export const layout = borsh.struct([borsh.u64("max_release_amount")])

export function rebalancePmLock(
  args: RebalancePmLockArgs,
  accounts: RebalancePmLockAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.caller, isSigner: true, isWritable: false },
    { pubkey: accounts.cm, isSigner: false, isWritable: true },
    { pubkey: accounts.position_registry, isSigner: false, isWritable: true },
    { pubkey: accounts.option, isSigner: false, isWritable: true },
    { pubkey: accounts.settlement_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.option_escrow, isSigner: false, isWritable: true },
    { pubkey: accounts.cm_escrow, isSigner: false, isWritable: true },
    {
      pubkey: accounts.option_collateral_lock,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([30, 56, 16, 82, 103, 140, 57, 12])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      max_release_amount: args.max_release_amount,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
