import { WebSocketServer } from "ws";
import { JWT_SECRET } from "./config";
import jwt, { decode } from "jsonwebtoken"
const wss = new WebSocketServer({port:8080});

wss.on("connection", (socket, request)=>{
    const url = request.url;
    if(!url) return;

    const queryParams  = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get('token') || "";
    const decoded = jwt.verify(token, JWT_SECRET);

    if(!decoded || !decoded){
            socket.close();
            return;
    }
    socket.on("message", (message)=>{
        socket.send("pong")
    })
})