import {Router} from "express";
import {isAuthorized} from "../middlewares/auth/isAuthorized.js";
import {body} from "express-validator";
import {registerAuth} from "../middlewares/auth/registerAuth.js";
import {handleValidator} from "../middlewares/handleValidator.js";
import bcrypt, {compare} from "bcrypt";
import User from "../schemas/user.schema.js";
import {loginUser} from "../utils/auth/loginUser.js";

const router = Router();

router.post(
   '/register',
   isAuthorized("auth"),
   body("email").isEmail(),
   body("name").isString().isLength({min: 5, max: 20}),
   body("password").isString().isLength({min: 6}).matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
   registerAuth,
   handleValidator,
   async (req, res) => {
      const {name, email, password} = req.body;

      const passwordHash = await bcrypt.hash(password, 10);

      const user = new User({
         name,
         email,
         password: passwordHash,
      })

      try {
         await user.save();

         res.status(200).json({isError: false, message: "User created successfully"});
      } catch (err) {
         console.error(err);
         res.status(500).json({isError: true, message: "Something went wrong"});
      }
   })

router.post(
   '/login',
   isAuthorized("auth"),
   body("email").isEmail(),
   handleValidator,
   async (req, res) => {
      const {email, password} = req.body;

      const user = await User.findOne({email});

      if (!user) {
         return res.status(403).json({isError: true, message: "User does not exist"});
      }

      const isPassCorrect = await compare(password, user.password);
      if (!isPassCorrect) {
         return res.status(403).json({isError: true, message: "Incorrect password"});
      }

      loginUser(res, user);
   })

export default router;
