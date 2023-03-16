import {config} from "dotenv";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";

config();

const s3Config = {
   region: process.env.REGION,
   credentials: {
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_ACCESS_KEY
   }
};

const client = new S3Client(s3Config);

export function uploadS3Controller(file) {
   if (file) {
      const {name, data} = file;

      const Key = Date.now() + "-" + name;

      const command = new PutObjectCommand({
         Bucket: process.env.BUCKET,
         Key,
         Body: data,
      });

      return {
         response: client.send(command),
         fileKey: Key,
      };
   } else {
      throw new Error("No file provided")
   }
}