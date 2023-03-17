import jwt from "jsonwebtoken";

export const decodeUser = (req, res, next) => {
   const {access_token} = req.cookies;

   if (access_token) {
      try {
         req.user = jwt.verify(access_token, process.env.TOKEN_SECRET);
      } catch {
      }
   }
   next();
}