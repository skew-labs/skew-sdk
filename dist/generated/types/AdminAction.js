"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdjustIccMatrix = exports.AddSettlementFallback = exports.UnpauseProtocol = exports.PauseProtocol = exports.ChangeMultisigThreshold = exports.RotateMultisigMember = exports.UpgradeProgram = exports.UpdateWithdrawalLimit = exports.UpdateParam = exports.DelistAsset = exports.ListAsset = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ListAsset {
    constructor(value) {
        this.discriminator = 0;
        this.kind = "ListAsset";
        this.value = {
            pythFeed: value.pythFeed,
            tier: value.tier,
            symbol: value.symbol,
            pMaxFloorBps: value.pMaxFloorBps,
            liqPremiumBps: value.liqPremiumBps,
        };
    }
    toJSON() {
        return {
            kind: "ListAsset",
            value: {
                pythFeed: this.value.pythFeed.toString(),
                tier: this.value.tier,
                symbol: this.value.symbol,
                pMaxFloorBps: this.value.pMaxFloorBps,
                liqPremiumBps: this.value.liqPremiumBps,
            },
        };
    }
    toEncodable() {
        return {
            ListAsset: {
                pyth_feed: this.value.pythFeed,
                tier: this.value.tier,
                symbol: this.value.symbol,
                p_max_floor_bps: this.value.pMaxFloorBps,
                liq_premium_bps: this.value.liqPremiumBps,
            },
        };
    }
}
exports.ListAsset = ListAsset;
ListAsset.discriminator = 0;
ListAsset.kind = "ListAsset";
class DelistAsset {
    constructor(value) {
        this.discriminator = 1;
        this.kind = "DelistAsset";
        this.value = {
            panelIdx: value.panelIdx,
        };
    }
    toJSON() {
        return {
            kind: "DelistAsset",
            value: {
                panelIdx: this.value.panelIdx,
            },
        };
    }
    toEncodable() {
        return {
            DelistAsset: {
                panel_idx: this.value.panelIdx,
            },
        };
    }
}
exports.DelistAsset = DelistAsset;
DelistAsset.discriminator = 1;
DelistAsset.kind = "DelistAsset";
class UpdateParam {
    constructor(value) {
        this.discriminator = 2;
        this.kind = "UpdateParam";
        this.value = {
            name: value.name,
            value: value.value,
        };
    }
    toJSON() {
        return {
            kind: "UpdateParam",
            value: {
                name: this.value.name.toJSON(),
                value: this.value.value.toString(),
            },
        };
    }
    toEncodable() {
        return {
            UpdateParam: {
                name: this.value.name.toEncodable(),
                value: this.value.value,
            },
        };
    }
}
exports.UpdateParam = UpdateParam;
UpdateParam.discriminator = 2;
UpdateParam.kind = "UpdateParam";
class UpdateWithdrawalLimit {
    constructor(value) {
        this.discriminator = 3;
        this.kind = "UpdateWithdrawalLimit";
        this.value = {
            newLimitBps: value.newLimitBps,
        };
    }
    toJSON() {
        return {
            kind: "UpdateWithdrawalLimit",
            value: {
                newLimitBps: this.value.newLimitBps,
            },
        };
    }
    toEncodable() {
        return {
            UpdateWithdrawalLimit: {
                new_limit_bps: this.value.newLimitBps,
            },
        };
    }
}
exports.UpdateWithdrawalLimit = UpdateWithdrawalLimit;
UpdateWithdrawalLimit.discriminator = 3;
UpdateWithdrawalLimit.kind = "UpdateWithdrawalLimit";
class UpgradeProgram {
    constructor(value) {
        this.discriminator = 4;
        this.kind = "UpgradeProgram";
        this.value = {
            newProgramId: value.newProgramId,
        };
    }
    toJSON() {
        return {
            kind: "UpgradeProgram",
            value: {
                newProgramId: this.value.newProgramId.toString(),
            },
        };
    }
    toEncodable() {
        return {
            UpgradeProgram: {
                new_program_id: this.value.newProgramId,
            },
        };
    }
}
exports.UpgradeProgram = UpgradeProgram;
UpgradeProgram.discriminator = 4;
UpgradeProgram.kind = "UpgradeProgram";
class RotateMultisigMember {
    constructor(value) {
        this.discriminator = 5;
        this.kind = "RotateMultisigMember";
        this.value = {
            old: value.old,
            new: value.new,
        };
    }
    toJSON() {
        return {
            kind: "RotateMultisigMember",
            value: {
                old: this.value.old.toString(),
                new: this.value.new.toString(),
            },
        };
    }
    toEncodable() {
        return {
            RotateMultisigMember: {
                old: this.value.old,
                new: this.value.new,
            },
        };
    }
}
exports.RotateMultisigMember = RotateMultisigMember;
RotateMultisigMember.discriminator = 5;
RotateMultisigMember.kind = "RotateMultisigMember";
class ChangeMultisigThreshold {
    constructor(value) {
        this.discriminator = 6;
        this.kind = "ChangeMultisigThreshold";
        this.value = {
            newThreshold: value.newThreshold,
        };
    }
    toJSON() {
        return {
            kind: "ChangeMultisigThreshold",
            value: {
                newThreshold: this.value.newThreshold,
            },
        };
    }
    toEncodable() {
        return {
            ChangeMultisigThreshold: {
                new_threshold: this.value.newThreshold,
            },
        };
    }
}
exports.ChangeMultisigThreshold = ChangeMultisigThreshold;
ChangeMultisigThreshold.discriminator = 6;
ChangeMultisigThreshold.kind = "ChangeMultisigThreshold";
class PauseProtocol {
    constructor() {
        this.discriminator = 7;
        this.kind = "PauseProtocol";
    }
    toJSON() {
        return {
            kind: "PauseProtocol",
        };
    }
    toEncodable() {
        return {
            PauseProtocol: {},
        };
    }
}
exports.PauseProtocol = PauseProtocol;
PauseProtocol.discriminator = 7;
PauseProtocol.kind = "PauseProtocol";
class UnpauseProtocol {
    constructor() {
        this.discriminator = 8;
        this.kind = "UnpauseProtocol";
    }
    toJSON() {
        return {
            kind: "UnpauseProtocol",
        };
    }
    toEncodable() {
        return {
            UnpauseProtocol: {},
        };
    }
}
exports.UnpauseProtocol = UnpauseProtocol;
UnpauseProtocol.discriminator = 8;
UnpauseProtocol.kind = "UnpauseProtocol";
class AddSettlementFallback {
    constructor(value) {
        this.discriminator = 9;
        this.kind = "AddSettlementFallback";
        this.value = {
            panelIdx: value.panelIdx,
            dexVenue: value.dexVenue,
        };
    }
    toJSON() {
        return {
            kind: "AddSettlementFallback",
            value: {
                panelIdx: this.value.panelIdx,
                dexVenue: this.value.dexVenue.toString(),
            },
        };
    }
    toEncodable() {
        return {
            AddSettlementFallback: {
                panel_idx: this.value.panelIdx,
                dex_venue: this.value.dexVenue,
            },
        };
    }
}
exports.AddSettlementFallback = AddSettlementFallback;
AddSettlementFallback.discriminator = 9;
AddSettlementFallback.kind = "AddSettlementFallback";
class AdjustIccMatrix {
    constructor(value) {
        this.discriminator = 10;
        this.kind = "AdjustIccMatrix";
        this.value = {
            pairIdx: value.pairIdx,
            newRhoP5Micro: value.newRhoP5Micro,
        };
    }
    toJSON() {
        return {
            kind: "AdjustIccMatrix",
            value: {
                pairIdx: this.value.pairIdx,
                newRhoP5Micro: this.value.newRhoP5Micro,
            },
        };
    }
    toEncodable() {
        return {
            AdjustIccMatrix: {
                pair_idx: this.value.pairIdx,
                new_rho_p5_micro: this.value.newRhoP5Micro,
            },
        };
    }
}
exports.AdjustIccMatrix = AdjustIccMatrix;
AdjustIccMatrix.discriminator = 10;
AdjustIccMatrix.kind = "AdjustIccMatrix";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("ListAsset" in obj) {
        const val = obj["ListAsset"];
        return new ListAsset({
            pythFeed: val["pyth_feed"],
            tier: val["tier"],
            symbol: val["symbol"],
            pMaxFloorBps: val["p_max_floor_bps"],
            liqPremiumBps: val["liq_premium_bps"],
        });
    }
    if ("DelistAsset" in obj) {
        const val = obj["DelistAsset"];
        return new DelistAsset({
            panelIdx: val["panel_idx"],
        });
    }
    if ("UpdateParam" in obj) {
        const val = obj["UpdateParam"];
        return new UpdateParam({
            name: types.ParamName.fromDecoded(val["name"]),
            value: val["value"],
        });
    }
    if ("UpdateWithdrawalLimit" in obj) {
        const val = obj["UpdateWithdrawalLimit"];
        return new UpdateWithdrawalLimit({
            newLimitBps: val["new_limit_bps"],
        });
    }
    if ("UpgradeProgram" in obj) {
        const val = obj["UpgradeProgram"];
        return new UpgradeProgram({
            newProgramId: val["new_program_id"],
        });
    }
    if ("RotateMultisigMember" in obj) {
        const val = obj["RotateMultisigMember"];
        return new RotateMultisigMember({
            old: val["old"],
            new: val["new"],
        });
    }
    if ("ChangeMultisigThreshold" in obj) {
        const val = obj["ChangeMultisigThreshold"];
        return new ChangeMultisigThreshold({
            newThreshold: val["new_threshold"],
        });
    }
    if ("PauseProtocol" in obj) {
        return new PauseProtocol();
    }
    if ("UnpauseProtocol" in obj) {
        return new UnpauseProtocol();
    }
    if ("AddSettlementFallback" in obj) {
        const val = obj["AddSettlementFallback"];
        return new AddSettlementFallback({
            panelIdx: val["panel_idx"],
            dexVenue: val["dex_venue"],
        });
    }
    if ("AdjustIccMatrix" in obj) {
        const val = obj["AdjustIccMatrix"];
        return new AdjustIccMatrix({
            pairIdx: val["pair_idx"],
            newRhoP5Micro: val["new_rho_p5_micro"],
        });
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "ListAsset": {
            return new ListAsset({
                pythFeed: new web3_js_1.PublicKey(obj.value.pythFeed),
                tier: obj.value.tier,
                symbol: obj.value.symbol,
                pMaxFloorBps: obj.value.pMaxFloorBps,
                liqPremiumBps: obj.value.liqPremiumBps,
            });
        }
        case "DelistAsset": {
            return new DelistAsset({
                panelIdx: obj.value.panelIdx,
            });
        }
        case "UpdateParam": {
            return new UpdateParam({
                name: types.ParamName.fromJSON(obj.value.name),
                value: new bn_js_1.default(obj.value.value),
            });
        }
        case "UpdateWithdrawalLimit": {
            return new UpdateWithdrawalLimit({
                newLimitBps: obj.value.newLimitBps,
            });
        }
        case "UpgradeProgram": {
            return new UpgradeProgram({
                newProgramId: new web3_js_1.PublicKey(obj.value.newProgramId),
            });
        }
        case "RotateMultisigMember": {
            return new RotateMultisigMember({
                old: new web3_js_1.PublicKey(obj.value.old),
                new: new web3_js_1.PublicKey(obj.value.new),
            });
        }
        case "ChangeMultisigThreshold": {
            return new ChangeMultisigThreshold({
                newThreshold: obj.value.newThreshold,
            });
        }
        case "PauseProtocol": {
            return new PauseProtocol();
        }
        case "UnpauseProtocol": {
            return new UnpauseProtocol();
        }
        case "AddSettlementFallback": {
            return new AddSettlementFallback({
                panelIdx: obj.value.panelIdx,
                dexVenue: new web3_js_1.PublicKey(obj.value.dexVenue),
            });
        }
        case "AdjustIccMatrix": {
            return new AdjustIccMatrix({
                pairIdx: obj.value.pairIdx,
                newRhoP5Micro: obj.value.newRhoP5Micro,
            });
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([
            borsh.publicKey("pyth_feed"),
            borsh.u8("tier"),
            borsh.array(borsh.u8(), 6, "symbol"),
            borsh.u16("p_max_floor_bps"),
            borsh.u16("liq_premium_bps"),
        ], "ListAsset"),
        borsh.struct([borsh.u8("panel_idx")], "DelistAsset"),
        borsh.struct([types.ParamName.layout("name"), borsh.u64("value")], "UpdateParam"),
        borsh.struct([borsh.u16("new_limit_bps")], "UpdateWithdrawalLimit"),
        borsh.struct([borsh.publicKey("new_program_id")], "UpgradeProgram"),
        borsh.struct([borsh.publicKey("old"), borsh.publicKey("new")], "RotateMultisigMember"),
        borsh.struct([borsh.u8("new_threshold")], "ChangeMultisigThreshold"),
        borsh.struct([], "PauseProtocol"),
        borsh.struct([], "UnpauseProtocol"),
        borsh.struct([borsh.u8("panel_idx"), borsh.publicKey("dex_venue")], "AddSettlementFallback"),
        borsh.struct([borsh.u8("pair_idx"), borsh.u32("new_rho_p5_micro")], "AdjustIccMatrix"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=AdminAction.js.map