import {Router} from "express";
import {body} from "express-validator";
import {handleValidator} from "../middlewares/handleValidator.js";
import {isAuthorized} from "../middlewares/auth/isAuthorized.js";
import {addPostWithPhoto} from "../utils/posts/addPostWithPhoto.js";
import {addPost} from "../utils/posts/addPost.js";
import Post from "../schemas/post.schema.js";

const router = Router();

router.get("/", async (req, res) => {
   try {
      const posts = await Post.find();

      res.status(200).json({isError: false, posts});
   } catch (err) {
      console.log(err)
      res.status(500).json({isError: true, message: "Cannot get posts"});
   }
})

router.get('/:id', (req, res) => {
})

router.post(
   '/',
   body("title").isString().isLength({min: 1, max: 50}).trim(),
   body("content").isString().isLength({min: 1, max: 250}).trim(),
   handleValidator,
   isAuthorized("no-auth"),
   async (req, res) => {
      const {title, content} = req.body;
      const author = req.user._id;

      if(req.files)  {
         await addPostWithPhoto(res, author, title, content, req.files.photo);
         return;
      }
      await addPost(res, author, title, content);
   })
export default router;