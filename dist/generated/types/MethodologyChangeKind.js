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
exports.Other = exports.DexTwapFallback = exports.SsviSurface = exports.ConfidenceGate = exports.DivergenceGate = exports.OracleHierarchy = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class OracleHierarchy {
    constructor() {
        this.discriminator = 0;
        this.kind = "OracleHierarchy";
    }
    toJSON() {
        return {
            kind: "OracleHierarchy",
        };
    }
    toEncodable() {
        return {
            OracleHierarchy: {},
        };
    }
}
exports.OracleHierarchy = OracleHierarchy;
OracleHierarchy.discriminator = 0;
OracleHierarchy.kind = "OracleHierarchy";
class DivergenceGate {
    constructor() {
        this.discriminator = 1;
        this.kind = "DivergenceGate";
    }
    toJSON() {
        return {
            kind: "DivergenceGate",
        };
    }
    toEncodable() {
        return {
            DivergenceGate: {},
        };
    }
}
exports.DivergenceGate = DivergenceGate;
DivergenceGate.discriminator = 1;
DivergenceGate.kind = "DivergenceGate";
class ConfidenceGate {
    constructor() {
        this.discriminator = 2;
        this.kind = "ConfidenceGate";
    }
    toJSON() {
        return {
            kind: "ConfidenceGate",
        };
    }
    toEncodable() {
        return {
            ConfidenceGate: {},
        };
    }
}
exports.ConfidenceGate = ConfidenceGate;
ConfidenceGate.discriminator = 2;
ConfidenceGate.kind = "ConfidenceGate";
class SsviSurface {
    constructor() {
        this.discriminator = 3;
        this.kind = "SsviSurface";
    }
    toJSON() {
        return {
            kind: "SsviSurface",
        };
    }
    toEncodable() {
        return {
            SsviSurface: {},
        };
    }
}
exports.SsviSurface = SsviSurface;
SsviSurface.discriminator = 3;
SsviSurface.kind = "SsviSurface";
class DexTwapFallback {
    constructor() {
        this.discriminator = 4;
        this.kind = "DexTwapFallback";
    }
    toJSON() {
        return {
            kind: "DexTwapFallback",
        };
    }
    toEncodable() {
        return {
            DexTwapFallback: {},
        };
    }
}
exports.DexTwapFallback = DexTwapFallback;
DexTwapFallback.discriminator = 4;
DexTwapFallback.kind = "DexTwapFallback";
class Other {
    constructor() {
        this.discriminator = 5;
        this.kind = "Other";
    }
    toJSON() {
        return {
            kind: "Other",
        };
    }
    toEncodable() {
        return {
            Other: {},
        };
    }
}
exports.Other = Other;
Other.discriminator = 5;
Other.kind = "Other";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("OracleHierarchy" in obj) {
        return new OracleHierarchy();
    }
    if ("DivergenceGate" in obj) {
        return new DivergenceGate();
    }
    if ("ConfidenceGate" in obj) {
        return new ConfidenceGate();
    }
    if ("SsviSurface" in obj) {
        return new SsviSurface();
    }
    if ("DexTwapFallback" in obj) {
        return new DexTwapFallback();
    }
    if ("Other" in obj) {
        return new Other();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "OracleHierarchy": {
            return new OracleHierarchy();
        }
        case "DivergenceGate": {
            return new DivergenceGate();
        }
        case "ConfidenceGate": {
            return new ConfidenceGate();
        }
        case "SsviSurface": {
            return new SsviSurface();
        }
        case "DexTwapFallback": {
            return new DexTwapFallback();
        }
        case "Other": {
            return new Other();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "OracleHierarchy"),
        borsh.struct([], "DivergenceGate"),
        borsh.struct([], "ConfidenceGate"),
        borsh.struct([], "SsviSurface"),
        borsh.struct([], "DexTwapFallback"),
        borsh.struct([], "Other"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=MethodologyChangeKind.js.map