import { createContext, useState,useEffect } from "react";
import { useContext } from "react";
import { useAuthContext } from "./authContext";
import io from "socket.io-client"

export const SocketContext=createContext()

export const  useSocketContext=()=>{
    return useContext(SocketContext)
}

export const SocketContextProvider=({children})=>{
    const [socket,setSocket]=useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
    const {authUser}=useAuthContext()
    const API_URI = import.meta.env.VITE_API_URI;


    useEffect(()=>{
        console.log("authUser:", authUser);

        if(authUser){
            const socket=io(API_URI,{
                auth:{
                    userId:authUser.id
                }
            }
            )
            setSocket(socket)
            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users)
            })

            return ()=>socket.close()
        }else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    },[authUser])

    return(
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}