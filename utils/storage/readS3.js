import { ListObjectsV2Command, S3Client} from "@aws-sdk/client-s3";
import {config} from "dotenv";

config();

const s3Config = {
   region: process.env.REGION,
   credentials: {
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_ACCESS_KEY
   }
};

const client = new S3Client(s3Config);
export async function readS3() {
   const command = new ListObjectsV2Command({
      Bucket: process.env.BUCKET,
      MaxKeys: 999,
   })

   try {
      return client.send(command);
   } catch (err) {
      console.error(err);
   }
}