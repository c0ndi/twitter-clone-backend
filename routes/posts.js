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

router.get("/:_id", async (req, res) => {
   const {_id} = req.params;

   try {
      const post = await Post.findOne({_id});

      res.status(200).json({isError: false, post});
   } catch (err) {
      console.log(err)

      res.status(500).json({isError: true, message: "Cannot get posts"});
   }
})

router.post(
   '/like/:id',
   isAuthorized("no-auth"),
   async (req, res) => {

   try {
      const postToLike = await Post.findOne({_id: req.params.id});

      if(postToLike.likes.includes(req.user._id)) {
         await Post.findOneAndUpdate({_id: req.params.id}, {$pull: {likes: req.user._id}});

         res.status(200).json({isError: false, message: "Post unliked"});
         return;
      }

      await Post.findOneAndUpdate({_id: req.params.id}, {$push: {likes: req.user._id}});

      res.status(200).json({isError: false, message: "Post liked"});
   } catch (err) {
      console.log(err)

      res.status(500).json({isError: true, message: "Cannot like post"});
   }
})

router.post(
   '/comment/:_id',
   isAuthorized("no-auth"),
   body("comment").isEmpty().isLength({min: 1, max: 125}),
   async (req, res) => {
      const {_id} = req.params;
      const {comment} = req.body;

      try {
         const user = await User.findOne({_id: req.user._id});
         await Post.findOneAndUpdate({_id}, {$push: {comments: {user, content: comment}}});

         res.status(200).json({isError: false, message: "Post commented", comment: {user, content: comment}});
      } catch (err) {
         console.log(err)

         res.status(500).json({isError: true, message: "Cannot comment"});
      }
   })

router.post(
   '/',
   isAuthorized("no-auth"),
   body("content").isString().isLength({min: 1, max: 2000}).trim(),
   handleValidator,
   async (req, res) => {
      const {content} = req.body;
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