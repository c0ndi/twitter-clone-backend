import {model, Schema} from "mongoose";

const Post = new Schema({
   authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   author: {
      type: Object,
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
      type: Array,
      default: [],
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