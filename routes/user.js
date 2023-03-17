import {Router} from "express";
import User from "../schemas/user.schema.js";
import {isAuthorized} from "../middlewares/auth/isAuthorized.js";

const router = Router();

router.get(
   '/',
   isAuthorized("no-auth"),
   async (req, res) => {
      try {
         const user = await User.findById({_id: req.user._id});

         res.status(200).json({isError: false, message: "Users found", user});
      } catch (err) {
         res.status(500).json({isError: true, message: "Users not found"});
      }
   });

router.get(
   '/:id',
   isAuthorized("no-auth"),
   async (req, res) => {
      try {
         const user = await User.findOne({_id: req.params.id})

         res.status(200).json({isError: false, message: "User found", user});
      } catch (err) {
         res.status(500).json({isError: true, message: "Users not found"});
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

export default router;