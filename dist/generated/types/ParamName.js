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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PythStaleHaltSlots = exports.PythFreshnessSlots = exports.OracleConfidenceBps = exports.RfqTakerFeeBps = exports.PremiumFeeBps = exports.IfTargetBps = exports.IfFloorMicroUsdc = exports.ConcentrationCapBps = exports.AssetLiqPremiumBps = exports.AssetImShockBps = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class AssetImShockBps {
    constructor() {
        this.discriminator = 0;
        this.kind = "AssetImShockBps";
    }
    toJSON() {
        return {
            kind: "AssetImShockBps",
        };
    }
    toEncodable() {
        return {
            AssetImShockBps: {},
        };
    }
}
exports.AssetImShockBps = AssetImShockBps;
AssetImShockBps.discriminator = 0;
AssetImShockBps.kind = "AssetImShockBps";
class AssetLiqPremiumBps {
    constructor() {
        this.discriminator = 1;
        this.kind = "AssetLiqPremiumBps";
    }
    toJSON() {
        return {
            kind: "AssetLiqPremiumBps",
        };
    }
    toEncodable() {
        return {
            AssetLiqPremiumBps: {},
        };
    }
}
exports.AssetLiqPremiumBps = AssetLiqPremiumBps;
AssetLiqPremiumBps.discriminator = 1;
AssetLiqPremiumBps.kind = "AssetLiqPremiumBps";
class ConcentrationCapBps {
    constructor() {
        this.discriminator = 2;
        this.kind = "ConcentrationCapBps";
    }
    toJSON() {
        return {
            kind: "ConcentrationCapBps",
        };
    }
    toEncodable() {
        return {
            ConcentrationCapBps: {},
        };
    }
}
exports.ConcentrationCapBps = ConcentrationCapBps;
ConcentrationCapBps.discriminator = 2;
ConcentrationCapBps.kind = "ConcentrationCapBps";
class IfFloorMicroUsdc {
    constructor() {
        this.discriminator = 3;
        this.kind = "IfFloorMicroUsdc";
    }
    toJSON() {
        return {
            kind: "IfFloorMicroUsdc",
        };
    }
    toEncodable() {
        return {
            IfFloorMicroUsdc: {},
        };
    }
}
exports.IfFloorMicroUsdc = IfFloorMicroUsdc;
IfFloorMicroUsdc.discriminator = 3;
IfFloorMicroUsdc.kind = "IfFloorMicroUsdc";
class IfTargetBps {
    constructor() {
        this.discriminator = 4;
        this.kind = "IfTargetBps";
    }
    toJSON() {
        return {
            kind: "IfTargetBps",
        };
    }
    toEncodable() {
        return {
            IfTargetBps: {},
        };
    }
}
exports.IfTargetBps = IfTargetBps;
IfTargetBps.discriminator = 4;
IfTargetBps.kind = "IfTargetBps";
class PremiumFeeBps {
    constructor() {
        this.discriminator = 5;
        this.kind = "PremiumFeeBps";
    }
    toJSON() {
        return {
            kind: "PremiumFeeBps",
        };
    }
    toEncodable() {
        return {
            PremiumFeeBps: {},
        };
    }
}
exports.PremiumFeeBps = PremiumFeeBps;
PremiumFeeBps.discriminator = 5;
PremiumFeeBps.kind = "PremiumFeeBps";
class RfqTakerFeeBps {
    constructor() {
        this.discriminator = 6;
        this.kind = "RfqTakerFeeBps";
    }
    toJSON() {
        return {
            kind: "RfqTakerFeeBps",
        };
    }
    toEncodable() {
        return {
            RfqTakerFeeBps: {},
        };
    }
}
exports.RfqTakerFeeBps = RfqTakerFeeBps;
RfqTakerFeeBps.discriminator = 6;
RfqTakerFeeBps.kind = "RfqTakerFeeBps";
class OracleConfidenceBps {
    constructor() {
        this.discriminator = 7;
        this.kind = "OracleConfidenceBps";
    }
    toJSON() {
        return {
            kind: "OracleConfidenceBps",
        };
    }
    toEncodable() {
        return {
            OracleConfidenceBps: {},
        };
    }
}
exports.OracleConfidenceBps = OracleConfidenceBps;
OracleConfidenceBps.discriminator = 7;
OracleConfidenceBps.kind = "OracleConfidenceBps";
class PythFreshnessSlots {
    constructor() {
        this.discriminator = 8;
        this.kind = "PythFreshnessSlots";
    }
    toJSON() {
        return {
            kind: "PythFreshnessSlots",
        };
    }
    toEncodable() {
        return {
            PythFreshnessSlots: {},
        };
    }
}
exports.PythFreshnessSlots = PythFreshnessSlots;
PythFreshnessSlots.discriminator = 8;
PythFreshnessSlots.kind = "PythFreshnessSlots";
class PythStaleHaltSlots {
    constructor() {
        this.discriminator = 9;
        this.kind = "PythStaleHaltSlots";
    }
    toJSON() {
        return {
            kind: "PythStaleHaltSlots",
        };
    }
    toEncodable() {
        return {
            PythStaleHaltSlots: {},
        };
    }
}
exports.PythStaleHaltSlots = PythStaleHaltSlots;
PythStaleHaltSlots.discriminator = 9;
PythStaleHaltSlots.kind = "PythStaleHaltSlots";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("AssetImShockBps" in obj) {
        return new AssetImShockBps();
    }
    if ("AssetLiqPremiumBps" in obj) {
        return new AssetLiqPremiumBps();
    }
    if ("ConcentrationCapBps" in obj) {
        return new ConcentrationCapBps();
    }
    if ("IfFloorMicroUsdc" in obj) {
        return new IfFloorMicroUsdc();
    }
    if ("IfTargetBps" in obj) {
        return new IfTargetBps();
    }
    if ("PremiumFeeBps" in obj) {
        return new PremiumFeeBps();
    }
    if ("RfqTakerFeeBps" in obj) {
        return new RfqTakerFeeBps();
    }
    if ("OracleConfidenceBps" in obj) {
        return new OracleConfidenceBps();
    }
    if ("PythFreshnessSlots" in obj) {
        return new PythFreshnessSlots();
    }
    if ("PythStaleHaltSlots" in obj) {
        return new PythStaleHaltSlots();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "AssetImShockBps": {
            return new AssetImShockBps();
        }
        case "AssetLiqPremiumBps": {
            return new AssetLiqPremiumBps();
        }
        case "ConcentrationCapBps": {
            return new ConcentrationCapBps();
        }
        case "IfFloorMicroUsdc": {
            return new IfFloorMicroUsdc();
        }
        case "IfTargetBps": {
            return new IfTargetBps();
        }
        case "PremiumFeeBps": {
            return new PremiumFeeBps();
        }
        case "RfqTakerFeeBps": {
            return new RfqTakerFeeBps();
        }
        case "OracleConfidenceBps": {
            return new OracleConfidenceBps();
        }
        case "PythFreshnessSlots": {
            return new PythFreshnessSlots();
        }
        case "PythStaleHaltSlots": {
            return new PythStaleHaltSlots();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "AssetImShockBps"),
        borsh.struct([], "AssetLiqPremiumBps"),
        borsh.struct([], "ConcentrationCapBps"),
        borsh.struct([], "IfFloorMicroUsdc"),
        borsh.struct([], "IfTargetBps"),
        borsh.struct([], "PremiumFeeBps"),
        borsh.struct([], "RfqTakerFeeBps"),
        borsh.struct([], "OracleConfidenceBps"),
        borsh.struct([], "PythFreshnessSlots"),
        borsh.struct([], "PythStaleHaltSlots"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=ParamName.js.map