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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vechileSchema = exports.loginSchema = exports.userSchema = void 0;
const z = __importStar(require("zod"));
exports.userSchema = z.object({
    name: z.string().min(2, "name should be alteast 2 characters long"),
    email: z.string().email("Email is not valid"),
    password: z.string(),
});
exports.loginSchema = z.object({
    email: z.string().email("Email is not valid"),
    password: z.string(),
});
exports.vechileSchema = z.object({
    model: z.string(),
    total_miles_driven: z.string(),
    date_of_purchase: z.date(),
    type: z.string(),
    license_plate: z.string(),
    cost: z.string(),
    energy_consumption_per_hour: z.string(),
    owner: z.string()
});
