import User from "../../schemas/user.schema.js";

export const registerAuth = async (req, res, next) => {
   const {name, email} = req.body;

   const user = await User.find({ $or: [{email}, {name}] });

   if(user.length > 0) {
      return res.status(409).json({isError: true, message: "User already exists"});
   }

   next();
}