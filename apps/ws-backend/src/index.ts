

import { WebSocketServer, WebSocket } from "ws";
import jwt, { JwtHeader, JwtPayload } from "jsonwebtoken"
import {JWT_SECRET} from "@repo/backend-common/config"
import { Prisma } from "@repo/db/prisma";
const wss = new WebSocketServer({port:8080});

const checkUser = (token: string): string | null=>{
    try {
        const decode = jwt.verify(token, JWT_SECRET ) as JwtPayload;
        if(typeof decode === "string"){
            return null;
        }

        if(!decode || !decode.id){
            return null;
        }

        return decode.id; // since I did jwt.sign({id: user.id }, JWT_SECRET);

    } catch (error) {
        return null;
    }
}

// Globals "users" variable of type "User" to  store the state
interface User{
    socket: WebSocket,
    userId: string, 
    rooms: string[]                        // ["1wd2a3","w32","387jh"]
}

const users: User[] = []

wss.on("connection", (socket:WebSocket, req)=>{
    const url = req.url;


    const queryParams = new URLSearchParams(url?.split("?")[1])
    const tokenFromQueryParameter = queryParams.get("token");

    if(!tokenFromQueryParameter){ socket.close();return};
    /// u see if the user is autherticated

    // check user returns a userID or null
    const userId = checkUser(tokenFromQueryParameter)   ;
    
    if(userId === null){
        socket.close();
        return;
    }
    
    // We allow users to join multiple rooms && send datas to multiple rooms.

    // websocket server is a stateful server 
    // all the meta data is to be stored in the in-memory global variables, not in database
    //       2options -> global varibale or redux<complicates code>
    users.push({
        socket,
        userId,
        rooms:[],

    })

    socket.on("message", async(message: string|Buffer)=>{
        try {
            const data = JSON.parse(message.toString());
            /*   data loooks like
                    {
                        type  : 'join_room',
                        roomId: 23
                    }
            */
        //    In Backpack you send subscribe and unsubscribe when u switch to 
            if(data.type === 'join_room'){
                const user  = users.find(u=> u.socket === socket);
                if(!user) return;
                user.rooms.push(data.roomId)
            }
            else if(data.type === 'leave_room'){
                const user  = users.find(u=> u.socket === socket);
                if(!user) return;
                user.rooms = user.rooms.filter(room => room !== data.roomId)

            }

            else if(data.type === 'chat'){
                const roomId = data.roomId;
                const msg  = data.msg;

                await Prisma.chat.create({
                    data:{
                        mesage:msg,
                        userId,
                        roomId
                    }
                })
                users.forEach(user => {
                    if(user.rooms.includes(roomId) ){
                        user.socket.send(JSON.stringify({
                            type:"chat",
                            message: msg,
                            roomId
                        }))
                    }
                });
            }
        } catch (e) {
            
        }
    })

})

