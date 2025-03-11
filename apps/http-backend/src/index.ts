import express from "express";
const app = express();
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
app.post('/signup', (req, res)=>{
    const {username, password} = req.body;
    
})
app.post('/signin', (req, res)=>{
    const{username, password} = req.body;
    const userId  = 1;

    const token  = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({msg:token});
    
})
app.post('/room', (req, res)=>{

})

app.listen(3001);