import {Router} from "express";
import {body} from "express-validator";
import {handleValidator} from "../middlewares/handleValidator.js";
import {isAuthorized} from "../middlewares/auth/isAuthorized.js";
import {addPostWithPhoto} from "../utils/posts/addPostWithPhoto.js";
import {addPost} from "../utils/posts/addPost.js";
import Post from "../schemas/post.schema.js";
import User from '../schemas/user.schema.js';

const router = Router();

router.get("/", async (req, res) => {
   try {
      const posts = await Post.find({}, {}, {sort: {createdAt: -1}});

      res.status(200).json({isError: false, posts});
   } catch (err) {
      console.log(err)
      res.status(500).json({isError: true, message: "Cannot get posts"});
   }
})

router.post(
   '/',
   body("content").isString().isLength({min: 1, max: 250}).trim(),
   handleValidator,
   isAuthorized("no-auth"),
   async (req, res) => {
      const {title, content} = req.body;
      const authorId = req.user._id;

      try {
         const user = await User.findOne({_id: authorId});
         const authorName = user.name;

         if (req.files) {
            await addPostWithPhoto(res, authorId, authorName, content, req.files.photo);
            return;
         }

         await addPost(res, authorId, authorName, content);
      } catch (err) {
         console.log(err)

         res.status(500).json({isError: true, message: "Cannot create post"});
      }
   })
export default router;