export function getS3ObjectUrl(fileKey) {
   if(fileKey) {
      return `https://${process.env.BUCKET}.s3.${process.env.REGION}.amazonaws.com/${fileKey}`
   } else throw new Error("No file name provided");
}