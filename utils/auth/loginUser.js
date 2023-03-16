import jwt from "jsonwebtoken";

const generateAccesstoken = (data) => {
   return jwt.sign(
      {
         ...data,
      },
      process.env.TOKEN_SECRET,
      {expiresIn: "1w"}
   );
};

export const loginUser = (res, user) => {
   const {name, email, _id} = user;

   const accessToken = generateAccesstoken({_id: user._id});
   const data = {
      _id: _id,
      name: name,
      email: email,
   };

   res.cookie("access_token", accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7,
   }).status(200).json({isError: false, data, accessToken});
};