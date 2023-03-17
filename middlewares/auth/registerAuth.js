import User from "../../schemas/user.schema.js";

export const registerAuth = async (req, res, next) => {
   const {name, email} = req.body;

   const user = await User.find({ $or: [{email}, {name}] });

   if(user) {
      res.status(400).json({isError: true, message: "User already exists"});
   }

   next();
}