import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdatePovsStateArgs {
  asset: number
  sigma_t_micro: BN
  sigma_inf_micro: BN
  theta_d_micro: BN
  vrp_rel_micro: BN
  iv_micro: BN
  p_max_micro: BN
  xi_micro: BN
  beta_micro: BN
  var_99_micro: BN
  es_999_micro: BN
  regime_indicator_micro: BN
}

export interface UpdatePovsStateAccounts {
  authority: PublicKey
  povs_state: PublicKey
  system_program: PublicKey
}

export const layout = borsh.struct([
  borsh.u8("asset"),
  borsh.u64("sigma_t_micro"),
  borsh.u64("sigma_inf_micro"),
  borsh.u64("theta_d_micro"),
  borsh.i64("vrp_rel_micro"),
  borsh.u64("iv_micro"),
  borsh.u64("p_max_micro"),
  borsh.i64("xi_micro"),
  borsh.u64("beta_micro"),
  borsh.u64("var_99_micro"),
  borsh.u64("es_999_micro"),
  borsh.u64("regime_indicator_micro"),
])

export function updatePovsState(
  args: UpdatePovsStateArgs,
  accounts: UpdatePovsStateAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.povs_state, isSigner: false, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([116, 243, 125, 164, 58, 174, 32, 217])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      asset: args.asset,
      sigma_t_micro: args.sigma_t_micro,
      sigma_inf_micro: args.sigma_inf_micro,
      theta_d_micro: args.theta_d_micro,
      vrp_rel_micro: args.vrp_rel_micro,
      iv_micro: args.iv_micro,
      p_max_micro: args.p_max_micro,
      xi_micro: args.xi_micro,
      beta_micro: args.beta_micro,
      var_99_micro: args.var_99_micro,
      es_999_micro: args.es_999_micro,
      regime_indicator_micro: args.regime_indicator_micro,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
