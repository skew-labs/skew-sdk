"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackHeldPosition = trackHeldPosition;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function trackHeldPosition(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.holder, isSigner: true, isWritable: true },
        { pubkey: accounts.cm, isSigner: false, isWritable: true },
        { pubkey: accounts.position_registry, isSigner: false, isWritable: true },
        { pubkey: accounts.option, isSigner: false, isWritable: false },
        { pubkey: accounts.option_token_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.holder_option_ata, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([147, 249, 102, 213, 147, 137, 129, 142]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=trackHeldPosition.js.map