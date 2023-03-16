import User from "../../schemas/user.schema.js";

export const registerAuth = async (req, res, next) => {
   const {name, email} = req.body;

   const userEmail = await User.findOne({email});
   const userName = await User.findOne({name});

   if (userEmail) {
      res.status(400).json({isError: true, message: "User already exists"});
   } else if (userName) {
      res.status(400).json({isError: true, message: "Username is already taken"});
   } else {
      next();
   }
}