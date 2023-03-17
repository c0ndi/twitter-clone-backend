import {uploadS3} from "../storage/uploadS3.js";
import {getS3ObjectUrl} from "../storage/getS3ObjectUrl.js";
import Post from "../../schemas/post.schema.js";

export async function addPostWithPhoto(res, author, title, content, file) {
   const {response, fileKey} = uploadS3(file);

   try {
      const s3Response = await response;

      if (s3Response.$metadata.httpStatusCode === 200) {
         const photo = getS3ObjectUrl(fileKey);

         const post = new Post({
            author,
            title,
            content,
            photo,
         })

         try {
            await post.save();

               res.status(200).json({isError: false, message: "Post created successfully"});
         } catch (err) {
            console.log(err)

            res.status(500).json({isError: true, message: "Cannot create post"});
         }
      }
   } catch (err) {
      res.status(500).json({isError: true, message: "Something went wrong with S3 upload"});
   }
}