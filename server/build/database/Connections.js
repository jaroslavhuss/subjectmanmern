"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    /**
     *   const dev_mode = process.env.DEV_MODE;
    if (dev_mode === "development") {
      const connectionResuls = await new Mongoose()
        .createConnection(process.env.DB_LOCAL)
        .asPromise();
      console.log("\x1b[42m", "Connecting to the local DB.");
      return connectionResuls.readyState;
    } else {
      const connectionResuls = await new Mongoose()
        .createConnection(process.env.DB_PRODUCTION)
        .asPromise();
      console.log("\x1b[41m", "Connecting to the production DB.");
      return connectionResuls.readyState;
    }
     */
    const dev_mode = process.env.DEV_MODE;
    if (dev_mode === "development") {
        yield mongoose_1.default.connect(process.env.DB_LOCAL).then((status) => {
            console.log("\x1b[42m", "Connected to the local DB.");
        });
    }
    else {
        yield mongoose_1.default.connect(process.env.DB_PRODUCTION).then((status) => {
            console.log("\x1b[41m", "Connected to the production DB.");
        });
    }
});
exports.connect = connect;
//# sourceMappingURL=Connections.js.map