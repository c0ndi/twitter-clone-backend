export const isAuthorized = (reqType) => (req, res, next) => {
   if(reqType === "no-auth" && !req.user)
      return res.status(401).json({isError: true, message: "Unauthorized"});

   if(reqType !== "no-auth" && req.user)
      return res.status(403).json({isError: true, message: "Already authorized"});

   next();
}