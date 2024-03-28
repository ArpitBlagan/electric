import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync } from "fs";
const region = "ap-southeast-2";
const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY as string,
  },
});
export async function uploadFileToS3(file: any, fileName: any) {
  const fileContent = readFileSync(file.path);
  const params = {
    Bucket: "pirooo",
    Key: `${fileName}`,
    Body: fileContent,
    ContentType: ["image/jpg", "image/png", "image/svg"],
  };

  const command = new PutObjectCommand(params as any);
  try {
    const response = await s3Client.send(command);
    console.log("File uploaded successfully:", response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
