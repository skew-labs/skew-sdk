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
exports.Settled = exports.Cancelled = exports.Active = exports.Open = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class Open {
    constructor() {
        this.discriminator = 0;
        this.kind = "Open";
    }
    toJSON() {
        return {
            kind: "Open",
        };
    }
    toEncodable() {
        return {
            Open: {},
        };
    }
}
exports.Open = Open;
Open.discriminator = 0;
Open.kind = "Open";
class Active {
    constructor() {
        this.discriminator = 1;
        this.kind = "Active";
    }
    toJSON() {
        return {
            kind: "Active",
        };
    }
    toEncodable() {
        return {
            Active: {},
        };
    }
}
exports.Active = Active;
Active.discriminator = 1;
Active.kind = "Active";
class Cancelled {
    constructor() {
        this.discriminator = 2;
        this.kind = "Cancelled";
    }
    toJSON() {
        return {
            kind: "Cancelled",
        };
    }
    toEncodable() {
        return {
            Cancelled: {},
        };
    }
}
exports.Cancelled = Cancelled;
Cancelled.discriminator = 2;
Cancelled.kind = "Cancelled";
class Settled {
    constructor() {
        this.discriminator = 3;
        this.kind = "Settled";
    }
    toJSON() {
        return {
            kind: "Settled",
        };
    }
    toEncodable() {
        return {
            Settled: {},
        };
    }
}
exports.Settled = Settled;
Settled.discriminator = 3;
Settled.kind = "Settled";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Open" in obj) {
        return new Open();
    }
    if ("Active" in obj) {
        return new Active();
    }
    if ("Cancelled" in obj) {
        return new Cancelled();
    }
    if ("Settled" in obj) {
        return new Settled();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "Open": {
            return new Open();
        }
        case "Active": {
            return new Active();
        }
        case "Cancelled": {
            return new Cancelled();
        }
        case "Settled": {
            return new Settled();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Open"),
        borsh.struct([], "Active"),
        borsh.struct([], "Cancelled"),
        borsh.struct([], "Settled"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=ComboStatus.js.map