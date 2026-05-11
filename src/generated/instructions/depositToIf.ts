import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DepositToIfArgs {
  tier: types.IfTierKind
  amount: BN
  is_sitg: boolean
}

export interface DepositToIfAccounts {
  insurance_fund: PublicKey
  depositor: PublicKey
  contributing_cm: PublicKey
  usdc_mint: PublicKey
  collateral_policy: PublicKey
  depositor_ata: PublicKey
  if_escrow: PublicKey
  token_program: PublicKey
}

export const layout = borsh.struct([
  types.IfTier.layout("tier"),
  borsh.u64("amount"),
  borsh.bool("is_sitg"),
])

export function depositToIf(
  args: DepositToIfArgs,
  accounts: DepositToIfAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.insurance_fund, isSigner: false, isWritable: true },
    { pubkey: accounts.depositor, isSigner: true, isWritable: true },
    { pubkey: accounts.contributing_cm, isSigner: false, isWritable: true },
    { pubkey: accounts.usdc_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.depositor_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.if_escrow, isSigner: false, isWritable: true },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([230, 47, 165, 234, 226, 182, 13, 28])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      tier: args.tier.toEncodable(),
      amount: args.amount,
      is_sitg: args.is_sitg,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
