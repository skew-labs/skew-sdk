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
exports.ExpiredAbandoned = exports.Disputed = exports.Settled = exports.Expired = exports.Active = exports.Funded = exports.Created = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class Created {
    constructor() {
        this.discriminator = 0;
        this.kind = "Created";
    }
    toJSON() {
        return {
            kind: "Created",
        };
    }
    toEncodable() {
        return {
            Created: {},
        };
    }
}
exports.Created = Created;
Created.discriminator = 0;
Created.kind = "Created";
class Funded {
    constructor() {
        this.discriminator = 1;
        this.kind = "Funded";
    }
    toJSON() {
        return {
            kind: "Funded",
        };
    }
    toEncodable() {
        return {
            Funded: {},
        };
    }
}
exports.Funded = Funded;
Funded.discriminator = 1;
Funded.kind = "Funded";
class Active {
    constructor() {
        this.discriminator = 2;
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
Active.discriminator = 2;
Active.kind = "Active";
class Expired {
    constructor() {
        this.discriminator = 3;
        this.kind = "Expired";
    }
    toJSON() {
        return {
            kind: "Expired",
        };
    }
    toEncodable() {
        return {
            Expired: {},
        };
    }
}
exports.Expired = Expired;
Expired.discriminator = 3;
Expired.kind = "Expired";
class Settled {
    constructor() {
        this.discriminator = 4;
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
Settled.discriminator = 4;
Settled.kind = "Settled";
class Disputed {
    constructor() {
        this.discriminator = 5;
        this.kind = "Disputed";
    }
    toJSON() {
        return {
            kind: "Disputed",
        };
    }
    toEncodable() {
        return {
            Disputed: {},
        };
    }
}
exports.Disputed = Disputed;
Disputed.discriminator = 5;
Disputed.kind = "Disputed";
class ExpiredAbandoned {
    constructor() {
        this.discriminator = 6;
        this.kind = "ExpiredAbandoned";
    }
    toJSON() {
        return {
            kind: "ExpiredAbandoned",
        };
    }
    toEncodable() {
        return {
            ExpiredAbandoned: {},
        };
    }
}
exports.ExpiredAbandoned = ExpiredAbandoned;
ExpiredAbandoned.discriminator = 6;
ExpiredAbandoned.kind = "ExpiredAbandoned";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Created" in obj) {
        return new Created();
    }
    if ("Funded" in obj) {
        return new Funded();
    }
    if ("Active" in obj) {
        return new Active();
    }
    if ("Expired" in obj) {
        return new Expired();
    }
    if ("Settled" in obj) {
        return new Settled();
    }
    if ("Disputed" in obj) {
        return new Disputed();
    }
    if ("ExpiredAbandoned" in obj) {
        return new ExpiredAbandoned();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "Created": {
            return new Created();
        }
        case "Funded": {
            return new Funded();
        }
        case "Active": {
            return new Active();
        }
        case "Expired": {
            return new Expired();
        }
        case "Settled": {
            return new Settled();
        }
        case "Disputed": {
            return new Disputed();
        }
        case "ExpiredAbandoned": {
            return new ExpiredAbandoned();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Created"),
        borsh.struct([], "Funded"),
        borsh.struct([], "Active"),
        borsh.struct([], "Expired"),
        borsh.struct([], "Settled"),
        borsh.struct([], "Disputed"),
        borsh.struct([], "ExpiredAbandoned"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=OptionState.js.map