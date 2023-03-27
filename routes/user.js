import {Router} from "express";
import User from "../schemas/user.schema.js";
import {isAuthorized} from "../middlewares/auth/isAuthorized.js";
import { addUserPicture} from "../utils/user/addUserPicture.js";
import Post from "../schemas/post.schema.js";

const router = Router();

router.get(
   '/',
   isAuthorized("no-auth"),
   async (req, res) => {
      try {
         const user = await User.findOne({_id: req.user._id});

         res.status(200).json({isError: false, message: "Users found", user});
      } catch (err) {
         res.status(500).json({isError: true, message: "User not found"});
      }
   });

router.delete(
   "/logout",
   isAuthorized("no-auth"),
   (req, res) => {

   res.clearCookie("access_token");
   res.status(200).json({ isError: false, message: "Successfully logged out" });
});

router.post(
   '/picture',
   isAuthorized("no-auth"),
   async (req, res) => {
      const {type} = req.body;
      const { _id } = req.user;

      try {
         if(req.files)
            await addUserPicture(res, _id, req.files.photo, type)
      } catch (err) {
         console.log(err)

         res.status(500).json({isError: true, message: "Cannot save a photo"})
      }
   })

router.get('/all', async (req, res) => {
   try {
      const users = await User.find();

      res.status(200).json({isError: false, message: "Users found", users});
   } catch (err) {
      res.status(500).json({isError: true, message: "Users not found"});
   }
});


router.get(
   '/posts',
   isAuthorized("no-auth"),
   async (req, res) => {

   try {
      const posts = await Post.find({authorId: req.user._id});

      res.status(200).json({isError: false, message: "User posts found", posts});
   } catch (err) {
      console.log(err)

      res.status(500).json({isError: true, message: "Cannot get user posts"})
   }
})

export default router;