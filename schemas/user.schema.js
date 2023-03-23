import {model, Schema} from "mongoose";

const UserSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   profilePicture: {
      type: String,
   },
   backgroundPicture: {
      type: String,
   }
})

export default model('User', UserSchema);