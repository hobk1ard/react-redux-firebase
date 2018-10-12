switch (process.env.NODE_ENV) {
    case "production":
        module.exports = require("./prod");
        break;
    case "test":
        module.exports = require("./testConfig");
        break;
    default:
        module.exports = require("./dev");
        break;
}