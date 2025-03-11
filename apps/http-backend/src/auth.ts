import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt, { JwtPayload } from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    let { authorization } = req.headers;
    
    authorization = authorization?.split(' ')[1];
    if(!authorization) return res.json({msg: "UNAUTHORIZED"});
    
    const decoded = jwt.verify(authorization, JWT_SECRET);

    // @ts-ignore 
    req.userId=(decoded as JwtPayload).userId ; 
    next();


  } catch (e) {
   return res.status(403).json({msg: "UNAUTHORIZED"});
  }
};
