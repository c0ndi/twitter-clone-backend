export const isLogIn = (reqType) => (req, res, next) => {
   if (reqType === "no-auth") {
      if (!req.user) {
         return res.status(401).json({isError: true, message: "Unauthorized"});
      }
   } else {
      if (req.user) {
         return res.status(403).json({isError: true, message: "Already authorized"});
      }
   }

   next();
}