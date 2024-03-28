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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const fs_1 = require("fs");
const region = "ap-southeast-2";
const s3Client = new client_s3_1.S3Client({
    region: region,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    },
});
function uploadFileToS3(file, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileContent = (0, fs_1.readFileSync)(file.path);
        const params = {
            Bucket: "pirooo",
            Key: `${fileName}`,
            Body: fileContent,
            ContentType: ["image/jpg", "image/png", "image/svg"],
        };
        const command = new client_s3_1.PutObjectCommand(params);
        try {
            const response = yield s3Client.send(command);
            console.log("File uploaded successfully:", response);
            return response;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
exports.uploadFileToS3 = uploadFileToS3;
