import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port:8080});

wss.on("connection", (soocket)=>{
    soocket.on("message", (message)=>{
        soocket.send("message recieved")
    })
})