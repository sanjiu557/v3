import {io} from 'socket.io-client'
import type {Socket} from 'socket.io-client'
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  candidate:(data:any)=>void;
  msg:(data:any)=>void;
  roomUserList:(data:any)=>void;
  error:(data:any)=>void;
}

interface ClientToServerEvents {
  hello: () => void;
  candidate:(data:any)=>void;
  msg:(data:any)=>void;
  offer:(data:any)=>void;
  answer:(data:any)=>void;
  call:(data:any)=>void;
  roomUserList:(data:any)=>void;
}

const   socket_server = 'ws://192.168.31.8:80'


const genSocket = (query:object) =>{
  console.log(query);
  
  const  socketIo:Socket<ServerToClientEvents,ClientToServerEvents> = io(socket_server,{
    transports:['websocket'],
    query
  })
  return socketIo
}

export default genSocket;