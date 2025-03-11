import express from "express";
const app = express();
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import {userInputSchema} from "@repo/common/types";

app.use(express.json());

app.post('/signup', (req, res)=>{
    const {username, password} = req.body;
    const typeCheck = userInputSchema.safeParse({username, password})
    if(!typeCheck.success){
        res.status(400).json({msg:"Incorrect inputs"});
        return;
    }
        res.json({msg: "success"});
        return;
    
    
})
app.post('/signin', (req, res)=>{
    const{username, password} = req.body;
    const userId  = 1;

    const token  = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({msg:token});
    return;
    
})
app.post('/room', (req, res)=>{

})

app.listen(3001);