import {model, Schema} from "mongoose";

const Post = new Schema({
   author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   title: {
      type: String,
      required: true,
   },
   content: {
      type: String,
      required: true,
      maxLength: 250,
   },
   photo: {
      type: String,
   },
   likes: {
      type: Number,
      default: 0,
   },
   comments: {
      type: Array,
      default: [],
   },
   createdAt: {
      type: Date,
      default: Date.now,
   }
});

export default model('Post', Post);