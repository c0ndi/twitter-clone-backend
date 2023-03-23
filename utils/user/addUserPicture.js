import {uploadS3} from "../storage/uploadS3.js";
import User from "../../schemas/user.schema.js";
import {getS3ObjectUrl} from "../storage/getS3ObjectUrl.js";

export async function addUserPicture(res, _id, file, photoType) {
   const {response, fileKey} = uploadS3(file);

   try {
      const s3Response = await response;
      const photo = getS3ObjectUrl(fileKey);

      if (s3Response.$metadata.httpStatusCode === 200) {
         const user = await User.findOneAndUpdate({_id}, photoType == "profilePicture" ? {profilePicture: photo} : {backgroundPicture: photo});

         await user.save();

         res.status(200).json({isError: false, message: `${photoType} photo saved`})
      }
   } catch (err) {
      res.status(500).json({isError: true, message: "Cannot save profile photo"})
   }
}