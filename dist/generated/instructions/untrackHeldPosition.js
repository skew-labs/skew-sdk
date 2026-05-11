"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.untrackHeldPosition = untrackHeldPosition;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function untrackHeldPosition(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.holder, isSigner: true, isWritable: true },
        { pubkey: accounts.cm, isSigner: false, isWritable: true },
        { pubkey: accounts.position_registry, isSigner: false, isWritable: true },
        { pubkey: accounts.option, isSigner: false, isWritable: false },
        { pubkey: accounts.option_token_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.holder_option_ata, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([172, 103, 144, 42, 49, 78, 139, 211]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=untrackHeldPosition.js.map