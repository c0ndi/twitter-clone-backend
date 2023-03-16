import {Router} from "express";
import {body} from "express-validator";
import {handleValidator} from "../middlewares/handleValidator.js";
import Post from "../schemas/post.schema.js";
import {isAuthorized} from "../middlewares/auth/isAuthorized.js";
import {uploadS3Controller} from "../controllers/uploadS3.controller.js";
import {getS3ObjectUrl} from "../utils/storage/getS3ObjectUrl.js";
import {addPostWithPhoto} from "../utils/posts/addPostWithPhoto.js";
import {addPost} from "../utils/posts/addPost.js";

const router = Router();

router.get("/", async (req, res) => {
   try {
      const posts = await Post.find();

      res.status(200).json({isError: false, posts});
   } catch (err) {
      console.log(err)
      res.status(500).json({isError: true, message: "Something went wrong"});
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
      } else {
         await addPost(res, author, title, content);
      }
   })
export default router;